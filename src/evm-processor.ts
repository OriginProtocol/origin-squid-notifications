import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import { compact } from 'lodash'
import { Chain, createPublicClient, http } from 'viem'
import { arbitrum, base, mainnet } from 'viem/chains'

import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { sonic } from '@utils/chains'

import { processDiscordQueue } from './notify/discord'
import { processOncallQueue } from './notify/oncall'
import './rpc-issues'
import { Context, EvmProcessor, Log } from './types'

dayjs.extend(duration)
dayjs.extend(utc)

export interface ChainConfig {
  chain: Chain
  gateway: string
  endpoints: string[]
}

export const createSquidProcessor = (config: ChainConfig) => {
  const url = config.endpoints[0] || 'http://localhost:8545'
  console.log('rpc url', url)
  const processor = new EvmBatchProcessor()
    .setRpcEndpoint({
      url,
      maxBatchCallSize: url.includes('alchemy.com') ? 1 : 100,
      // rateLimit: url.includes('sqd_rpc') ? 100 : undefined,
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

  if (process.env.DISABLE_ARCHIVE !== 'true') {
    console.log(`Archive gateway: ${config.gateway}`)
    processor.setGateway(config.gateway)
  } else {
    console.log(`Archive disabled`)
  }

  return processor
}

let initialized = false

export const chainConfigs = {
  [mainnet.id]: {
    chain: mainnet,
    gateway: 'https://v2.archive.subsquid.io/network/ethereum-mainnet',
    endpoints: compact([
      process.env[process.env.RPC_ENV ?? 'RPC_ENDPOINT'],
      process.env[process.env.RPC_ENV_BACKUP ?? 'RPC_ETH_HTTP'],
    ]),
  },
  [arbitrum.id]: {
    chain: arbitrum,
    gateway: 'https://v2.archive.subsquid.io/network/arbitrum-one',
    endpoints: compact([
      process.env[process.env.RPC_ARBITRUM_ENV ?? 'RPC_ARBITRUM_ENDPOINT'],
      process.env[process.env.RPC_ARBITRUM_ENV_BACKUP ?? 'RPC_ARBITRUM_ONE_HTTP'],
    ]),
  },
  [base.id]: {
    chain: base,
    gateway: 'https://v2.archive.subsquid.io/network/base-mainnet',
    endpoints: compact([
      process.env[process.env.RPC_BASE_ENV ?? 'RPC_BASE_ENDPOINT'],
      process.env[process.env.RPC_BASE_ENV_BACKUP ?? 'RPC_BASE_HTTP'],
    ]),
  },
  [sonic.id]: {
    chain: sonic,
    gateway: 'https://v2.archive.subsquid.io/network/sonic-mainnet',
    endpoints: compact([
      process.env[process.env.RPC_SONIC_ENV ?? 'RPC_SONIC_ENDPOINT'],
      process.env[process.env.RPC_SONIC_ENV_BACKUP ?? 'RPC_SONIC_HTTP'],
    ]),
  },
} as const

export const run = async ({
  chainId = 1,
  processors,
  postProcessors,
  validators,
}: {
  chainId?: 1 | 42161 | 8453 | 146
  processors: EvmProcessor[]
  postProcessors?: EvmProcessor[]
  validators?: Pick<EvmProcessor, 'process' | 'name'>[]
}) => {
  const config = chainConfigs[chainId]
  if (!config) throw new Error('No chain configuration found.')

  const client = createPublicClient({ chain: config.chain, transport: http(config.endpoints[0]) })
  const latestBlock = await client.getBlock()

  const processor = createSquidProcessor(config)
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
