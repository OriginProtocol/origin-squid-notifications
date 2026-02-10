import { Context, Transaction } from '@originprotocol/squid-utils'

import { getAddressesPyName } from '../utils/addresses/names'
import { shortenHex } from '../utils/formatHex'
import { formatJson } from '../utils/formatJson'
import { transactionLink } from '../utils/links'
import { md } from '../utils/md'
import { NotifyTarget, Severity, Topic } from './const'
import { notifyDiscord } from './discord'
import { notifyLoki } from './loki'
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

  const id = `${transaction.block.height}:${transaction.transactionIndex}`
  console.log('Sending notification', { id, topic, severity, name, transaction })

  notifyDiscord({
    sortId: id,
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
  notifyLoki({
    timestamp: transaction.block.timestamp,
    sortId: id,
    labels: {
      topic,
      severity,
      chain: String(ctx.chain.id),
      notification_type: 'transaction',
      address: transaction.from,
    },
    entry: {
      timestamp: new Date(transaction.block.timestamp).toISOString(),
      product: topic,
      severity,
      chain: ctx.chain.id,
      notification_type: 'transaction',
      processor_name: name,
      from: transaction.from,
      from_name: fromName,
      to: transaction.to,
      to_name: toName,
      block: transaction.block.height,
      tx_hash: transaction.hash,
      tx_index: transaction.transactionIndex,
      value: String(transaction.value),
      input: transaction.input,
    },
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
