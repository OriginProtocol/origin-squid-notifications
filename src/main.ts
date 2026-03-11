import 'tsconfig-paths/register'
import { mainnet } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processLokiQueue } from '@notify/loki'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { createConfigAlertProcessor } from './processors/config-alert'
import { persistenceProcessor } from './processors/persistence'
import { load } from './topics'

const from = 21_540_000
process.env.BLOCK_FROM = from.toString()

// Processors with fully custom process() logic that config-alert can't replicate.
const CUSTOM_PROCESSOR_NAMES = ['OGN Alerts', 'OGN Buybacks']

const start = async () => {
  // Load custom code-driven processors that config-alert can't replace
  const processors = await load()
  const customProcessors = processors.filter(
    (p) => p.chainId === mainnet.id && CUSTOM_PROCESSOR_NAMES.includes(p.name ?? ''),
  )

  // Config-alert handles all other rules from the DB
  const configAlert = await createConfigAlertProcessor(mainnet.id, CUSTOM_PROCESSOR_NAMES)

  run({
    fromNow: true,
    chainId: mainnet.id,
    processors: [...customProcessors, configAlert, persistenceProcessor],
    stateSchema: 'mainnet',
    postValidation: async (ctx) => {
      // await processDiscordQueue()
      // await processOncallQueue()
      // await processLokiQueue()
    },
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
}

start()