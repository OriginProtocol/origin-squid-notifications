import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { createProcessor } from '..'
import { Topic } from '../../notify/const'
import { Context } from '../../types'
import { transactionFilter } from '../../utils/transactionFilter'

export type TransactionProcessorParams = Parameters<typeof createTransactionProcessor>[0]
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
    chainId,
    topic,
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
