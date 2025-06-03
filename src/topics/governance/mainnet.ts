import { createEventProcessor } from 'templates/event'
import { createGovernanceProcessor } from 'templates/governance'
import { createGovernedUpgradeabilityProxyProcessor } from 'templates/proxy'
import { createTimelockProcessor } from 'templates/timelock'

import { notifyTargets } from '@notify/const'
import { OGN_GOVERNANCE_ADDRESS, addresses } from '@utils/addresses'
import { GOVERNANCE_TIMELOCK } from '@utils/addresses/ousd-analytics'

import * as multisigABI from '../../abi/multisig'

// Mainnet Governance Processors
createGovernanceProcessor({
  name: 'Origin Governance',
  chainId: 1,
  address: [OGN_GOVERNANCE_ADDRESS],
  topic: 'Governance',
})

createTimelockProcessor({
  name: 'Origin Timelock',
  chainId: 1,
  address: [GOVERNANCE_TIMELOCK],
  topic: 'Governance',
})

createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts',
  chainId: 1,
  address: addresses.origin,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

createEventProcessor({
  name: 'Mainnet Multisig',
  chainId: 1,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(addresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
