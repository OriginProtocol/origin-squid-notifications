import { Block, Context, Log, useProcessorState } from '@originprotocol/squid-utils'
import { AbiEvent } from '@subsquid/evm-abi'
import { Codec } from '@subsquid/evm-codec'
import { transactionLink } from '@utils/links'

import { NotifyTarget, Severity, Topic } from '../const'
import { notifyOncall } from '../oncall'
import { renderDiscordEmbed } from './renderers/utils'

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

type EventArgs = {
  [key: string]: Codec<any> & { indexed?: boolean }
}

export const registerDiscordRenderer = <const T extends EventArgs>(
  event: AbiEvent<T>,
  render: (
    params: Parameters<Parameters<typeof registerEventRenderer>[1]>[0] & {
      data: ReturnType<typeof event.decode>
    },
  ) => Promise<Omit<Parameters<typeof renderDiscordEmbed>[0], 'sortId' | 'topic' | 'severity' | 'titleUrl'>>,
) => {
  registerEventRenderer(event.topic, async (params) => {
    const { log } = params
    const sortId = `${log.block.height}:${log.transactionIndex}:${log.logIndex}`
    const data = event.decode(log)
    const renderData = await render({ ...params, data })
    renderDiscordEmbed({
      ...renderData,
      sortId,
      topic: params.topic,
      severity: params.severity,
      titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
    })
  })
}

export const useEventState = (ctx: Context) => {
  const state = useProcessorState(ctx, 'eventState', {
    eventsHandled: new Set<string>(),
    isEventHandled: (log: Log) => state.eventsHandled.has(log.topics[0]),
    markEventHandled: (log: Log) => state.eventsHandled.add(log.topics[0]),
  })[0]
  return state
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
  const eventState = useEventState(params.ctx)
  if (!eventState.isEventHandled(params.log)) {
    eventState.markEventHandled(params.log)
    console.log('Sending notification for event', params.eventName)
    const renderer = params.renderer ?? eventRenderers.get(params.event.topic) ?? eventRenderers.get('default')
    if (renderer) {
      await renderer(params)
    }
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
