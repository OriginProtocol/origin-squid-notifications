import 'tsconfig-paths/register'
import { base } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processLokiQueue } from '@notify/loki'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { createConfigAlertProcessor } from './processors/config-alert'
import { persistenceProcessor } from './processors/persistence'

const from = 23_800_000
process.env.BLOCK_FROM = from.toString()

const start = async () => {
  const configAlert = await createConfigAlertProcessor(base.id)

  run({
    fromNow: true,
    chainId: base.id,
    processors: [configAlert, persistenceProcessor],
    stateSchema: 'base',
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
