import { ContractBase, event, viewFun } from '@subsquid/evm-abi'
import * as p from '@subsquid/evm-codec'

import * as erc20Abi from '../../../abi/erc20'
import { addresses, arms } from '../../../utils/addresses'
import { sonicAddresses } from '../../../utils/addresses/addresses-sonic'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatAmount } from '../../../utils/formatAmount'
import { explorerUrl } from '../../format'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed, renderEventDiscordEmbed } from './utils'

const TraderateChanged = event(
  '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952',
  'TraderateChanged(uint256,uint256)',
  { traderate0: p.uint256, traderate1: p.uint256 },
)

const armFunctions = {
  traderate0: viewFun('0x45059a6b', 'traderate0()', {}, p.uint256),
  traderate1: viewFun('0xcf1de5d8', 'traderate1()', {}, p.uint256),
}

const erc4626Functions = {
  convertToAssets: viewFun('0x07a2d13a', 'convertToAssets(uint256)', { shares: p.uint256 }, p.uint256),
}

class ArmContract extends ContractBase {
  traderate0() {
    return this.eth_call(armFunctions.traderate0, {})
  }
  traderate1() {
    return this.eth_call(armFunctions.traderate1, {})
  }
}

class ERC4626Contract extends ContractBase {
  convertToAssets(shares: bigint) {
    return this.eth_call(erc4626Functions.convertToAssets, { shares })
  }
}

interface ArmConfig {
  address: string
  symbol0: string
  symbol1: string
  token0: string
  token1: string
  // ERC4626 vault token (e.g. sUSDe). When set, traderates are raw spread rates
  // and the vault's convertToAssets rate must be applied for output estimation.
  vaultToken?: string
}

// Build lookup from ARM contract address to config
const armConfigs = new Map<string, ArmConfig>()

function registerArm(config: ArmConfig) {
  armConfigs.set(config.address.toLowerCase(), config)
}

registerArm({
  address: arms['ARM-WETH-stETH'].address,
  symbol0: 'WETH',
  symbol1: 'stETH',
  token0: addresses.tokens.WETH,
  token1: addresses.tokens.stETH,
})

registerArm({
  address: arms['ARM-WETH-eETH'].address,
  symbol0: 'WETH',
  symbol1: 'eETH',
  token0: addresses.tokens.WETH,
  token1: addresses.tokens.eETH,
})

registerArm({
  address: arms['ARM-USDe-sUSDe'].address,
  symbol0: 'USDe',
  symbol1: 'sUSDe',
  token0: addresses.tokens.USDe,
  token1: addresses.tokens.sUSDe,
  vaultToken: addresses.tokens.sUSDe,
})

registerArm({
  address: sonicAddresses.arms['ARM-WS-OS'].address,
  symbol0: 'WS',
  symbol1: 'OS',
  token0: sonicAddresses.tokens.wS,
  token1: sonicAddresses.tokens.OS,
})

// Cache traderates per ARM address
const traderateCache = new Map<string, { traderate0: bigint; traderate1: bigint }>()

// Cache vault exchange rate (e.g. sUSDe → USDe via convertToAssets)
const vaultRateCache = new Map<string, bigint>()
const ONE = 10n ** 18n

type RendererCtx = Parameters<Parameters<typeof registerEventRenderer>[1]>[0]['ctx']
type RendererBlock = Parameters<Parameters<typeof registerEventRenderer>[1]>[0]['log']['block']

async function getVaultRate(ctx: RendererCtx, block: RendererBlock, vaultToken: string): Promise<bigint> {
  const cached = vaultRateCache.get(vaultToken)
  if (cached) return cached
  try {
    const contract = new ERC4626Contract(ctx, block, vaultToken)
    const rate = await contract.convertToAssets(ONE)
    vaultRateCache.set(vaultToken, rate)
    return rate
  } catch {
    return ONE // Fallback: assume 1:1
  }
}

async function getTraderates(
  ctx: RendererCtx,
  block: RendererBlock,
  armAddress: string,
): Promise<{ traderate0: bigint; traderate1: bigint } | undefined> {
  const cached = traderateCache.get(armAddress)
  if (cached) return cached
  try {
    const contract = new ArmContract(ctx, block, armAddress)
    const [traderate0, traderate1] = await Promise.all([contract.traderate0(), contract.traderate1()])
    const rates = { traderate0, traderate1 }
    traderateCache.set(armAddress, rates)
    return rates
  } catch {
    return undefined
  }
}

