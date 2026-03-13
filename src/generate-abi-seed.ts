import fs from 'node:fs'
import path from 'node:path'

const escapeStr = (s: string) => s.replace(/'/g, "''")

const abiDir = path.resolve(__dirname, '..', 'abi')
const files = fs
  .readdirSync(abiDir)
  .filter((f) => f.endsWith('.json'))
  .sort()

const lines: string[] = []
lines.push('-- ABI seed data for alert config DB')
lines.push(`-- Generated from ${files.length} ABI JSON files in abi/`)
lines.push(`-- Generated at: ${new Date().toISOString()}`)
lines.push('')
lines.push('BEGIN;')
lines.push('')

for (const file of files) {
  const name = file.replace('.json', '')
  const raw = fs.readFileSync(path.join(abiDir, file), 'utf-8')
  // Parse and re-stringify to compact the JSON
  const json = JSON.stringify(JSON.parse(raw))
  lines.push(
    `INSERT INTO abi (name, abi_json) VALUES ('${escapeStr(name)}', '${escapeStr(
      json,
    )}'::jsonb) ON CONFLICT (name) DO UPDATE SET abi_json = EXCLUDED.abi_json;`,
  )
}

lines.push('')
lines.push('COMMIT;')

const output = lines.join('\n')
process.stdout.write(output + '\n', () => {
  process.exit(0)
})
