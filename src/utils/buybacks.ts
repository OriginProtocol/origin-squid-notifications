import dayjs from 'dayjs'
import { gql } from 'graphql-request'
import { compact } from 'lodash'
import { formatUnits } from 'viem'

import * as erc20Abi from '@abi/erc20'
import { Context, logFilter } from '@originprotocol/squid-utils'

import { OGN_ADDRESS, OGN_REWARDS_SOURCE_ADDRESS, XOGN_ADDRESS, buybacks } from './addresses'
import { getAddressName } from './addresses/names'
import { convertToUsd } from './pricing'
import { squid } from './subsquid'

export const buybackFilter = logFilter({
  address: [OGN_ADDRESS],
  topic0: [erc20Abi.events.Transfer.topic],
  topic2: [OGN_REWARDS_SOURCE_ADDRESS],
  transaction: true,
  transactionLogs: true,
})

export const getBuybacks = async (ctx: Context, minimumDollarValue: number = 0) => {
  const results = []
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      if (buybackFilter.matches(log)) {
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
        if (!transferFrom) continue

        const tokenOut = transferFrom.log.address
        const tokenOutName = getAddressName(tokenOut)
        const tokenOutDecimals = await new erc20Abi.Contract(ctx, block.header, tokenOut).decimals()
        const tokenOutValueNumber = Number(formatUnits(transferFrom.data.value, tokenOutDecimals))
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

          results.push({
            tokenOut,
            tokenOutName,
            tokenOutValueNumber,
            tokenOutValueFormatted,
            tokenOutPrice,
            tokenOutPriceFormatted,
            valueNumber,
            valueFormatted,
            log,
          })
        }
      }
    }
  }
  return results
}

gql`
  query BuybacksThisMonth($timestampGte: DateTime!, $timestampLt: DateTime!, $excludeTxHash: String!) {
    ognBuybacks(
      limit: 1000
      where: { timestamp_gte: $timestampGte, timestamp_lt: $timestampLt, txHash_not_eq: $excludeTxHash }
    ) {
      timestamp
      ognBought
      ognBoughtUSD
      txHash
    }
  }
`

export const getBuybackSumForTimePeriod = async ({
  timestampGte,
  timestampLt,
  alertingTx,
}: {
  timestampGte: string
  timestampLt: string
  alertingTx: { transactionHash: string; ognBoughtUSD: number }
}) => {
  // Use the generated SDK function (will be available after codegen)
  const response = await squid.BuybacksThisMonth({
    timestampGte,
    timestampLt,
    excludeTxHash: alertingTx.transactionHash,
  })

  // Sum up the USD value of buybacks
  const totalBuybacksUSD = response.ognBuybacks.reduce((sum: number, buyback) => {
    return sum + (buyback.ognBoughtUSD || 0)
  }, alertingTx.ognBoughtUSD)

  return {
    buybacksUSD: totalBuybacksUSD,
    buybacksUSDFormatted: totalBuybacksUSD.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }),
  }
}

export const getBuybacksSinceBuybackReboot = async (alertingTx: {
  timestamp: number
  transactionHash: string
  ognBoughtUSD: number
}) => {
  const timestampGte = dayjs('2025-06-30T00:00:00Z').toISOString()
  const timestampLt = dayjs(alertingTx.timestamp).toISOString()

  return getBuybackSumForTimePeriod({
    timestampGte,
    timestampLt,
    alertingTx,
  })
}

export const getBuybacksThisPastMonth = async (
  timestamp: number,
  alertingTx: { transactionHash: string; ognBoughtUSD: number },
) => {
  const timestampGte = dayjs(timestamp).subtract(1, 'month').toISOString()
  const timestampLt = dayjs(timestamp).add(1, 'minute').toISOString()

  return getBuybackSumForTimePeriod({
    timestampGte,
    timestampLt,
    alertingTx,
  })
}
