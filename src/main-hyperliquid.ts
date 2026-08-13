import 'tsconfig-paths/register';

import { processDiscordQueue } from '@notify/discord';
import { processLokiQueue } from '@notify/loki';
import { processOncallQueue } from '@notify/oncall';
import { run } from '@originprotocol/squid-utils';
import { abiRegistry } from '@utils/abi-registry';
import { loadWalletLabels } from '@utils/addresses/names';
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields';
import { hyperliquid } from '@utils/chains';



import { initAlertConfigDb } from './alert-config';
import { createConfigAlertProcessor } from './processors/config-alert';
import { persistenceProcessor } from './processors/persistence';
import { load } from './topics';


const start = async () => {
  await initAlertConfigDb()
  await abiRegistry.loadFromDb()
  await loadWalletLabels()

  const processors = await load()
  const customProcessors = processors.filter((p) => p.chainId === hyperliquid.id)
  const configAlert = await createConfigAlertProcessor(hyperliquid.id)

  run({
    fromNow: true,
    chainId: hyperliquid.id as any,
    processors: [...customProcessors, configAlert, persistenceProcessor],
    stateSchema: 'hyperliquid',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
      await processLokiQueue()
    },
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
}

start()
