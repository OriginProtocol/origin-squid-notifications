import { event } from '@subsquid/evm-abi'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { NotifyTarget, Severity, Topic } from '../../notify/const'
import { notifyForEvent } from '../../notify/event'
import { Context } from '../../types'
import { logFilter } from '../../utils/logFilter'
import { createProcessor } from '../processors'

export type EventProcessorParams = Parameters<typeof createEventProcessor>[0]
export const createEventProcessor = <EventName extends string>({
  name,
  chainId,
  topic,
  tracks,
}: {
  name: string
  chainId: number
  topic: Topic
  tracks: {
    address: string[]
    events: Record<EventName, ReturnType<typeof event>>
    includedEvents?: EventName[]
    excludedEvents?: EventName[]
    topic1?: string[]
    topic2?: string[]
    topic3?: string[]
    severity?: Severity
    notifyTarget?: NotifyTarget
  }[]
}) => {
  const trackData = tracks.map((track) => {
    const { address, events, includedEvents, excludedEvents, topic1, topic2, topic3 } = track
    const entries = (Object.entries(events) as [EventName, ReturnType<typeof event>][]).filter(
      ([eventName]) =>
        (!includedEvents || includedEvents.includes(eventName)) &&
        (!excludedEvents || !excludedEvents.includes(eventName)),
    )

    const filter = logFilter({
      address,
      topic0: entries.map(([n, e]) => e.topic),
      topic1,
      topic2,
      topic3,
    })
    return { track, filter, entries }
  })

  createProcessor({
    name,
    topic,
    chainId,
    events: trackData.map((d) => ({
      address: d.filter.value.address,
      topic0: d.filter.value.topic0?.map((topic0, i) => `${d.entries[i][0]} | ${topic0.slice(0, 10)}`),
      topic1: d.filter.value.topic1,
      topic2: d.filter.value.topic2,
      topic3: d.filter.value.topic3,
      severity: d.track.severity,
      notifyTarget: d.track.notifyTarget,
    })),
    setup: (processor: EvmBatchProcessor) => {
      for (const { filter } of trackData) {
        processor.addLog(filter.value)
      }
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const log of block.logs) {
          for (const {
            filter,
            entries,
            track: { severity, notifyTarget },
          } of trackData) {
            if (filter.matches(log)) {
              const entry = entries.find(([n, e]) => e.topic === log.topics[0])
              if (entry) {
                const [eventName, event] = entry
                await notifyForEvent({
                  name,
                  eventName,
                  log,
                  event,
                  topic,
                  severity,
                  notifyTarget,
                })
              }
            }
          }
        }
      }
    },
  })
}
