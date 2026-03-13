import { Context, defineProcessor } from '@originprotocol/squid-utils'

import { AbiData } from '../model'
import { EventRecord } from '../model'
import { TraceRecord } from '../model'
import { abiRegistry } from '../utils/abi-registry'
import { matchesAnyLogFilter, matchesAnyTraceFilter } from './persistence-filters'

export const persistenceProcessor = defineProcessor({
  name: 'Persistence',
  initialize: async (ctx: Context) => {
    const entries = abiRegistry
      .getAllEntries()
      .map((e) => new AbiData({ id: e.id, type: e.type, name: e.name, signature: e.signature }))
    if (entries.length > 0) {
      await ctx.store.upsert(entries)
      console.log(`AbiData: upserted ${entries.length} entries`)
    }
  },
  process: async (ctx: Context) => {
    const eventRecords: EventRecord[] = []
    const traceRecords: TraceRecord[] = []

    for (const block of ctx.blocks) {
      const timestamp = new Date(block.header.timestamp)
      const blockNumber = block.header.height
      const blockHash = block.header.hash

      for (const log of block.logs) {
        if (!matchesAnyLogFilter(log)) continue
        const id = `${ctx.chain.id}:${blockNumber}:${log.transactionIndex}:${log.logIndex}`
        const topic0 = log.topics[0]
        if (!topic0) continue

        let decodedData: unknown = null
        try {
          const abiEvent = abiRegistry.getEvent(topic0)
          if (abiEvent) {
            decodedData = sanitizeForJson(abiEvent.decode(log))
          }
        } catch {
          // Decoding failed — store without decoded data
        }

        const tx = log.getTransaction()
        eventRecords.push(
          new EventRecord({
            id,
            timestamp,
            blockNumber,
            blockHash,
            chainId: ctx.chain.id,
            contractAddress: log.address,
            topic0,
            topic1: log.topics[1] ?? null,
            topic2: log.topics[2] ?? null,
            topic3: log.topics[3] ?? null,
            data: log.data,
            txHash: log.transactionHash,
            txFrom: tx.from,
            txTo: tx.to ?? null,
            txIndex: log.transactionIndex,
            logIndex: log.logIndex,
            decodedData,
          }),
        )
      }

      for (const trace of block.traces) {
        if (!matchesAnyTraceFilter(trace)) continue
        const traceAddr = trace.traceAddress
        const id = `${ctx.chain.id}:${blockNumber}:${trace.transactionIndex}:${JSON.stringify(traceAddr)}`

        // Use type assertion for fields that are fetched at runtime
        // but not reflected in squid-utils hardcoded return types
        const traceAny = trace as any

        let fromAddress: string | null = null
        let toAddress: string | null = null
        let value: string | null = null
        let gas: bigint | null = null
        let gasUsed: bigint | null = null
        let input: string | null = null
        let output: string | null = null
        let sighash: string | null = null
        let callType: string | null = null
        let createdAddress: string | null = null
        let refundAddress: string | null = null

        if (trace.type === 'call') {
          fromAddress = trace.action.from
          toAddress = trace.action.to
          value = trace.action.value?.toString() ?? null
          gas = traceAny.action.gas ?? null
          gasUsed = traceAny.result?.gasUsed ?? null
          input = trace.action.input
          output = traceAny.result?.output ?? null
          sighash = trace.action.sighash
          callType = traceAny.action.callType ?? null
        } else if (trace.type === 'create') {
          fromAddress = traceAny.action.from ?? null
          value = traceAny.action.value?.toString() ?? null
          gas = traceAny.action.gas ?? null
          gasUsed = traceAny.result?.gasUsed ?? null
          createdAddress = traceAny.result?.address ?? null
        } else if (trace.type === 'suicide') {
          fromAddress = trace.action.address
          refundAddress = trace.action.refundAddress
          value = trace.action.balance?.toString() ?? null
        }

        let decodedInput: unknown = null
        let decodedOutput: unknown = null
        if (sighash && input) {
          try {
            const abiFn = abiRegistry.getFunction(sighash)
            if (abiFn) {
              decodedInput = sanitizeForJson(abiFn.decode(input))
              if (output) {
                decodedOutput = sanitizeForJson(abiFn.decodeResult(output))
              }
            }
          } catch {
            // Decoding failed — store without decoded data
          }
        }

        const tx = trace.transaction
        traceRecords.push(
          new TraceRecord({
            id,
            timestamp,
            blockNumber,
            blockHash,
            chainId: ctx.chain.id,
            txHash: tx?.hash ?? null,
            txIndex: trace.transactionIndex,
            txSuccess: tx ? (tx as any).status === 1 : null,
            type: trace.type,
            callType,
            fromAddress,
            toAddress,
            value,
            gas,
            gasUsed,
            input,
            output,
            sighash,
            traceAddress: traceAddr,
            subtraces: traceAny.subtraces ?? 0,
            success: !trace.error,
            error: trace.error ?? null,
            revertReason: trace.revertReason ?? null,
            createdAddress,
            refundAddress,
            decodedInput,
            decodedOutput,
          }),
        )
      }
    }

    if (eventRecords.length > 0) {
      await ctx.store.upsert(eventRecords)
    }
    if (traceRecords.length > 0) {
      await ctx.store.upsert(traceRecords)
    }
  },
})

function sanitizeForJson(obj: unknown): unknown {
  return JSON.parse(JSON.stringify(obj, (_key, value) => (typeof value === 'bigint' ? value.toString() : value)))
}
