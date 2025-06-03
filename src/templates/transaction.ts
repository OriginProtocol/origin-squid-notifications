import { Context, transactionFilter } from '@originprotocol/squid-utils'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { NotifyTarget, Severity, Topic } from '../notify/const'
import { notifyForTransaction } from '../notify/transaction'
import { createProcessor } from '../topics'

export type TransactionProcessorParams = Parameters<typeof createTransactionProcessor>[0]
export const createTransactionProcessor = ({
  name,
  chainId,
  from,
  to,
  sighash,
  severity,
  notifyTarget,
  topic,
}: {
  name: string
  chainId: number
  from?: string[]
  to?: string[]
  sighash?: string[]
  severity?: Severity
  notifyTarget?: NotifyTarget
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
            await notifyForTransaction({ ctx, name, topic, severity, transaction, notifyTarget })
          }
        }
      }
    },
  })
}
