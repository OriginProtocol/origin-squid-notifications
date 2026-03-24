import { Context, Trace } from '@originprotocol/squid-utils'

import { getAddressesPyName } from '../utils/addresses/names'
import { transactionLink } from '../utils/links'
import { NotifyTarget, Severity, Topic, severityColors } from './const'
import { notifyDiscord } from './discord'
import { explorerUrl, formatAddress, formatValue } from './format'
import { notifyLoki } from './loki'
import { checkAndLogNotification } from './notification-log'
import { notifyOncall } from './oncall'
import { getNotificationRuntimeContext } from './runtime'

export interface NotifyForTraceInput {
  ctx: Context
  topic: Topic
  severity?: Severity
  name?: string
  functionName?: string
  functionData?: unknown
  trace: Trace
  notifyTarget?: NotifyTarget
  discordExcludeFilter?: (input: NotifyForTraceInput) => boolean
  renderer?: (input: NotifyForTraceInput) => Promise<void> | void
}

export const notifyForTrace = async (input: NotifyForTraceInput) => {
  const {
    ctx,
    topic,
    severity = 'low',
    name,
    functionName,
    functionData,
    trace,
    notifyTarget,
    discordExcludeFilter,
  } = input
  let from = trace.type === 'call' ? trace.action.from : undefined
  let to = trace.type === 'call' ? trace.action.to : undefined
  let fromName = getAddressesPyName(from)
  let toName = getAddressesPyName(to)

  const runtime = getNotificationRuntimeContext()
  const recordId = `${ctx.chain.id}:${trace.block.height}:${trace.transactionIndex}:${JSON.stringify(trace.traceAddress)}`
  if (!runtime.skipDedup) {
    const isDuplicate = await checkAndLogNotification({
      ctx,
      recordId,
      recordType: 'trace',
      processor: name,
      chainId: ctx.chain.id,
      blockNumber: trace.block.height,
    })
    if (isDuplicate) return
  }

  const id = `${trace.block.height}:${trace.transactionIndex}:${JSON.stringify(trace.traceAddress)}`

  const excludeFromDiscord = discordExcludeFilter && discordExcludeFilter(input)

  if (!runtime.skipLoki) {
    notifyLoki({
      timestamp: trace.block.timestamp,
      sortId: id,
      labels: {
        topic,
        severity,
        chain: String(ctx.chain.id),
        notification_type: 'trace',
        notification_name: functionName,
        address: to ?? trace.transaction?.to ?? '',
        address_name: toName ?? getAddressesPyName(trace.transaction?.to),
      },
      entry: {
        timestamp: new Date(trace.block.timestamp).toISOString(),
        product: topic,
        severity,
        chain: ctx.chain.id,
        notification_type: 'trace',
        processor_name: name,
        function_name: functionName,
        from,
        from_name: fromName,
        to,
        to_name: toName,
        block: trace.block.height,
        tx_hash: trace.transaction?.hash,
        tx_index: trace.transactionIndex,
        trace_address: trace.traceAddress,
        error: trace.error,
        function_data: functionData,
      },
    })
  }

  if (excludeFromDiscord) return

  if (input.renderer) {
    await input.renderer(input)
    if (!runtime.skipOncall && (severity === 'high' || severity === 'critical')) {
      notifyOncall(id, {
        topic,
        severity,
        name,
        trace,
        functionName,
        functionData,
      })
    }
    return
  }

  const explorer = explorerUrl(ctx.chain)
  const timestamp = new Date(trace.block.timestamp)
  const txUrl = trace.transaction?.hash ? transactionLink(trace.transaction.hash, ctx.chain) : undefined

  // Build embed fields
  const fields: { name: string; value: string; inline: boolean }[] = []

  if (trace.type === 'suicide') {
    // Suicide trace
    if (trace.action.address) {
      fields.push({ name: 'Address', value: formatAddress(trace.action.address, ctx.chain), inline: true })
    }
    if (trace.action.refundAddress) {
      fields.push({ name: 'Refund To', value: formatAddress(trace.action.refundAddress, ctx.chain), inline: true })
    }
    if (trace.action.balance) {
      fields.push({ name: 'Balance', value: formatValue(trace.action.balance), inline: true })
    }
  } else {
    // Call/create trace
    if (from) {
      fields.push({ name: 'From', value: formatAddress(from, ctx.chain), inline: true })
    }
    if (to) {
      fields.push({ name: 'To', value: formatAddress(to, ctx.chain), inline: true })
    }
  }

  // Block + Time
  fields.push({
    name: 'Block',
    value: `[${trace.block.height.toLocaleString('en-US')}](${explorer}/block/${trace.block.height})`,
    inline: true,
  })
  fields.push({
    name: 'Time',
    value: `<t:${Math.floor(timestamp.getTime() / 1000)}:R>`,
    inline: true,
  })

  // Error field
  if (trace.error) {
    fields.push({ name: 'Error', value: `\`${trace.error}\``, inline: false })
  }

  // Decoded function data
  if (functionData && typeof functionData === 'object' && !Array.isArray(functionData)) {
    for (const [key, value] of Object.entries(functionData as Record<string, unknown>)) {
      const formatted = formatValue(value, key, ctx.chain)
      const isLong = formatted.length > 40
      fields.push({ name: key, value: formatted, inline: !isLong })
    }
  } else if (functionData !== undefined && functionData !== null) {
    fields.push({ name: 'Data', value: formatValue(functionData, undefined, ctx.chain), inline: false })
  }

  // Trim to Discord's 25-field limit
  if (fields.length > 25) fields.length = 25

  // Title
  const title = trace.error
    ? `${name ?? topic} - ${functionName ?? trace.type} (FAILED)`
    : `${name ?? topic} - ${functionName ?? trace.type}`

  console.log('Sending notification', { id, topic, severity, name, functionName })
  notifyDiscord({
    sortId: id,
    topic,
    severity,
    embeds: [
      {
        color: severityColors[severity],
        title,
        url: txUrl,
        fields,
        footer: trace.transaction?.hash
          ? { text: `tx ${trace.transaction.hash.slice(0, 10)}...${trace.transaction.hash.slice(-6)}` }
          : undefined,
      },
    ],
    mentions: notifyTarget?.discordMentions,
  })
  if (!runtime.skipOncall && (severity === 'high' || severity === 'critical')) {
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
