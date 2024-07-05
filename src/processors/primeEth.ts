import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as lrtdepositpoool from '../abi/lrtdepositpoool'
import { notifyDiscord } from '../notify/discord'
import { notifyForEvent } from '../notify/event'
import { Block, Context, Log } from '../types'
import { PRIMEETH_LRT_DEPOSIT_POOL } from '../utils/addresses'
import { logFilter } from '../utils/logFilter'
import { createProcessor } from './processors'

// This filter will listen to all ERC20 events on the OGN contract.
const filter = logFilter({
  address: [PRIMEETH_LRT_DEPOSIT_POOL],
  topic0: [lrtdepositpoool.events.WithdrawalRequested.topic, lrtdepositpoool.events.WithdrawalClaimed.topic],
})

createProcessor({
  name: 'primeETH LRT Deposit Pool',
  topic: 'primeETH',
  chainId: 1,
  setup: (processor: EvmBatchProcessor) => {
    processor.addLog(filter.value)
  },
  process: async (ctx: Context) => {
    for (const block of ctx.blocks) {
      for (const log of block.logs) {
        if (filter.matches(log)) {
          await processLog(block, log)
        }
      }
    }
  },
})

const processLog = async (block: Block, log: Log) => {
  if (log.topics[0] === lrtdepositpoool.events.WithdrawalRequested.topic) {
    const { withdrawer, assetAmount, primeETHAmount } = lrtdepositpoool.events.WithdrawalRequested.decode(log)

    console.log(log.transactionHash)
    console.log(withdrawer, Number(assetAmount) / 1e18, Number(primeETHAmount) / 1e18)
  }
  if (log.topics[0] === lrtdepositpoool.events.WithdrawalClaimed.topic) {
    // console.log(log.topics)
    // const { withdrawer, asset, assets } = lrtdepositpoool.events.WithdrawalClaimed.decode(log)
  }
}

const notify = async (log: Log) => {
  // return notifyDiscord({
  //   topic,
  //   severity,
  //   title: `${name ?? topic} - ${eventName}`,
  //   description: md.construct(
  //     md.code(
  //       md.blockTable([
  //         ['Block - Time', `${log.block.height} - ${new Date(log.block.timestamp).toISOString()}`],
  //         ['Address', `${log.address}${addressName ? ` (${addressName})` : ''}`],
  //         ['Transaction', log.transactionHash],
  //         ['Event', eventName],
  //       ]),
  //       'Event Data:',
  //       md.indent(formatJson(data)),
  //     ),
  //   ),
  //   links: {
  //     tx: `https://etherscan.io/tx/${log.transactionHash}`,
  //   },
  //   mentions: notifyTarget?.discordMentions,
  // })
}
