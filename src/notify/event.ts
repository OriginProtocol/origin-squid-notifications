import { AbiEvent } from '@subsquid/evm-abi'

import { Log } from '../types'
import { formatJson } from '../utils/formatJson'
import { md } from '../utils/md'
import { Topic, notify } from './discord'

export const notifyForEvent = async ({
  topic,
  name,
  event,
  log,
}: {
  topic: Topic
  name: string
  event: AbiEvent<any>
  log: Log
}) => {
  const data = event.decode(log)
  return notify({
    topic,
    title: `OGN - ${name}`,
    description: md.construct(
      md.code(
        md.blockTable([
          ['Transaction', log.transactionHash],
          ['Event', name],
        ]),
        'Event Data:',
        md.indent(formatJson(data)),
      ),
    ),
  })
}
