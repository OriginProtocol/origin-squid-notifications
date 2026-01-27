import { omit, pick } from 'lodash'

import { logFilter } from '@originprotocol/squid-utils'
import { cloudflareKV } from '@utils/cloudflare-kv'

import * as erc20Abi from '../abi/erc20'
import * as originEtherfiArmAbi from '../abi/origin-etherfi-arm'
import * as originArmAbi from '../abi/origin-lido-arm'
import { Topic, discordIconOrName } from '../notify/const'
import { EventRendererParams } from '../notify/event'
import { renderDiscordEmbed, renderEventDiscordEmbed } from '../notify/event/renderers/utils'
import { formatAmount } from '../utils/formatAmount'
import { transactionLink } from '../utils/links'
import { createEventProcessor } from './event'

export const createOriginArmProcessor = ({
  name,
  chainId,
  address,
  symbol0,
  symbol1,
  token0,
  token1,
  capManagerAddress,
  zapperAddress,
  topic,
  minimumSwapAmount,
}: {
  name: string
  chainId: number
  address: string
  symbol0: string
  symbol1: string
  token0: string
  token1: string
  capManagerAddress: string
  zapperAddress?: string
  topic: Topic
  minimumSwapAmount?: bigint
}) => {
  const highPriorityEvents: (keyof typeof originArmAbi.events)[] = [
    'AdminChanged',
    'CapManagerUpdated',
    'FeeCollectorUpdated',
    'FeeUpdated',
    'Initialized',
    'OperatorChanged',
  ]
  const transferInFilter = logFilter({
    topic0: [erc20Abi.events.Transfer.topic],
    topic2: [address],
  })
  const transferOutFilter = logFilter({
    topic0: [erc20Abi.events.Transfer.topic],
    topic1: [address],
  })
  createEventProcessor({
    name,
    chainId,
    topic,
    tracks: [
      {
        address: [address],
        severity: 'high',
        events: pick(originArmAbi.events, highPriorityEvents),
      },
      {
        address: [address],
        severity: 'low',
        events: omit(
          {
            ...originArmAbi.events,
            Allocated: originEtherfiArmAbi.events.Allocated,
            ARMBufferUpdated: originEtherfiArmAbi.events.ARMBufferUpdated,
          },
          [...highPriorityEvents, 'Transfer'],
        ),
        renderers: {
          Allocated: (value: EventRendererParams) => {
            const allocatedData = originEtherfiArmAbi.events.Allocated.decode(value.log)
            renderEventDiscordEmbed(value, {
              description: `[${allocatedData.market}](https://etherscan.io/address/${allocatedData.market})`,
              fields: [
                {
                  name: 'Market',
                  value: allocatedData.market,
                },
                {
                  name: formatAmount(allocatedData.assets, 18, { maximumFractionDigits: 4 }),
                  value: 'Allocated',
                },
              ],
            })
          },
          ARMBufferUpdated: (value: EventRendererParams) => {
            const armBufferData = originEtherfiArmAbi.events.ARMBufferUpdated.decode(value.log)
            renderEventDiscordEmbed(value, {
              fields: [
                {
                  name: formatAmount(armBufferData.armBuffer, 18, { maximumFractionDigits: 4 }),
                  value: 'ARM Buffer',
                },
              ],
            })
          },
          TraderateChanged: (value: EventRendererParams) => {
            const traderateData = originArmAbi.events.TraderateChanged.decode(value.log)
            renderEventDiscordEmbed(value, {
              fields: [
                {
                  name: `${formatAmount(10n ** 72n / traderateData.traderate0, 36, {
                    maximumFractionDigits: 8,
                  })} ${symbol1}/${symbol0}`,
                  value: 'Sell Price',
                },
                {
                  name: `${formatAmount(traderateData.traderate1, 36, {
                    maximumFractionDigits: 8,
                  })} ${symbol1}/${symbol0}`,
                  value: 'Buy Price',
                },
              ],
            })
          },
          Deposit: (value: EventRendererParams) => {
            const depositData = originArmAbi.events.Deposit.decode(value.log)
            renderEventDiscordEmbed(value, {
              description: `[${depositData.owner}](https://etherscan.io/address/${depositData.owner})`,
              fields: [
                {
                  name: formatAmount(depositData.assets, 18, { maximumFractionDigits: 6 }),
                  value: 'Deposit',
                },
              ],
            })
          },
          RedeemRequested: (value: EventRendererParams) => {
            const depositData = originArmAbi.events.RedeemRequested.decode(value.log)
            renderEventDiscordEmbed(value, {
              description: `[${depositData.withdrawer}](https://etherscan.io/address/${depositData.withdrawer})`,
              fields: [
                {
                  name: formatAmount(depositData.assets, 18, { maximumFractionDigits: 6 }),
                  value: 'Redeem Requested',
                },
              ],
            })
          },
          RedeemClaimed: (value: EventRendererParams) => {
            const depositData = originArmAbi.events.RedeemClaimed.decode(value.log)
            renderEventDiscordEmbed(value, {
              description: `[${depositData.withdrawer}](https://etherscan.io/address/${depositData.withdrawer})`,
              fields: [
                {
                  name: formatAmount(depositData.assets, 18, { maximumFractionDigits: 6 }),
                  value: 'Redeem Claimed',
                },
              ],
            })
          },
          FeeCollected: (value: EventRendererParams) => {
            const depositData = originArmAbi.events.FeeCollected.decode(value.log)
            renderEventDiscordEmbed(value, {
              description: `[${depositData.feeCollector}](https://etherscan.io/address/${depositData.feeCollector})`,
              fields: [
                {
                  name: formatAmount(depositData.fee, 18, { maximumFractionDigits: 6 }),
                  value: 'Fee Collected',
                },
              ],
            })
          },
          RequestLidoWithdrawals: (value: EventRendererParams) => {
            const data = originArmAbi.events.RequestLidoWithdrawals.decode(value.log)
            renderEventDiscordEmbed(value, {
              fields: data.requestIds.flatMap((requestId, index) => [
                {
                  name: formatAmount(data.amounts[index], 18, { maximumFractionDigits: 6 }),
                  value: 'Amount',
                },
                {
                  name: requestId.toString(),
                  value: 'Request ID',
                },
              ]),
            })
          },
        },
      },
      {
        topic2: [address],
        severity: 'low',
        events: pick(erc20Abi.events, ['Transfer']),
        additionalFilters: [transferInFilter, transferOutFilter],
        renderers: {
          Transfer: async (value: EventRendererParams) => {
            const transferIn = value.log.transaction?.logs.find((log) => transferInFilter.matches(log))
            const transferOut = value.log.transaction?.logs.find((log) => transferOutFilter.matches(log))
            if ([transferIn?.address, transferOut?.address].includes('0x889edc2edab5f40e902b864ad4d7ade8e412f9b1')) {
              return // Skip withdrawal queue events.
            }
            if (transferIn && transferOut) {
              const transferInData = erc20Abi.events.Transfer.decode(transferIn)
              const transferOutData = erc20Abi.events.Transfer.decode(transferOut)
              const transferSource = discordIconOrName(transferInData.from) ?? transferInData.from
              if (
                minimumSwapAmount &&
                (transferInData.value < minimumSwapAmount || transferOutData.value < minimumSwapAmount)
              ) {
                // Minimum swap amount not met.
                return
              }
              const configLimit = await cloudflareKV.getOrSet('origin-arm-swap-limit', 0).then((limit) => BigInt(limit))
              if (transferInData.value < configLimit && transferOutData.value < configLimit) {
                // Cloudflare configured limit not met.
                return
              }
              renderDiscordEmbed({
                sortId: `${value.log.block.height}:${value.log.transactionIndex}:${value.log.logIndex}`,
                topic: value.topic,
                severity: value.severity,
                title: `${value.name} - Swap`,
                titleUrl: transactionLink(value.log.transactionHash, value.ctx.chain),
                description: `Source: [${transferSource}](https://etherscan.io/address/${transferInData.from})`,
                fields: [
                  {
                    name: formatAmount(transferInData.value, 18, { maximumFractionDigits: 6 }),
                    value: `${discordIconOrName(transferIn.address) ?? transferIn.address} in`,
                    inline: true,
                  },
                  {
                    name: formatAmount(transferOutData.value, 18, { maximumFractionDigits: 6 }),
                    value: `${discordIconOrName(transferOut.address) ?? transferOut.address} out`,
                    inline: true,
                  },
                  {
                    name: formatAmount(
                      transferIn.address === token1
                        ? Number(transferOutData.value) / Number(transferInData.value)
                        : Number(transferInData.value) / Number(transferOutData.value),
                      18,
                      {
                        maximumFractionDigits: 6,
                      },
                    ),
                    value: 'Rate',
                    inline: true,
                  },
                ],
              })
            }
          },
        },
      },
    ],
  })
}
