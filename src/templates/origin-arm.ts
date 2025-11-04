import { omit, pick } from 'lodash'

import { logFilter } from '@originprotocol/squid-utils'
import { cloudflareKV } from '@utils/cloudflare-kv'

import * as erc20Abi from '../abi/erc20'
import * as originArmAbi from '../abi/origin-lido-arm'
import { Topic, discordIconOrName } from '../notify/const'
import { EventRendererParams } from '../notify/event'
import { renderDiscordEmbed, renderEventDiscordEmbed } from '../notify/event/renderers/utils'
import { addresses } from '../utils/addresses'
import { formatAmount } from '../utils/formatAmount'
import { transactionLink } from '../utils/links'
import { createEventProcessor } from './event'

export const createOriginArmProcessor = ({
  name,
  chainId,
  address,
  symbol0,
  symbol1,
  capManagerAddress,
  zapperAddress,
  topic,
}: {
  name: string
  chainId: number
  address: string
  symbol0: string
  symbol1: string
  capManagerAddress: string
  zapperAddress?: string
  topic: Topic
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
        events: omit(originArmAbi.events, [...highPriorityEvents, 'Transfer']),
        renderers: {
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
              const transferSource =
                armSources[transferInData.from.toLowerCase()] ??
                discordIconOrName(transferInData.from) ??
                transferInData.from
              const configLimit = await cloudflareKV.getOrSet('origin-arm-swap-limit', 0).then((limit) => BigInt(limit))
              if (transferInData.value < configLimit && transferOutData.value < configLimit) return
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
                      transferIn.address === addresses.tokens.stETH
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

const armSources: Record<string, string | undefined> = {
  '0x9008d19f58aabd9ed0d60971565aa8510560ab41': 'CoW Swap',
  '0xe37e799d5077682fa0a244d46e5649f71457bd09': '1inch',
  '0x8d8404f8cca4c8834ca3cab1e54887ae47724bee': '1inch',
  '0x3451b6b219478037a1ac572706627fc2bda1e812': '1inch',
  '0x6aa7a8539543210563af6cf575cc5079b194d0c8': '1inch',
  '0xa600910b670804230e00a100000d28000ae005c0': 'ParaSwap',
  '0xe4000004000bd8006e00720000d27d1fa000d43e': 'MEV Bot',
  '0x22a956c4755d8c4294b358dc346e74250e175622': 'MEV Bot',
  '0xb2f72662ed42067ccce278f8462a0215b6adcabb': 'MEV Bot',
  '0x5ed5dd65ab0dc1bccc44eedaa40680c231faaa9f': 'MEV Bot',
  '0xe08d97e151473a848c3d9ca3f323cb720472d015': 'MEV Bot (c0ffeebabe.eth)',
  '0x70bf6634ee8cb27d04478f184b9b8bb13e5f4710': '0x',
}

// Special Requests
/*
    I'd like a change to the `Origin ARM Rates Updated` event:
    Rename `traderate0` to `sell price` and invert the price so it's in stETH/WETH, not WETH/stETH
    Rename `traderate1` to `buy price`. It is already in stETH/WETH.
*/
