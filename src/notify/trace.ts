import { AbiEvent } from '@subsquid/evm-abi'

import { Log, Trace } from '../types'
import { getAddressesPyName } from '../utils/addresses/addresses-py'
import { formatJson } from '../utils/formatJson'
import { md } from '../utils/md'
import { Severity, Topic, notifyDiscord } from './discord'

const uniqueTracesFired = new Set<string>()

export const notifyForTrace = async ({
  topic,
  severity = 'info',
  name,
  functionName,
  functionData,
  trace,
}: {
  topic: Topic
  severity?: Severity
  name?: string
  functionName?: string
  functionData?: unknown
  trace: Trace
}) => {
  let from = trace.type === 'call' ? trace.action.from : undefined
  let to = trace.type === 'call' ? trace.action.to : undefined
  let fromName = getAddressesPyName(from)
  let toName = getAddressesPyName(to)

  if (process.env.BLOCK_FROM) {
    const id = trace.type === 'call' ? trace.action.sighash : trace.transaction?.hash ?? trace.block.hash
    if (uniqueTracesFired.has(id) || uniqueTracesFired.size > 5) return
    else uniqueTracesFired.add(id)
  }

  console.log('Sending notification', { topic, severity, name, functionName, functionData, trace })

  return notifyDiscord({
    topic,
    severity,
    title: `${name ?? topic} - ${functionName ?? trace.type}`,
    description: md.construct(
      md.code(
        md.blockTable([
          ['Block - Time', `${trace.block.height} - ${new Date(trace.block.timestamp).toISOString()}`],
          from ? ['From', `${from}${fromName ? ` (${fromName})` : ''}`] : undefined,
          to ? ['To', `${to}${toName ? ` (${toName})` : ''}`] : undefined,
          ['Transaction', trace.transaction?.hash],
          trace.error ? ['Error', trace.error] : undefined,
          functionName ? ['Function', functionName] : undefined,
        ]),
        ...(functionData ? ['Function Data:', md.indent(formatJson(functionData))] : []),
      ),
    ),
    links: trace.transaction?.hash
      ? {
          tx: `https://etherscan.io/tx/${trace.transaction?.hash}`,
        }
      : undefined,
  })
}
