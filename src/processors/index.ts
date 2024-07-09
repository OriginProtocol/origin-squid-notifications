/**
 * Run commands like `BLOCK_FROM=18102886 PROCESSOR=Trace yarn process` to filter down what processors will be run.
 */
import fs from 'node:fs'

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

const processors: NotificationProcessor[] = []

export const createProcessor = (processor: NotificationProcessor) => {
  if (!process.env.PROCESSOR || processor.name.includes(process.env.PROCESSOR)) {
    processors.push(processor)
  }
}

export const load = async () => {
  const renderers = fs.readdirSync(`${__dirname}`)
  for (const renderer of renderers) {
    if (renderer === 'examples') continue
    if (renderer === 'templates') continue
    if (renderer === 'index.js') continue
    if (!renderer.endsWith('.js')) continue
    console.log(`Loading processor: ${renderer}`)
    try {
      await import(`./${renderer}`)
    } catch (err) {
      console.log(`Error loading processor: ${renderer}`)
    }
  }
  return processors
}
