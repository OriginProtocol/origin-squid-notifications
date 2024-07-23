import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { Trace } from '../types'

const lower = (hex: string) => hex.toLowerCase()

/**
 * Helper to create and match traces.
 */
export const traceFilter = (
  filter: Pick<
    Parameters<EvmBatchProcessor['addTrace']>[0],
    'type' | 'callFrom' | 'callTo' | 'callSighash' | 'transaction' | 'range' | 'suicideRefundAddress'
  > & { error?: boolean },
) => {
  const error = filter.error
  filter = {
    type: filter.type,
    callFrom: filter.callFrom?.map(lower),
    callTo: filter.callTo?.map(lower),
    callSighash: filter.callSighash?.map(lower),
    suicideRefundAddress: filter.suicideRefundAddress?.map(lower),
    transaction: filter.transaction ?? true,
    range: filter.range,
  }
  return {
    value: filter,
    matches(trace: Trace) {
      if (filter.type && !filter.type.includes(trace.type)) return false
      if (filter.callFrom && trace.type === 'call' && !filter.callFrom.includes(trace.action.from)) return false
      if (filter.callTo && trace.type === 'call' && !filter.callTo.includes(trace.action.to)) return false
      if (filter.callSighash && trace.type === 'call' && !filter.callSighash.includes(trace.action.sighash))
        return false
      if (
        filter.suicideRefundAddress &&
        trace.type === 'suicide' &&
        !filter.suicideRefundAddress.includes(trace.action.refundAddress)
      )
        return false

      if (
        filter.range &&
        (trace.block.height < filter.range.from || (filter.range.to && trace.block.height > filter.range.to))
      ) {
        return false
      }
      if (!!error !== !!trace.error) {
        return false
      }
      return true
    },
  } as const
}

export type TraceFilter = ReturnType<typeof traceFilter>
