/**
 * Run commands like `BLOCK_FROM=18102886 PROCESSOR=Trace yarn process` to filter down what processors will be run.
 */
import fs from 'node:fs'

import { Processor, traceFilter } from '@originprotocol/squid-utils'

import { NotifyTarget, Severity, Topic } from '../notify/const'

export interface NotificationProcessor extends Processor {
  chainId: number
  topic: Topic
  events?: {
    address?: string[]
    eventName?: string[]
    topic1?: string[]
    topic2?: string[]
    topic3?: string[]
    severity?: Severity
    notifyTarget?: NotifyTarget
  }[]
  traces?: {
    traceParams: Parameters<typeof traceFilter>[0][]
    topic: Topic
    severity?: Severity
    notifyTarget?: NotifyTarget
  }[]
}

const processors: NotificationProcessor[] = []

export const createProcessor = (processor: NotificationProcessor) => {
  if (!process.env.PROCESSOR || processor.name?.includes(process.env.PROCESSOR)) {
    processors.push(processor)
  }
}

export const load = async () => {
  const processorList = fs.readdirSync(`${__dirname}`)
  for (const processor of processorList) {
    if (processor === 'examples') continue
    if (processor === 'templates') continue
    if (processor === 'index.js') continue
    if (!processor.endsWith('.js') && !processor.endsWith('.ts') && processor.includes('.')) continue
    console.log(`Loading processor: ${processor}`)
    await import(`./${processor}`)
  }
  return processors
}
