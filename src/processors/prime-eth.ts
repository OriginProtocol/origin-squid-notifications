import * as lrtDepositPoolAbi from '../abi/lrt-deposit-pool'
import { discordIconOrName } from '../notify/const'
import { renderDiscordEmbed } from '../notify/event/renderers/utils'
import { PRIME_ETH_ADDRESS, PRIME_ETH_LRT_DEPOSIT_POOL } from '../utils/addresses'
import { formatAmount } from '../utils/formatAmount'
import { transactionLink } from '../utils/links'
import { createEventProcessor } from './templates/event'

createEventProcessor({
  name: 'primeETH LRT Deposit Pool',
  topic: 'primeETH',
  chainId: 1,
  tracks: [
    {
      address: [PRIME_ETH_LRT_DEPOSIT_POOL],
      events: lrtDepositPoolAbi.events,
      renderers: {
        AssetDeposit: ({ ctx, log, topic, severity }) => {
          const { depositor, depositAmount, primeEthMintAmount, asset, referralId } =
            lrtDepositPoolAbi.events.AssetDeposit.decode(log)
          renderDiscordEmbed({
            sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
            topic,
            severity,
            title: 'Asset Deposit',
            titleUrl: transactionLink(log.transactionHash, ctx.chain),
            description: `[${depositor}](https://etherscan.io/address/${depositor})`,
            fields: [
              {
                name: formatAmount(depositAmount),
                value: `${discordIconOrName(asset)} Deposited`,
                inline: true,
              },
              {
                name: formatAmount(primeEthMintAmount),
                value: `${discordIconOrName(PRIME_ETH_ADDRESS)} Received`,
                inline: true,
              },
              {
                name: referralId || '-',
                value: 'Referral',
                inline: true,
              },
            ],
          })
        },
        WithdrawalRequested: ({ ctx, log, topic, severity }) => {
          severity = severity ?? 'low'
          const { withdrawer, assetAmount, primeETHAmount, asset } =
            lrtDepositPoolAbi.events.WithdrawalRequested.decode(log)
          renderDiscordEmbed({
            sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
            topic,
            severity,
            title: 'Withdrawal Requested',
            titleUrl: transactionLink(log.transactionHash, ctx.chain),
            description: `[${withdrawer}](https://etherscan.io/address/${withdrawer})`,
            fields: [
              {
                name: formatAmount(primeETHAmount),
                value: `${discordIconOrName(PRIME_ETH_ADDRESS)} Burn`,
                inline: true,
              },
              {
                name: formatAmount(assetAmount),
                value: `${discordIconOrName(asset)} Request`,
                inline: true,
              },
            ],
          })
        },
        WithdrawalClaimed: ({ ctx, log, topic, severity }) => {
          severity = severity ?? 'low'
          const { withdrawer, asset, assets } = lrtDepositPoolAbi.events.WithdrawalClaimed.decode(log)
          renderDiscordEmbed({
            sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
            topic,
            severity,
            title: 'Withdrawal Claimed',
            titleUrl: transactionLink(log.transactionHash, ctx.chain),
            description: `[${withdrawer}](https://etherscan.io/address/${withdrawer})`,
            fields: [
              {
                name: formatAmount(assets),
                value: `${discordIconOrName(asset)} Received`,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})
