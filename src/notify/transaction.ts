import { Context, Trace, Transaction } from '../types'
import { getAddressesPyName } from '../utils/addresses/names'
import { shortenHex } from '../utils/formatHex'
import { formatJson } from '../utils/formatJson'
import { transactionLink } from '../utils/links'
import { md } from '../utils/md'
import { NotifyTarget, Severity, Topic } from './const'
import { notifyDiscord } from './discord'
import { notifyOncall } from './oncall'

export const notifyForTransaction = ({
  ctx,
  topic,
  severity = 'low',
  name,
  transaction,
  notifyTarget,
}: {
  ctx: Context
  topic: Topic
  severity?: Severity
  name?: string
  transaction: Transaction
  notifyTarget?: NotifyTarget
}) => {
  let fromName = getAddressesPyName(transaction.from)
  let toName = getAddressesPyName(transaction.to)

  const id = `${transaction.hash}`
  console.log('Sending notification', { id, topic, severity, name, transaction })

  notifyDiscord({
    id,
    topic,
    severity,
    title: `${name ?? topic} - ${shortenHex(transaction.hash)}`,
    description: md.code(
      formatJson({
        'Block - Time': `${transaction.block.height} - ${new Date(transaction.block.timestamp).toISOString()}`,
        Transaction: transaction.hash,
        From: `${transaction.from} (${fromName ? ` (${fromName})` : ''}`,
        To: `${transaction.to} (${toName ? ` (${toName})` : ''}`,
        Input: transaction.input,
        Value: transaction.value,
        Diffs: transaction.stateDiffs,
      }),
    ),
    links: transaction.hash
      ? {
          tx: transactionLink(transaction.hash, ctx.chain),
        }
      : undefined,
    mentions: notifyTarget?.discordMentions,
  })
  if (severity === 'high' || severity === 'critical') {
    notifyOncall(id, {
      topic,
      severity,
      name,
      transaction,
    })
  }
}
