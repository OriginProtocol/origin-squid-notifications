import { run } from './evm-processor'
import { processors } from './processors'

run({ chainId: 1, processors: processors.filter((p) => p.chainId === 1) }).catch((err) => {
  throw err
})
