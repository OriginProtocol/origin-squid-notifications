import { AAVE_GOVERNANCE_ADDRESS } from '../../processors/aave'
import {
  DAI_ADDRESS,
  FRXETH_ADDRESS,
  OETH_DRIPPER_ADDRESS,
  OETH_ETH_AMO_METAPOOL,
  OETH_HARVESTER_ADDRESS,
  OETH_MORPHO_AAVE_ADDRESS,
  OETH_NATIVE_STRATEGY_ADDRESSES,
  OETH_STRATEGY_BALANCER_ADDRESS,
  OETH_ZAPPER_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGV_OGN_MIGRATOR_ADDRESS,
  OUSD_HARVESTER_ADDRESS,
  PRIME_ETH_LRT_DEPOSIT_POOL,
  RETH_ADDRESS,
  STETH_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
  VEOGV_ADDRESS,
  XOGN_ADDRESS,
  YNLSDE_ADDRESS,
  addresses,
} from './addresses'
import { baseAddresses } from './addresses-base'
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
  WOETH,
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
  [GOVERNANCE_TIMELOCK]: 'Mainnet Timelock',
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
  [addresses.multisig['5/8']]: 'Mainnet Multisig 5/8',
  [addresses.multisig['2/8']]: 'Mainnet Multisig 2/8',
  [addresses.multisig['multichain-guardian']]: 'Multichain Guardian',
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
  ...OETH_NATIVE_STRATEGY_ADDRESSES.reduce(
    (map, address, i) => {
      map[address] = `OETH Native Staking Strategy ${i + 1}`
      return map
    },
    {} as Record<string, string>,
  ),
  [OGV_OGN_MIGRATOR_ADDRESS]: 'OGV Migrator',
  [OGN_GOVERNANCE_ADDRESS]: 'OGN Governance',
  [AAVE_GOVERNANCE_ADDRESS]: 'Aave Governance',

  // OUSD Contracts
  [OUSD_HARVESTER_ADDRESS]: 'OUSD Harvester',
  [addresses.strategies.ousd.MetaMorphoStrategy]: 'OUSD Meta Morpho Strategy',

  // OETH Contracts
  [OETH]: 'OETH',
  [WOETH]: 'WOETH',
  [OETH_VAULT]: 'OETH Vault',
  [FRAX_ETH_STRATEGY]: 'FraxETH Strategy',
  [OETH_ZAPPER]: 'OETH Zapper',
  [OETH_CURVE_AMO_STRATEGY]: 'OETH/ETH Curve AMO Strategy',
  [OETH_HARVESTER_ADDRESS]: 'OETH Harvester',
  [OETH_ZAPPER_ADDRESS]: 'OETH Zapper',
  [OETH_DRIPPER_ADDRESS]: 'OETH Dripper',
  [OETH_ETH_AMO_METAPOOL]: 'OETH Curve AMO Metapool',

  // OETH Base Contracts / Addresses
  [baseAddresses.superOETHb.address]: 'superOETHb',
  [baseAddresses.superOETHb.wrapped]: 'wsuperOETHb',
  [baseAddresses.superOETHb.vault]: 'Super OETH Base Vault',
  [baseAddresses.superOETHb.oracleRouter]: 'Super OETH Base Price Oracle',
  [baseAddresses.superOETHb.dripper]: 'Super OETH Dripper',
  [baseAddresses.superOETHb.zapper]: 'Super OETH Zapper',
  [baseAddresses.superOETHb.strategies.bridgedWOETH]: 'Super OETH - Bridged WOETH Strategy',
  [baseAddresses.superOETHb.strategies.amo]: 'Super OETH - Aerodrome AMO Strategy',
  [baseAddresses.multisig['5/8']]: 'Base Multisig 5/8',
  [baseAddresses.multisig['2/8']]: 'Base Multisig 2/8',
  [baseAddresses.multisig.reservoir]: 'Super OETH Base Reservoir',
  [baseAddresses.timelock]: 'Base Timelock',
  [baseAddresses.baseHotWallet]: 'Base Hot Wallet',

  // Base Tokens
  [baseAddresses.tokens.bridgedWOETH]: 'WOETH (Base)',
  [baseAddresses.tokens.OGN]: 'OGN (Base)',
  [baseAddresses.tokens.WETH]: 'WETH (Base)',
  [baseAddresses.tokens.cbETH]: 'cbETH (Base)',
  [baseAddresses.tokens.USDC]: 'USDC (Base)',
  [baseAddresses.tokens.AERO]: 'AERO',

  // Aerodrome Pools
  [baseAddresses.aerodrome.pools['vAMM-WETH/OGN'].address]: 'Aerodrome: vAMM-WETH/OGN',
  [baseAddresses.aerodrome.pools['vAMM-OGN/superOETHb'].address]: 'Aerodrome: vAMM-OGN/superOETHb',
  [baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].address]: 'Aerodrome: CL1-WETH/superOETHb',

  // primeETH Contracts
  [PRIME_ETH_LRT_DEPOSIT_POOL]: 'PrimeETH Deposit Pool',
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'ETH',
  [YNLSDE_ADDRESS]: 'ynLSDe',

  // Misc
  '0x17768cfd6030e2b65eb5086e34a512fde5dc1f1f': 'danielvf.eth',
  '0xc8f2cf4742c86295653f893214725813b16f7410': 'ARM Gnosis Safe',
}

export const getAddressesPyName = (address?: string): string | undefined =>
  address ? CONTRACT_ADDR_TO_NAME[address.toLowerCase()] : undefined

export const getAddressName = (address: string): string => CONTRACT_ADDR_TO_NAME[address.toLowerCase()] ?? address