// TraderateChanged renderer — shows raw ARM spread rates
registerEventRenderer(TraderateChanged.topic, async (params) => {
  const arm = armConfigs.get(params.log.address.toLowerCase())
  if (!arm) return defaultEventRenderer(params)

  const data = TraderateChanged.decode(params.log)

  // Cache for swap calculations
  traderateCache.set(params.log.address.toLowerCase(), {
    traderate0: data.traderate0,
    traderate1: data.traderate1,
  })

  const sellRate = 10n ** 72n / data.traderate0 // 1e36 precision
  const buyRate = data.traderate1 // 1e36 precision
  const rateLabel = `${arm.symbol1}/${arm.symbol0}`

  renderEventDiscordEmbed(params, {
    fields: [
      {
        name: `${formatAmount(sellRate, 36, { maximumFractionDigits: 8 })} ${rateLabel}`,
        value: 'Sell Price',
      },
      {
        name: `${formatAmount(buyRate, 36, { maximumFractionDigits: 8 })} ${rateLabel}`,
        value: 'Buy Price',
      },
    ],
  })
})

// Transfer renderer — renders ARM swaps, falls back to default for non-ARM transfers
registerEventRenderer(erc20Abi.events.Transfer.topic, async (params) => {
  // Check if topic2 (the `to` address) is a known ARM
  const topic2 = params.log.topics[2]
  if (!topic2) return defaultEventRenderer(params)

  const toAddress = ('0x' + topic2.slice(26)).toLowerCase()
  const arm = armConfigs.get(toAddress)
  if (!arm) return defaultEventRenderer(params)

  const data = erc20Abi.events.Transfer.decode(params.log)
  const tokenAddress = params.log.address.toLowerCase()
  const isToken0In = tokenAddress === arm.token0.toLowerCase()
  const isToken1In = tokenAddress === arm.token1.toLowerCase()
  if (!isToken0In && !isToken1In) return defaultEventRenderer(params)

  const inSymbol = isToken0In ? arm.symbol0 : arm.symbol1
  const outSymbol = isToken0In ? arm.symbol1 : arm.symbol0

  const rates = await getTraderates(params.ctx, params.log.block, toAddress)
  const explorer = explorerUrl(params.ctx.chain)

  // Source address from topic1 (the `from` field)
  const fromAddress = params.log.topics[1] ? ('0x' + params.log.topics[1].slice(26)).toLowerCase() : undefined
  const sourceName = fromAddress
    ? getAddressesPyName(fromAddress) ?? `${fromAddress.slice(0, 6)}...${fromAddress.slice(-4)}`
    : undefined

  const fields: { name: string; value: string; inline?: boolean }[] = [
    {
      name: formatAmount(data.value, 18, { maximumFractionDigits: 6 }),
      value: `${inSymbol} in`,
      inline: true,
    },
  ]

  if (rates) {
    // Traderates are raw spread rates (~1.0). For vault tokens (e.g. sUSDe),
    // the ARM contract applies the vault conversion internally during swaps,
    // so we must apply it here too for output estimation.
    //
    // traderate0: for 1 token0 from trader, how many token1 the pool sends (raw)
    // traderate1: for 1 token1 from trader, how many token0 the pool sends (raw)
    let outAmount: bigint

    if (isToken0In) {
      // token0 → token1: outAmount = inAmount * traderate0 / 1e36
      // For vault: actual token1 out = raw output / vaultRate (fewer vault tokens)
      outAmount = (data.value * rates.traderate0) / 10n ** 36n
      if (arm.vaultToken) {
        const vaultRate = await getVaultRate(params.ctx, params.log.block, arm.vaultToken)
        outAmount = (outAmount * ONE) / vaultRate
      }
    } else {
      // token1 → token0: outAmount = inAmount * traderate1 / 1e36
      // For vault: actual token0 out = inAmount * vaultRate * traderate1 / 1e36 / 1e18
      outAmount = (data.value * rates.traderate1) / 10n ** 36n
      if (arm.vaultToken) {
        const vaultRate = await getVaultRate(params.ctx, params.log.block, arm.vaultToken)
        outAmount = (outAmount * vaultRate) / ONE
      }
    }

    // Rate = token0/token1, derived from actual in/out amounts
    const rate = isToken0In
      ? Number(data.value) / Number(outAmount)
      : Number(outAmount) / Number(data.value)

    fields.push({
      name: formatAmount(outAmount, 18, { maximumFractionDigits: 6 }),
      value: `${outSymbol} out`,
      inline: true,
    })
    fields.push({
      name: rate.toLocaleString('en-US', { maximumFractionDigits: 6 }),
      value: 'Rate',
      inline: true,
    })
  }

  renderDiscordEmbed({
    sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${params.name} - Swap`,
    titleUrl: `${explorer}/tx/${params.log.transactionHash}`,
    description: sourceName ? `Source: [${sourceName}](${explorer}/address/${fromAddress})` : undefined,
    fields,
  })
})
