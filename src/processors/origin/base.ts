import { base } from 'viem/chains'

import { notifyTargets } from '../../notify/const'
import {
  SUPER_OETH_BASE_ADDRESS,
  SUPER_OETH_VAULT_BASE_ADDRESS,
  SUPER_WOETH_BASE_ADDRESS,
  addresses,
} from '../../utils/addresses'
import { oethBaseABIs } from '../../utils/addresses/address-abis'
import { createBurnProcessor } from '../templates/burn'
import { createOTokenProcessor } from '../templates/otoken'
import { createOTokenVaultProcessor } from '../templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '../templates/proxy'
import { createTraceErrorProcessor } from '../templates/trace-errors'

// OTokens
createOTokenProcessor({
  name: 'Super OETH Base Contract',
  chainId: base.id,
  address: [SUPER_OETH_BASE_ADDRESS],
  topic: 'OETH',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'Super OETH Base Vault',
  chainId: base.id,
  address: [SUPER_OETH_VAULT_BASE_ADDRESS],
  topic: 'OETH',
})

// Burns
createBurnProcessor({
  name: 'Super OETH Base Burn',
  chainId: base.id,
  address: [SUPER_OETH_BASE_ADDRESS],
  topic: 'OETH',
})
createBurnProcessor({
  name: 'Wrapped Super OETH Base Burn',
  chainId: base.id,
  address: [SUPER_WOETH_BASE_ADDRESS],
  topic: 'OETH',
})

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Base',
  chainId: base.id,
  address: addresses.originBase,
  topic: 'OGN',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Error Tracing
createTraceErrorProcessor({
  name: 'Super OETH Base Error Trace',
  chainId: base.id,
  address: Object.keys(oethBaseABIs),
  abi: Object.values(oethBaseABIs),
  topic: 'OETH',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})
