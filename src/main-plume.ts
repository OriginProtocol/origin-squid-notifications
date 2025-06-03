import 'tsconfig-paths/register'
import { plumeMainnet } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'

import { load } from './topics'
import { DEFAULT_FIELDS } from './utils/batch-processor-fields'

load().then((processors) => {
  run({
    fromNow: true,
    chainId: plumeMainnet.id,
    processors: processors.filter((p) => p.chainId === plumeMainnet.id),
    stateSchema: 'plume',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
    },
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
})
