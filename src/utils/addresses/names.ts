import { AAVE_GOVERNANCE_ADDRESS } from '../../processors/aave'
import {
  DAI_ADDRESS,
  FRXETH_ADDRESS,
  OETH_DRIPPER_ADDRESS,
  OETH_ETH_AMO_METAPOOL,
  OETH_HARVESTER_ADDRESS,
  OETH_MORPHO_AAVE_ADDRESS,
  OETH_NATIVE_STRATEGY_ADDRESS,
  OETH_STRATEGY_BALANCER_ADDRESS,
  OETH_ZAPPER_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGV_OGN_MIGRATOR_ADDRESS,
  OUSD_HARVESTER_ADDRESS,
  PRIMEETH_LRT_DEPOSIT_POOL,
  RETH_ADDRESS,
  STETH_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
  VEOGV_ADDRESS,
  XOGN_ADDRESS,
} from './addresses'
import {
  CDAI,
  CHAINLINK_KEEPER_REGISTRY,
  CHAINLINK_ORACLE,
  COMP,
  COMPENSATION_CLAIMS,
  COMPOUND_COMPTROLLER,
  COMPOUND_COMPTROLLER_G7,
  COMPOUND_GOVERNOR_ALPHA,
  COMPOUND_GOVERNOR_BRAVO,
  COMPOUND_TIMELOCK,
  CURVE_3CRV_TOKEN,
  CURVE_3POOL,
  CURVE_ANOTHER_3POOL,
  CURVE_ARAGON_51,
  CURVE_ARAGON_60,
  CURVE_CRV_TOKEN,
  CURVE_METAPOOL,
  CUSDC,
  CUSDT,
  CVX,
  DRIPPER,
  FLIPPER,
  FLUX_DAO,
  FLUX_TIMELOCK,
  GOVERNANCE,
  GOVERNANCE_TIMELOCK,
  GOVERNOR,
  GOVERNORV2,
  GOVERNORV3,
  LINK,
  LUSD,
  METAMASK_SWAP_ROUTER,
  MISTX_ROUTER,
  MIX_ORACLE,
  OETH,
  OETH_BUYBACK_PROXY,
  OETH_ZAPPER,
  OGN,
  OGN_REWARDS_SOURCE,
  OGN_STAKING,
  OGV,
  OGV_BUYBACK_LEGACY,
  ONE_INCH_V3,
  OUSD,
  OUSD_BUYBACK_PROXY,
  OUSD_KEEPER,
  OX_EXCHANGE,
  REWARDS_SOURCE,
  STORY_STAKING_SEASON_ONE,
  STORY_STAKING_SEASON_THREE,
  STORY_STAKING_SEASON_TWO,
  STORY_STAKING_SERIES,
  STRAT3POOL,
  STRATAAVE2,
  STRATAAVEDAI,
  STRATCOMP1,
  STRATCOMP2,
  STRATCONVEX1,
  SUSHISWAP,
  UNISWAP_V2,
  UNISWAP_V3_ROUTER,
  WETH,
} from './ousd-analytics'
import {
  FLUX_STRAT,
  FRAX_ETH_STRATEGY,
  MAKER_DSR_STRAT,
  MORPHO,
  MORPHO_AAVE,
  OETH_CURVE_AMO_STRATEGY,
  OETH_VAULT,
  OUSD_METASTRAT,
  OUSD_VAULT,
} from './strategies-py'

