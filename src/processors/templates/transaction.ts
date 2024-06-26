import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { Topic } from '../../notify/discord'
import { Context } from '../../types'
import { transactionFilter } from '../../utils/transactionFilter'
import { createProcessor } from '../processors'

export const createTransactionProcessor = ({
  name,
  description,
  chainId,
  from,
  to,
  sighash,
  topic,
}: {
  name: string
  description: string
  chainId: number
  from?: string[]
  to?: string[]
  sighash?: string[]
  topic: Topic
}) => {
  const filter = transactionFilter({
    from,
    to,
    sighash,
  })

  createProcessor({
    name,
    description,
    chainId,
    setup: (processor: EvmBatchProcessor) => {
      processor.addTransaction(filter.value)
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const transaction of block.transactions) {
          if (filter.matches(transaction)) {
            // TODO: Do something!
            throw new Error('Not implemented!')
          }
        }
      }
    },
  })
}
