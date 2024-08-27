import { omit, pick } from 'lodash'
import { base } from 'viem/chains'

import * as aeroCLPoolABI from '../../abi/aerodrome-cl-pool'
import * as aeroPoolABI from '../../abi/aerodrome-pool'
import * as erc20ABI from '../../abi/erc20'
import * as multisigABI from '../../abi/multisig'
import * as oethZapperAbi from '../../abi/oeth-zapper'
import * as strategyBridgedWOETHABI from '../../abi/strategy-bridged-woeth'
import { discordIconOrName, notifyTargets } from '../../notify/const'
import { renderEventDiscordEmbed } from '../../notify/event/renderers/utils'
import { oethBaseABIs } from '../../utils/addresses/address-abis'
import { baseAddresses } from '../../utils/addresses/addresses-base'
import { formatAmount } from '../../utils/formatAmount'
import { createBurnProcessor } from '../templates/burn'
import { createEventProcessor } from '../templates/event'
import { createOTokenProcessor } from '../templates/otoken'
import { createOTokenVaultProcessor } from '../templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '../templates/proxy'
import { createTraceErrorProcessor } from '../templates/trace-errors'

// OTokens
createOTokenProcessor({
  name: 'Super OETH Base Contract',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'Super OETH Base Vault',
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
        Zap: (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
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
  name: 'Super OETH Bridged WOETH Strategy',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyBridgedWOETHABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.bridgedWOETH],
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
  name: 'Super OETH Base Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})
createBurnProcessor({
  name: 'Wrapped Super OETH Base Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.wrapped],
  topic: 'superOETHb',
})

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Base',
  chainId: base.id,
  address: baseAddresses.origin,
  topic: 'superOETHb',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Base Multisig',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(baseAddresses.multisig),
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
  notifyTarget: notifyTargets.Engineering,
})

// Aerodrome vAMM Pools
createEventProcessor({
  name: 'Aerodrome vAMM Pools',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: pick(aeroPoolABI.events, ['Mint', 'Burn']),
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
      events: pick(aeroCLPoolABI.events, ['Mint', 'Burn']),
      address: [baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].address],
    },
  ],
})
