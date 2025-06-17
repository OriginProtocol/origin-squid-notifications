import { compact } from 'lodash'
import { formatUnits } from 'viem'

import * as erc20Abi from '@abi/erc20'
import { Context, logFilter } from '@originprotocol/squid-utils'

import { OGN_ADDRESS, OGN_REWARDS_SOURCE_ADDRESS, XOGN_ADDRESS, buybacks } from './addresses'
import { getAddressName } from './addresses/names'
import { convertToUsd } from './pricing'

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
