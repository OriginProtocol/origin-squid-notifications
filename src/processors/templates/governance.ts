import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as governanceAbi from '../../abi/governance'
import { Topic } from '../../notify/discord'
import { notifyForEvent } from '../../notify/event'
import { Context } from '../../types'
import { logFilter } from '../../utils/logFilter'
import { createProcessor } from '../processors'

const events = Object.entries(governanceAbi.events).filter(([n]) => !n.startsWith('VoteCast'))

export const createGovernanceProcessor = ({
  name,
  chainId,
  address,
  topic,
}: {
  name: string
  chainId: number
  address: string
  topic: Topic
}) => {
  const filter = logFilter({
    address: [address],
    topic0: events.map(([n, e]) => e.topic),
  })

  createProcessor({
    name,
    description: `Notify governance events for ${address}. (excludes VoteCast* events)`,
    chainId,
    setup: (processor: EvmBatchProcessor) => {
      processor.addLog(filter.value)
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const log of block.logs) {
          if (filter.matches(log)) {
            const entry = events.find(([n, e]) => e.topic === log.topics[0])
            if (entry) {
              const [eventName, event] = entry
              await notifyForEvent({ topic, name, eventName, log, event })
            }
          }
        }
      }
    },
  })
}
