import { Log, Trace, logFilter, traceFilter } from '@originprotocol/squid-utils'

type LogFilterInstance = ReturnType<typeof logFilter>
type TraceFilterInstance = ReturnType<typeof traceFilter>

const logFilters: LogFilterInstance[] = []
const traceFilters: TraceFilterInstance[] = []

export const registerLogFilter = (filter: LogFilterInstance) => {
  logFilters.push(filter)
}

export const registerTraceFilter = (filter: TraceFilterInstance) => {
  traceFilters.push(filter)
}

export const matchesAnyLogFilter = (log: Log): boolean => {
  return logFilters.some((f) => f.matches(log))
}

export const matchesAnyTraceFilter = (trace: Trace): boolean => {
  return traceFilters.some((f) => f.matches(trace))
}
