import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as governanceAbi from '../abi/governance'
import { Context } from '../types'
import { OGN_GOVERNANCE_ADDRESS } from '../utils/addresses'
import { notify } from '../utils/discord'
import { formatJson } from '../utils/formatJson'
import { logFilter } from '../utils/logFilter'
import { md } from '../utils/md'
import { createProcessor } from './processors'

const filter = logFilter({
  address: [OGN_GOVERNANCE_ADDRESS],
  topic0: Object.values(governanceAbi.events).map((e) => e.topic),
  range: { from: 20117923 },
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
          const entry = Object.entries(governanceAbi.events).find(([n, e]) => e.topic === log.topics[0])
          if (entry) {
            const [name, event] = entry
            const data = event.decode(log)
            await notify({
              topic: 'OGN',
              title: `OGN Governance - ${name}`,
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
