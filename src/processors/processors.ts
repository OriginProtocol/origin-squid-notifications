import { fun, viewFun } from '@subsquid/evm-abi'

import { NotifyTarget, Severity, Topic } from '../notify/const'
import { EvmProcessor } from '../types'
import { traceFilter } from '../utils/traceFilter'

export interface NotificationProcessor extends EvmProcessor {
  topic: Topic
  events?: {
    eventName?: string[]
    topic1?: string[]
    topic2?: string[]
    topic3?: string[]
    severity?: Severity
    notifyTarget?: NotifyTarget
  }[]
  traces?: {
    traceParams: Parameters<typeof traceFilter>[0][]
    abi: { functions: Record<string, ReturnType<typeof viewFun | typeof fun>> }[]
    topic: Topic
    severity?: Severity
    notifyTarget?: NotifyTarget
  }[]
}

export const processors: NotificationProcessor[] = []

export const createProcessor = (processor: NotificationProcessor) => {
  if (!process.env.PROCESSOR || processor.name.includes(process.env.PROCESSOR)) {
    processors.push(processor)
  }
}
