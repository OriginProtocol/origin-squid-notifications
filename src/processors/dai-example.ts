import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as erc20 from '../abi/erc20'
import { Context } from '../types'
import { DAI_ADDRESS, OGN_GOVERNANCE_ADDRESS } from '../utils/addresses'
import { notify } from '../utils/discord'
import { formatJson } from '../utils/formatJson'
import { logFilter } from '../utils/logFilter'
import { md } from '../utils/md'
import { createProcessor } from './processors'

const filter = logFilter({
  address: [DAI_ADDRESS],
  topic0: Object.values(erc20.events).map((e) => e.topic),
})

createProcessor({
  name: 'OGN Governance',
  chainId: 1,
  // from: filter.value.range?.from,
  setup: (processor: EvmBatchProcessor) => {
    processor.addLog(filter.value)
  },
  process: async (ctx: Context) => {
    for (const block of ctx.blocks) {
      for (const log of block.logs) {
        if (filter.matches(log)) {
          const entry = Object.entries(erc20.events).find(([n, e]) => e.topic === log.topics[0])
          if (entry) {
            const [name, event] = entry
            const data = event.decode(log)
            await notify({
              topic: 'OUSD',
              title: `DAI - ${name}`,
              description: md.construct(
                md.code(
                  md.blockTable([
                    ['Transaction', log.transactionHash],
                    ['Event', name],
                  ]),
                  'Event Data:',
                  md.indent(formatJson(data)),
                ),
              ),
            })
          }
        }
      }
    }
  },
})
