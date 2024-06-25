import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import { Chain, createPublicClient, http } from 'viem'
import { arbitrum, mainnet } from 'viem/chains'

import { lookupArchive } from '@subsquid/archive-registry'
import { KnownArchives } from '@subsquid/archive-registry/lib/chains'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'

import { Context, EvmProcessor } from './types'
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
        // gasUsed: true,
        // gas: true,
        // value: true,
        // sighash: true,
        input: true,
        // status: true,
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

  const rpcEnv = process.env.RPC_ENV ?? 'RPC_ENDPOINT'
  const client = createPublicClient({ chain: config.chain, transport: http(env[rpcEnv]) })
  const latestBlock = await client.getBlock()

  const processor = createSquidProcessor(config.archive, rpcEnv)
  processor.setBlockRange({
    from: process.env.BLOCK_FROM
      ? Number(process.env.BLOCK_FROM)
      : processors.reduce((min, p) => (p.from && p.from < min ? p.from : min), Number(latestBlock.number)),
  })
  processors.forEach((p) => p.setup?.(processor, config.chain))
  postProcessors?.forEach((p) => p.setup?.(processor, config.chain))

  processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (_ctx) => {
    const ctx = _ctx as Context
    try {
      ctx.chain = config.chain

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
    } catch (err) {
      ctx.log.info({
        blocks: ctx.blocks.length,
        logs: ctx.blocks.reduce((sum, block) => sum + block.logs.length, 0),
        traces: ctx.blocks.reduce((sum, block) => sum + block.traces.length, 0),
        transactions: ctx.blocks.reduce((sum, block) => sum + block.transactions.length, 0),
        // logArray: ctx.blocks.reduce(
        //   (logs, block) => [...logs, ...block.logs],
        //   [] as Log[],
        // ),
      })
      throw err
    }
  })
}
