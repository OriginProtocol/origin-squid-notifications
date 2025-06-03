import { pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createGovernedUpgradeabilityProxyProcessor } from 'templates/proxy'

import * as multisigABI from '@abi/multisig'
import * as sfcAbi from '@abi/sonic-sfc'
import * as timelockABI from '@abi/timelock'
import { notifyTargets } from '@notify/const'
import { sonicAddresses, sonicOrigin } from '@utils/addresses/addresses-sonic'

const chainId = 146

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Sonic',
  chainId,
  address: sonicAddresses.originList,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Sonic Multisig',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(sonicAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Timelock
createEventProcessor({
  name: 'Sonic Timelock',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [sonicOrigin.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Sonic Chain SFC
const highPrioritySfcEvents = pick(sfcAbi.events, [
  'ChangedValidatorStatus',
  'Upgraded',
  'OwnershipTransferred',
  'CreatedValidator',
  'DeactivatedValidator',
  'UpdatedSlashingRefundRatio',
])
createEventProcessor({
  name: 'Sonic Chain SFC',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'high',
      events: highPrioritySfcEvents,
      address: [sonicAddresses.sfc],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
