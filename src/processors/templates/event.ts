import { event } from '@subsquid/evm-abi'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { Topic } from '../../notify/discord'
import { notifyForEvent } from '../../notify/event'
import { Context } from '../../types'
import { logFilter } from '../../utils/logFilter'
import { createProcessor } from '../processors'

export const createEventProcessor = <EventName extends string>({
  name,
  description,
  chainId,
  address,
  topic,
  events,
  includedEvents,
  excludedEvents,
  topic1,
  topic2,
  topic3,
}: {
  name: string
  description: string
  chainId: number
  address: string[]
  topic: Topic
  events: Record<EventName, ReturnType<typeof event>>
  includedEvents?: EventName[]
  excludedEvents?: EventName[]
  topic1?: string[]
  topic2?: string[]
  topic3?: string[]
}) => {
  const eventEntries = (Object.entries(events) as [EventName, ReturnType<typeof event>][]).filter(
    ([eventName]) =>
      (!includedEvents || includedEvents.includes(eventName)) &&
      (!excludedEvents || !excludedEvents.includes(eventName)),
  )

  const filter = logFilter({
    address,
    topic0: eventEntries.map(([n, e]) => e.topic),
    topic1,
    topic2,
    topic3,
  })

  createProcessor({
    name,
    description,
    chainId,
    setup: (processor: EvmBatchProcessor) => {
      processor.addLog(filter.value)
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const log of block.logs) {
          if (filter.matches(log)) {
            const entry = eventEntries.find(([n, e]) => e.topic === log.topics[0])
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
