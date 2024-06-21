import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as erc20 from '../abi/erc20'
import { Context } from '../types'
import { addresses } from '../utils/addresses'
import { logFilter } from '../utils/logFilter'
import { createProcessor } from './processors'

createProcessor({
  name: 'Notifications',
  setup: (processor: EvmBatchProcessor) => {
    processor.addLog(
      logFilter({
        address: [addresses.tokens.WETH],
        topic0: [erc20.events.Transfer.topic],
      }).value,
    )
  },
  process: async (ctx: Context) => {
    for (const block of ctx.blocks) {
      for (const log of block.logs) {
        console.log(log.id)
      }
    }
  },
})
