import { TraceProcessorParams, createTraceProcessor } from './trace'

export const createTraceErrorProcessor = (
  params: {
    address: string[]
  } & Omit<TraceProcessorParams, 'description' | 'traceParams'>,
) => {
  return createTraceProcessor({
    ...params,
    traceParams: [
      { type: ['call'], callFrom: params.address, error: true },
      { type: ['call'], callTo: params.address, error: true },
    ],
  })
}
