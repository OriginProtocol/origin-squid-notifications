import { AbiEvent } from '@subsquid/evm-abi'

import { Context, Log } from '../../types'
import { NotifyTarget, Severity, Topic } from '../const'

const uniqueEventsFired = new Set<string>()
const eventRenderers = new Map<string, (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>>()
export const registerEventRenderer = (
  topic: string,
  fn: (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>,
) => {
  eventRenderers.set(topic, fn)
}

export const notifyForEvent = async (params: {
  ctx: Context
  topic: Topic
  severity?: Severity
  name?: string
  eventName: string
  event: AbiEvent<any>
  log: Log
  notifyTarget?: NotifyTarget
}) => {
  if (process.env.BLOCK_FROM) {
    if (uniqueEventsFired.has(params.log.topics[0])) return
    else uniqueEventsFired.add(params.log.topics[0])
  }
  if (!params.ctx.isEventHandled(params.log)) {
    params.ctx.markEventHandled(params.log)
    console.log('Sending notification for event', params.eventName)
    const renderer = eventRenderers.get(params.event.topic) ?? eventRenderers.get('default')
    return renderer?.(params)
  }
}
