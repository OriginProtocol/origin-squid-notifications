import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../types'
import { getAddressesPyName } from '../utils/addresses/addresses-py'
import { formatJson } from '../utils/formatJson'
import { md } from '../utils/md'
import { NotifyTarget, Severity, Topic } from './const'
import { notifyDiscord } from './discord'

const uniqueEventsFired = new Set<string>()

export const notifyForEvent = async ({
  topic,
  severity = 'low',
  name,
  eventName,
  event,
  log,
  notifyTarget,
}: {
  topic: Topic
  severity?: Severity
  name?: string
  eventName: string
  event: AbiEvent<any>
  log: Log
  notifyTarget?: NotifyTarget
}) => {
  const data = event.decode(log)
  let addressName = getAddressesPyName(log.address)

  if (process.env.BLOCK_FROM) {
    if (uniqueEventsFired.has(log.topics[0])) return
    else uniqueEventsFired.add(log.topics[0])
  }

  console.log('Sending notification', { topic, severity, name, eventName, event, log })

  return notifyDiscord({
    topic,
    severity,
    title: `${name ?? topic} - ${eventName}`,
    description: md.construct(
      md.code(
        md.blockTable([
          ['Block - Time', `${log.block.height} - ${new Date(log.block.timestamp).toISOString()}`],
          ['Address', `${log.address}${addressName ? ` (${addressName})` : ''}`],
          ['Transaction', log.transactionHash],
          ['Event', eventName],
        ]),
        'Event Data:',
        md.indent(formatJson(data)),
      ),
    ),
    links: {
      tx: `https://etherscan.io/tx/${log.transactionHash}`,
    },
    mentions: notifyTarget?.discordMentions,
  })
}
