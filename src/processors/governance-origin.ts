import { OGN_GOVERNANCE_ADDRESS } from '../utils/addresses'
import { createGovernanceProcessor } from './templates/governance'

createGovernanceProcessor({
  name: 'OGN Governance',
  chainId: 1,
  address: OGN_GOVERNANCE_ADDRESS,
  topic: 'OGN',
})