export const CONTRACT_ADDR_TO_NAME: Record<string, string> = {
  [OUSD]: 'OUSD Token',
  [COMP]: 'COMP Token',
  [OUSD_VAULT]: 'OUSD Vault',
  [GOVERNANCE]: 'OUSD Governance (old)',
  [GOVERNANCE_TIMELOCK]: 'OUSD Timelock',
  [MIX_ORACLE]: 'MixOracle',
  [CHAINLINK_ORACLE]: 'ChainlinkOracle',
  [OGN_STAKING]: 'OGN Staking',
  [XOGN_ADDRESS]: 'xOGN',
  [STORY_STAKING_SERIES]: 'Story Staking Series',
  [STORY_STAKING_SEASON_ONE]: 'Season One',
  [STORY_STAKING_SEASON_TWO]: 'Season Two',
  [STORY_STAKING_SEASON_THREE]: 'Season Three',
  [STRATCOMP1]: 'Compound Strategy',
  [STRATCOMP2]: 'Compound Strategy',
  [STRATAAVEDAI]: 'Aave Strategy',
  [STRATAAVE2]: 'Aave Strategy',
  [STRAT3POOL]: '3Pool Strategy',
  [STRATCONVEX1]: 'Convex Strategy',
  [COMPOUND_TIMELOCK]: 'Compound Timelock',
  [COMPOUND_GOVERNOR_ALPHA]: 'Compound Governor Alpha',
  [COMPOUND_GOVERNOR_BRAVO]: 'Compound Governor Bravo',
  [COMPOUND_COMPTROLLER]: 'Compound Comptroller/Unitroller',
  [COMPOUND_COMPTROLLER_G7]: 'StdComptrollerG7',
  [CDAI]: 'cDAI',
  [CUSDT]: 'cUSDT',
  [CUSDC]: 'cUSDC',
  [LUSD]: 'LUSD',
  [COMPENSATION_CLAIMS]: 'Compensation Claims',
  [CURVE_CRV_TOKEN]: 'CRV Token',
  [CURVE_3CRV_TOKEN]: '3CRV Token',
  [CURVE_3POOL]: '3Pool Swap Contract',
  [CURVE_ARAGON_51]: 'Curve Aragon Voting (51%)',
  [CURVE_ARAGON_60]: 'Curve Aragon Voting (60%)',
  [DRIPPER]: 'OUSD Dripper',
  [GOVERNOR]: 'Origin Governor V1',
  [GOVERNORV2]: 'Origin Governor V2',
  [GOVERNORV3]: 'Origin Governor V3',
  [METAMASK_SWAP_ROUTER]: 'Metamask Swap Router',
  [FLIPPER]: 'OUSD Swap',
  [UNISWAP_V3_ROUTER]: 'Uniswap V3 Router',
  [OX_EXCHANGE]: '0x Exchange',
  [ONE_INCH_V3]: '1inch V3',
  [SUSHISWAP]: 'SushiSwap',
  [UNISWAP_V2]: 'Uniswap V2 Router',
  [MISTX_ROUTER]: 'MistX Router',
  [CURVE_ANOTHER_3POOL]: 'Curve 3Pool 2',
  [CURVE_METAPOOL]: 'Curve USDT/OUSD Metapool',
  [CHAINLINK_KEEPER_REGISTRY]: 'Chainlink KeeperRegistry',
  [OUSD_KEEPER]: 'OUSD Keeper',
  [LINK]: 'LINK',
  [OGV]: 'OGV',
  [OGN]: 'OGN',
  [OGV_BUYBACK_LEGACY]: 'OGV BuyBack (Legacy)',
  [OUSD_BUYBACK_PROXY]: 'OUSD BuyBack',
  [OETH_BUYBACK_PROXY]: 'OETH BuyBack',
  [REWARDS_SOURCE]: 'RewardsSource',
  [OGN_REWARDS_SOURCE]: 'OGN RewardsSource',
  [FLUX_DAO]: 'Flux DAO',
  [FLUX_TIMELOCK]: 'Flux Timelock',

  [MAKER_DSR_STRAT]: 'Maker DSR Strategy',
  [FLUX_STRAT]: 'Flux Strategy',
  [MORPHO_AAVE]: 'Morpho Aave Strategy',
  [MORPHO]: 'Morpho Strategy',
  [OUSD_METASTRAT]: 'OUSD Metapool Strategy',

  // Tokens
  [WETH]: 'WETH',
  [CVX]: 'CVX',
  [VEOGV_ADDRESS]: 'veOGV',
  [USDT_ADDRESS]: 'USDT',
  [USDC_ADDRESS]: 'USDC',
  [DAI_ADDRESS]: 'DAI',
  [FRXETH_ADDRESS]: 'frxETH',
  [RETH_ADDRESS]: 'rETH',
  [STETH_ADDRESS]: 'stETH',

  [OETH_STRATEGY_BALANCER_ADDRESS]: 'OETH Balancer rETH Strategy',
  [OETH_MORPHO_AAVE_ADDRESS]: 'OETH Morpho Aave Strategy',
  [OETH_NATIVE_STRATEGY_ADDRESS]: 'OETH Native Staking Strategy',
  [OGV_OGN_MIGRATOR_ADDRESS]: 'OGV Migrator',
  [OGN_GOVERNANCE_ADDRESS]: 'OGN Governance',
  [AAVE_GOVERNANCE_ADDRESS]: 'Aave Governance',

  // OUSD Contracts
  [OUSD_HARVESTER_ADDRESS]: 'OUSD Harvester',

  // OETH Contracts
  [OETH]: 'OETH',
  [OETH_VAULT]: 'OETH Vault',
  [FRAX_ETH_STRATEGY]: 'FraxETH Strategy',
  [OETH_ZAPPER]: 'OETH Zapper',
  [OETH_CURVE_AMO_STRATEGY]: 'OETH/ETH Curve AMO Strategy',
  [OETH_HARVESTER_ADDRESS]: 'OETH Harvester',
  [OETH_ZAPPER_ADDRESS]: 'OETH Zapper',
  [OETH_DRIPPER_ADDRESS]: 'OETH Dripper',
  [OETH_ETH_AMO_METAPOOL]: 'OETH Curve AMO Metapool',

  // primeETH Contracts
  [PRIMEETH_LRT_DEPOSIT_POOL]: 'PrimeETH Deposit Pool',
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'ETH',
}

export const getAddressesPyName = (address?: string): string | undefined =>
  address ? CONTRACT_ADDR_TO_NAME[address.toLowerCase()] : undefined
