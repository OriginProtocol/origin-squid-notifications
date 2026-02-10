import 'tsconfig-paths/register'
import { sonic } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processLokiQueue } from '@notify/loki'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { load } from './topics'

load().then((processors) => {
  run({
    fromNow: true,
    chainId: sonic.id,
    processors: processors.filter((p) => p.chainId === sonic.id),
    stateSchema: 'sonic',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
      await processLokiQueue()
    },
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
})
