import 'tsconfig-paths/register'
import { sonic } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processLokiQueue } from '@notify/loki'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { createConfigAlertProcessor } from './processors/config-alert'
import { persistenceProcessor } from './processors/persistence'

const from = 2_000_000
process.env.BLOCK_FROM = from.toString()

const start = async () => {
  const configAlert = await createConfigAlertProcessor(sonic.id)

  run({
    fromNow: true,
    chainId: sonic.id,
    processors: [configAlert, persistenceProcessor],
    stateSchema: 'sonic',
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