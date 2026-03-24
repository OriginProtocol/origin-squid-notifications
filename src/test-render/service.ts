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

export interface TestRenderOverrides {
  data?: Record<string, unknown>
  title?: string
  description?: string
}

export async function sendRendererTestAlert(rendererId: string, overrides?: TestRenderOverrides) {
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
    const data = await sendEventRendererTest(renderer, record, overrides)
    return { rendererId, matchType: 'event', recordId: record.id, txHash: record.tx_hash, data }
  }

  const record = (await loadRecentMatchingTrace(renderer)) ?? mockTraceRecord(renderer)
  const data = await sendTraceRendererTest(renderer, record, overrides)
  return { rendererId, matchType: 'trace', recordId: record.id, txHash: record.tx_hash, data }
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

async function sendEventRendererTest(renderer: RendererRecord, record: EventRecordRow, overrides?: TestRenderOverrides): Promise<Record<string, unknown> | undefined> {
  const realEvent = abiRegistry.getEvent(record.topic0)
  if (!realEvent) {
    throw new Error(`No ABI decoder found for topic0 ${record.topic0}`)
  }
  const eventData = overrides?.data ?? safeDecodeEvent(realEvent, record)
  const event = overrides?.data
    ? { topic: realEvent.topic, decode: () => overrides.data }
    : realEvent

  const isMock = record.id.startsWith('mock:')
  const siblings = isMock ? [record] : await loadSiblingEvents(record)
  const chain = getChain(record.chain_id)
  const matchingRule = applyRuleOverrides(pickMatchingEventRule(record), overrides)
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
  return eventData as Record<string, unknown> | undefined
}

async function sendTraceRendererTest(renderer: RendererRecord, record: TraceRecordRow, overrides?: TestRenderOverrides): Promise<Record<string, unknown> | undefined> {
  const chain = getChain(record.chain_id)
  const matchingRule = applyRuleOverrides(pickMatchingTraceRule(record), overrides)
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
  const functionData = overrides?.data ?? (record.input && record.sighash ? safeDecodeFunction(record.sighash, record.input) : undefined)

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
  return functionData as Record<string, unknown> | undefined
}

function safeDecodeEvent(event: { decode: (log: any) => any }, record: EventRecordRow) {
  try {
    return event.decode({
      topics: [record.topic0, record.topic1, record.topic2, record.topic3].filter(Boolean),
      data: record.data ?? '0x',
    })
  } catch {
    return undefined
  }
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

function applyRuleOverrides(rule: AlertRule, overrides?: TestRenderOverrides): AlertRule {
  if (!overrides?.title && !overrides?.description) return rule
  return {
    ...rule,
    displayName: overrides.title ?? rule.displayName,
    description: overrides.description ?? rule.description,
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
      displayName: null,
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
      displayName: null,
      description: null,
    }
  )
}

function mockDefaultForAbiInput(input: { type: string; components?: readonly any[] }): unknown {
  const { type } = input
  // Fixed-size arrays like uint256[3]
  const fixedArrayMatch = type.match(/^(.+)\[(\d+)\]$/)
  if (fixedArrayMatch) {
    const innerType = fixedArrayMatch[1]
    const length = parseInt(fixedArrayMatch[2])
    return Array.from({ length }, () => mockDefaultForAbiInput({ type: innerType, components: input.components }))
  }
  // Dynamic arrays
  if (type.endsWith('[]')) return []
  // Tuples — recurse into components
  if (type === 'tuple' && input.components?.length) {
    const obj: Record<string, unknown> = {}
    for (const comp of input.components) {
      obj[comp.name ?? ''] = mockDefaultForAbiInput(comp)
    }
    return obj
  }
  if (type === 'address') return '0x0000000000000000000000000000000000000001'
  if (type === 'bool') return true
  if (type === 'string') return 'test'
  if (type === 'bytes') return '0x00'
  if (/^bytes\d+$/.test(type)) {
    const n = parseInt(type.slice(5))
    return ('0x' + '00'.repeat(n)) as `0x${string}`
  }
  if (/^u?int\d*$/.test(type)) return BigInt('1000000000000000000')
  return BigInt(0)
}

function safeMockEncodeEventLog(abiItem: ViemAbiEvent): { topics: string[]; data: string } {
  try {
    const topics = encodeEventTopics({ abi: [abiItem], eventName: abiItem.name }) as string[]

    const nonIndexed = abiItem.inputs.filter((i) => !i.indexed)
    let data = '0x'
    if (nonIndexed.length > 0) {
      const values = nonIndexed.map((i) => mockDefaultForAbiInput(i))
      data = encodeAbiParameters(nonIndexed as any, values)
    }

    const indexed = abiItem.inputs.filter((i) => i.indexed)
    for (const param of indexed) {
      if (param.type === 'address') {
        topics.push('0x0000000000000000000000000000000000000000000000000000000000000001')
      } else {
        topics.push('0x' + '00'.repeat(32))
      }
    }

    return { topics, data }
  } catch {
    // Encoding failed — return minimal valid log
    const topic0 = encodeEventTopics({ abi: [abiItem], eventName: abiItem.name })[0] as string
    return { topics: [topic0], data: '0x' }
  }
}

function safeMockEncodeFunctionInput(abiItem: ViemAbiFunction): string {
  if (abiItem.inputs.length === 0) return ''
  try {
    const values = abiItem.inputs.map((i) => mockDefaultForAbiInput(i))
    return encodeAbiParameters(abiItem.inputs as any, values)
  } catch {
    return ''
  }
}

function mockEventRecord(renderer: RendererRecord): EventRecordRow {
  const address = renderer.contractAddresses?.[0] ?? '0x0000000000000000000000000000000000000000'
  const chainId = renderer.chainId ?? mainnet.id
  const topic0 = renderer.topic0 ?? '0x0000000000000000000000000000000000000000000000000000000000000000'

  let topics: string[] = [topic0]
  let data = '0x'

  const abiItem = abiRegistry.getEventAbiItem(topic0)
  if (abiItem) {
    const encoded = safeMockEncodeEventLog(abiItem)
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
    const encodedParams = safeMockEncodeFunctionInput(abiItem)
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
