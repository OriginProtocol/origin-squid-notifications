import { omit, pick } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { createTraceProcessor } from 'templates/trace'

import { notifyTargets } from '@notify/const'
import { simpleEventRenderer } from '@notify/event/renderers/simple'
import { OETH_COMPOUND_STAKING_SSV_STRATEGIES, OETH_ETH_AMO_METAPOOL, OETH_NATIVE_STRATEGIES } from '@utils/addresses'

import * as strategyCurveMetapoolAbi from '../../abi/curve-metapool'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as strategyCompoundStakingSSVAbi from '../../abi/strategy-compound-staking-ssv'
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
      suicideRefundAddress: OETH_NATIVE_STRATEGIES.map((s) => s.address),
    },
  ],
})

// Compound Staking SSV Strategy Trace (Suicide Refunds)
createTraceProcessor({
  name: 'OETH Compound Staking SSV - Suicide Refund Received',
  topic: 'OETH',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
  chainId: 1,
  markEventsNotified: false,
  abi: [strategyCompoundStakingSSVAbi],
  traceParams: [
    {
      type: ['suicide'],
      suicideRefundAddress: OETH_COMPOUND_STAKING_SSV_STRATEGIES.map((s) => s.address),
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
      address: OETH_NATIVE_STRATEGIES.map((s) => s.address),
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
      address: OETH_NATIVE_STRATEGIES.map((s) => s.address),
      events: pick(strategyNativeStakingAbi.events, 'Paused', 'PTokenAdded', 'PTokenRemoved'),
      severity: 'high',
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Compound Staking SSV Strategy

createEventProcessor({
  name: 'OETH Compound Staking SSV Strategy',
  chainId: 1,
  topic: 'OETH',
  tracks: [
    {
      address: OETH_COMPOUND_STAKING_SSV_STRATEGIES.map((s) => s.address),
      events: omit(strategyCompoundStakingSSVAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Paused',
        'PTokenAdded',
        'PTokenRemoved',
      ]),
      renderers: {
        ETHStaked: simpleEventRenderer,
      },
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
