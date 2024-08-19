import { pick } from 'lodash'
import { base } from 'viem/chains'

import * as aeroCLPoolABIs from '../../abi/aerodrome-cl-pool'
import * as aeroPoolABIs from '../../abi/aerodrome-pool'
import * as multisigABIs from '../../abi/multisig'
import { notifyTargets } from '../../notify/const'
import { oethBaseABIs } from '../../utils/addresses/address-abis'
import { baseAddresses } from '../../utils/addresses/addresses-base'
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
  topic: 'OGN',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Base Multisig',
  chainId: base.id,
  topic: 'OGN',
  tracks: [
    {
      severity: 'medium',
      events: multisigABIs.events,
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
      events: pick(aeroPoolABIs.events, ['Mint', 'Burn']),
      address: [
        baseAddresses.aerodrome['vAMM-WETH/OGN'].pool.address,
        baseAddresses.aerodrome['vAMM-OGN/superOETHb'].pool.address,
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
      events: pick(aeroCLPoolABIs.events, ['Mint', 'Burn']),
      address: [baseAddresses.aerodrome['CL1-WETH/superOETHb'].pool.address],
    },
  ],
})
