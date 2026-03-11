import fs from 'node:fs'
import path from 'node:path'

import { AbiEvent, AbiFunction } from '@subsquid/evm-abi'

type AbiEventLike = AbiEvent<any>
type AbiFunctionLike = AbiFunction<any, any>

class AbiRegistry {
  private events = new Map<string, AbiEventLike>()
  private functions = new Map<string, AbiFunctionLike>()

  private eventNames = new Map<string, { name: string; signature: string }>()
  private functionNames = new Map<string, { name: string; signature: string }>()

  registerEvents(events: Record<string, AbiEventLike>) {
    for (const [name, evt] of Object.entries(events)) {
      if (!this.events.has(evt.topic)) {
        this.events.set(evt.topic, evt)
        this.eventNames.set(evt.topic, { name, signature: evt.signature })
      }
    }
  }

  registerFunctions(functions: Record<string, AbiFunctionLike>) {
    for (const [name, fn] of Object.entries(functions)) {
      if (!this.functions.has(fn.sighash)) {
        this.functions.set(fn.sighash, fn)
        this.functionNames.set(fn.sighash, { name, signature: fn.signature })
      }
    }
  }

  getEvent(topic0: string): AbiEventLike | undefined {
    return this.events.get(topic0)
  }

  getFunction(sighash: string): AbiFunctionLike | undefined {
    return this.functions.get(sighash)
  }

  getEventInfo(topic0: string) {
    return this.eventNames.get(topic0)
  }

  getFunctionInfo(sighash: string) {
    return this.functionNames.get(sighash)
  }

  getAllEntries(): { id: string; type: 'event' | 'function'; name: string; signature: string }[] {
    const entries: { id: string; type: 'event' | 'function'; name: string; signature: string }[] = []
    for (const [id, info] of this.eventNames) {
      entries.push({ id, type: 'event', ...info })
    }
    for (const [id, info] of this.functionNames) {
      entries.push({ id, type: 'function', ...info })
    }
    return entries
  }

  get eventCount() {
    return this.events.size
  }

  get functionCount() {
    return this.functions.size
  }
}

export const abiRegistry = new AbiRegistry()

// Auto-register all known ABIs from the abi directory at load time
const abiDir = path.join(__dirname, '..', 'abi')
try {
  const files = fs.readdirSync(abiDir).filter((f) => f.endsWith('.js') || f.endsWith('.ts'))
  for (const file of files) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require(path.join(abiDir, file))
      if (mod.events) abiRegistry.registerEvents(mod.events)
      if (mod.functions) abiRegistry.registerFunctions(mod.functions)
    } catch {
      // Skip ABIs that fail to load
    }
  }
  console.log(`ABI registry loaded: ${abiRegistry.eventCount} events, ${abiRegistry.functionCount} functions`)
} catch (e) {
  console.error('Failed to load ABI registry:', e)
}
