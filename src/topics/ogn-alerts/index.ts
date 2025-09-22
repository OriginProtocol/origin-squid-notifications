import dayjs from 'dayjs'
import { MessageFlags } from 'discord.js'
import { pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createProcessor } from 'topics'
import { formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

import * as erc20Abi from '@abi/erc20'
import * as exponentialStakingAbi from '@abi/exponential-staking'
import * as xognAbi from '@abi/exponential-staking'
import * as fixedRateRewardsSourceAbi from '@abi/fixed-rate-rewards-source'
import { notifyDiscord } from '@notify/discord'
import { Block, Context } from '@originprotocol/squid-utils'
import { OGN_ADDRESS, XOGN_ADDRESS } from '@utils/addresses'
import { buybackFilter, getBuybacks, getBuybacksThisMonth } from '@utils/buybacks'

const minOgnToAlert = 50_000

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
    const buybackArray = await getBuybacks(ctx, 1)
    for (const {
      valueFormatted,
      tokenOutName,
      tokenOutValueFormatted,
      tokenOutPriceFormatted,
      tokenOutPrice,
      log,
    } of buybackArray) {
      const buybacksThisMonth = await getBuybacksThisMonth(log.block.timestamp, {
        transactionHash: log.transactionHash,
        ognBoughtUSD: tokenOutPrice,
      })
      const message = tokenOutName
        ? `
🚨 New OGN Buyback:

${valueFormatted} $OGN bought back from the market with ${tokenOutValueFormatted} $${tokenOutName} (${tokenOutPriceFormatted})

📊 Buybacks this month: ${buybacksThisMonth}

OGN from buybacks is distributed to OGN stakers.

TXN Details ⬇️
https://etherscan.io/tx/${log.transactionHash}
`.trim()
        : `
🚨 New OGN Buyback:

${valueFormatted} $OGN bought back from the market.

📊 Buybacks this month: ${buybacksThisMonth}

OGN from buybacks is distributed to OGN stakers.

TXN Details ⬇️
https://etherscan.io/tx/${log.transactionHash}
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
          if (amountNumber < minOgnToAlert) {
            return
          }
          const yieldData = await calculateXOgnApy(params.ctx, params.block).catch((err) => {
            console.error(err)
            return undefined
          })
          const months = Math.ceil(dayjs(Number(end) * 1000).diff(dayjs(), 'month', true))
          const message = `
🚨 New OGN Stake:

${amountFormatted} $OGN has just been locked for ${months} month(s).

${yieldData ? `Earn ${(yieldData.xOgnApyPercentage * 100).toFixed(2)}% APY by staking OGN.\n` : ''}
Staking rewards are 100% funded by protocol revenue buybacks — not inflation.
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

const calculateYieldData = async (ctx: Context, block: Block) => {
  const fixedRewardSourceContract = new fixedRateRewardsSourceAbi.Contract(
    ctx,
    block.header,
    '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b',
  )
  const ognContract = new erc20Abi.Contract(ctx, block.header, OGN_ADDRESS)
  const rewardData = await fixedRewardSourceContract.rewardConfig()
  const balanceOf = await ognContract.balanceOf(XOGN_ADDRESS)

  const ognRewardsPerYear = +formatUnits(rewardData.rewardsPerSecond ?? 0n, 18) * 60 * 60 * 24 * 365
  const ognStaked = +formatUnits(balanceOf ?? 0n, 18)

  return {
    ognRewardsPerYear,
    ognStaked,
    ognApy: ognStaked === 0 ? 0 : ognRewardsPerYear / ognStaked,
  }
}

const calculateXOgnApy = async (ctx: Context, block: Block) => {
  const stakedAmount = 10n ** 18n

  const xognContract = new xognAbi.Contract(ctx, block.header, XOGN_ADDRESS)
  const oneYearInSeconds = 60n * 60n * 24n * 365n
  const xOgnPreviewPoints = await xognContract.previewPoints(stakedAmount, oneYearInSeconds)
  const xOgnTotalSupplyB = await xognContract.totalSupply()
  const yieldData = await calculateYieldData(ctx, block)

  const ognRewardsPerYear = yieldData.ognRewardsPerYear
  const xOgnPreview = +formatUnits(xOgnPreviewPoints._0, 18)
  const xOgnTotalSupply = +formatUnits(xOgnTotalSupplyB, 18)

  const xognPercentage = xOgnPreview / (xOgnTotalSupply + xOgnPreview)
  const projectedRewards = ognRewardsPerYear * xognPercentage
  const xOgnApyPercentage = projectedRewards / +formatUnits(stakedAmount, 18)

  return {
    xOgnApyPercentage,
    xOgnPreview,
  }
}
