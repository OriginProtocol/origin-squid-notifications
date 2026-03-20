import { type AbiEvent as ViemAbiEvent, type AbiFunction as ViemAbiFunction, encodeAbiParameters, encodeEventTopics } from 'viem'
import { base, mainnet, sonic } from 'viem/chains'

import { findMatchingEventRules, findMatchingTraceRules, getRenderers, refreshAlertConfig, type AlertRule, type RendererRecord } from '../alert-config'
import { abiRegistry } from '../utils/abi-registry'
import { createEventTemplateRenderer, createTraceTemplateRenderer, isTemplateRenderer } from '../notify/template'
import { notifyForEvent } from '../notify/event'
import { notifyForTrace } from '../notify/trace'
import { runInTestNotificationContext } from '../notify/runtime'
import { getSquidDbPool } from './db'

let initialized = false

async function ensureInitialized() {
  if (initialized) return
  await abiRegistry.loadFromDb()
  initialized = true
}

type EventRecordRow = {
  id: string
  timestamp: Date
  block_number: number
  chain_id: number
  contract_address: string
  topic0: string
  topic1: string | null
  topic2: string | null
  topic3: string | null
  data: string | null
  tx_hash: string
  tx_index: number
  log_index: number
}

type TraceRecordRow = {
  id: string
  timestamp: Date
  block_number: number
  chain_id: number
  tx_hash: string | null
  tx_index: number | null
  type: string
  from_address: string | null
  to_address: string | null
  input: string | null
  output: string | null
  sighash: string | null
  trace_address: number[]
  error: string | null
  revert_reason: string | null
}

export async function sendRendererTestAlert(rendererId: string, overrideData?: Record<string, unknown>) {
  await ensureInitialized()
  await refreshAlertConfig()
  const renderers = await getRenderers()
  const renderer = renderers.find((item) => item.id === rendererId)
  if (!renderer) {
    throw new Error(`Renderer "${rendererId}" not found`)
  }
  if (!isTemplateRenderer(renderer)) {
    throw new Error('Only template renderers can be test-sent right now')
  }

  if (renderer.matchType === 'event') {
    const record = (await loadRecentMatchingEvent(renderer)) ?? mockEventRecord(renderer)
    await sendEventRendererTest(renderer, record, overrideData)
    return { rendererId, matchType: 'event', recordId: record.id, txHash: record.tx_hash }
  }

  const record = (await loadRecentMatchingTrace(renderer)) ?? mockTraceRecord(renderer)
  await sendTraceRendererTest(renderer, record, overrideData)
  return { rendererId, matchType: 'trace', recordId: record.id, txHash: record.tx_hash }
}

async function loadRecentMatchingEvent(renderer: RendererRecord): Promise<EventRecordRow | null> {
  const conditions = ['chain_id = $1']
  const values: unknown[] = [renderer.chainId]
  let index = values.length + 1

  if (renderer.topic0) {
    conditions.push(`topic0 = $${index++}`)
    values.push(renderer.topic0)
  }
  if (renderer.contractAddresses?.length) {
    conditions.push(`contract_address = ANY($${index++})`)
    values.push(renderer.contractAddresses)
  }

  const query = `
    SELECT id, timestamp, block_number, chain_id, contract_address, topic0, topic1, topic2, topic3, data, tx_hash, tx_index, log_index
    FROM event_record
    WHERE ${conditions.join(' AND ')}
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT 1
  `

  const { rows } = await getSquidDbPool().query(query, values)
  return (rows[0] as EventRecordRow | undefined) ?? null
}

async function loadSiblingEvents(record: EventRecordRow): Promise<EventRecordRow[]> {
  const { rows } = await getSquidDbPool().query(
    `
      SELECT id, timestamp, block_number, chain_id, contract_address, topic0, topic1, topic2, topic3, data, tx_hash, tx_index, log_index
      FROM event_record
      WHERE chain_id = $1 AND tx_hash = $2
      ORDER BY log_index ASC
    `,
    [record.chain_id, record.tx_hash],
  )
  return rows as EventRecordRow[]
}

async function loadRecentMatchingTrace(renderer: RendererRecord): Promise<TraceRecordRow | null> {
  const conditions = ['chain_id = $1']
  const values: unknown[] = [renderer.chainId]
  let index = values.length + 1

  if (renderer.sighash) {
    conditions.push(`sighash = $${index++}`)
    values.push(renderer.sighash)
  }
  if (renderer.contractAddresses?.length) {
    conditions.push(`to_address = ANY($${index++})`)
    values.push(renderer.contractAddresses)
  }

  const query = `
    SELECT id, timestamp, block_number, chain_id, tx_hash, tx_index, type, from_address, to_address, input, output, sighash, trace_address, error, revert_reason
    FROM trace_record
    WHERE ${conditions.join(' AND ')}
    ORDER BY block_number DESC, tx_index DESC NULLS LAST
    LIMIT 1
  `
  const { rows } = await getSquidDbPool().query(query, values)
  return (rows[0] as TraceRecordRow | undefined) ?? null
}

