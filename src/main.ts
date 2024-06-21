import { groupBy } from 'lodash'

import { run } from './evm-processor'
import { processors } from './processors'

const processorsByChain = groupBy(processors, 'chainId')
for (const [chainId, processors] of Object.entries(processorsByChain)) {
  run({ chainId: Number(chainId), processors }).catch((err) => {
    throw err
  })
}
