import * as strategyCurveMetapoolAbi from '../abi/curve-metapool'
import * as governedUpgradeabilityProxy from '../abi/governed-upgradeability-proxy'
import * as strategyMorphoAaveAbi from '../abi/strategy-morpho-aave'
import * as strategyNativeStakingAbi from '../abi/strategy-native-staking'
import { discordMentions } from '../notify/discord'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_ETH_AMO_METAPOOL,
  OETH_NATIVE_STRATEGY_ADDRESS,
  OETH_VAULT_ADDRESS,
  OGN_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGN_REWARDS_SOURCE_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_VAULT_ADDRESS,
  XOGN_ADDRESS,
  addresses,
  strategies,
} from '../utils/addresses'
import { oethABIs, ognABIs, ousdABIs } from '../utils/addresses/address-abis'
import { GOVERNANCE_TIMELOCK } from '../utils/addresses/addresses-py'
import { createBurnProcessor } from './templates/burn'
import { createEventProcessor } from './templates/event'
import { createExponentialStakingProcessor } from './templates/exponential-staking'
import { createFixedRateRewardsSourceProcessor } from './templates/fixed-rate-rewards-source'
import { createGovernanceProcessor } from './templates/governance'
import { createOTokenProcessor } from './templates/otoken'
import { createOTokenBuybackProcessor } from './templates/otoken-buyback'
import { createOTokenVaultProcessor } from './templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from './templates/proxy'
import { createTimelockProcessor } from './templates/timelock'
import { createTraceErrorProcessor } from './templates/trace-errors'

// OTokens
createOTokenProcessor({ name: 'OETH Contract', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createOTokenProcessor({ name: 'OUSD Contract', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })

// OToken Strategies
createEventProcessor({
  name: 'OETH Native Staking Strategy',
  description: 'Notify for events on the OETH native staking strategy.',
  chainId: 1,
  address: [OETH_NATIVE_STRATEGY_ADDRESS],
  topic: 'OETH',
  events: strategyNativeStakingAbi.events,
  excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
})
createEventProcessor({
  name: 'OETH Curve AMO Strategy',
  description: 'Notify for events on the OETH curve AMO strategy.',
  chainId: 1,
  address: [OETH_ETH_AMO_METAPOOL],
  topic: 'OETH',
  events: strategyCurveMetapoolAbi.events,
  excludedEvents: [...Object.keys(governedUpgradeabilityProxy.events), 'Transfer', 'Approval', 'TokenExchange'],
})
createEventProcessor({
  name: 'OUSD Morpho Aave Strategy',
  description: 'Notify for events on the OUSD morpho aave strategy.',
  chainId: 1,
  address: [strategies.ousd.MorphoAaveStrategy],
  topic: 'OUSD',
  events: strategyMorphoAaveAbi.events,
  excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
})

// OTokenVaults
createOTokenVaultProcessor({ name: 'OETH Vault', chainId: 1, address: [OETH_VAULT_ADDRESS], topic: 'OETH' })
createOTokenVaultProcessor({ name: 'OUSD Vault', chainId: 1, address: [OUSD_VAULT_ADDRESS], topic: 'OUSD' })

// Rewards Source
createFixedRateRewardsSourceProcessor({
  name: 'Origin Rewards',
  chainId: 1,
  address: [OGN_REWARDS_SOURCE_ADDRESS],
  topic: 'OGN',
})

// Burns
createBurnProcessor({ name: 'OGN Burn', chainId: 1, address: [OGN_ADDRESS], topic: 'OGN' })
createBurnProcessor({ name: 'OETH Burn', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createBurnProcessor({ name: 'OUSD Burn', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })

// Governance Related
createGovernanceProcessor({ name: 'Origin Governance', chainId: 1, address: [OGN_GOVERNANCE_ADDRESS], topic: 'OGN' })
createTimelockProcessor({ name: 'Origin Timelock', chainId: 1, address: [GOVERNANCE_TIMELOCK], topic: 'OGN' })
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts',
  chainId: 1,
  address: addresses.origin,
  topic: 'OGN',
})

// Buybacks
createOTokenBuybackProcessor({ name: 'OETH Buyback', chainId: 1, address: [OETH_BUYBACK], topic: 'OETH' })
createOTokenBuybackProcessor({ name: 'OUSD Buyback', chainId: 1, address: [OUSD_BUYBACK], topic: 'OUSD' })

// Staking
createExponentialStakingProcessor({ name: 'OGN Staking', chainId: 1, address: [XOGN_ADDRESS], topic: 'xOGN' })

// Error Tracing
createTraceErrorProcessor({
  name: 'OGN Error Trace',
  chainId: 1,
  address: Object.keys(ognABIs),
  abi: Object.values(ognABIs),
  topic: 'OGN',
  discordOptions: { mentions: [discordMentions.Engineering] },
})
createTraceErrorProcessor({
  name: 'OETH Error Trace',
  chainId: 1,
  address: Object.keys(oethABIs),
  abi: Object.values(oethABIs),
  topic: 'OETH',
  discordOptions: { mentions: [discordMentions.Engineering] },
})
createTraceErrorProcessor({
  name: 'OUSD Error Trace',
  chainId: 1,
  address: Object.keys(ousdABIs),
  abi: Object.values(ousdABIs),
  topic: 'OUSD',
  discordOptions: { mentions: [discordMentions.Engineering] },
})
