import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import { Chain, createPublicClient, http } from 'viem'
import { arbitrum, base, mainnet } from 'viem/chains'

import { lookupArchive } from '@subsquid/archive-registry'
import { KnownArchives } from '@subsquid/archive-registry/lib/chains'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'

import { processDiscordQueue } from './notify/discord'
import { processOncallQueue } from './notify/oncall'
import './rpc-issues'
import { Context, EvmProcessor, Log } from './types'
import { env } from './utils/env'

dayjs.extend(duration)
dayjs.extend(utc)

export const createSquidProcessor = (
  archive: KnownArchives = 'eth-mainnet',
  rpc_env = process.env.RPC_ENV ?? 'RPC_ENDPOINT',
) => {
  const url = process.env[rpc_env] || 'http://localhost:8545'
  console.log(`Archive: ${archive}`)
  console.log(`RPC: ${url}`)
  return new EvmBatchProcessor()
    .setGateway(lookupArchive(archive))
    .setRpcEndpoint({
      url,
      maxBatchCallSize: url.includes('alchemy.com') ? 1 : 100,
    })
    .setRpcDataIngestionSettings({
      disabled: process.env.ARCHIVE_ONLY === 'true',
      headPollInterval: 5000,
    })
    .setFinalityConfirmation(10)
    .setFields({
      transaction: {
        from: true,
        to: true,
        hash: true,
        gasUsed: true,
        gas: true,
        value: true,
        sighash: true,
        input: true,
        status: true,
      },
      log: {
        transactionHash: true,
        topics: true,
        data: true,
      },
      trace: {
        callFrom: true,
        callTo: true,
        callSighash: true,
        callValue: true,
        callInput: true,
        createResultAddress: true,
        suicideRefundAddress: true,
        suicideAddress: true,
        suicideBalance: true,
      },
    })
}

let initialized = false

const chainConfigs: Record<number, { chain: Chain; archive: KnownArchives; rpcEnv: string } | undefined> = {
  [mainnet.id]: {
    chain: mainnet,
    archive: 'eth-mainnet',
    rpcEnv: process.env.RPC_ENV ?? 'RPC_ENDPOINT',
  },
  [arbitrum.id]: {
    chain: arbitrum,
    archive: 'arbitrum',
    rpcEnv: process.env.RPC_ENV_ARBITRUM ?? 'RPC_ENDPOINT_ARBITRUM',
  },
  [base.id]: {
    chain: base,
    archive: 'base-mainnet',
    rpcEnv: process.env.RPC_ENV_BASE ?? 'RPC_ENDPOINT_BASE',
  },
}

export const run = async ({
  chainId = 1,
  processors,
  postProcessors,
  validators,
}: {
  chainId?: number
  processors: EvmProcessor[]
  postProcessors?: EvmProcessor[]
  validators?: Pick<EvmProcessor, 'process' | 'name'>[]
}) => {
  const config = chainConfigs[chainId]
  if (!config) throw new Error('No chain configuration found.')

  const rpcEnv = config.rpcEnv
  const client = createPublicClient({ chain: config.chain, transport: http(env[rpcEnv]) })
  const latestBlock = await client.getBlock()

  const processor = createSquidProcessor(config.archive, rpcEnv)
  const stateSchema = chainId === 1 ? undefined : `chain-${chainId}`
  const database = new TypeormDatabase({ supportHotBlocks: true, stateSchema })

  // In order to resume from the last processed block while having no `from` block declared,
  //   we must pull the state and use that as our `from` block.
  const databaseState = await database.connect()
  const latestHeight = databaseState.height
  await database.disconnect()

  let from = processors.reduce((min, p) => (p.from && p.from < min ? p.from : min), latestHeight)
  if (from === -1) {
    from = Number(latestBlock.number)
  }

  processor.setBlockRange({
    from: process.env.BLOCK_FROM ? Number(process.env.BLOCK_FROM) : from,
  })
  processors.forEach((p) => p.setup?.(processor, config.chain))
  postProcessors?.forEach((p) => p.setup?.(processor, config.chain))

  processor.run(database, async (_ctx) => {
    const ctx = _ctx as Context
    ctx.chain = config.chain
    ctx.eventsHandled = new Set<string>()
    ctx.isEventHandled = (log: Log) => ctx.eventsHandled.has(log.id)
    ctx.markEventHandled = (log: Log) => ctx.eventsHandled.add(log.id)

    let start: number
    const time = (name: string) => () => {
      const message = `${name} ${Date.now() - start}ms`
      return () => ctx.log.info(message)
    }

    // Initialization Run
    if (!initialized) {
      initialized = true
      ctx.log.info(`initializing`)
      start = Date.now()
      const times = await Promise.all([
        ...processors
          .filter((p) => p.initialize)
          .map((p, index) => p.initialize!(ctx).then(time(p.name ?? `initializing processor-${index}`))),
        ...(postProcessors ?? [])
          .filter((p) => p.initialize)
          .map((p, index) => p.initialize!(ctx).then(time(p.name ?? `initializing postProcessors-${index}`))),
      ])
      times.forEach((t) => t())
    }

    // Main Processing Run
    start = Date.now()
    const times = await Promise.all(
      processors.map((p, index) => p.process(ctx).then(time(p.name ?? `processor-${index}`))),
    )
    if (process.env.DEBUG_PERF === 'true') {
      times.forEach((t) => t())
    }

    if (postProcessors) {
      // Post Processing Run
      start = Date.now()
      const postTimes = await Promise.all(
        postProcessors.map((p, index) => p.process(ctx).then(time(p.name ?? `postProcessor-${index}`))),
      )
      if (process.env.DEBUG_PERF === 'true') {
        postTimes.forEach((t) => t())
      }
    }

    if (validators) {
      // Validation Run
      start = Date.now()
      const validatorTimes = await Promise.all(
        validators.map((p, index) => p.process(ctx).then(time(p.name ?? `validator-${index}`))),
      )
      if (process.env.DEBUG_PERF === 'true') {
        validatorTimes.forEach((t) => t())
      }
    }

    await processDiscordQueue()
    await processOncallQueue()
  })
}
