import { createEventProcessor } from 'templates/event'

import * as aaveGovernanceAbi from '../../abi/aave-governance'

export const AAVE_GOVERNANCE_ADDRESS = '0x9aee0b04504cef83a65ac3f0e838d0593bcb2bc7'

// Aave Governance Monitoring
createEventProcessor({
  name: 'Aave Governance',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [AAVE_GOVERNANCE_ADDRESS],
      events: aaveGovernanceAbi.events,
      severity: 'medium',
    },
  ],
})
