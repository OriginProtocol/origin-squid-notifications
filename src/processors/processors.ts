import { EvmProcessor } from '../types'

export const processors: EvmProcessor[] = []

export const createProcessor = (processor: EvmProcessor) => {
  if (!process.env.PROCESSOR || processor.name.includes(process.env.PROCESSOR)) {
    processors.push(processor)
  }
}
