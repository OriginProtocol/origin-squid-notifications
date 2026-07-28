import { event, indexed } from '@subsquid/evm-abi'
import * as p from '@subsquid/evm-codec'

import * as erc20Abi from '../../../abi/erc20'
import * as ethenaArmAbi from '../../../abi/ethena-arm'
import { addresses, arms } from '../../../utils/addresses'
import { sonicAddresses } from '../../../utils/addresses/addresses-sonic'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatAmount } from '../../../utils/formatAmount'
import { discordIconOrName } from '../../const'
import { explorerUrl } from '../../format'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed, renderEventDiscordEmbed } from './utils'

const TraderateChanged = event(
  '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952',
  'TraderateChanged(uint256,uint256)',
  { traderate0: p.uint256, traderate1: p.uint256 },
)

// Multi-asset ARM variant — per-asset rates with remaining liquidity
const MultiAssetTraderateChanged = event(
  '0x778ebbe9f96685bd519458d016cf8c56446b9054726f7448a2faa8ccce6ab452',
  'TraderateChanged(address,uint256,uint256,uint256,uint256)',
  {
    asset: indexed(p.address),
    buyPrice: p.uint256,
    sellPrice: p.uint256,
    buyLiquidityRemaining: p.uint256,
    sellLiquidityRemaining: p.uint256,
  },
)

interface ArmConfig {
  address: string
  symbol0: string
  token0: string
  // Multi-asset ARMs have no fixed counterpart token
  symbol1?: string
  token1?: string
  // Decimals of the liquidity asset (token0), default 18
  decimals?: number
}

// Known non-18-decimal tokens traded by the ARMs. Swap legs can have different
// decimals (e.g. multi-asset ARM base assets), so decimals resolve per token.
const TOKEN_DECIMALS: Record<string, number> = {
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 6, // USDC
  '0x6c3ea9036406852006290770bedfcaba0e23a0e8': 6, // PYUSD
  '0xe343167631d89b6ffc58b88d6b7fb0228795491d': 6, // USDG
}

const tokenDecimals = (tokenAddress: string) => TOKEN_DECIMALS[tokenAddress.toLowerCase()] ?? 18

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

registerArm({
  address: arms['ARM-WETH'].address,
  symbol0: 'WETH',
  token0: addresses.tokens.WETH,
})

registerArm({
  address: arms['ARM-USDC'].address,
  symbol0: 'USDC',
  token0: addresses.tokens.USDC,
  decimals: 6,
})

