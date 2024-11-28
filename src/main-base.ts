import 'tsconfig-paths/register'
import { base } from 'viem/chains'

import { run } from './evm-processor'
import { load } from './processors'

load().then((processors) => {
  run({ chainId: base.id, processors: processors.filter((p) => p.chainId === base.id) }).catch((err) => {
    throw err
  })
})
