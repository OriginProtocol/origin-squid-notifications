import { COMPOUND_GOVERNANCE_ALPHA, COMPOUND_GOVERNANCE_BRAVO, OGN_GOVERNANCE_ADDRESS } from '../utils/addresses'
import { createGovernanceProcessor } from './templates/governance'

createGovernanceProcessor({
  name: 'Compound Governance Alpha',
  chainId: 1,
  address: COMPOUND_GOVERNANCE_ALPHA,
  topic: 'OUSD',
})

createGovernanceProcessor({
  name: 'Compound Governance Bravo',
  chainId: 1,
  address: COMPOUND_GOVERNANCE_BRAVO,
  topic: 'OUSD',
})
