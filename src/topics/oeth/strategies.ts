import { omit, pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createTraceProcessor } from 'templates/trace'

import { notifyTargets } from '@notify/const'
import { simpleEventRenderer } from '@notify/event/renderers/simple'
import { OETH_ETH_AMO_METAPOOL, OETH_NATIVE_STRATEGY_ADDRESSES } from '@utils/addresses'

import * as strategyCurveMetapoolAbi from '../../abi/curve-metapool'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as strategyNativeStakingAbi from '../../abi/strategy-native-staking'

// Native Staking Strategy Trace (Suicide Refunds)
createTraceProcessor({
  name: 'OETH Native Staking - Suicide Refund Received',
  topic: 'OETH',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
  chainId: 1,
  markEventsNotified: false,
  abi: [strategyNativeStakingAbi],
  traceParams: [
    {
      type: ['suicide'],
      suicideRefundAddress: OETH_NATIVE_STRATEGY_ADDRESSES,
    },
  ],
})

// Native Staking Strategy Events
createEventProcessor({
  name: 'OETH Native Staking Strategy',
  chainId: 1,
  topic: 'OETH',
  tracks: [
    {
      address: OETH_NATIVE_STRATEGY_ADDRESSES,
      events: omit(strategyNativeStakingAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Paused',
        'PTokenAdded',
        'PTokenRemoved',
      ]),
      renderers: {
        ETHStaked: simpleEventRenderer,
        SSVValidatorExitCompleted: simpleEventRenderer,
        SSVValidatorExitInitiated: simpleEventRenderer,
        SSVValidatorRegistered: simpleEventRenderer,
        StakeETHTallyReset: simpleEventRenderer,
      },
    },
    {
      address: OETH_NATIVE_STRATEGY_ADDRESSES,
      events: pick(strategyNativeStakingAbi.events, 'Paused', 'PTokenAdded', 'PTokenRemoved'),
      severity: 'high',
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Curve AMO Strategy
createEventProcessor({
  name: 'OETH Curve AMO Strategy',
  chainId: 1,
  topic: 'OETH',
  tracks: [
    {
      address: [OETH_ETH_AMO_METAPOOL],
      events: omit(strategyCurveMetapoolAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Transfer',
        'Approval',
        'TokenExchange',
      ]),
    },
    {
      address: [OETH_ETH_AMO_METAPOOL],
      events: pick(strategyCurveMetapoolAbi.events, 'PTokenRemoved'),
      severity: 'high',
    },
  ],
})
