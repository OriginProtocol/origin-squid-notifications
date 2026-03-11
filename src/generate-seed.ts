import 'tsconfig-paths/register'

import './env'
import { DATA_FILTERS } from './alert-config/data-filters'
import { load } from './topics'
import { abiRegistry } from './utils/abi-registry'

const escapeStr = (s: string) => s.replace(/'/g, "''")

const sqlArray = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) return 'NULL'
  return `ARRAY[${arr.map((s) => `'${escapeStr(s.toLowerCase())}'`).join(', ')}]`
}

const sqlJson = (obj: unknown): string => {
  if (!obj) return 'NULL'
  return `'${escapeStr(JSON.stringify(obj))}'::jsonb`
}

const sqlBool = (val: boolean | undefined): string => {
  if (val === undefined || val === null) return 'NULL'
  return val ? 'true' : 'false'
}

const slugify = (name: string, chainId: number, suffix?: string): string => {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  if (suffix) slug += `-${suffix}`
  if (chainId === 8453) slug += '-base'
  else if (chainId === 146) slug += '-sonic'
  return slug
}

const COLUMNS =
  'id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name'

load().then((processors) => {
  const lines: string[] = []
  lines.push('-- Seed data for alert config DB')
  lines.push('-- Generated from current ABI registry and notification processors')
  lines.push(`-- Generated at: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('BEGIN;')
  lines.push('')

  // ─── ABI Signatures ──────────────────────────────────────────────────────────
  const entries = abiRegistry.getAllEntries()
  const events = entries.filter((e) => e.type === 'event')
  const functions = entries.filter((e) => e.type === 'function')

  lines.push(`-- ─── Event Signatures (${events.length}) ─────────────────────────────────────────`)
  for (const e of events.sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(
      `INSERT INTO event_signature (topic0, name, full_sig) VALUES ('${e.id}', '${escapeStr(e.name)}', '${escapeStr(e.signature)}') ON CONFLICT (topic0) DO NOTHING;`,
    )
  }
  lines.push('')

  lines.push(`-- ─── Function Signatures (${functions.length}) ───────────────────────────────────`)
  for (const f of functions.sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(
      `INSERT INTO function_signature (sighash, name, full_sig) VALUES ('${f.id}', '${escapeStr(f.name)}', '${escapeStr(f.signature)}') ON CONFLICT (sighash) DO NOTHING;`,
    )
  }
  lines.push('')

  // Track generated IDs to detect duplicates
  const generatedIds = new Set<string>()

  for (const p of processors.sort((a, b) => {
    if (a.topic !== b.topic) return a.topic > b.topic ? 1 : -1
    if (a.chainId !== b.chainId) return a.chainId - b.chainId
    return (a.name ?? '') > (b.name ?? '') ? 1 : -1
  })) {
    // Event-based processors
    if (p.events && p.events.length > 0) {
      for (let i = 0; i < p.events.length; i++) {
        const track = p.events[i]
        const suffix = p.events.length > 1 ? String(i + 1) : undefined
        let id = slugify(p.name ?? p.topic, p.chainId, suffix)

        // Handle duplicate IDs (e.g., OGN Alerts has two separate processor registrations)
        if (generatedIds.has(id)) {
          let counter = 2
          while (generatedIds.has(`${id}-${counter}`)) counter++
          id = `${id}-${counter}`
        }
        generatedIds.add(id)

        const severity = track.severity ?? 'low'
        const notifyTargets = track.notifyTarget ?? null

        lines.push(`-- ${p.name} (chain ${p.chainId})${suffix ? ` track ${suffix}` : ''}`)
        lines.push(`INSERT INTO alert_rule (${COLUMNS})`)
        lines.push(`VALUES (`)
        lines.push(`  '${escapeStr(id)}',`)
        lines.push(`  ${p.chainId},`)
        lines.push(`  'event'::match_type,`)
        lines.push(`  ${sqlArray(track.address)},`)
        lines.push(`  ${sqlArray(track.topic0)},`)
        lines.push(`  ${sqlArray(track.topic1)},`)
        lines.push(`  ${sqlArray(track.topic2)},`)
        lines.push(`  ${sqlArray(track.topic3)},`)
        lines.push(`  NULL,`) // sighashes
        lines.push(`  NULL,`) // trace_type
        lines.push(`  NULL,`) // call_from
        lines.push(`  NULL,`) // call_to
        lines.push(`  NULL,`) // suicide_refund_address
        lines.push(`  NULL,`) // trace_error
        const dataFilter = DATA_FILTERS[id]
        lines.push(`  ${dataFilter ? `'${escapeStr(JSON.stringify(dataFilter))}'::jsonb` : 'NULL'},`)
        lines.push(`  '${escapeStr(p.topic)}',`)
        lines.push(`  '${severity}'::severity_level,`)
        lines.push(`  ${sqlJson(notifyTargets)},`)
        lines.push(`  '${escapeStr(p.name ?? p.topic)}'`)
        lines.push(`) ON CONFLICT (id) DO NOTHING;`)
        lines.push('')
      }
    }

    // Trace-based processors — one rule per traceParams entry
    if (p.traces && p.traces.length > 0) {
      for (let i = 0; i < p.traces.length; i++) {
        const track = p.traces[i]

        for (let j = 0; j < track.traceParams.length; j++) {
          const tp = track.traceParams[j] as any
          const traceSuffix =
            track.traceParams.length > 1
              ? `trace-${j + 1}`
              : p.traces.length > 1
                ? `trace-${i + 1}`
                : 'trace'
          let id = slugify(p.name ?? p.topic, p.chainId, traceSuffix)

          if (generatedIds.has(id)) {
            let counter = 2
            while (generatedIds.has(`${id}-${counter}`)) counter++
            id = `${id}-${counter}`
          }
          generatedIds.add(id)

          const severity = track.severity ?? 'low'
          const notifyTargets = track.notifyTarget ?? null

          // Extract addresses for the addresses column (union of callFrom, callTo, suicideRefundAddress)
          const addresses = new Set<string>()
          if (tp.callFrom) for (const addr of tp.callFrom) addresses.add(addr.toLowerCase())
          if (tp.callTo) for (const addr of tp.callTo) addresses.add(addr.toLowerCase())
          if (tp.suicideRefundAddress) for (const addr of tp.suicideRefundAddress) addresses.add(addr.toLowerCase())

          lines.push(`-- ${p.name} (chain ${p.chainId}) [trace${track.traceParams.length > 1 ? ` ${j + 1}` : ''}]`)
          lines.push(`INSERT INTO alert_rule (${COLUMNS})`)
          lines.push(`VALUES (`)
          lines.push(`  '${escapeStr(id)}',`)
          lines.push(`  ${p.chainId},`)
          lines.push(`  'trace'::match_type,`)
          lines.push(`  ${addresses.size > 0 ? sqlArray([...addresses]) : 'NULL'},`)
          lines.push(`  NULL,`) // topic0s
          lines.push(`  NULL,`) // topic1s
          lines.push(`  NULL,`) // topic2s
          lines.push(`  NULL,`) // topic3s
          lines.push(`  NULL,`) // sighashes
          lines.push(`  ${tp.type ? sqlArray(tp.type) : 'NULL'},`) // trace_type
          lines.push(`  ${tp.callFrom ? sqlArray(tp.callFrom) : 'NULL'},`) // call_from
          lines.push(`  ${tp.callTo ? sqlArray(tp.callTo) : 'NULL'},`) // call_to
          lines.push(`  ${tp.suicideRefundAddress ? sqlArray(tp.suicideRefundAddress) : 'NULL'},`) // suicide_refund_address
          lines.push(`  ${sqlBool(tp.error)},`) // trace_error
          const dataFilter = DATA_FILTERS[id]
          lines.push(`  ${dataFilter ? `'${escapeStr(JSON.stringify(dataFilter))}'::jsonb` : 'NULL'},`)
          lines.push(`  '${escapeStr(track.topic)}',`)
          lines.push(`  '${severity}'::severity_level,`)
          lines.push(`  ${sqlJson(notifyTargets)},`)
          lines.push(`  '${escapeStr(p.name ?? p.topic)}'`)
          lines.push(`) ON CONFLICT (id) DO NOTHING;`)
          lines.push('')
        }
      }
    }
  }

  lines.push('COMMIT;')
  const output = lines.join('\n')
  process.stdout.write(output + '\n', () => {
    process.exit(0)
  })
})
