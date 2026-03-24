import fs from 'node:fs'
import path from 'node:path'
// @ts-expect-error pg has no type declarations in this project
import pg from 'pg'

const { Client, Pool } = pg

const MIGRATION_TABLE = 'alert_config_migration'

let pool: InstanceType<typeof Pool> | null = null

const getPool = (): InstanceType<typeof Pool> => {
  const url = process.env.ALERT_CONFIG_DB_URL
  if (!url) throw new Error('ALERT_CONFIG_DB_URL environment variable is not set')
  if (!pool) {
    pool = new Pool({ connectionString: url })
  }
  return pool
}

function getMigrationDirectories(): string[] {
  const configured = process.env.ALERT_CONFIG_MIGRATIONS_DIR
  const dirs = [
    configured,
    path.resolve(process.cwd(), '..', 'alert-config-admin', 'migrations'),
    path.resolve(process.cwd(), 'migrations'),
  ].filter((value): value is string => !!value)

  return [...new Set(dirs)]
}

function getMigrationFiles(): Array<{ id: string; fullPath: string }> {
  for (const dir of getMigrationDirectories()) {
    if (!fs.existsSync(dir)) continue
    const files = fs
      .readdirSync(dir)
      .filter((name) => /^\d+.*\.sql$/i.test(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: name, fullPath: path.join(dir, name) }))
    if (files.length > 0) {
      return files
    }
  }
  return []
}

async function ensureMigrationTable(): Promise<void> {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATION_TABLE} (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `)
}

async function getAppliedMigrationIds(): Promise<Set<string>> {
  await ensureMigrationTable()
  const { rows } = await getPool().query(`SELECT id FROM ${MIGRATION_TABLE}`)
  return new Set(rows.map((row: { id: string }) => row.id))
}

async function markMigrationApplied(id: string): Promise<void> {
  await getPool().query(`INSERT INTO ${MIGRATION_TABLE} (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`, [id])
}

async function tableExists(tableName: string): Promise<boolean> {
  const { rows } = await getPool().query(
    'SELECT 1 FROM information_schema.tables WHERE table_schema = $1 AND table_name = $2',
    ['public', tableName],
  )
  return rows.length > 0
}

async function columnExists(tableName: string, columnName: string): Promise<boolean> {
  const { rows } = await getPool().query(
    'SELECT 1 FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 AND column_name = $3',
    ['public', tableName, columnName],
  )
  return rows.length > 0
}

async function seedLegacyMigrationHistory(): Promise<void> {
  const applied = await getAppliedMigrationIds()
  if (applied.size > 0) return

  const alertRuleExists = await tableExists('alert_rule')
  if (!alertRuleExists) return

  const inferred: string[] = ['001-schema.sql']
  if (await tableExists('abi')) inferred.push('002-seed-abis.sql')
  inferred.push('003-seed-rules.sql')
  if (await tableExists('changelog')) inferred.push('004-changelog.sql')
  if (await columnExists('alert_rule', 'transaction_logs')) inferred.push('005-transaction-logs.sql')
  if (await columnExists('alert_rule', 'abi_names')) inferred.push('006-alert-rule-abi-names.sql')
  if (await tableExists('renderer')) inferred.push('007-renderers.sql')
  if (await columnExists('renderer', 'abi_names')) inferred.push('008-renderer-abi-names.sql')

  for (const id of inferred) {
    await markMigrationApplied(id)
  }

  console.log(`Alert config: inferred legacy migration history (${inferred.join(', ')})`)
}

async function applyMigrationFile(id: string, fullPath: string): Promise<void> {
  const sql = fs.readFileSync(fullPath, 'utf-8')
  await getPool().query(sql)
  await markMigrationApplied(id)
  console.log(`Alert config: applied migration ${id}`)
}

async function applyAlertConfigMigrations(): Promise<void> {
  const files = getMigrationFiles()
  if (files.length === 0) {
    throw new Error(
      'No alert-config migrations found. Set ALERT_CONFIG_MIGRATIONS_DIR or run from a checkout next to alert-config-admin.',
    )
  }

  await ensureMigrationTable()
  await seedLegacyMigrationHistory()
  const applied = await getAppliedMigrationIds()

  for (const file of files) {
    if (applied.has(file.id)) continue
    await applyMigrationFile(file.id, file.fullPath)
  }
}

/**
 * Initialize the alert config database.
 * Creates the database if needed, then applies the alert-config-admin migrations.
 * Call once at startup before using any other alert-config functions.
 * Only runs when ALERT_CONFIG_DB_MIGRATION=true (local dev only).
 */
export const initAlertConfigDb = async (): Promise<void> => {
  if (process.env.ALERT_CONFIG_DB_MIGRATION !== 'true') return

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

  await applyAlertConfigMigrations()
}
