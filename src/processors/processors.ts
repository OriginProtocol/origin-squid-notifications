import { EvmProcessor } from '../types'

export const processors: EvmProcessor[] = []

export const createProcessor = (processor: EvmProcessor) => processors.push(processor)
