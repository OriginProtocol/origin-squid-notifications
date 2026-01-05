import { omit, pick } from 'lodash'
import { createEventProcessor } from 'templates/event'

import { strategies } from '@utils/addresses'

import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as strategyGenericAbi from '../../abi/strategy-generic'
import * as strategyMetaMorphoAbi from '../../abi/strategy-meta-morpho'
import * as strategyMorphoAaveAbi from '../../abi/strategy-morpho-aave'

// Morpho Aave Strategy
createEventProcessor({
  name: 'OUSD Morpho Aave Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MorphoAaveStrategy],
      events: omit(strategyMorphoAaveAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Transfer',
        'Approval',
        'TokenExchange',
      ]),
    },
    {
      address: [strategies.ousd.MorphoAaveStrategy],
      events: pick(strategyMorphoAaveAbi.events, 'PTokenRemoved'),
      severity: 'high',
    },
  ],
})

// Meta Morpho Strategy
createEventProcessor({
  name: 'OUSD Meta Morpho Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MetaMorphoStrategy],
      events: omit(strategyMetaMorphoAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Maker Strategy
createEventProcessor({
  name: 'OUSD Maker Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MakerStrategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Gauntlet Prime USDC Strategy
createEventProcessor({
  name: 'OUSD Gauntlet Prime USDC Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.GauntletPrimeUSDCStrategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Gauntlet Prime USDT Strategy
createEventProcessor({
  name: 'OUSD Gauntlet Prime USDT Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.GauntletPrimeUSDTStrategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Sky Savings Rate Strategy
createEventProcessor({
  name: 'OUSD Sky Savings Rate Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.SkySavingsRateStrategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Curve AMO Strategy
createEventProcessor({
  name: 'OUSD Curve AMO Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.OUSDCurveAMOStrategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// Morpho V2 Strategy
createEventProcessor({
  name: 'OUSD Morpho V2 Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MorphoV2Strategy],
      events: omit(strategyGenericAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})
