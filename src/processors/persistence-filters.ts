import { Context, Log, Trace, logFilter, traceFilter } from '@originprotocol/squid-utils'

type LogFilterInstance = ReturnType<typeof logFilter>
type TraceFilterInstance = ReturnType<typeof traceFilter>
type CustomFilter = (ctx: Context, log: Log) => Promise<{ include: boolean }> | { include: boolean }

interface RegisteredLogFilter {
  filter: LogFilterInstance
  customFilter?: CustomFilter
}

const logFilters: RegisteredLogFilter[] = []
const traceFilters: TraceFilterInstance[] = []

export const registerLogFilter = (filter: LogFilterInstance, customFilter?: CustomFilter) => {
  logFilters.push({ filter, customFilter })
}

export const registerTraceFilter = (filter: TraceFilterInstance) => {
  traceFilters.push(filter)
}

/**
 * Check if a log matches any registered filter.
 * Filters with a customFilter require the async version (matchesAnyLogFilterAsync).
 * This sync version only checks filters without customFilters.
 */
export const matchesAnyLogFilter = (log: Log): boolean => {
  return logFilters.some((f) => f.filter.matches(log))
}

/**
 * Check if a log matches any registered filter, including custom filters.
 * A log matches if any filter's subscription matches AND its customFilter (if present) returns include: true.
 */
export const matchesAnyLogFilterAsync = async (ctx: Context, log: Log): Promise<boolean> => {
  for (const { filter, customFilter } of logFilters) {
    if (!filter.matches(log)) continue
    if (!customFilter) return true
    const result = await customFilter(ctx, log)
    if (result.include) return true
  }
  return false
}

export const matchesAnyTraceFilter = (trace: Trace): boolean => {
  return traceFilters.some((f) => f.matches(trace))
}
