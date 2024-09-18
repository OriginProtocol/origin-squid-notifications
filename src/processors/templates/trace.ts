import { fun, viewFun } from '@subsquid/evm-abi'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { createProcessor } from '..'
import { NotifyTarget, Severity, Topic } from '../../notify/const'
import { NotifyForTraceInput, notifyForTrace } from '../../notify/trace'
import { Context } from '../../types'
import { traceFilter } from '../../utils/traceFilter'

export type TraceProcessorParams = Parameters<typeof createTraceProcessor>[0]
export const createTraceProcessor = ({
  name,
  chainId,
  traceParams,
  abi,
  topic,
  severity,
  notifyTarget,
  markEventsNotified,
  excludeFilter,
}: {
  name: string
  chainId: number
  traceParams: Parameters<typeof traceFilter>[0][]
  abi: { functions: Record<string, ReturnType<typeof viewFun | typeof fun>> }[]
  topic: Topic
  severity?: Severity
  notifyTarget?: NotifyTarget
  markEventsNotified?: boolean
  excludeFilter?: (notification: NotifyForTraceInput) => boolean
}) => {
  const filter = traceParams.map((tp) => traceFilter(tp))
  const abiEntries = abi.flatMap((a) => Object.entries(a.functions))

  createProcessor({
    name,
    topic,
    chainId,
    traces: [{ traceParams, topic, severity, notifyTarget }],
    setup: (processor: EvmBatchProcessor) => {
      filter.forEach((f) => processor.addTrace(f.value))
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const trace of block.traces) {
          if (filter.find((f) => f.matches(trace))) {
            const relatedEvents = block.logs.filter((log) => log.transactionHash === trace.transaction?.hash)
            if (markEventsNotified) {
              relatedEvents.forEach((l) => ctx.markEventHandled(l))
            }
            const input: Parameters<typeof notifyForTrace>[0] = {
              ctx,
              name,
              trace,
              topic,
              severity,
              notifyTarget,
            }
            if (trace.type === 'call') {
              const fn = abiEntries.find(([n, f]) => f.sighash === trace.action.sighash)
              input.functionName = fn?.[0]
              input.functionData = fn ? fn[1].decode(trace.action.input) : undefined
            }
            if (trace.error) {
              input.severity = 'broken'
            }
            if (!excludeFilter || !excludeFilter(input)) {
              await notifyForTrace(input)
            }
          }
        }
      }
    },
  })
}
