import { createEventProcessor } from 'templates/event'
import { createGovernedUpgradeabilityProxyProcessor } from 'templates/proxy'
import { base } from 'viem/chains'

import { notifyTargets } from '@notify/const'
import { baseAddresses } from '@utils/addresses/addresses-base'

import * as multisigABI from '../../abi/multisig'
import * as timelockABI from '../../abi/timelock'

// Base Chain Governance Processors
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Base',
  chainId: base.id,
  address: baseAddresses.origin,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

createEventProcessor({
  name: 'Base Multisig',
  chainId: base.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(baseAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

createEventProcessor({
  name: 'Base Timelock',
  chainId: base.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [baseAddresses.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
