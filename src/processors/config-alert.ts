import { Context, Trace, defineProcessor, logFilter, traceFilter } from '@originprotocol/squid-utils'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { evaluateFilter, findMatchingEventRules, findMatchingTraceRules, getAlertRules } from '../alert-config'
import type { AlertRule } from '../alert-config'
import { notifyForEvent } from '../notify/event'
import { notifyForTrace } from '../notify/trace'
import { registerLogFilter, registerTraceFilter } from './persistence-filters'
import { abiRegistry } from '../utils/abi-registry'

/**
 * Config-driven alert processor.
 *
 * Loads alert rules from the alert_config database and subscribes to
 * the matching blockchain events and traces. At runtime it matches
 * incoming data against the cached rules and sends notifications
 * through the same pipeline used by the hardcoded processors.
 *
 * This is a drop-in replacement for all processors defined in src/topics/.
 */

/**
 * Create a config-alert processor for a given chain.
 * Must be awaited — loads rules from DB before constructing the processor
 * so that subscriptions are available at setup() time.
 */
export const createConfigAlertProcessor = async (chainId: number) => {
  const rules = await getAlertRules()
  let chainRules = rules.filter((r) => r.chainId === chainId)

  // ALERT env var filters rules by display name or id (substring match)
  if (process.env.ALERT) {
    const filter = process.env.ALERT.toLowerCase()
    chainRules = chainRules.filter(
      (r) => r.id.toLowerCase().includes(filter) || (r.displayName && r.displayName.toLowerCase().includes(filter)),
    )
    console.log(`ConfigAlert: ALERT="${process.env.ALERT}" filtered to ${chainRules.length} rules`)
  }

  const { logFilters, traceFilters } = buildSubscriptions(chainRules)

  for (const f of logFilters) registerLogFilter(f)
  for (const f of traceFilters) registerTraceFilter(f)

  console.log(
    `ConfigAlert: ${chainRules.length} rules for chain ${chainId} (${logFilters.length} log filters, ${traceFilters.length} trace filters)`,
  )

  return defineProcessor({
    name: 'ConfigAlert',
    setup: (processor: EvmBatchProcessor) => {
      for (const f of logFilters) {
        processor.addLog(f.value)
      }
      for (const f of traceFilters) {
        processor.addTrace(f.value)
      }
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        // Process events
        for (const log of block.logs) {
          const topic0 = log.topics[0]
          if (!topic0) continue

          // Quick check: does any of our log filters match?
          if (!logFilters.some((f) => f.matches(log))) continue

          const matchingRules = findMatchingEventRules(
            ctx.chain.id,
            log.address,
            topic0,
            log.topics[1],
            log.topics[2],
            log.topics[3],
          )

          for (const rule of matchingRules) {
            // Evaluate data filters if present
            if (rule.dataFilters) {
              const abiEvent = abiRegistry.getEvent(topic0)
              if (abiEvent) {
                try {
                  const decoded = abiEvent.decode(log)
                  if (!evaluateFilter(rule.dataFilters, decoded)) continue
                } catch {
                  // Can't decode — skip data filter, let it through
                }
              }
            }

            // Find the ABI event for notification
            const abiEvent = abiRegistry.getEvent(topic0)
            const eventInfo = abiRegistry.getEventInfo(topic0)
            const eventName = eventInfo?.name ?? topic0.slice(0, 10)

            if (!abiEvent) {
              console.warn(`ConfigAlert: No ABI for topic0 ${topic0} (rule ${rule.id}), sending raw notification`)
            }

            await notifyForEvent({
              ctx,
              name: rule.displayName ?? rule.topic,
              eventName,
              block,
              log,
              event: abiEvent ?? { topic: topic0, decode: () => undefined },
              topic: rule.topic,
              severity: rule.severity === 'low' ? undefined : rule.severity,
              notifyTarget: rule.notifyTargets ?? undefined,
            })
          }
        }

        // Process traces
        for (const trace of block.traces) {
          // Quick check: does any of our trace filters match?
          if (!traceFilters.some((f) => f.matches(trace))) continue

          const toAddress = trace.type === 'call' ? trace.action.to : null
          const sighash = trace.type === 'call' ? trace.action.sighash : null

          const matchingRules = findMatchingTraceRules(ctx.chain.id, toAddress, sighash)

          for (const rule of matchingRules) {
            // Check trace-specific criteria that findMatchingTraceRules doesn't cover
            if (!matchesTraceRule(rule, trace)) continue

            // Decode function data if possible
            let functionName: string | undefined
            let functionData: unknown
            if (trace.type === 'call' && sighash) {
              const fnInfo = abiRegistry.getFunctionInfo(sighash)
              functionName = fnInfo?.name
              const abiFn = abiRegistry.getFunction(sighash)
              if (abiFn) {
                try {
                  functionData = abiFn.decode(trace.action.input)
                } catch {
                  // Decoding failed
                }
              }
            }

            let severity = rule.severity === 'low' ? undefined : rule.severity
            if (trace.error) {
              severity = 'broken'
            }

            await notifyForTrace({
              ctx,
              name: rule.displayName ?? rule.topic,
              trace,
              topic: rule.topic,
              severity,
              notifyTarget: rule.notifyTargets ?? undefined,
              functionName,
              functionData,
            })
          }
        }
      }
    },
  })
}

