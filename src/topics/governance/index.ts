import { createEventProcessor } from 'templates/event'
import { createGovernanceProcessor } from 'templates/governance'
import { createGovernedUpgradeabilityProxyProcessor } from 'templates/proxy'
import { createTimelockProcessor } from 'templates/timelock'
import { base, plumeMainnet } from 'viem/chains'

import { notifyTargets } from '@notify/const'
import { OGN_GOVERNANCE_ADDRESS, addresses } from '@utils/addresses'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { plumeAddresses, plumeOrigin } from '@utils/addresses/addresses-plume'
import { GOVERNANCE_TIMELOCK } from '@utils/addresses/ousd-analytics'

import * as multisigABI from '../../abi/multisig'
import * as timelockABI from '../../abi/timelock'

export * from './os'

// Mainnet
createGovernanceProcessor({
  name: 'Origin Governance',
  chainId: 1,
  address: [OGN_GOVERNANCE_ADDRESS],
  topic: 'Governance',
})
createTimelockProcessor({ name: 'Origin Timelock', chainId: 1, address: [GOVERNANCE_TIMELOCK], topic: 'Governance' })
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

// Base
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

// Plume
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Plume',
  chainId: plumeMainnet.id,
  address: plumeAddresses.originList,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
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

// Timelock
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
