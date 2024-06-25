import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../types'
import { getAddressesPyName } from '../utils/addresses/addresses-py'
import { formatJson } from '../utils/formatJson'
import { md } from '../utils/md'
import { Topic, notifyDiscord } from './discord'

let notificationCount = 0

export const notifyForEvent = async ({
  topic,
  severity = 'info',
  name,
  eventName,
  event,
  log,
}: {
  topic: Topic
  severity?: 'info' | 'warning' | 'error' | 'success'
  name?: string
  eventName: string
  event: AbiEvent<any>
  log: Log
}) => {
  const data = event.decode(log)
  let addressName = getAddressesPyName(log.address)
  if (addressName) addressName = `(${addressName})`

  notificationCount += 1
  if (notificationCount > 5 && process.env.BLOCK_FROM) process.exit(1)

  return notifyDiscord({
    topic,
    severity,
    title: `${name ?? topic} - ${eventName}`,
    description: md.construct(
      md.code(
        md.blockTable([
          ['Address', `${log.address} ${addressName}`],
          ['Transaction', log.transactionHash],
          ['Event', eventName],
        ]),
        'Event Data:',
        md.indent(formatJson(data)),
      ),
    ),
  })
}