/**
 * Build logFilter/traceFilter subscriptions from alert rules.
 * Each event rule becomes a logFilter; each trace rule becomes a traceFilter.
 * All event filters include transaction: true for access to tx metadata.
 */
export function buildSubscriptions(rules: AlertRule[]) {
  const lf: ReturnType<typeof logFilter>[] = []
  const tf: ReturnType<typeof traceFilter>[] = []

  for (const rule of rules) {
    if (rule.matchType === 'event') {
      lf.push(
        logFilter({
          address: rule.addresses ?? undefined,
          topic0: rule.topic0s ?? undefined,
          topic1: rule.topic1s ?? undefined,
          topic2: rule.topic2s ?? undefined,
          topic3: rule.topic3s ?? undefined,
          transaction: true,
          transactionLogs: rule.transactionLogs || undefined,
        }),
      )
    } else if (rule.matchType === 'trace') {
      const type = (rule.traceType as ('call' | 'create' | 'suicide' | 'reward')[]) ?? ['call']
      tf.push(
        traceFilter({
          type,
          callFrom: rule.callFrom ?? undefined,
          callTo: rule.callTo ?? undefined,
          suicideRefundAddress: rule.suicideRefundAddress ?? undefined,
          error: rule.traceError ?? undefined,
          // traceFilter defaults transaction to true; we don't set transactionLogs
          // to match the behavior of createTraceProcessor which passes traceParams as-is
        }),
      )
    }
  }

  return { logFilters: lf, traceFilters: tf }
}

/**
 * Check trace-specific rule criteria beyond what findMatchingTraceRules covers.
 * findMatchingTraceRules only checks chainId, matchType, addresses, and sighashes.
 * This function checks callFrom, callTo, traceType, suicideRefundAddress, and traceError.
 */
function matchesTraceRule(rule: AlertRule, trace: Trace): boolean {
  if (rule.traceType?.length && !rule.traceType.includes(trace.type)) return false

  if (trace.type === 'call') {
    if (rule.callFrom?.length && !rule.callFrom.some((a) => a.toLowerCase() === trace.action.from.toLowerCase()))
      return false
    if (rule.callTo?.length && !rule.callTo.some((a) => a.toLowerCase() === trace.action.to.toLowerCase()))
      return false
  }

  if (trace.type === 'suicide') {
    if (
      rule.suicideRefundAddress?.length &&
      !rule.suicideRefundAddress.some((a) => a.toLowerCase() === trace.action.refundAddress.toLowerCase())
    )
      return false
  }

  if (rule.traceError === true && !trace.error) return false
  if (rule.traceError === false && trace.error) return false

  return true
}
