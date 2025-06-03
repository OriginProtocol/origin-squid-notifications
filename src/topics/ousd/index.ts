import { omit, pick } from 'lodash'
import { createBurnProcessor } from 'templates/burn'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenBuybackProcessor } from 'templates/otoken-buyback'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'
import { createTraceErrorProcessor } from 'templates/trace-errors'

import { OUSD_ADDRESS, OUSD_BUYBACK, OUSD_VAULT_ADDRESS, strategies } from '@utils/addresses'
import { ousdABIs } from '@utils/addresses/address-abis'
import { WOUSD } from '@utils/addresses/ousd-analytics'

import * as aaveGovernanceAbi from '../../abi/aave-governance'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as strategyGenericAbi from '../../abi/strategy-generic'
import * as strategyMetaMorphoAbi from '../../abi/strategy-meta-morpho'
import * as strategyMorphoAaveAbi from '../../abi/strategy-morpho-aave'

export const AAVE_GOVERNANCE_ADDRESS = '0x9aee0b04504cef83a65ac3f0e838d0593bcb2bc7'
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

createTraceErrorProcessor({
  name: 'OUSD Error Trace',
  chainId: 1,
  address: Object.keys(ousdABIs),
  abi: Object.values(ousdABIs),
  topic: 'OUSD',
  severity: 'high',
})

createOTokenBuybackProcessor({ name: 'OUSD Buyback', chainId: 1, address: [OUSD_BUYBACK], topic: 'OUSD' })

createBurnProcessor({ name: 'OUSD Burn', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })
createBurnProcessor({ name: 'WOUSD Burn', chainId: 1, address: [WOUSD], topic: 'OUSD' })

createOTokenVaultProcessor({ name: 'OUSD Vault', chainId: 1, address: [OUSD_VAULT_ADDRESS], topic: 'OUSD' })

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
createOTokenProcessor({ name: 'OUSD Contract', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })
