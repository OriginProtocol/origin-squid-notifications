import fs from 'node:fs'
import path from 'node:path'

// @ts-expect-error pg has no type declarations in this project
import pg from 'pg'

import type { Severity, Topic } from '@notify/const'

import type { AlertRule, ContractInfo, FilterExpression } from './types'

const { Client, Pool } = pg

let pool: InstanceType<typeof Pool> | null = null
let migrationDone = false
let cachedRules: AlertRule[] = []
let cachedContracts: Map<string, ContractInfo> = new Map() // key: `${address}:${chainId}`
let lastRuleRefresh = 0
let lastContractRefresh = 0

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

const getPool = (): InstanceType<typeof Pool> => {
  if (!pool) {
    const url = process.env.ALERT_CONFIG_DB_URL
    if (!url) throw new Error('ALERT_CONFIG_DB_URL environment variable is not set')
    pool = new Pool({ connectionString: url })
  }
  return pool
}

/**
 * Auto-create the alert_config database and run migration + seed
 * when ALERT_CONFIG_DB_MIGRATION=true.
 */
const ensureMigrated = async (): Promise<void> => {
  if (migrationDone || process.env.ALERT_CONFIG_DB_MIGRATION !== 'true') return
  migrationDone = true

  const url = process.env.ALERT_CONFIG_DB_URL
  if (!url) return

  // Parse the DB name from the URL to create it if needed
  const parsed = new URL(url)
  const dbName = parsed.pathname.slice(1) // remove leading /
  const adminUrl = `${parsed.protocol}//${parsed.username}:${parsed.password}@${parsed.host}/postgres`

  // Create database if it doesn't exist
  const adminClient = new Client({ connectionString: adminUrl })
  try {
    await adminClient.connect()
    const { rows } = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName])
    if (rows.length === 0) {
      await adminClient.query(`CREATE DATABASE "${dbName}"`)
      console.log(`Alert config: created database "${dbName}"`)
    }
  } finally {
    await adminClient.end()
  }

  // Check if schema already exists
  const p = getPool()
  const { rows } = await p.query(
    "SELECT 1 FROM information_schema.tables WHERE table_name = 'alert_rule'",
  )
  if (rows.length > 0) return // Already migrated

  // Run migration
  const migrationPath = path.resolve(__dirname, 'migration.sql')
  // Try source dir first (ts-node), then compiled dir (lib/)
  const migrationSql = fs.existsSync(migrationPath)
    ? fs.readFileSync(migrationPath, 'utf-8')
    : fs.readFileSync(path.resolve(__dirname, '..', '..', 'src', 'alert-config', 'migration.sql'), 'utf-8')
  await p.query(migrationSql)
  console.log('Alert config: migration complete')

  // Run seed (split into individual statements to avoid pg query size limits)
  const seedPath = path.resolve(__dirname, 'seed-rules.sql')
  const seedSql = fs.existsSync(seedPath)
    ? fs.readFileSync(seedPath, 'utf-8')
    : fs.readFileSync(path.resolve(__dirname, '..', '..', 'src', 'alert-config', 'seed-rules.sql'), 'utf-8')
  const statements = seedSql
    .split(';\n')
    .map((s) =>
      s
        .split('\n')
        .filter((line) => !line.trimStart().startsWith('--'))
        .join('\n')
        .trim(),
    )
    .filter((s) => s.length > 0)
  for (const stmt of statements) {
    await p.query(stmt)
  }
  console.log('Alert config: seed rules loaded')
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
      displayName: row.display_name,
      description: row.description,
    }),
  )
}

const loadContracts = async (): Promise<Map<string, ContractInfo>> => {
  const { rows } = await getPool().query('SELECT * FROM contract_info')
  const map = new Map<string, ContractInfo>()
  for (const row of rows as any[]) {
    map.set(`${row.address.toLowerCase()}:${row.chain_id}`, {
      address: row.address,
      chainId: row.chain_id,
      name: row.name,
      product: row.product,
      tags: row.tags,
    })
  }
  return map
}

/**
 * Get all enabled alert rules. Refreshes every 5 minutes.
 */
export const getAlertRules = async (): Promise<AlertRule[]> => {
  if (!process.env.ALERT_CONFIG_DB_URL) return []
  await refreshRulesIfStale()
  return cachedRules
}

/**
 * Get contract info by address and chain ID. Refreshes periodically.
 */
export const getContractInfo = async (address: string, chainId: number): Promise<ContractInfo | undefined> => {
  if (!process.env.ALERT_CONFIG_DB_URL) return undefined
  await refreshContractsIfStale()
  return cachedContracts.get(`${address.toLowerCase()}:${chainId}`)
}

/**
 * Refresh alert rules periodically. Changes take effect without redeploy.
 */
const refreshRulesIfStale = async (): Promise<void> => {
  if (Date.now() - lastRuleRefresh < REFRESH_INTERVAL_MS) return
  if (!process.env.ALERT_CONFIG_DB_URL) return
  try {
    await ensureMigrated()
    cachedRules = await loadRules()
    lastRuleRefresh = Date.now()
    console.log(`Alert config: loaded ${cachedRules.length} rules`)
  } catch (err) {
    console.error('Failed to load alert rules:', err)
  }
}

/**
 * Refresh contract info periodically (display names, safe to update live).
 */
const refreshContractsIfStale = async (): Promise<void> => {
  if (Date.now() - lastContractRefresh < REFRESH_INTERVAL_MS) return
  if (!process.env.ALERT_CONFIG_DB_URL) return
  try {
    await ensureMigrated()
    cachedContracts = await loadContracts()
    lastContractRefresh = Date.now()
    console.log(`Alert config: refreshed ${cachedContracts.size} contracts`)
  } catch (err) {
    console.error('Failed to refresh contract info:', err)
  }
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
    if (rule.addresses && !rule.addresses.some((a) => a.toLowerCase() === contractAddress.toLowerCase())) return false
    if (rule.topic0s && !rule.topic0s.some((t) => t.toLowerCase() === topic0.toLowerCase())) return false
    if (rule.topic1s && (!topic1 || !rule.topic1s.some((t) => t.toLowerCase() === topic1.toLowerCase()))) return false
    if (rule.topic2s && (!topic2 || !rule.topic2s.some((t) => t.toLowerCase() === topic2.toLowerCase()))) return false
    if (rule.topic3s && (!topic3 || !rule.topic3s.some((t) => t.toLowerCase() === topic3.toLowerCase()))) return false
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
    if (rule.addresses && toAddress && !rule.addresses.some((a) => a.toLowerCase() === toAddress.toLowerCase()))
      return false
    if (rule.sighashes && sighash && !rule.sighashes.some((s) => s.toLowerCase() === sighash.toLowerCase()))
      return false
    return true
  })
}
