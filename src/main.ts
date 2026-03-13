import 'tsconfig-paths/register'
import { mainnet } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processLokiQueue } from '@notify/loki'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { abiRegistry } from '@utils/abi-registry'
import { loadWalletLabels } from '@utils/addresses/names'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { initAlertConfigDb } from './alert-config'
import { createConfigAlertProcessor } from './processors/config-alert'
import { persistenceProcessor } from './processors/persistence'
import { load } from './topics'

const from = 21_540_000
process.env.BLOCK_FROM = from.toString()

const start = async () => {
  await initAlertConfigDb()
  await abiRegistry.loadFromDb()
  await loadWalletLabels()

  // Load code-driven processors with custom process() logic
  const processors = await load()
  const customProcessors = processors.filter((p) => p.chainId === mainnet.id)

  // Config-alert handles all DB-driven rules
  const configAlert = await createConfigAlertProcessor(mainnet.id)

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