// TraderateChanged renderer — shows raw ARM spread rates
registerEventRenderer(TraderateChanged.topic, async (params) => {
  const arm = armConfigs.get(params.log.address.toLowerCase())
  if (!arm) return defaultEventRenderer(params)

  const data = TraderateChanged.decode(params.log)

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

// Multi-asset TraderateChanged renderer — per-asset prices plus remaining liquidity.
// Displays match the legacy renderer via origin-squid's dual-write mapping
// (traderate0 = buyPrice, traderate1 = sellPrice).
registerEventRenderer(MultiAssetTraderateChanged.topic, async (params) => {
  const arm = armConfigs.get(params.log.address.toLowerCase())
  if (!arm) return defaultEventRenderer(params)

  const data = MultiAssetTraderateChanged.decode(params.log)
  const assetAddress = data.asset.toLowerCase()
  const assetSymbol =
    discordIconOrName(assetAddress) ??
    getAddressesPyName(assetAddress) ??
    `${assetAddress.slice(0, 6)}...${assetAddress.slice(-4)}`
  const rateLabel = `${assetSymbol}/${arm.symbol0}`
  const decimals = arm.decimals ?? 18

  const sellRate = 10n ** 72n / data.buyPrice // 1e36 precision
  const buyRate = data.sellPrice // 1e36 precision

  renderEventDiscordEmbed(params, {
    fields: [
      {
        name: `${formatAmount(sellRate, 36, { maximumFractionDigits: 8 })} ${rateLabel}`,
        value: 'Sell Price',
        inline: true,
      },
      {
        name: `${formatAmount(buyRate, 36, { maximumFractionDigits: 8 })} ${rateLabel}`,
        value: 'Buy Price',
        inline: true,
      },
      {
        name: `${formatAmount(data.sellLiquidityRemaining, decimals, { maximumFractionDigits: 4 })} / ${formatAmount(
          data.buyLiquidityRemaining,
          decimals,
          { maximumFractionDigits: 4 },
        )}`,
        value: 'Sell / Buy Liquidity',
        inline: true,
      },
    ],
  })
})

// Transfer renderer — renders ARM swaps using actual transaction logs.
// Requires transactionLogs: true on the alert rule to access sibling logs.
// Falls back to default for non-ARM transfers or deposits/withdrawals.
registerEventRenderer(erc20Abi.events.Transfer.topic, async (params) => {
  // Check if topic2 (the `to` address) is a known ARM
  const topic2 = params.log.topics[2]
  if (!topic2) return defaultEventRenderer(params)

  const toAddress = ('0x' + topic2.slice(26)).toLowerCase()
  const arm = armConfigs.get(toAddress)
  if (!arm) return defaultEventRenderer(params)

  // Need transaction logs to find the counterpart transfer
  const txLogs = params.log.transaction?.logs
  if (!txLogs) return defaultEventRenderer(params)

  // If there's an Allocated event in this transaction, it's not a swap
  const hasAllocation = txLogs.some((l) => l.topics[0] === ethenaArmAbi.events.Allocated.topic)
  if (hasAllocation) return defaultEventRenderer(params)

  // Find the transfer IN (to ARM) and transfer OUT (from ARM) in this transaction
  const transferInLog = txLogs.find(
    (l) =>
      l.topics[0] === erc20Abi.events.Transfer.topic &&
      l.topics[2] &&
      ('0x' + l.topics[2].slice(26)).toLowerCase() === arm.address.toLowerCase(),
  )
  const transferOutLog = txLogs.find(
    (l) =>
      l.topics[0] === erc20Abi.events.Transfer.topic &&
      l.topics[1] &&
      ('0x' + l.topics[1].slice(26)).toLowerCase() === arm.address.toLowerCase(),
  )

  // If we don't have both in and out, it's a deposit/withdrawal — not a swap
  if (!transferInLog || !transferOutLog) return

  // Only render once per swap (on the inbound transfer)
  if (params.log.logIndex !== transferInLog.logIndex) return

  const transferInData = erc20Abi.events.Transfer.decode(transferInLog)
  const transferOutData = erc20Abi.events.Transfer.decode(transferOutLog)

  const explorer = explorerUrl(params.ctx.chain)

  // Source address from the inbound transfer's `from` field
  const fromAddress = transferInData.from.toLowerCase()
  const sourceName =
    getAddressesPyName(fromAddress) ??
    discordIconOrName(fromAddress) ??
    `${fromAddress.slice(0, 6)}...${fromAddress.slice(-4)}`

  const inTokenAddress = transferInLog.address.toLowerCase()
  const outTokenAddress = transferOutLog.address.toLowerCase()
  const symbolFor = (tokenAddress: string) =>
    discordIconOrName(tokenAddress) ??
    (tokenAddress === arm.token0.toLowerCase()
      ? arm.symbol0
      : arm.symbol1 ?? getAddressesPyName(tokenAddress) ?? `${tokenAddress.slice(0, 6)}...${tokenAddress.slice(-4)}`)
  const inSymbol = symbolFor(inTokenAddress)
  const outSymbol = symbolFor(outTokenAddress)

  // Rate — always show under 1 (invert if needed, prefix with ~)
  // Normalize by each token's decimals so mixed-decimal legs still produce a unit rate.
  const isToken0In = inTokenAddress === arm.token0.toLowerCase()
  const inUnits = Number(transferInData.value) / 10 ** tokenDecimals(inTokenAddress)
  const outUnits = Number(transferOutData.value) / 10 ** tokenDecimals(outTokenAddress)
  const rawRate = isToken0In ? inUnits / outUnits : outUnits / inUnits
  const rate = rawRate > 1 ? 1 / rawRate : rawRate

  renderDiscordEmbed({
    sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${params.name} - Swap`,
    titleUrl: `${explorer}/tx/${params.log.transactionHash}`,
    description: `Source: [${sourceName}](${explorer}/address/${fromAddress})`,
    fields: [
      {
        name: formatAmount(transferInData.value, tokenDecimals(inTokenAddress), { maximumFractionDigits: 6 }),
        value: `${inSymbol} in`,
        inline: true,
      },
      {
        name: formatAmount(transferOutData.value, tokenDecimals(outTokenAddress), { maximumFractionDigits: 6 }),
        value: `${outSymbol} out`,
        inline: true,
      },
      {
        name: rate.toLocaleString('en-US', { maximumFractionDigits: 6 }),
        value: 'Rate',
        inline: true,
      },
    ],
  })
})
