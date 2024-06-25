import { OETH_BUYBACK, OGN_GOVERNANCE_ADDRESS, OUSD_BUYBACK, addresses } from '../utils/addresses/addresses'
import { createGovernanceProcessor } from './templates/governance'
import { createOTokenBuybackProcessor } from './templates/otoken-buyback'
import { createGovernedUpgradeabilityProxyProcessor } from './templates/proxy'

createGovernanceProcessor({
  name: 'OGN Governance',
  chainId: 1,
  address: OGN_GOVERNANCE_ADDRESS,
  topic: 'OGN',
})

createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts',
  chainId: 1,
  addresses: addresses.origin,
  topic: 'OGN',
})

createOTokenBuybackProcessor({
  name: 'OETH Buyback',
  chainId: 1,
  address: OETH_BUYBACK,
  topic: 'OETH',
})

createOTokenBuybackProcessor({
  name: 'OUSD Buyback',
  chainId: 1,
  address: OUSD_BUYBACK,
  topic: 'OUSD',
})
