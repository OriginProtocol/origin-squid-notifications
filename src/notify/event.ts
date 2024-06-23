import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../types'
import { formatJson } from '../utils/formatJson'
import { md } from '../utils/md'
import { Topic, notifyDiscord } from './discord'

export const notifyForEvent = async ({
  topic,
  name,
  eventName,
  event,
  log,
}: {
  topic: Topic
  name?: string
  eventName: string
  event: AbiEvent<any>
  log: Log
}) => {
  const data = event.decode(log)
  return notifyDiscord({
    topic,
    title: `${name ?? topic} - ${eventName}`,
    description: md.construct(
      md.code(
        md.blockTable([
          ['Transaction', log.transactionHash],
          ['Event', eventName],
        ]),
        'Event Data:',
        md.indent(formatJson(data)),
      ),
    ),
  })
}
