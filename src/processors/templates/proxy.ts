import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as governedUpgradeabilityProxyAbi from '../../abi/governed-upgradeability-proxy'
import { Topic } from '../../notify/discord'
import { notifyForEvent } from '../../notify/event'
import { Context } from '../../types'
import { logFilter } from '../../utils/logFilter'
import { createProcessor } from '../processors'

export const createGovernedUpgradeabilityProxyProcessor = ({
  name,
  chainId,
  addresses,
  topic,
}: {
  name: string
  chainId: number
  addresses: string[]
  topic: Topic
}) => {
  const filter = logFilter({
    address: addresses,
    topic0: Object.values(governedUpgradeabilityProxyAbi.events).map((e) => e.topic),
  })

  createProcessor({
    name,
    description: `Notify InitializeGovernedUpgradeabilityProxy events from ${addresses.join(', ')}.`,
    chainId,
    setup: (processor: EvmBatchProcessor) => {
      processor.addLog(filter.value)
    },
    process: async (ctx: Context) => {
      for (const block of ctx.blocks) {
        for (const log of block.logs) {
          if (filter.matches(log)) {
            const entry = Object.entries(governedUpgradeabilityProxyAbi.events).find(
              ([n, e]) => e.topic === log.topics[0],
            )
            if (entry) {
              const [eventName, event] = entry
              await notifyForEvent({ topic, name, eventName, log, event })
            }
          }
        }
      }
    },
  })
}
