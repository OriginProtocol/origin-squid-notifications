import { omit } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { base } from 'viem/chains'

import { baseAddresses } from '@utils/addresses/addresses-base'

import * as strategyCurveAmoAbi from '../../abi/base-curve-amo'
import * as strategyAerodromeAMOABI from '../../abi/strategy-aerodrome-amo'
import * as strategyBridgedWOETHABI from '../../abi/strategy-bridged-woeth'

// Strategy processors for superOETHb
createEventProcessor({
  name: 'superOETHb Bridged WOETH Strategy',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyBridgedWOETHABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.bridgedWOETH],
    },
  ],
})

createEventProcessor({
  name: 'superOETHb Aerodrome AMO',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyAerodromeAMOABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.amo],
    },
  ],
})

createEventProcessor({
  name: 'superOETHb Curve AMO Strategy',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyCurveAmoAbi.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [baseAddresses.superOETHb.strategies.curveAMO],
    },
  ],
})
