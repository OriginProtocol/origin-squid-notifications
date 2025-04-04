import { Context, Trace } from '@originprotocol/squid-utils'

import { getAddressesPyName } from '../utils/addresses/names'
import { formatJson } from '../utils/formatJson'
import { transactionLink } from '../utils/links'
import { md } from '../utils/md'
import { NotifyTarget, Severity, Topic } from './const'
import { notifyDiscord } from './discord'
import { notifyOncall } from './oncall'

const uniqueTracesFired = new Set<string>()

export interface NotifyForTraceInput {
  ctx: Context
  topic: Topic
  severity?: Severity
  name?: string
  functionName?: string
  functionData?: unknown
  trace: Trace
  notifyTarget?: NotifyTarget
}

export const notifyForTrace = async ({
  ctx,
  topic,
  severity = 'low',
  name,
  functionName,
  functionData,
  trace,
  notifyTarget,
}: NotifyForTraceInput) => {
  let from = trace.type === 'call' ? trace.action.from : undefined
  let to = trace.type === 'call' ? trace.action.to : undefined
  let fromName = getAddressesPyName(from)
  let toName = getAddressesPyName(to)

  if (process.env.BLOCK_FROM) {
    const uniqueTracesFiredId =
      trace.type === 'call' ? trace.action.sighash : trace.transaction?.hash ?? trace.block.hash
    if (uniqueTracesFired.has(uniqueTracesFiredId) || uniqueTracesFired.size > 5) return
    else uniqueTracesFired.add(uniqueTracesFiredId)
  }
  const id = `${trace.block.height}:${trace.transactionIndex}:${JSON.stringify(trace.traceAddress)}`
  console.log('Sending notification', { id, topic, severity, name, functionName, functionData, trace })

  notifyDiscord({
    sortId: id,
    topic,
    severity,
    title: `${name ?? topic} - ${functionName ?? trace.type}`,
    description: md.code(
      formatJson({
        'Block - Time': `${trace.block.height} - ${new Date(trace.block.timestamp).toISOString()}`,
        ...(trace.type !== 'suicide'
          ? {
              From: `${from}${fromName ? ` (${fromName})` : ''}`,
              To: `${to}${toName ? ` (${toName})` : ''}`,
            }
          : {
              Address: trace.action.address,
              'Refund Address': trace.action.refundAddress,
              Balance: trace.action.balance,
            }),
        Transaction: trace.transaction?.hash,
        Error: trace.error,
        Function: functionName,
        'Function Data': functionData,
      }),
    ),
    links: trace.transaction?.hash
      ? {
          tx: transactionLink(trace.transaction?.hash, ctx.chain),
        }
      : undefined,
    mentions: notifyTarget?.discordMentions,
  })
  if (severity === 'high' || severity === 'critical') {
    notifyOncall(id, {
      topic,
      severity,
      name,
      trace,
      functionName,
      functionData,
    })
  }
}
