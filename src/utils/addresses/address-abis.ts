import * as erc20Abi from '../../abi/erc20'
import * as exponentialStakingAbi from '../../abi/exponential-staking'
import * as fixedRateRewardsSourceAbi from '../../abi/fixed-rate-rewards-source'
import * as governanceAbi from '../../abi/governance'
import * as otokenAbi from '../../abi/otoken'
import * as otokenBuybackAbi from '../../abi/otoken-buyback'
import * as otokenDripperAbi from '../../abi/otoken-dripper'
import * as otokenHarvesterAbi from '../../abi/otoken-harvester'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import * as strategyMorphoAaveAbi from '../../abi/strategy-morpho-aave'
import * as strategyNativeStakingAbi from '../../abi/strategy-native-staking'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_DRIPPER_ADDRESS,
  OETH_HARVESTER_ADDRESS,
  OETH_NATIVE_STRATEGY_ADDRESS,
  OETH_VAULT_ADDRESS,
  OGN_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGN_REWARDS_SOURCE_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_DRIPPER_ADDRESS,
  OUSD_HARVESTER_ADDRESS,
  OUSD_VAULT_ADDRESS,
  XOGN_ADDRESS,
  strategies,
} from './addresses'

export const ognABIs: Record<string, any> = {
  [OGN_ADDRESS]: erc20Abi,
  [OGN_GOVERNANCE_ADDRESS]: governanceAbi,
  [OGN_REWARDS_SOURCE_ADDRESS]: fixedRateRewardsSourceAbi,
  [XOGN_ADDRESS]: exponentialStakingAbi,
}

export const oethStrategyABIs: Record<string, any> = {
  [OETH_NATIVE_STRATEGY_ADDRESS]: strategyNativeStakingAbi,
}

export const oethABIs: Record<string, any> = {
  [OETH_ADDRESS]: otokenAbi,
  [OETH_VAULT_ADDRESS]: otokenVaultAbi,
  [OETH_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OETH_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OETH_BUYBACK]: otokenBuybackAbi,
  ...oethStrategyABIs,
}

export const ousdStrategyABIs: Record<string, any> = {
  [strategies.ousd.MorphoAaveStrategy]: strategyMorphoAaveAbi,
}

export const ousdABIs: Record<string, any> = {
  [OUSD_ADDRESS]: otokenAbi,
  [OUSD_VAULT_ADDRESS]: otokenVaultAbi,
  [OUSD_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OUSD_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OUSD_BUYBACK]: otokenBuybackAbi,
  ...ousdStrategyABIs,
}

export const addressABIs: Record<string, unknown> = {
  ...ognABIs,
  ...oethABIs,
  ...ousdABIs,
}
