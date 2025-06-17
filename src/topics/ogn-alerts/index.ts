import dayjs from 'dayjs'
import { MessageFlags } from 'discord.js'
import { compact, pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createProcessor } from 'topics'
import { formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

import * as erc20Abi from '@abi/erc20'
import * as exponentialStakingAbi from '@abi/exponential-staking'
import { notifyDiscord } from '@notify/discord'
import { logFilter } from '@originprotocol/squid-utils'
import { OGN_ADDRESS, OGN_REWARDS_SOURCE_ADDRESS, XOGN_ADDRESS, buybacks } from '@utils/addresses'
import { getAddressName } from '@utils/addresses/names'
import { convertToUsd } from '@utils/pricing'

const minimumDollarValue = 1

const transferFilter = logFilter({
  address: [OGN_ADDRESS],
  topic0: [erc20Abi.events.Transfer.topic],
  topic2: [OGN_REWARDS_SOURCE_ADDRESS],
  transaction: true,
  transactionLogs: true,
})

// Buybacks
createProcessor({
  name: 'OGN Alerts',
  chainId: mainnet.id,
  topic: 'OGN Alerts',
  events: [transferFilter.value],
  setup: (p) => {
    p.addLog(transferFilter.value)
  },
  process: async (ctx) => {
    for (const block of ctx.blocks) {
      for (const log of block.logs) {
        if (transferFilter.matches(log)) {
          // Find what the operator transfered out
          const transactionLogs = log.transaction!.logs
          const transactionTransfers = transactionLogs.filter((l) => l.topics[0] === erc20Abi.events.Transfer.topic)
          const transactionTransfersData = compact(
            transactionTransfers.map((l) => {
              try {
                return { log: l, data: erc20Abi.events.Transfer.decode(l) }
              } catch (err) {
                return undefined
              }
            }),
          )

          const transferFrom = transactionTransfersData.find((l) => l.data.from.toLowerCase() === buybacks.operator)
          if (!transferFrom) return

          const tokenOut = transferFrom.log.address
          const tokenOutName = getAddressName(tokenOut)
          const tokenOutValueNumber = Number(formatUnits(transferFrom.data.value, 18))
          const tokenOutValueFormatted = tokenOutValueNumber.toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })
          const tokenOutPrice = await convertToUsd(tokenOutValueNumber, tokenOutName as any)
          if (tokenOutPrice < minimumDollarValue) {
            continue
          }
          const tokenOutPriceFormatted = tokenOutPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })

          const { from, value } = erc20Abi.events.Transfer.decode(log)
          if (from !== XOGN_ADDRESS) {
            const valueNumber = Number(formatUnits(value, 18))
            const valueFormatted = valueNumber.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })

            const message = tokenOutName
              ? `
🚨 New OGN Buyback: 

${valueFormatted} $OGN bought back from the market with ${tokenOutValueFormatted} $${tokenOutName} (${tokenOutPriceFormatted})

OGN from buybacks is distributed to xOGN stakers.

Stake OGN here ⬇️
https://app.originprotocol.com/#/ogn/staking
`.trim()
              : `
🚨 New OGN Buyback: 

${valueFormatted} $OGN bought back from the market.

OGN from buybacks is distributed to xOGN stakers.

Stake OGN here ⬇️
https://app.originprotocol.com/#/ogn/staking
`.trim()

            notifyDiscord({
              sortId: log.id + '-ogn-alerts',
              description: message,
              topic: 'OGN Alerts',
              severity: 'low',
              flags: MessageFlags.SuppressEmbeds,
            })
          }
        }
      }
    }
  },
})

// Stakes
createEventProcessor({
  name: 'OGN Alerts',
  chainId: 1,
  topic: 'OGN Alerts',
  tracks: [
    {
      address: [XOGN_ADDRESS],
      events: pick(exponentialStakingAbi.events, ['Stake']),
      renderers: {
        Stake: async (params) => {
          const { user, amount, end, points } = exponentialStakingAbi.events.Stake.decode(params.log)
          const amountNumber = Number(formatUnits(amount, 18))
          const amountFormatted = amountNumber.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })
          const price = await convertToUsd(amountNumber, 'OGN')
          if (price < minimumDollarValue) {
            return
          }
          const priceFormatted = price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })
          const months = dayjs(Number(end) * 1000).diff(dayjs(), 'month')
          const message = `
🚨 New OGN Stake:

${amountFormatted} $OGN has been locked for ${months} months.

$xOGN receives staking rewards funded by OGN buybacks.

Stake OGN here ⬇️
https://app.originprotocol.com/#/ogn/staking
          `
          notifyDiscord({
            sortId: params.log.id + '-ogn-alerts',
            description: message,
            topic: 'OGN Alerts',
            severity: 'low',
            flags: MessageFlags.SuppressEmbeds,
          })
        },
      },
    },
  ],
})
