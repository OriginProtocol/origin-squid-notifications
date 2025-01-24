import 'tsconfig-paths/register'
import { base } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'

import { load } from './processors'

load().then((processors) => {
  run({
    fromNow: true,
    chainId: base.id,
    processors: processors.filter((p) => p.chainId === base.id),
    stateSchema: 'base',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
    },
  }).catch((err) => {
    throw err
  })
})
