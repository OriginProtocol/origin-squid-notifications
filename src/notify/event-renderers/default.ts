import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../../types'
import { getAddressesPyName } from '../../utils/addresses/addresses-py'
import { formatJson } from '../../utils/formatJson'
import { transactionLink } from '../../utils/links'
import { md } from '../../utils/md'
import { NotifyTarget, Severity, Topic } from '../const'
import { notifyDiscord } from '../discord'
import { registerEventRenderer } from './renderers'

registerEventRenderer(
  ['default'],
  async ({
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
        tx: transactionLink(log.transactionHash),
      },
      mentions: notifyTarget?.discordMentions,
    })
  },
)
