import { COMPOUND_GOVERNANCE_ALPHA, COMPOUND_GOVERNANCE_BRAVO, COMPOUND_TIMELOCK } from '../utils/addresses'
import { createGovernanceProcessor } from './templates/governance'
import { createTimelockProcessor } from './templates/timelock'

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

createTimelockProcessor({
  name: 'Compound Timelock',
  chainId: 1,
  address: COMPOUND_TIMELOCK,
  topic: 'OUSD',
})
