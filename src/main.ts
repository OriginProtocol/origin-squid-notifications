import 'tsconfig-paths/register'

import { run } from './evm-processor'
import { load } from './processors'

load().then((processors) => {
  run({ chainId: 1, processors: processors.filter((p) => p.chainId === 1) }).catch((err) => {
    throw err
  })
})
