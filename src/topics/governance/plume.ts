import { createEventProcessor } from 'templates/event'
import { createGovernedUpgradeabilityProxyProcessor } from 'templates/proxy'
import { plumeMainnet } from 'viem/chains'

import { notifyTargets } from '@notify/const'
import { plumeAddresses, plumeOrigin } from '@utils/addresses/addresses-plume'

import * as multisigABI from '../../abi/multisig'
import * as timelockABI from '../../abi/timelock'

// Plume Chain Governance Processors
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Plume',
  chainId: plumeMainnet.id,
  address: plumeAddresses.originList,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

createEventProcessor({
  name: 'Plume Multisig',
  chainId: plumeMainnet.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(plumeAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

createEventProcessor({
  name: 'Plume Timelock',
  chainId: plumeMainnet.id,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [plumeOrigin.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
