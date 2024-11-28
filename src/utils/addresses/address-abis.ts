import * as strategyCurveMetapoolAbi from '../../abi/curve-metapool'
import * as erc20Abi from '../../abi/erc20'
import * as exponentialStakingAbi from '../../abi/exponential-staking'
import * as fixedRateRewardsSourceAbi from '../../abi/fixed-rate-rewards-source'
import * as governanceAbi from '../../abi/governance'
import * as multisigAbi from '../../abi/multisig'
import * as ogvOgnMigratorAbi from '../../abi/ogv-ogn-migrator'
import * as otokenAbi from '../../abi/otoken'
import * as otokenBuybackAbi from '../../abi/otoken-buyback'
import * as otokenDripperAbi from '../../abi/otoken-dripper'
import * as otokenHarvesterAbi from '../../abi/otoken-harvester'
import * as otokenPriceOracleAbi from '../../abi/otoken-price-oracle'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import * as strategyMorphoAaveAbi from '../../abi/strategy-morpho-aave'
import * as strategyNativeStakingAbi from '../../abi/strategy-native-staking'
import * as wotokenAbi from '../../abi/wotoken'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_DRIPPER_ADDRESS,
  OETH_ETH_AMO_METAPOOL,
  OETH_HARVESTER_ADDRESS,
  OETH_NATIVE_STRATEGY_ADDRESSES,
  OETH_VAULT_ADDRESS,
  OGN_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGN_REWARDS_SOURCE_ADDRESS,
  OGV_OGN_MIGRATOR_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_DRIPPER_ADDRESS,
  OUSD_HARVESTER_ADDRESS,
  OUSD_VAULT_ADDRESS,
  WOETH_ADDRESS,
  XOGN_ADDRESS,
  addresses,
  strategies,
} from './addresses'
import { baseAddresses } from './addresses-base'

/**
 * Active OGN ABIs
 * - Including xOGN
 */
export const ognABIs: Record<string, any> = {
  [OGN_ADDRESS]: erc20Abi,
  [OGN_GOVERNANCE_ADDRESS]: governanceAbi,
  [OGN_REWARDS_SOURCE_ADDRESS]: fixedRateRewardsSourceAbi,
  [XOGN_ADDRESS]: exponentialStakingAbi,
  [OGV_OGN_MIGRATOR_ADDRESS]: ogvOgnMigratorAbi,
}

/**
 * Active OETH Strategy ABIs
 */
export const oethStrategyABIs: Record<string, any> = {
  ...OETH_NATIVE_STRATEGY_ADDRESSES.reduce(
    (map, address) => {
      map[address] = strategyNativeStakingAbi
      return map
    },
    {} as Record<string, any>,
  ),
  [OETH_ETH_AMO_METAPOOL]: strategyCurveMetapoolAbi,
}
/**
 * Active OETH ABIs
 * - Including Strategies
 */
export const oethABIs: Record<string, any> = {
  [OETH_ADDRESS]: otokenAbi,
  [WOETH_ADDRESS]: wotokenAbi,
  [OETH_VAULT_ADDRESS]: otokenVaultAbi,
  [OETH_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OETH_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OETH_BUYBACK]: otokenBuybackAbi,
  [addresses.multisig['5/8']]: multisigAbi,
  [addresses.multisig['2/8']]: multisigAbi,
  ...oethStrategyABIs,
}
export const oethBaseABIs: Record<string, any> = {
  [baseAddresses.superOETHb.address]: otokenAbi,
  [baseAddresses.superOETHb.wrapped]: wotokenAbi,
  [baseAddresses.superOETHb.vault]: otokenVaultAbi,
  [baseAddresses.superOETHb.oracleRouter]: otokenPriceOracleAbi,
  [baseAddresses.superOETHb.dripper]: otokenDripperAbi,
  [baseAddresses.multisig['5/8']]: multisigAbi,
}

/**
 * Active OUSD Strategy ABIs
 */
export const ousdStrategyABIs: Record<string, any> = {
  [strategies.ousd.MorphoAaveStrategy]: strategyMorphoAaveAbi,
}

/**
 * Active OUSD ABIs
 * - Including Strategies
 */
export const ousdABIs: Record<string, any> = {
  [OUSD_ADDRESS]: otokenAbi,
  [OUSD_VAULT_ADDRESS]: otokenVaultAbi,
  [OUSD_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OUSD_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OUSD_BUYBACK]: otokenBuybackAbi,
  ...ousdStrategyABIs,
}

/**
 * Active Origin ABIs
 */
export const originABIs: Record<string, unknown> = {
  ...ognABIs,
  ...oethABIs,
  ...ousdABIs,
}
