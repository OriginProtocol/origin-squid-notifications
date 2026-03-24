// Parse CLI args before loading anything heavy
const args = process.argv.slice(2)
const ruleIdx = args.indexOf('--rule')
const fromIdx = args.indexOf('--from')
const chainIdx = args.indexOf('--chain')

const USAGE = `Usage: pnpm run backfill -- --chain <chain-id> --from <block-number> [--rule <rule-id>]

  --chain   Chain ID (1=mainnet, 8453=base, 146=sonic)
  --from    Block number to start backfill from
  --rule    Optional: specific rule ID (omit to backfill all rules for the chain)`

if (fromIdx === -1 || !args[fromIdx + 1] || chainIdx === -1 || !args[chainIdx + 1]) {
  console.error(USAGE)
  process.exit(1)
}

const chainId = Number(args[chainIdx + 1])
const fromBlock = Number(args[fromIdx + 1])
const ruleId = ruleIdx !== -1 ? args[ruleIdx + 1] : undefined

if (isNaN(chainId) || ![1, 8453, 146].includes(chainId)) {
  console.error(`Invalid chain ID: ${args[chainIdx + 1]} (must be 1, 8453, or 146)`)
  process.exit(1)
}
if (isNaN(fromBlock)) {
  console.error(`Invalid block number: ${args[fromIdx + 1]}`)
  process.exit(1)
}

require('tsconfig-paths/register')
require('./env')

const STATE_SCHEMA = 'backfill'

const main = async () => {
  const { run } = await import('@originprotocol/squid-utils')
  const { DEFAULT_FIELDS } = await import('@utils/batch-processor-fields')
  const { abiRegistry } = await import('@utils/abi-registry')
  const { initAlertConfigDb, getAlertRules } = await import('./alert-config')
  const { buildSubscriptions } = await import('./processors/config-alert')
  const { persistenceProcessor } = await import('./processors/persistence')

  await initAlertConfigDb()
  await abiRegistry.loadFromDb()

  // Drop previous backfill state so we always start fresh
  const pg = require('pg')
  const poolConfig = process.env.DB_URL
    ? { connectionString: process.env.DB_URL }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'squid',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
      }
  const pool = new pg.Pool(poolConfig)
  await pool.query(`DROP SCHEMA IF EXISTS "${STATE_SCHEMA}" CASCADE`)
  await pool.end()

  // Load rules for the target chain
  const allRules = await getAlertRules()
  let rules = allRules.filter((r: any) => r.chainId === chainId)

  if (ruleId) {
    const rule = rules.find((r: any) => r.id === ruleId)
    if (!rule) {
      console.error(`Rule not found: "${ruleId}"`)
      const chainRuleIds = rules.map((r: any) => r.id)
      console.error(`Available rules for chain ${chainId}: ${chainRuleIds.join(', ') || '(none)'}`)
      process.exit(1)
    }
    rules = [rule]
  }

  if (rules.length === 0) {
    console.error(`No enabled rules found for chain ${chainId}`)
    process.exit(1)
  }

  console.log(`Backfill: chain=${chainId} rules=${rules.length} from=${fromBlock}`)
  for (const r of rules) {
    console.log(`  - ${r.id} (${r.matchType})`)
  }

  // Build subscriptions from the selected rules
  const { logFilters, traceFilters } = buildSubscriptions(rules)
  console.log(`Backfill: ${logFilters.length} log filters, ${traceFilters.length} trace filters`)

  // Set BLOCK_FROM so run() picks it up
  process.env.BLOCK_FROM = String(fromBlock)

  // Run with a separate state schema so we don't interfere with the live processor
  await run({
    chainId: chainId as any,
    stateSchema: STATE_SCHEMA,
    processors: [
      {
        name: 'Backfill',
        setup: (processor: any) => {
          for (const f of logFilters) processor.addLog(f.value)
          for (const f of traceFilters) processor.addTrace(f.value)
        },
        process: persistenceProcessor.process,
      },
    ],
    fields: DEFAULT_FIELDS,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
