import { event } from '@subsquid/evm-abi'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { createProcessor } from '..'
import { NotifyTarget, Severity, Topic } from '../../notify/const'
import { EventRenderer, notifyForEvent } from '../../notify/event'
import { Context } from '../../types'
import { logFilter } from '../../utils/logFilter'

export type EventProcessorParams = Parameters<typeof createEventProcessor>[0]
export const createEventProcessor = ({
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
    events: Record<string, ReturnType<typeof event>>
    topic1?: string[]
    topic2?: string[]
    topic3?: string[]
    severity?: Severity
    notifyTarget?: NotifyTarget
    renderers?: Record<string, EventRenderer>
  }[]
}) => {
  const trackData = tracks.map((track) => {
    const { address, events, topic1, topic2, topic3 } = track
    const entries = Object.entries(events)
    const filter = logFilter({
      address,
      topic0: entries.map(([, e]) => e.topic),
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
            track: { severity, notifyTarget, renderers },
          } of trackData) {
            if (filter.matches(log)) {
              const entry = entries.find(([, e]) => e.topic === log.topics[0])
              if (entry) {
                const [eventName, event] = entry
                await notifyForEvent({
                  ctx,
                  name,
                  eventName,
                  block,
                  log,
                  event,
                  topic,
                  severity,
                  notifyTarget,
                  renderer: renderers?.[eventName] ?? renderers?.['default'],
                })
              }
            }
          }
        }
      }
    },
  })
}
