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
import { buybackFilter, getBuybacks, getBuybacksSinceBuybackReboot, getBuybacksThisPastMonth } from '@utils/buybacks'
import { getStakingData } from '@utils/staking'

const minUsdToBuybackAlert = 5_000
const minOgnToStakeAlert = 50_000
const milestoneAmount = 25_000

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
    const buybackArray = await getBuybacks(ctx)
    for (const {
      valueNumber,
      valueFormatted,
      tokenOutName,
      tokenOutValueFormatted,
      tokenOutPriceFormatted,
      tokenOutPrice,
      log,
    } of buybackArray) {
      const { buybacksUSD, buybacksUSDFormatted } = await getBuybacksThisPastMonth(log.block.timestamp, {
        transactionHash: log.transactionHash,
        ognBoughtUSD: tokenOutPrice,
      })
      const { buybacksUSD: buybacksUSDSinceReboot } = await getBuybacksSinceBuybackReboot({
        timestamp: log.block.timestamp,
        transactionHash: log.transactionHash,
        ognBoughtUSD: tokenOutPrice,
      })
      const stakingData = await getStakingData()
      const ognStakingApyFormatted = `${(stakingData.maxOgnApy * 100).toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}%`
      const via =
        log.transaction?.to?.toLowerCase() === '0x9008d19f58aabd9ed0d60971565aa8510560ab41' ? 'via @CoWSwap' : ''

      if (valueNumber > minUsdToBuybackAlert) {
        const message = tokenOutName
          ? `
🚨 OGN Buyback Executed

Bought: ${valueFormatted} $OGN ${via}

Spent: ${tokenOutValueFormatted} $${tokenOutName}

📊 Buybacks this past month: ${buybacksUSDFormatted}

All buybacks are distributed to OGN stakers.

OGN staking APY is now at ${ognStakingApyFormatted}

TXN Details ⬇️
https://etherscan.io/tx/${log.transactionHash}
`
          : `
🚨 OGN Buyback Executed

Bought: ${valueFormatted} $OGN ${via}

📊 Buybacks this past month: ${buybacksUSDFormatted}

All buybacks are distributed to OGN stakers.

OGN staking APY is now at ${ognStakingApyFormatted}

TXN Details ⬇️
https://etherscan.io/tx/${log.transactionHash}
`

        notifyDiscord({
          sortId: log.id + '-ogn-alerts-buyback',
          description: message,
          topic: 'OGN Alerts',
          severity: 'low',
          flags: MessageFlags.SuppressEmbeds,
        })
      }

      // Milestone alert
      if (
        (buybacksUSDSinceReboot / milestoneAmount) ^
        ((buybacksUSDSinceReboot - tokenOutPrice) / milestoneAmount) ^
        0
      ) {
        const milestoneFormatted = (((buybacksUSDSinceReboot / milestoneAmount) ^ 0) * milestoneAmount).toLocaleString(
          'en-US',
          {
            maximumFractionDigits: 0,
          },
        )

        const cumulativeMessage = `
🚨 We just hit $${milestoneFormatted} of OGN bought back since June 30, 2025. 

All buybacks are distributed to OGN stakers.

OGN staking APY is now at ${ognStakingApyFormatted}

Stake OGN here ⬇️
https://app.originprotocol.com/#/ogn/staking
        `

        notifyDiscord({
          sortId: log.id + '-ogn-alerts-milestone',
          description: cumulativeMessage,
          topic: 'OGN Alerts',
          severity: 'low',
          flags: MessageFlags.SuppressEmbeds,
        })
      }
    }
  },
})

// Stakes
createEventProcessor({
  name: 'OGN Alerts',
  chainId: mainnet.id,
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
          if (amountNumber < minOgnToStakeAlert) {
            return
          }

          const stakingData = await getStakingData()
          const ognStakingApyFormatted = `${(stakingData.maxOgnApy * 100).toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })}%`

          const startDate = dayjs()
          const endDate = dayjs(Number(end) * 1000)
          const months = Math.round(endDate.diff(startDate, 'month', true))
          let durationString: string
          if (months < 2) {
            const days = Math.ceil(endDate.diff(startDate, 'day', true))
            durationString = `${days} day(s)`
          } else {
            durationString = `${months} month(s)`
          }
          const message = `
🔒 ${amountFormatted} $OGN has just been staked. 

OGN staking APY is now at ${ognStakingApyFormatted}

Staking rewards are 100% funded by protocol revenue buybacks — not inflation.
          `

          notifyDiscord({
            sortId: params.log.id + '-ogn-alerts-stake',
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
