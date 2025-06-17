import { MessageFlags } from 'discord.js'
import { createProcessor } from 'topics'
import { mainnet } from 'viem/chains'

import { notifyDiscord } from '@notify/discord'
import { buybackFilter, getBuybacks } from '@utils/buybacks'

const minimumDollarValue = 1

// Buybacks
createProcessor({
  name: 'OGN Buybacks',
  chainId: mainnet.id,
  topic: 'OGN Buybacks',
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
        sortId: log.id + '-ogn-buybacks',
        description: message,
        topic: 'OGN Buybacks',
        severity: 'low',
        flags: MessageFlags.SuppressEmbeds,
      })
    }
  },
})
