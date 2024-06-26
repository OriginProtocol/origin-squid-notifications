import * as otokenAbi from '../abi/otoken'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_VAULT_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_VAULT_ADDRESS,
  XOGN_ADDRESS,
  addresses,
} from '../utils/addresses'
import { createExponentialStakingProcessor } from './templates/exponential-staking'
import { createGovernanceProcessor } from './templates/governance'
import { createOTokenProcessor } from './templates/otoken'
import { createOTokenBuybackProcessor } from './templates/otoken-buyback'
import { createOTokenVaultProcessor } from './templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from './templates/proxy'
import { createTraceProcessor } from './templates/trace'

// OTokens
createOTokenProcessor({ name: 'OETH Contract', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createOTokenProcessor({ name: 'OUSD Contract', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })

// OTokenVaults
createOTokenVaultProcessor({ name: 'OETH Vault', chainId: 1, address: [OETH_VAULT_ADDRESS], topic: 'OETH' })
createOTokenVaultProcessor({ name: 'OUSD Vault', chainId: 1, address: [OUSD_VAULT_ADDRESS], topic: 'OUSD' })

// Governance Related
createGovernanceProcessor({ name: 'OGN Governance', chainId: 1, address: [OGN_GOVERNANCE_ADDRESS], topic: 'OGN' })
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts',
  chainId: 1,
  address: addresses.origin,
  topic: 'OGN',
})

// Buybacks
createOTokenBuybackProcessor({ name: 'OETH Buyback', chainId: 1, address: [OETH_BUYBACK], topic: 'OETH' })
createOTokenBuybackProcessor({ name: 'OUSD Buyback', chainId: 1, address: [OUSD_BUYBACK], topic: 'OUSD' })

// Staking
createExponentialStakingProcessor({ name: 'OGN Staking', chainId: 1, address: [XOGN_ADDRESS], topic: 'xOGN' })

createTraceProcessor({
  name: 'OETH Trace',
  description: 'Testing OETH trace',
  chainId: 1,
  traceParams: { type: ['call'], callTo: [OETH_ADDRESS], error: true },
  abi: [otokenAbi],
  topic: 'OETH',
})
