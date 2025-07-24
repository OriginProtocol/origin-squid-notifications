import { MessageFlags } from 'discord.js'
import { createProcessor } from 'topics'
import { mainnet } from 'viem/chains'

import { notifyDiscord } from '@notify/discord'
import { buybackFilter, getBuybacks, getBuybacksThisPastMonth } from '@utils/buybacks'
import { getStakingData } from '@utils/staking'

const minimumDollarValue = 1000

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
    for (const {
      valueFormatted,
      tokenOutName,
      tokenOutValueFormatted,
      tokenOutPriceFormatted,
      tokenOutPrice,
      log,
    } of buybackArray) {
      const { buybacksUSDFormatted } = await getBuybacksThisPastMonth(log.block.timestamp, {
        transactionHash: log.transactionHash,
        ognBoughtUSD: tokenOutPrice,
      })
      const stakingData = await getStakingData()
      const ognStakingApyFormatted = `${(stakingData.maxOgnApy * 100).toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}%`
      const via =
        log.transaction?.to?.toLowerCase() === '0x9008d19f58aabd9ed0d60971565aa8510560ab41' ? 'via @CoWSwap' : ''

      const message = tokenOutName
        ? `
🚨 OGN Buyback Executed  |  [Etherscan](https://etherscan.io/tx/${log.transactionHash})

Bought: ${valueFormatted} $OGN ${via}

Spent: ${tokenOutValueFormatted} $${tokenOutName}

📊 Buybacks this past month: ${buybacksUSDFormatted}

All buybacks are distributed to OGN stakers.

OGN staking APY is now at ${ognStakingApyFormatted}

Stake OGN here ⬇️
https://app.originprotocol.com/#/ogn/staking
`.trim()
        : `
🚨 OGN Buyback Executed  |  [Etherscan](https://etherscan.io/tx/${log.transactionHash})

Bought: ${valueFormatted} $OGN ${via}

📊 Buybacks this past month: ${buybacksUSDFormatted}

All buybacks are distributed to OGN stakers.

OGN staking APY is now at ${ognStakingApyFormatted}

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
