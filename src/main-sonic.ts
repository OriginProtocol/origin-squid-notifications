import 'tsconfig-paths/register'

import { processDiscordQueue } from '@notify/discord'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'

import { load } from './processors'

load().then((processors) => {
  run({
    fromNow: true,
    chainId: 146,
    processors: processors.filter((p) => p.chainId === 146),
    stateSchema: 'sonic',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
    },
  }).catch((err) => {
    throw err
  })
})
