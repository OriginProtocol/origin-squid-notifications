import fs from 'node:fs'
import path from 'node:path'

import { AbiEvent, AbiFunction } from '@subsquid/evm-abi'
import {
  type Abi,
  type AbiEvent as ViemAbiEvent,
  type AbiFunction as ViemAbiFunction,
  decodeEventLog,
  decodeFunctionData,
  decodeFunctionResult,
  toEventSelector,
  toFunctionSelector,
} from 'viem'

type AbiEventLike = AbiEvent<any>
type AbiFunctionLike = AbiFunction<any, any>

interface EventEntry {
  abi: Abi
  abiItem: ViemAbiEvent
  name: string
  signature: string
  decode: (log: { topics: string[]; data: string }) => any
}

interface FunctionEntry {
  abi: Abi
  abiItem: ViemAbiFunction
  name: string
  signature: string
  decode: (input: string) => any
  decodeResult: (output: string) => any
}

/**
 * Recursively lowercase all string values that look like Ethereum addresses.
 * viem returns checksummed addresses; subsquid consumers expect lowercase.
 */
function lowercaseAddresses(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return /^0x[0-9a-fA-F]{40}$/.test(obj) ? obj.toLowerCase() : obj
  }
  if (typeof obj === 'bigint' || typeof obj === 'number' || typeof obj === 'boolean' || obj === null || obj === undefined) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(lowercaseAddresses)
  }
  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = lowercaseAddresses(value)
    }
    return result
  }
  return obj
}

function formatEventSignature(item: ViemAbiEvent): string {
  const params = item.inputs.map((i) => i.type).join(',')
  return `${item.name}(${params})`
}

function formatFunctionSignature(item: ViemAbiFunction): string {
  const params = item.inputs.map((i) => i.type).join(',')
  return `${item.name}(${params})`
}

function makeEventEntry(abi: Abi, item: ViemAbiEvent): EventEntry {
  return {
    abi,
    abiItem: item,
    name: item.name,
    signature: formatEventSignature(item),
    decode: (log) => {
      const result = decodeEventLog({
        abi,
        topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
        data: log.data as `0x${string}`,
        strict: false,
      })
      return lowercaseAddresses(result.args)
    },
  }
}

function makeFunctionEntry(abi: Abi, item: ViemAbiFunction): FunctionEntry {
  return {
    abi,
    abiItem: item,
    name: item.name,
    signature: formatFunctionSignature(item),
    decode: (input) => {
      const result = decodeFunctionData({
        abi,
        data: input as `0x${string}`,
      })
      return lowercaseAddresses(result.args)
    },
    decodeResult: (output) => {
      const result = decodeFunctionResult({
        abi,
        functionName: item.name,
        data: output as `0x${string}`,
      })
      return lowercaseAddresses(result)
    },
  }
}

class AbiRegistry {
  // DB-loaded viem entries (primary) — multiple entries per selector for fallback decoding
  private viemEvents = new Map<string, EventEntry[]>()
  private viemFunctions = new Map<string, FunctionEntry[]>()

  // Legacy subsquid entries (for code-driven processors that import @abi/ directly)
  private squidEvents = new Map<string, AbiEventLike>()
  private squidFunctions = new Map<string, AbiFunctionLike>()
  private squidEventNames = new Map<string, { name: string; signature: string }>()
  private squidFunctionNames = new Map<string, { name: string; signature: string }>()

  /**
   * Load ABIs from the alert config database.
   * Parses each ABI JSON, computes selectors, and builds lookup maps.
   */
  async loadFromDb(): Promise<void> {
    const url = process.env.ALERT_CONFIG_DB_URL
    if (!url) {
      console.log('ABI registry: ALERT_CONFIG_DB_URL not set, skipping DB load')
      return
    }

    // @ts-expect-error pg has no type declarations in this project
    const pg = await import('pg')
    const pool = new pg.default.Pool({ connectionString: url })
    try {
      const { rows } = await pool.query('SELECT name, abi_json FROM abi')
      for (const row of rows) {
        this.registerAbi(row.name, row.abi_json as Abi)
      }
      const eventCount = this.viemEvents.size
      const variantCount = Array.from(this.viemEvents.values()).reduce((n, arr) => n + arr.length, 0)
      console.log(`ABI registry: loaded ${rows.length} ABIs from DB (${eventCount} event selectors, ${variantCount} event variants, ${this.viemFunctions.size} functions)`)

      // Auto-populate event_signature and function_signature tables
      for (const [topic0, entries] of this.viemEvents) {
        const entry = entries[0]
        await pool.query(
          `INSERT INTO event_signature (topic0, name, full_sig) VALUES ($1, $2, $3) ON CONFLICT (topic0) DO NOTHING`,
          [topic0, entry.name, entry.signature],
        )
      }
      for (const [sighash, entries] of this.viemFunctions) {
        const entry = entries[0]
        await pool.query(
          `INSERT INTO function_signature (sighash, name, full_sig) VALUES ($1, $2, $3) ON CONFLICT (sighash) DO NOTHING`,
          [sighash, entry.name, entry.signature],
        )
      }
    } finally {
      await pool.end()
    }
  }

