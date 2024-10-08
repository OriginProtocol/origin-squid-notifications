import { AbiEvent } from '@subsquid/evm-abi'

import { Block, Context, Log } from '../../types'
import { NotifyTarget, Severity, Topic } from '../const'
import { notifyOncall } from '../oncall'

const uniqueEventsFired = new Set<string>()
export type EventRendererParams = Parameters<typeof notifyForEvent>[0]
export type EventRenderer = (params: EventRendererParams) => Promise<void> | void
const eventRenderers = new Map<string, (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>>()
export const registerEventRenderer = (
  topic: string,
  fn: (params: Parameters<typeof notifyForEvent>[0]) => Promise<void>,
) => {
  eventRenderers.set(topic, fn)
  return fn
}

export const notifyForEvent = async (params: {
  ctx: Context
  topic: Topic
  severity?: Severity
  name?: string
  eventName: string
  event: AbiEvent<any>
  block: Block
  log: Log
  notifyTarget?: NotifyTarget
  renderer?: EventRenderer
}) => {
  if (process.env.BLOCK_FROM && process.env.RESTRICT_NOTIFICATIONS !== 'false') {
    if (uniqueEventsFired.has(params.log.topics[0])) return
    else uniqueEventsFired.add(params.log.topics[0])
  }
  if (!params.ctx.isEventHandled(params.log)) {
    params.ctx.markEventHandled(params.log)
    console.log('Sending notification for event', params.eventName)
    const renderer = params.renderer ?? eventRenderers.get(params.event.topic) ?? eventRenderers.get('default')
    renderer?.(params)
    if (params.severity === 'high' || params.severity === 'critical') {
      notifyOncall(params.log.id, {
        topic: params.topic,
        severity: params.severity,
        name: params.name,
        eventName: params.eventName,
        log: params.log,
        data: params.event.decode(params.log),
      })
    }
  }
}
