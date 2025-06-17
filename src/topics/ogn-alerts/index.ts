import dayjs from 'dayjs'
import { MessageFlags } from 'discord.js'
import { pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createProcessor } from 'topics'
import { formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

import * as exponentialStakingAbi from '@abi/exponential-staking'
import { notifyDiscord } from '@notify/discord'
import { XOGN_ADDRESS } from '@utils/addresses'
import { buybackFilter, getBuybacks } from '@utils/buybacks'
import { convertToUsd } from '@utils/pricing'

const minimumDollarValue = 1

// Buybacks
createProcessor({
  name: 'OGN Alerts',
  chainId: mainnet.id,
  topic: 'OGN Alerts',
  events: [buybackFilter.value],
  setup: (p) => {
    p.addLog(buybackFilter.value)
  },
  process: async (ctx) => {
    const buybackArray = await getBuybacks(ctx, minimumDollarValue)
    for (const { valueFormatted, tokenOutName, tokenOutValueFormatted, tokenOutPriceFormatted, log } of buybackArray) {
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
          const { amount, end } = exponentialStakingAbi.events.Stake.decode(params.log)
          const amountNumber = Number(formatUnits(amount, 18))
          const amountFormatted = amountNumber.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })
          const price = await convertToUsd(amountNumber, 'OGN')
          if (price < minimumDollarValue) {
            return
          }
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
