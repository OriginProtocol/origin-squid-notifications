import { logFilter } from '@originprotocol/squid-utils'
import { Block, Context, Log } from '@originprotocol/squid-utils'
import { EvmBatchProcessor } from '@subsquid/evm-processor'

import { createProcessor } from '..'
import * as erc20 from '../../abi/erc20'
import { notifyForEvent } from '../../notify/event'
import { OGN_ADDRESS } from '../../utils/addresses'

// This filter will listen to all ERC20 events on the OGN contract.
const filter = logFilter({
  address: [OGN_ADDRESS],
  topic0: Object.values(erc20.events).map((e) => e.topic),
})

createProcessor({
  name: 'OGN ERC20 Events',
  topic: 'OGN',
  chainId: 1,
  setup: (processor: EvmBatchProcessor) => {
    processor.addLog(filter.value)
  },
  process: async (ctx: Context) => {
    for (const block of ctx.blocks) {
      for (const log of block.logs) {
        if (filter.matches(log)) {
          await processLog(ctx, block, log)
        }
      }
    }
  },
})

const processLog = async (ctx: Context, block: Block, log: Log) => {
  const entry = Object.entries(erc20.events).find(([n, e]) => e.topic === log.topics[0])
  if (entry) {
    const [name, event] = entry
    await notifyForEvent({ ctx, block, log, topic: 'OGN', eventName: name, event })
  }
}
