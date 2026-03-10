import { pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { base } from 'viem/chains'

import { discordIconOrName } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { formatAmount } from '@utils/formatAmount'

import * as aeroBribeVotingRewardsABI from '../../abi/aerodrome-bribe-voting-rewards'
import * as aeroCLPoolABI from '../../abi/aerodrome-cl-pool'
import * as aeroPoolABI from '../../abi/aerodrome-pool'

// Aerodrome vAMM Pools
createEventProcessor({
  name: 'Aerodrome vAMM Pools',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: pick(aeroPoolABI.events, ['Mint', 'Burn', 'Swap']),
      address: [
        baseAddresses.aerodrome.pools['vAMM-WETH/OGN'].address,
        baseAddresses.aerodrome.pools['vAMM-OGN/superOETHb'].address,
      ],
    },
  ],
})

// Aerodrome CL Pools
createEventProcessor({
  name: 'Aerodrome CL Pools',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: pick(aeroCLPoolABI.events, ['Mint', 'Burn', 'Swap']),
      address: [baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].address],
      renderers: {
        Mint: (params) => {
          const data = aeroCLPoolABI.events.Mint.decode(params.log)
          renderEventDiscordEmbed(params, {
            description: `[${discordIconOrName(data.owner) ?? data.owner}](https://basescan.org/address/${data.owner})`,
            fields: [
              {
                name: formatAmount(data.amount, 18, { maximumFractionDigits: 6 }),
                value: 'Amount',
                inline: true,
              },
              {
                name: formatAmount(data.amount0, 18, { maximumFractionDigits: 6 }),
                value: 'Amount0',
                inline: true,
              },
              {
                name: formatAmount(data.amount1, 18, { maximumFractionDigits: 6 }),
                value: 'Amount1',
                inline: true,
              },
            ],
          })
        },
        Burn: (params) => {
          const data = aeroCLPoolABI.events.Burn.decode(params.log)
          if (data.amount === 0n) return
          renderEventDiscordEmbed(params, {
            description: `[${discordIconOrName(data.owner) ?? data.owner}](https://basescan.org/address/${data.owner})`,
            fields: [
              {
                name: formatAmount(data.amount, 18, { maximumFractionDigits: 6 }),
                value: 'Amount',
                inline: true,
              },
              {
                name: formatAmount(data.amount0, 18, { maximumFractionDigits: 6 }),
                value: 'Amount0',
                inline: true,
              },
              {
                name: formatAmount(data.amount1, 18, { maximumFractionDigits: 6 }),
                value: 'Amount1',
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})

// Aerodrome Incentives
createEventProcessor({
  name: 'Aerodrome Incentives',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'highlight',
      events: pick(aeroBribeVotingRewardsABI.events, ['NotifyReward']),
      address: [
        baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].gauge.bribeVotingRewards,
        baseAddresses.aerodrome.pools['vAMM-OGN/superOETHb'].gauge.bribeVotingRewards,
      ],
      renderers: {
        NotifyReward: (params) => {
          const pool =
            params.log.address === baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].gauge.bribeVotingRewards
              ? '[CL1-WETH/superOETHb](https://aerodrome.finance/vote?query=CL1-WETH%2FsuperOETHb)'
              : '[vAMM-OGN/superOETHb](https://aerodrome.finance/vote?query=vAMM-OGN%2FsuperOETHb)'
          const data = aeroBribeVotingRewardsABI.events.NotifyReward.decode(params.log)
          const amountF = formatAmount(data.amount, 18, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          renderEventDiscordEmbed(params, {
            description: `Rewards added to: ${pool}`,
            fields: [
              {
                name: `${amountF}`,
                value: discordIconOrName(data.reward) ?? data.reward,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})
