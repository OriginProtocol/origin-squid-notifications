import { EmbedBuilder } from 'discord.js'
import { round } from 'lodash'

import * as lrtDepositPoolAbi from '../../abi/lrt-deposit-pool'
import { DiscordOptions, notifyDiscord } from '../discord'
import { registerEventRenderer } from './renderers'

registerEventRenderer(
  [
    lrtDepositPoolAbi.events.WithdrawalRequested.topic,
    // , lrtdepositpoool.events.WithdrawalClaimed.topic
  ],
  async ({ log }) => {
    if (log.topics[0] === lrtDepositPoolAbi.events.WithdrawalRequested.topic) {
      const { withdrawer, assetAmount, primeETHAmount } = lrtDepositPoolAbi.events.WithdrawalRequested.decode(log)

      const fmtAssetAmount = round(Number(assetAmount) / 1e18, 4)
      const fmtPrimeETHAmount = round(Number(primeETHAmount) / 1e18, 4)

      await notify(log.transactionHash, withdrawer, fmtAssetAmount, fmtPrimeETHAmount)
    }
    // if (log.topics[0] === lrtdepositpoool.events.WithdrawalClaimed.topic) {
    //   console.log(log.topics)
    //   const { withdrawer, asset, assets } = lrtdepositpoool.events.WithdrawalClaimed.decode(log)
    // }
  },
)

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