async function sendEventRendererTest(renderer: RendererRecord, record: EventRecordRow, overrideData?: Record<string, unknown>) {
  const realEvent = abiRegistry.getEvent(record.topic0)
  if (!realEvent) {
    throw new Error(`No ABI decoder found for topic0 ${record.topic0}`)
  }
  const event = overrideData
    ? { topic: realEvent.topic, decode: () => overrideData }
    : realEvent

  const isMock = record.id.startsWith('mock:')
  const siblings = isMock ? [record] : await loadSiblingEvents(record)
  const chain = getChain(record.chain_id)
  const matchingRule = pickMatchingEventRule(record)
  const transactionLogs = siblings.map((item) => ({
    id: item.id,
    address: item.contract_address,
    topics: [item.topic0, item.topic1, item.topic2, item.topic3].filter(Boolean),
    data: item.data ?? '0x',
    logIndex: item.log_index,
    transactionIndex: item.tx_index,
    transactionHash: item.tx_hash,
    block: {
      height: item.block_number,
      timestamp: new Date(item.timestamp).getTime(),
    },
  }))

  const targetLog = transactionLogs.find((item) => item.id === record.id)
  if (!targetLog) {
    throw new Error(`Could not reconstruct matched log ${record.id}`)
  }

  const log = {
    ...targetLog,
    address: record.contract_address,
    transaction: {
      hash: record.tx_hash,
      logs: transactionLogs,
    },
  }

  await runInTestNotificationContext(async () => {
    await notifyForEvent({
      ctx: { chain } as never,
      topic: matchingRule.topic,
      severity: matchingRule.severity === 'low' ? undefined : matchingRule.severity,
      name: matchingRule.displayName ?? renderer.name,
      eventName: abiRegistry.getEventInfo(record.topic0)?.name ?? renderer.name,
      event,
      block: {
        header: {
          height: record.block_number,
          timestamp: new Date(record.timestamp).getTime(),
        },
      } as never,
      log: log as never,
      notifyTarget: matchingRule.notifyTargets ?? undefined,
      renderer: createEventTemplateRenderer(renderer, matchingRule),
    })
  })
}

async function sendTraceRendererTest(renderer: RendererRecord, record: TraceRecordRow, overrideData?: Record<string, unknown>) {
  const chain = getChain(record.chain_id)
  const matchingRule = pickMatchingTraceRule(record)
  const trace = {
    type: record.type,
    action: {
      from: record.from_address ?? undefined,
      to: record.to_address ?? undefined,
      input: record.input ?? undefined,
      sighash: record.sighash ?? undefined,
    },
    transaction: record.tx_hash
      ? {
          hash: record.tx_hash,
          to: record.to_address ?? undefined,
        }
      : undefined,
    transactionIndex: record.tx_index ?? 0,
    traceAddress: record.trace_address,
    error: record.error ?? undefined,
    revertReason: record.revert_reason ?? undefined,
    block: {
      height: record.block_number,
      timestamp: new Date(record.timestamp).getTime(),
    },
  }

  const functionName = record.sighash ? abiRegistry.getFunctionInfo(record.sighash)?.name : undefined
  const functionData = overrideData ?? (record.input && record.sighash ? safeDecodeFunction(record.sighash, record.input) : undefined)

  await runInTestNotificationContext(async () => {
    await notifyForTrace({
      ctx: { chain } as never,
      topic: matchingRule.topic,
      severity: matchingRule.severity === 'low' ? undefined : matchingRule.severity,
      name: matchingRule.displayName ?? renderer.name,
      trace: trace as never,
      notifyTarget: matchingRule.notifyTargets ?? undefined,
      functionName,
      functionData,
      renderer: createTraceTemplateRenderer(renderer, matchingRule),
    })
  })
}

function safeDecodeFunction(sighash: string, input: string) {
  const fn = abiRegistry.getFunction(sighash)
  if (!fn) return undefined
  try {
    return fn.decode(input)
  } catch {
    return undefined
  }
}

function pickMatchingEventRule(record: EventRecordRow): AlertRule {
  const [rule] = findMatchingEventRules(
    record.chain_id,
    record.contract_address,
    record.topic0,
    record.topic1,
    record.topic2,
    record.topic3,
  )
  return (
    rule ?? {
      id: 'renderer-test',
      enabled: true,
      chainId: record.chain_id,
      matchType: 'event',
      addresses: [record.contract_address],
      topic0s: [record.topic0],
      topic1s: null,
      topic2s: null,
      topic3s: null,
      sighashes: null,
      traceType: null,
      callFrom: null,
      callTo: null,
      suicideRefundAddress: null,
      traceError: null,
      dataFilters: null,
      topic: 'Governance',
      severity: 'medium',
      notifyTargets: null,
      transactionLogs: true,
      displayName: 'Renderer Test',
      description: null,
    }
  )
}

