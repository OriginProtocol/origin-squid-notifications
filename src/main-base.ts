import 'tsconfig-paths/register'
import { base } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { load } from './topics'

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
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
})