  /**
   * Register a full ABI. Extracts all events and functions.
   */
  registerAbi(name: string, abi: Abi): void {
    for (const item of abi) {
      if (item.type === 'event' && 'name' in item) {
        const topic0 = toEventSelector(item as ViemAbiEvent)
        const entries = this.viemEvents.get(topic0)
        const entry = makeEventEntry(abi, item as ViemAbiEvent)
        if (entries) {
          // Only add if this is a genuinely different signature (different indexed params, etc.)
          const sig = entry.signature
          if (!entries.some((e) => e.signature === sig)) {
            entries.push(entry)
          }
        } else {
          this.viemEvents.set(topic0, [entry])
        }
      } else if ((item.type === 'function') && 'name' in item) {
        const sighash = toFunctionSelector(item as ViemAbiFunction)
        const entries = this.viemFunctions.get(sighash)
        const entry = makeFunctionEntry(abi, item as ViemAbiFunction)
        if (entries) {
          const sig = entry.signature
          if (!entries.some((e) => e.signature === sig)) {
            entries.push(entry)
          }
        } else {
          this.viemFunctions.set(sighash, [entry])
        }
      }
    }
  }

  /**
   * Register subsquid-compiled events (for code-driven processors).
   */
  registerEvents(events: Record<string, AbiEventLike>) {
    for (const [name, evt] of Object.entries(events)) {
      if (!this.squidEvents.has(evt.topic)) {
        this.squidEvents.set(evt.topic, evt)
        this.squidEventNames.set(evt.topic, { name, signature: evt.signature })
      }
    }
  }

  /**
   * Register subsquid-compiled functions (for code-driven processors).
   */
  registerFunctions(functions: Record<string, AbiFunctionLike>) {
    for (const [name, fn] of Object.entries(functions)) {
      if (!this.squidFunctions.has(fn.sighash)) {
        this.squidFunctions.set(fn.sighash, fn)
        this.squidFunctionNames.set(fn.sighash, { name, signature: fn.signature })
      }
    }
  }

  /**
   * Get an event decoder by topic0. Tries all registered ABI variants for the
   * selector, falling back to subsquid if none succeed.
   */
  getEvent(topic0: string): { decode: (log: { topics: string[]; data: string }) => any; topic: string } | undefined {
    const viemEntries = this.viemEvents.get(topic0)
    if (viemEntries) {
      return {
        topic: topic0,
        decode: (log) => {
          for (const entry of viemEntries) {
            try {
              return entry.decode(log)
            } catch {
              // Try next variant
            }
          }
          // All variants failed — throw from the first one for a useful error
          return viemEntries[0].decode(log)
        },
      }
    }
    const squidEntry = this.squidEvents.get(topic0)
    if (squidEntry) return squidEntry
    return undefined
  }

  /**
   * Get a function decoder by sighash. Tries all registered ABI variants.
   */
  getFunction(sighash: string): { decode: (input: string) => any; decodeResult: (output: string) => any; sighash: string } | undefined {
    const viemEntries = this.viemFunctions.get(sighash)
    if (viemEntries) {
      return {
        sighash,
        decode: (input) => {
          for (const entry of viemEntries) {
            try {
              return entry.decode(input)
            } catch {
              // Try next variant
            }
          }
          return viemEntries[0].decode(input)
        },
        decodeResult: (output) => {
          for (const entry of viemEntries) {
            try {
              return entry.decodeResult(output)
            } catch {
              // Try next variant
            }
          }
          return viemEntries[0].decodeResult(output)
        },
      }
    }
    const squidEntry = this.squidFunctions.get(sighash)
    if (squidEntry) return squidEntry
    return undefined
  }

  /**
   * Get event metadata (name + signature) by topic0.
   */
  getEventInfo(topic0: string): { name: string; signature: string } | undefined {
    const viemEntries = this.viemEvents.get(topic0)
    if (viemEntries) return { name: viemEntries[0].name, signature: viemEntries[0].signature }
    return this.squidEventNames.get(topic0)
  }

  /**
   * Get function metadata (name + signature) by sighash.
   */
  getFunctionInfo(sighash: string): { name: string; signature: string } | undefined {
    const viemEntries = this.viemFunctions.get(sighash)
    if (viemEntries) return { name: viemEntries[0].name, signature: viemEntries[0].signature }
    return this.squidFunctionNames.get(sighash)
  }

  /**
   * Get all entries (for seed generation, digest, etc.)
   */
  getAllEntries(): { id: string; type: 'event' | 'function'; name: string; signature: string }[] {
    const entries: { id: string; type: 'event' | 'function'; name: string; signature: string }[] = []
    const seen = new Set<string>()

    // viem entries first (primary)
    for (const [id, arr] of this.viemEvents) {
      entries.push({ id, type: 'event', name: arr[0].name, signature: arr[0].signature })
      seen.add(id)
    }
    for (const [id, arr] of this.viemFunctions) {
      entries.push({ id, type: 'function', name: arr[0].name, signature: arr[0].signature })
      seen.add(id)
    }

    // subsquid entries that aren't already covered
    for (const [id, info] of this.squidEventNames) {
      if (!seen.has(id)) entries.push({ id, type: 'event', ...info })
    }
    for (const [id, info] of this.squidFunctionNames) {
      if (!seen.has(id)) entries.push({ id, type: 'function', ...info })
    }

    return entries
  }

  get eventCount() {
    return Math.max(this.viemEvents.size, this.squidEvents.size)
  }

  get functionCount() {
    return Math.max(this.viemFunctions.size, this.squidFunctions.size)
  }
}

export const abiRegistry = new AbiRegistry()

// Auto-register subsquid-compiled ABIs from src/abi/ at load time (fallback for code-driven processors)
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
