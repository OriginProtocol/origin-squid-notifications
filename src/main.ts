import 'tsconfig-paths/register';
import { mainnet } from 'viem/chains';



import { processDiscordQueue } from '@notify/discord';
import { processLokiQueue } from '@notify/loki';
import { processOncallQueue } from '@notify/oncall';
import { run } from '@originprotocol/squid-utils';
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields';



import { persistenceProcessor } from './processors/persistence';
import { load } from './topics';


const from = 21_540_000
process.env.BLOCK_FROM = from.toString()

load().then((processors) => {
  run({
    fromNow: true,
    chainId: mainnet.id,
    processors: [...processors.filter((p) => p.chainId === mainnet.id), persistenceProcessor],
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
})