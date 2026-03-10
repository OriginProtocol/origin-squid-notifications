import 'tsconfig-paths/register'

import './env'
import { load } from './topics'

const escapeStr = (s: string) => s.replace(/'/g, "''")

const sqlArray = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) return 'NULL'
  return `ARRAY[${arr.map((s) => `'${escapeStr(s.toLowerCase())}'`).join(', ')}]`
}

const sqlJson = (obj: unknown): string => {
  if (!obj) return 'NULL'
  return `'${escapeStr(JSON.stringify(obj))}'::jsonb`
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

const COLUMNS = 'id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, data_filters, topic, severity, notify_targets, display_name'

load().then((processors) => {
  const lines: string[] = []
  lines.push('-- Seed data for alert_rule table')
  lines.push('-- Generated from current hardcoded notification processors')
  lines.push(`-- Generated at: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('BEGIN;')
  lines.push('')

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
        const id = slugify(p.name ?? p.topic, p.chainId, suffix)
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
        lines.push(`  NULL,`) // data_filters
        lines.push(`  '${escapeStr(p.topic)}',`)
        lines.push(`  '${severity}'::severity_level,`)
        lines.push(`  ${sqlJson(notifyTargets)},`)
        lines.push(`  '${escapeStr(p.name ?? p.topic)}'`)
        lines.push(`) ON CONFLICT (id) DO NOTHING;`)
        lines.push('')
      }
    }

    // Trace-based processors
    if (p.traces && p.traces.length > 0) {
      for (let i = 0; i < p.traces.length; i++) {
        const track = p.traces[i]
        const suffix = p.traces.length > 1 ? `trace-${i + 1}` : 'trace'
        const id = slugify(p.name ?? p.topic, p.chainId, suffix)
        const severity = track.severity ?? 'low'
        const notifyTargets = track.notifyTarget ?? null

        // Extract addresses from trace params
        const addresses = new Set<string>()
        for (const tp of track.traceParams) {
          const tpAny = tp as any
          if (tpAny.callFrom) {
            for (const addr of tpAny.callFrom) addresses.add(addr.toLowerCase())
          }
          if (tpAny.callTo) {
            for (const addr of tpAny.callTo) addresses.add(addr.toLowerCase())
          }
          if (tpAny.suicideRefundAddress) {
            for (const addr of tpAny.suicideRefundAddress) addresses.add(addr.toLowerCase())
          }
        }

        lines.push(`-- ${p.name} (chain ${p.chainId}) [trace]`)
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
        lines.push(`  NULL,`) // data_filters
        lines.push(`  '${escapeStr(track.topic)}',`)
        lines.push(`  '${severity}'::severity_level,`)
        lines.push(`  ${sqlJson(notifyTargets)},`)
        lines.push(`  '${escapeStr(p.name ?? p.topic)}'`)
        lines.push(`) ON CONFLICT (id) DO NOTHING;`)
        lines.push('')
      }
    }
  }

  lines.push('COMMIT;')
  console.log(lines.join('\n'))
})
