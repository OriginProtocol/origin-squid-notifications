import { fun, viewFun } from '@subsquid/evm-abi'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { Topic } from '../../notify/discord'
import { notifyForTrace } from '../../notify/trace'
import { Context } from '../../types'
import { traceFilter } from '../../utils/traceFilter'
import { createProcessor } from '../processors'

export const createTraceProcessor = ({
  name,
  description,
  chainId,
  traceParams,
  abi,
  topic,
}: {
  name: string
  description: string
  chainId: number
  traceParams: Parameters<typeof traceFilter>[0]
  abi: { functions: Record<string, ReturnType<typeof viewFun | typeof fun>> }[]
  topic: Topic
}) => {
  const filter = traceFilter(traceParams)
  const abiEntries = abi.flatMap((a) => Object.entries(a.functions))

  createProcessor({
    name,
    description,
    chainId,
    setup: (processor: EvmBatchProcessor) => {
      processor.addTrace(filter.value)
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const trace of block.traces) {
          if (filter.matches(trace)) {
            const input: Parameters<typeof notifyForTrace>[0] = {
              name,
              trace,
              topic,
            }
            if (trace.type === 'call') {
              const fn = abiEntries.find(([n, f]) => f.sighash === trace.action.sighash)
              input.functionName = fn?.[0]
              input.functionData = fn ? fn[1].decode(trace.action.input) : undefined
            }
            if (trace.error) {
              input.severity = 'broken'
            }
            await notifyForTrace(input)
          }
        }
      }
    },
  })
}
