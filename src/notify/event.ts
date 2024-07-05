import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../types'
import { NotifyTarget, Severity, Topic } from './const'
import { eventRenderers } from './event-renderers'

const uniqueEventsFired = new Set<string>()

export const notifyForEvent = async (params: {
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
  console.log('Sending notification', params)
  const renderer = eventRenderers.get(params.event.topic) ?? eventRenderers.get('default')
  return renderer?.(params)
}
