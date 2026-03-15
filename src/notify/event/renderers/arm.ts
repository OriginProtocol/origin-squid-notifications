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

class ArmContract extends ContractBase {
  traderate0() {
    return this.eth_call(armFunctions.traderate0, {})
  }
  traderate1() {
    return this.eth_call(armFunctions.traderate1, {})
  }
}

interface ArmConfig {
  address: string
  symbol0: string
  symbol1: string
  token0: string
  token1: string
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

async function getTraderates(
  ctx: Parameters<Parameters<typeof registerEventRenderer>[1]>[0]['ctx'],
  block: Parameters<Parameters<typeof registerEventRenderer>[1]>[0]['log']['block'],
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

// TraderateChanged renderer
registerEventRenderer(TraderateChanged.topic, async (params) => {
  const arm = armConfigs.get(params.log.address.toLowerCase())
  if (!arm) return defaultEventRenderer(params)

  const data = TraderateChanged.decode(params.log)

  // Cache for swap calculations
  traderateCache.set(params.log.address.toLowerCase(), {
    traderate0: data.traderate0,
    traderate1: data.traderate1,
  })

  renderEventDiscordEmbed(params, {
    fields: [
      {
        name: `${formatAmount(10n ** 72n / data.traderate0, 36, { maximumFractionDigits: 8 })} ${arm.symbol1}/${
          arm.symbol0
        }`,
        value: 'Sell Price',
      },
      {
        name: `${formatAmount(data.traderate1, 36, { maximumFractionDigits: 8 })} ${arm.symbol1}/${arm.symbol0}`,
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
    // traderate0 is inverted: sell price = 1e72 / traderate0 (in 1e36 precision)
    // traderate1 is direct: buy price = traderate1 (in 1e36 precision)
    let outAmount: bigint
    let rate: number
    if (isToken0In) {
      // Selling token0 → receive token1 at sell price
      const sellRate = 10n ** 72n / rates.traderate0
      outAmount = (data.value * sellRate) / 10n ** 36n
      rate = Number(sellRate) / 1e36
    } else {
      // Selling token1 → receive token0 at buy price
      outAmount = rates.traderate1 > 0n ? (data.value * 10n ** 36n) / rates.traderate1 : 0n
      rate = Number(rates.traderate1) / 1e36
    }

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
