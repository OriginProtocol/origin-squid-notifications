import 'tsconfig-paths/register'
import { mainnet } from 'viem/chains'

import { processDiscordQueue } from '@notify/discord'
import { processOncallQueue } from '@notify/oncall'
import { run } from '@originprotocol/squid-utils'
import { DEFAULT_FIELDS } from '@utils/batch-processor-fields'

import { load } from './processors'

load().then((processors) => {
  run({
    fromNow: true,
    chainId: mainnet.id,
    processors: processors.filter((p) => p.chainId === mainnet.id),
    stateSchema: 'mainnet',
    postValidation: async (ctx) => {
      await processDiscordQueue()
      await processOncallQueue()
    },
    fields: DEFAULT_FIELDS,
  }).catch((err) => {
    throw err
  })
})
