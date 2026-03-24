// @ts-expect-error pg has no type declarations in this project
import pg from 'pg'

import type { Severity, Topic } from '@notify/const'

import type { AlertRule, FilterExpression, RendererRecord } from './types'

const { Pool } = pg

let pool: InstanceType<typeof Pool> | null = null
let cachedRules: AlertRule[] = []
let cachedRenderers: RendererRecord[] = []
let lastRuleRefresh = 0

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

const getPool = (): InstanceType<typeof Pool> => {
  if (!pool) {
    const url = process.env.ALERT_CONFIG_DB_URL
    if (!url) throw new Error('ALERT_CONFIG_DB_URL environment variable is not set')
    pool = new Pool({ connectionString: url })
  }
  return pool
}

const loadRules = async (): Promise<AlertRule[]> => {
  const { rows } = await getPool().query('SELECT * FROM alert_rule WHERE enabled = true')
  return rows.map(
    (row: any): AlertRule => ({
      id: row.id,
      enabled: row.enabled,
      chainId: row.chain_id,
      matchType: row.match_type,
      addresses: row.addresses,
      topic0s: row.topic0s,
      topic1s: row.topic1s,
      topic2s: row.topic2s,
      topic3s: row.topic3s,
      sighashes: row.sighashes,
      traceType: row.trace_type,
      callFrom: row.call_from,
      callTo: row.call_to,
      suicideRefundAddress: row.suicide_refund_address,
      traceError: row.trace_error,
      dataFilters: row.data_filters as FilterExpression | null,
      topic: row.topic as Topic,
      severity: row.severity as Severity, // DB enum guarantees valid value
      notifyTargets: row.notify_targets,
      transactionLogs: row.transaction_logs ?? false,
      displayName: row.display_name,
      description: row.description,
    }),
  )
}

const loadRenderers = async (): Promise<RendererRecord[]> => {
  const tableCheck = await getPool().query("SELECT 1 FROM information_schema.tables WHERE table_name = 'renderer'")
  if (tableCheck.rows.length === 0) return []
  const { rows } = await getPool().query('SELECT * FROM renderer ORDER BY name ASC')
  return rows.map(
    (row: any): RendererRecord => ({
      id: row.id,
      name: row.name,
      mode: row.mode,
      chainId: row.chain_id,
      matchType: row.match_type,
      abiNames: row.abi_names,
      contractAddresses: row.contract_addresses,
      topic0: row.topic0,
      sighash: row.sighash,
      configJson: row.config_json ?? {},
    }),
  )
}

/**
 * Get all enabled alert rules. Refreshes every 5 minutes.
 */
export const getAlertRules = async (): Promise<AlertRule[]> => {
  if (!process.env.ALERT_CONFIG_DB_URL) return []
  await refreshRulesIfStale()
  return cachedRules
}

export const getRenderers = async (): Promise<RendererRecord[]> => {
  if (!process.env.ALERT_CONFIG_DB_URL) return []
  await refreshRulesIfStale()
  return cachedRenderers
}

export const refreshAlertConfig = async (): Promise<void> => {
  if (!process.env.ALERT_CONFIG_DB_URL) return
  cachedRules = await loadRules()
  cachedRenderers = await loadRenderers()
  lastRuleRefresh = Date.now()
  console.log(`Alert config: force refreshed ${cachedRules.length} rules and ${cachedRenderers.length} renderers`)
}

/**
 * Refresh alert rules periodically. Changes take effect without redeploy.
 * First load must succeed or the process exits — we can't run without rules.
 */
const refreshRulesIfStale = async (): Promise<void> => {
  if (Date.now() - lastRuleRefresh < REFRESH_INTERVAL_MS) return
  if (!process.env.ALERT_CONFIG_DB_URL) return
  const isFirstLoad = lastRuleRefresh === 0
  try {
    cachedRules = await loadRules()
    cachedRenderers = await loadRenderers()
    lastRuleRefresh = Date.now()
    console.log(`Alert config: loaded ${cachedRules.length} rules and ${cachedRenderers.length} renderers`)
  } catch (err) {
    if (isFirstLoad) {
      console.error('FATAL: Failed to load alert rules on startup:', err)
      process.exit(1)
    }
    console.error('Failed to refresh alert rules (using cached):', err)
  }
}

export const findMatchingRenderer = (params: {
  chainId: number
  matchType: 'event' | 'trace'
  contractAddress?: string | null
  topic0?: string | null
  sighash?: string | null
}): RendererRecord | null => {
  const contractAddress = params.contractAddress?.toLowerCase() ?? null
  const topic0 = params.topic0?.toLowerCase() ?? null
  const sighash = params.sighash?.toLowerCase() ?? null

  const candidates = cachedRenderers.filter((renderer) => {
    if (renderer.matchType !== params.matchType) return false
    if (renderer.chainId != null && renderer.chainId !== params.chainId) return false

    if (renderer.contractAddresses?.length) {
      if (!contractAddress) return false
      if (!renderer.contractAddresses.some((value) => value.toLowerCase() === contractAddress)) return false
    }

    if (params.matchType === 'event' && renderer.topic0) {
      if (!topic0 || renderer.topic0.toLowerCase() !== topic0) return false
    }

    if (params.matchType === 'trace' && renderer.sighash) {
      if (!sighash || renderer.sighash.toLowerCase() !== sighash) return false
    }

    return true
  })

  if (candidates.length === 0) return null

  const score = (renderer: RendererRecord) =>
    (renderer.chainId != null ? 4 : 0) +
    (renderer.contractAddresses?.length ? 2 : 0) +
    (renderer.topic0 || renderer.sighash ? 1 : 0)

  return candidates.sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))[0] ?? null
}

/**
 * Find all rules matching an event record.
 */
export const findMatchingEventRules = (
  chainId: number,
  contractAddress: string,
  topic0: string,
  topic1?: string | null,
  topic2?: string | null,
  topic3?: string | null,
): AlertRule[] => {
  return cachedRules.filter((rule) => {
    if (rule.chainId !== chainId) return false
    if (rule.matchType !== 'event') return false
    if (rule.addresses?.length && !rule.addresses.some((a) => a.toLowerCase() === contractAddress.toLowerCase()))
      return false
    if (rule.topic0s?.length && !rule.topic0s.some((t) => t.toLowerCase() === topic0.toLowerCase())) return false
    if (rule.topic1s?.length && (!topic1 || !rule.topic1s.some((t) => t.toLowerCase() === topic1.toLowerCase())))
      return false
    if (rule.topic2s?.length && (!topic2 || !rule.topic2s.some((t) => t.toLowerCase() === topic2.toLowerCase())))
      return false
    if (rule.topic3s?.length && (!topic3 || !rule.topic3s.some((t) => t.toLowerCase() === topic3.toLowerCase())))
      return false
    return true
  })
}

/**
 * Find all rules matching a trace record.
 */
export const findMatchingTraceRules = (
  chainId: number,
  toAddress: string | null,
  sighash: string | null,
): AlertRule[] => {
  return cachedRules.filter((rule) => {
    if (rule.chainId !== chainId) return false
    if (rule.matchType !== 'trace') return false
    if (rule.addresses?.length && toAddress && !rule.addresses.some((a) => a.toLowerCase() === toAddress.toLowerCase()))
      return false
    if (rule.sighashes?.length && sighash && !rule.sighashes.some((s) => s.toLowerCase() === sighash.toLowerCase()))
      return false
    return true
  })
}
