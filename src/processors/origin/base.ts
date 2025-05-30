import { omit, pick } from 'lodash'
import { base } from 'viem/chains'

import { createOTokenCurvePoolBoosterProcessor } from '@processors/templates/otoken-curve-pool-booster'

import * as aeroBribeVotingRewardsABI from '../../abi/aerodrome-bribe-voting-rewards'
import * as aeroCLPoolABI from '../../abi/aerodrome-cl-pool'
import * as aeroPoolABI from '../../abi/aerodrome-pool'
import * as strategyCurveAmoAbi from '../../abi/base-curve-amo'
import * as erc20ABI from '../../abi/erc20'
import * as multisigABI from '../../abi/multisig'
import * as oethZapperAbi from '../../abi/oeth-zapper'
import * as strategyAerodromeAMOABI from '../../abi/strategy-aerodrome-amo'
import * as strategyBridgedWOETHABI from '../../abi/strategy-bridged-woeth'
import * as timelockABI from '../../abi/timelock'
import { discordIconOrName, notifyTargets } from '../../notify/const'
import { renderEventDiscordEmbed } from '../../notify/event/renderers/utils'
import { WOETH_ADDRESS } from '../../utils/addresses'
import { oethBaseABIs } from '../../utils/addresses/address-abis'
import { baseAddresses } from '../../utils/addresses/addresses-base'
import { formatAmount } from '../../utils/formatAmount'
import { meetsLimit } from '../../utils/limits'
import { createBurnProcessor } from '../templates/burn'
import { createEventProcessor } from '../templates/event'
import { createOTokenProcessor } from '../templates/otoken'
import { createOTokenVaultProcessor } from '../templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '../templates/proxy'
import { createTraceErrorProcessor } from '../templates/trace-errors'

// OTokens
createOTokenProcessor({
  name: 'superOETHb Contract',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'superOETHb Vault',
  chainId: base.id,
  address: [baseAddresses.superOETHb.vault],
  topic: 'superOETHb',
})

// Zapper
createEventProcessor({
  name: 'superOETHb Zapper',
  topic: 'superOETHb',
  chainId: base.id,
  tracks: [
    {
      address: [baseAddresses.superOETHb.zapper],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: async (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          if ((await meetsLimit('otoken', 'mint', baseAddresses.superOETHb.address, data.amount)) === false) return

          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://basescan.org/address/${data.minter})`,
            fields: [
              {
                name: formatAmount(data.amount),
                value: discordIconOrName(data.asset) ?? data.asset,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})

// Strategies
createEventProcessor({
  name: 'superOETHb Bridged WOETH Strategy',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyBridgedWOETHABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.bridgedWOETH],
      renderers: {
        WOETHPriceUpdated: (params) => {
          const data = strategyBridgedWOETHABI.events.WOETHPriceUpdated.decode(params.log)
          const amountF = formatAmount(data.newValue, 18, {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
          })
          const changeP = formatAmount(
            ((data.newValue * 1_000000000_000000000n) / data.oldValue - 1_000000000_000000000n) * 100n,
          )
          renderEventDiscordEmbed(params, {
            fields: [
              {
                name: `${amountF} (+${changeP}%)`,
                value: discordIconOrName(WOETH_ADDRESS) ?? WOETH_ADDRESS,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})
createEventProcessor({
  name: 'superOETHb Aerodrome AMO',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyAerodromeAMOABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.amo],
    },
  ],
})
createEventProcessor({
  name: 'superOETHb Curve AMO Strategy',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyCurveAmoAbi.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.curveAMO],
    },
  ],
})

// Bridged WOETH Events
createEventProcessor({
  name: 'Bridged WOETH (Base)',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: erc20ABI.events,
      address: [baseAddresses.tokens.bridgedWOETH],
    },
  ],
})

// Burns
createBurnProcessor({
  name: 'superOETHb Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})
createBurnProcessor({
  name: 'wsuperOETHb Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.wrapped],
  topic: 'superOETHb',
})

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Base',
  chainId: base.id,
  address: baseAddresses.origin,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Base Multisig',
  chainId: base.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(baseAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Timelock
createEventProcessor({
  name: 'Base Timelock',
  chainId: base.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [baseAddresses.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Error Tracing
createTraceErrorProcessor({
  name: 'Super OETH Base Error Trace',
  chainId: base.id,
  address: Object.keys(oethBaseABIs),
  abi: Object.values(oethBaseABIs),
  topic: 'superOETHb',
  severity: 'high',
})

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
        Mint: async (params) => {
          const data = aeroCLPoolABI.events.Mint.decode(params.log)

          const assets = baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].assets
          if ((await meetsLimit('aerodrome', 'mint', assets[0].address, data.amount0)) === false) return
          if ((await meetsLimit('aerodrome', 'mint', assets[1].address, data.amount1)) === false) return

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
        Burn: async (params) => {
          const data = aeroCLPoolABI.events.Burn.decode(params.log)
          if (data.amount === 0n) return

          const assets = baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].assets
          if ((await meetsLimit('aerodrome', 'burn', assets[0].address, data.amount0)) === false) return
          if ((await meetsLimit('aerodrome', 'burn', assets[1].address, data.amount1)) === false) return

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

// Aerodrome Bribe Voting Rewards
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

createOTokenCurvePoolBoosterProcessor({
  name: 'Curve Pool Booster',
  chainId: base.id,
  topic: 'OGN',
})
