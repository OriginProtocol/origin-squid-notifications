import { EmbedBuilder } from 'discord.js'
import { round } from 'lodash'

import { EvmBatchProcessor } from '@subsquid/evm-processor'

import * as lrtdepositpoool from '../abi/lrtdepositpoool'
import { DiscordOptions, notifyDiscord } from '../notify/discord'
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

    const fmtAssetAmount = round(Number(assetAmount) / 1e18, 4)
    const fmtPrimeETHAmount = round(Number(primeETHAmount) / 1e18, 4)

    notify(log.transactionHash, withdrawer, fmtAssetAmount, fmtPrimeETHAmount)
  }
  if (log.topics[0] === lrtdepositpoool.events.WithdrawalClaimed.topic) {
    // console.log(log.topics)
    // const { withdrawer, asset, assets } = lrtdepositpoool.events.WithdrawalClaimed.decode(log)
  }
}

const notify = async (txHash: string, withdrawer: string, assetAmount: number, primeETHAmount: number) => {
  const embeds = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Withdrawal Requested')
    .setURL(`https://etherscan.io/tx/${txHash}`)
    .setDescription(`[${withdrawer}](https://etherscan.io/address/${withdrawer})`)
    .addFields(
      { name: primeETHAmount.toLocaleString(), value: '<:prime_staked_ETH:1202845677332463716> Burn', inline: true },
      { name: assetAmount.toLocaleString(), value: '<:origin_ether_oeth:1091365232770814033> Request', inline: true },
    )
  const msg: DiscordOptions = {
    title: 'Withdrawal Requested',
    embeds: [embeds],
    severity: 'low',
    topic: 'primeETH',
  }

  return notifyDiscord(msg)
}
