import 'tsconfig-paths/register'

import { getAddressesPyName } from '@utils/addresses/names'
import { formatJson } from '@utils/formatJson'

import { getAlertRules, initAlertConfigDb } from './alert-config'
import './env'
import { load } from './topics'
import { abiRegistry } from './utils/abi-registry'

const main = async () => {
  const url = process.env.ALERT_CONFIG_DB_URL
  if (!url) {
    console.error('ALERT_CONFIG_DB_URL is required')
    process.exit(1)
  }

  // Initialize alert config DB (migrate/seed if needed), then load ABIs
  await initAlertConfigDb()
  await abiRegistry.loadFromDb()

  // getAlertRules handles DB creation, migration, and seeding
  const alertRules = await getAlertRules()

  // Load code-driven processors (OGN Alerts, OGN Buybacks) not in the DB
  const codeProcessors = await load()

  // Build event name lookup from ABI registry
  const sigMap = new Map<string, string>()
  for (const entry of abiRegistry.getAllEntries()) {
    if (entry.type === 'event') sigMap.set(entry.id, entry.name)
  }

  console.log('# Origin Squid Notifications - DB Digest')
  console.log(new Date().toLocaleString())
  console.log('=========================================')

  // Sort to match digest.ts ordering: by topic, chainId, name
  const sorted = alertRules.sort((a, b) => {
    if (a.topic !== b.topic) return a.topic > b.topic ? 1 : -1
    if (a.chainId !== b.chainId) return a.chainId - b.chainId
    const aName = a.displayName ?? a.topic
    const bName = b.displayName ?? b.topic
    return aName > bName ? 1 : aName < bName ? -1 : a.id > b.id ? 1 : -1
  })

  // Group rules by display_name + chainId + base ID to reconstruct multi-track processors.
  // Rules like origin-ethena-arm-1, origin-ethena-arm-2 are tracks of the same processor.
  // Rules like ogn-alerts, ogn-alerts-2 are separate processor registrations (dedup suffix).
  const stripChainSuffix = (id: string) => {
    if (id.endsWith('-base')) return id.slice(0, -5)
    if (id.endsWith('-sonic')) return id.slice(0, -6)
    return id
  }
  const getBaseId = (id: string) => {
    const core = stripChainSuffix(id)
    // Strip track suffix like -1, -2, -3 or trace-1, trace-2
    const trackMatch = core.match(/^(.+?)(-\d+|-trace(?:-\d+)?)$/)
    if (!trackMatch) return id
    const base = trackMatch[1]
    // Check if the base (without track suffix) exists as its own rule — dedup suffix
    const chainSuffix = id.slice(core.length)
    const baseWithChain = base + chainSuffix
    const hasSibling = sorted.some((r) => r.id === baseWithChain)
    if (hasSibling) return id // Dedup suffix like ogn-alerts-2
    return baseWithChain // Track suffix like origin-ethena-arm
  }

  const groups = new Map<string, typeof sorted>()
  for (const rule of sorted) {
    const key = `${rule.displayName ?? rule.topic}::${rule.chainId}::${getBaseId(rule.id)}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(rule)
  }

  const resolveAddresses = (addrs: string[]) =>
    addrs.map((a) => {
      const name = getAddressesPyName(a)
      return name ? `${a} (${name})` : a
    })

  // Build display entries from DB rules
  const displayEntries: { name: string; topic: string; chainId: number; display: any }[] = []

  for (const [, ruleGroup] of groups) {
    const first = ruleGroup[0]
    const processor: any = {
      name: first.displayName ?? first.topic,
      topic: first.topic,
      chainId: first.chainId,
    }

    const eventRules = ruleGroup.filter((r) => r.matchType === 'event')
    const traceRules = ruleGroup.filter((r) => r.matchType === 'trace')

    if (eventRules.length > 0) {
      processor.events = eventRules.map((rule) => {
        const track: any = {}
        if (rule.addresses) {
          track.address = resolveAddresses(rule.addresses)
        }
        if (rule.topic0s) {
          track.topic0 = rule.topic0s.map((hash: string) => {
            const name = sigMap.get(hash)
            return name ? `${name} | ${hash.slice(0, 10)}` : hash.slice(0, 10)
          })
        } else {
          // Show empty array to match code digest format
          track.topic0 = []
        }
        if (rule.topic1s) track.topic1 = rule.topic1s
        if (rule.topic2s) track.topic2 = rule.topic2s
        if (rule.topic3s) track.topic3 = rule.topic3s
        track.severity = rule.severity
        if (rule.notifyTargets) track.notifyTarget = rule.notifyTargets
        // if (rule.dataFilters) track.dataFilter = rule.dataFilters
        return track
      })
    }

    if (traceRules.length > 0) {
      // Group trace rules back into traceParams arrays to match code digest format
      processor.traces = []
      const trace: any = { traceParams: [] as any[] }
      for (const rule of traceRules) {
        const tp: any = {}
        if (rule.traceType) tp.type = rule.traceType
        if (rule.callFrom) tp.callFrom = resolveAddresses(rule.callFrom)
        if (rule.callTo) tp.callTo = resolveAddresses(rule.callTo)
        if (rule.suicideRefundAddress) tp.suicideRefundAddress = resolveAddresses(rule.suicideRefundAddress)
        if (rule.traceError != null) tp.error = rule.traceError
        trace.traceParams.push(tp)
        trace.topic = rule.topic
        trace.severity = rule.severity
        if (rule.notifyTargets) trace.notifyTarget = rule.notifyTargets
      }
      processor.traces.push(trace)
    }

    displayEntries.push({
      name: processor.name,
      topic: processor.topic,
      chainId: processor.chainId,
      display: processor,
    })
  }

  // Add code-driven processors (not in DB) — same cleanup as digest.ts
  for (const p of codeProcessors) {
    if (p.events) {
      for (const track of p.events) {
        const t = track as any
        if (t.topic0 && Array.isArray(t.topic0)) {
          t.topic0 = t.topic0.map((hash: string) => {
            if (!hash.startsWith('0x')) return hash
            const info = abiRegistry.getEventInfo(hash)
            return info ? `${info.name} | ${hash.slice(0, 10)}` : hash.slice(0, 10)
          })
        }
        delete t.eventName
        delete t.transaction
        delete t.transactionLogs
      }
    }
    displayEntries.push({
      name: p.name ?? p.topic,
      topic: p.topic,
      chainId: p.chainId,
      display: p,
    })
  }

  // Sort all entries to match digest.ts ordering
  displayEntries.sort((a, b) => {
    if (a.topic !== b.topic) return a.topic > b.topic ? 1 : -1
    if (a.chainId !== b.chainId) return a.chainId - b.chainId
    return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  })

  for (const entry of displayEntries) {
    console.log('=========================================')
    console.log(formatJson(entry.display))
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
