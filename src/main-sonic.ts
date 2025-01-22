import 'tsconfig-paths/register'

import { run } from './evm-processor'
import { load } from './processors'

load().then((processors) => {
  run({ chainId: 146, processors: processors.filter((p) => p.chainId === 146) }).catch((err) => {
    throw err
  })
})