function pickMatchingTraceRule(record: TraceRecordRow): AlertRule {
  const [rule] = findMatchingTraceRules(record.chain_id, record.to_address, record.sighash)
  return (
    rule ?? {
      id: 'renderer-test',
      enabled: true,
      chainId: record.chain_id,
      matchType: 'trace',
      addresses: record.to_address ? [record.to_address] : null,
      topic0s: null,
      topic1s: null,
      topic2s: null,
      topic3s: null,
      sighashes: record.sighash ? [record.sighash] : null,
      traceType: [record.type],
      callFrom: null,
      callTo: null,
      suicideRefundAddress: null,
      traceError: null,
      dataFilters: null,
      topic: 'Governance',
      severity: 'medium',
      notifyTargets: null,
      transactionLogs: false,
      displayName: 'Renderer Test',
      description: null,
    }
  )
}

function mockDefaultForType(type: string): unknown {
  if (type === 'address') return '0x0000000000000000000000000000000000000001'
  if (type === 'bool') return true
  if (type === 'string') return 'test'
  if (type === 'bytes') return '0x00'
  if (/^bytes\d+$/.test(type)) {
    const n = parseInt(type.slice(5))
    return ('0x' + '00'.repeat(n)) as `0x${string}`
  }
  if (/^u?int\d*$/.test(type)) return BigInt('1000000000000000000')
  if (type.endsWith('[]')) return []
  if (/^tuple/.test(type)) return {}
  return BigInt(0)
}

function mockEncodeEventLog(abiItem: ViemAbiEvent): { topics: string[]; data: string } {
  const topics = encodeEventTopics({ abi: [abiItem], eventName: abiItem.name }) as string[]

  // Encode non-indexed params as data
  const nonIndexed = abiItem.inputs.filter((i) => !i.indexed)
  let data = '0x'
  if (nonIndexed.length > 0) {
    const values = nonIndexed.map((i) => mockDefaultForType(i.type))
    data = encodeAbiParameters(
      nonIndexed.map((i) => ({ type: i.type, name: i.name })),
      values,
    )
  }

  // Add indexed topic values
  const indexed = abiItem.inputs.filter((i) => i.indexed)
  for (const param of indexed) {
    const val = mockDefaultForType(param.type)
    if (param.type === 'address') {
      topics.push('0x000000000000000000000000' + (val as string).slice(2))
    } else if (/^u?int\d*$/.test(param.type)) {
      topics.push('0x' + (val as bigint).toString(16).padStart(64, '0'))
    } else {
      topics.push('0x' + '00'.repeat(32))
    }
  }

  return { topics, data }
}

function mockEncodeFunctionInput(abiItem: ViemAbiFunction): string {
  const sighash = ('0x' + Buffer.from(abiItem.name).toString('hex')).slice(0, 10) // Will be overridden
  if (abiItem.inputs.length === 0) return sighash

  const values = abiItem.inputs.map((i) => mockDefaultForType(i.type))
  const encoded = encodeAbiParameters(
    abiItem.inputs.map((i) => ({ type: i.type, name: i.name })),
    values,
  )
  // sighash is already known from the renderer; prepend it to encoded params
  return encoded // caller prepends sighash
}

function mockEventRecord(renderer: RendererRecord): EventRecordRow {
  const address = renderer.contractAddresses?.[0] ?? '0x0000000000000000000000000000000000000000'
  const chainId = renderer.chainId ?? mainnet.id
  const topic0 = renderer.topic0 ?? '0x0000000000000000000000000000000000000000000000000000000000000000'

  let topics: string[] = [topic0]
  let data = '0x'

  const abiItem = abiRegistry.getEventAbiItem(topic0)
  if (abiItem) {
    const encoded = mockEncodeEventLog(abiItem)
    topics = encoded.topics
    data = encoded.data
  }

  return {
    id: 'mock:0:0:0',
    timestamp: new Date(),
    block_number: 0,
    chain_id: chainId,
    contract_address: address,
    topic0: topics[0],
    topic1: topics[1] ?? null,
    topic2: topics[2] ?? null,
    topic3: topics[3] ?? null,
    data,
    tx_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    tx_index: 0,
    log_index: 0,
  }
}

function mockTraceRecord(renderer: RendererRecord): TraceRecordRow {
  const address = renderer.contractAddresses?.[0] ?? '0x0000000000000000000000000000000000000000'
  const chainId = renderer.chainId ?? mainnet.id
  const sighash = renderer.sighash ?? null

  let input = sighash ?? '0x'
  const abiItem = sighash ? abiRegistry.getFunctionAbiItem(sighash) : undefined
  if (abiItem && abiItem.inputs.length > 0) {
    const encodedParams = mockEncodeFunctionInput(abiItem)
    input = sighash + encodedParams.slice(2)  // sighash + encoded params without 0x
  }

  return {
    id: 'mock:0:0:[]',
    timestamp: new Date(),
    block_number: 0,
    chain_id: chainId,
    tx_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    tx_index: 0,
    type: 'call',
    from_address: '0x0000000000000000000000000000000000000001',
    to_address: address,
    input,
    output: null,
    sighash,
    trace_address: [],
    error: null,
    revert_reason: null,
  }
}

function getChain(chainId: number) {
  if (chainId === base.id) return base
  if (chainId === sonic.id) return sonic
  return mainnet
}
