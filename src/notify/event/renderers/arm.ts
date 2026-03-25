import { event } from '@subsquid/evm-abi'
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
    (l) => l.topics[0] === erc20Abi.events.Transfer.topic && l.topics[2] && ('0x' + l.topics[2].slice(26)).toLowerCase() === arm.address.toLowerCase(),
  )
  const transferOutLog = txLogs.find(
    (l) => l.topics[0] === erc20Abi.events.Transfer.topic && l.topics[1] && ('0x' + l.topics[1].slice(26)).toLowerCase() === arm.address.toLowerCase(),
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
    getAddressesPyName(fromAddress) ?? discordIconOrName(fromAddress) ?? `${fromAddress.slice(0, 6)}...${fromAddress.slice(-4)}`

  const inTokenAddress = transferInLog.address.toLowerCase()
  const outTokenAddress = transferOutLog.address.toLowerCase()
  const inSymbol = discordIconOrName(inTokenAddress) ?? (inTokenAddress === arm.token0.toLowerCase() ? arm.symbol0 : arm.symbol1)
  const outSymbol = discordIconOrName(outTokenAddress) ?? (outTokenAddress === arm.token0.toLowerCase() ? arm.symbol0 : arm.symbol1)

  // Rate = token0/token1, matching original renderer behavior
  const isToken0In = inTokenAddress === arm.token0.toLowerCase()
  const rate = isToken0In
    ? Number(transferInData.value) / Number(transferOutData.value)
    : Number(transferOutData.value) / Number(transferInData.value)

  renderDiscordEmbed({
    sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${params.name} - Swap`,
    titleUrl: `${explorer}/tx/${params.log.transactionHash}`,
    description: `Source: [${sourceName}](${explorer}/address/${fromAddress})`,
    fields: [
      {
        name: formatAmount(transferInData.value, 18, { maximumFractionDigits: 6 }),
        value: `${inSymbol} in`,
        inline: true,
      },
      {
        name: formatAmount(transferOutData.value, 18, { maximumFractionDigits: 6 }),
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
