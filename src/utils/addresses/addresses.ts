// Lowercase Addresses
import { omit, uniq } from 'lodash'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

// --------------------
// Non-Origin Addresses
// USD Stables
export const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
export const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'
export const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
export const LUSD_ADDRESS = '0x5f98805a4e8be255a32880fdec7f6728c6568ba0'
export const USDS_ADDRESS = '0xdc035d45d973e3ec169d2276ddab16f1e407384f'

// ETH Stables
export const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
export const STETH_ADDRESS = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'
export const WSTETH_ADDRESS = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0'
export const RETH_ADDRESS = '0xae78736cd615f374d3085123a210448e74fc6393'
export const FRXETH_ADDRESS = '0x5e8422345238f34275888049021821e8e08caa1f'
export const SFRXETH_ADDRESS = '0xac3e018457b222d93114458476f3e3416abbe38f'

// Others
export const BAL_ADDRESS = '0xba100000625a3754423978a60c9317c58a424e3d'
export const CRV3_ADDRESS = '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490'
export const COWSWAP_SETTLEMENT_ADDRESS = '0x9008d19f58aabd9ed0d60971565aa8510560ab41'
export const ONEINCH_AGGREGATION_ROUTER_ADDRESS = '0x1111111254eeb25477b68fb85ed929f73a960582'
export const UNISWAP_V3_OETH_WEH_ADDRESS = '0x52299416c469843f4e0d54688099966a6c7d720f'
export const BALANCER_VAULT_ADDRESS = '0xba12222222228d8ba445958a75a0704d566bf2c8'
export const CURVE_FRXETH_OETH_POOL_ADDRESS = '0xfa0bbb0a5815f6648241c9221027b70914dd8949'

export const BALANCER_VAULT = '0xba12222222228d8ba445958a75a0704d566bf2c8'
export const AURA_REWARDS_POOL_ADDRESS = '0xdd1fe5ad401d4777ce89959b7fa587e569bf125d'

// ----------------
// Origin Addresses

// OGN Related
export const OGN_ADDRESS = '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
export const OGN_BASE_ADDRESS = '0x7002458b1df59eccb57387bc79ffc7c29e22e6f7'
export const XOGN_ADDRESS = '0x63898b3b6ef3d39332082178656e9862bee45c57'
export const OGN_GOVERNANCE_ADDRESS = '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec'
export const OGN_REWARDS_SOURCE_ADDRESS = '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'
export const GOVERNANCE_ADMIN_MULTISIG = '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899'
export const GOVERNANCE_GUARDIAN_MULTISIG = '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc'

export const LEGACY_OGN_STAKING = '0x501804b374ef06fa9c427476147ac09f1551b9a0'

// OUSD Related
export const OUSD_ADDRESS = '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'
export const OUSD_VAULT_ADDRESS = '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'
export const OUSD_HARVESTER_ADDRESS = '0x21fb5812d70b3396880d30e90d9e5c1202266c89'
export const OUSD_DRIPPER_ADDRESS = '0x80c898ae5e56f888365e235ceb8cea3eb726cb58'
export const OUSD_BUYBACK = '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab'
export const OUSD_STABLE_OTOKENS = [OUSD_ADDRESS]
export const OUSD_VAULT_ERC20_ADDRESSES = [DAI_ADDRESS, USDC_ADDRESS, USDT_ADDRESS]

// OETH Related
export const OETH_ADDRESS = '0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'
export const OETH_VAULT_ADDRESS = '0x39254033945aa2e4809cc2977e7087bee48bd7ab'
export const OETH_HARVESTER_ADDRESS = `0x0d017afa83eace9f10a8ec5b6e13941664a6785c`
export const OETH_ZAPPER_ADDRESS = '0x9858e47bcbbe6fbac040519b02d7cd4b2c470c66'
export const OETH_DRIPPER_ADDRESS = '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3'
export const OETH_BUYBACK = '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2'
export const WOETH_ADDRESS = '0xdcee70654261af21c44c093c300ed3bb97b78192'
export const WOETH_ARBITRUM_ADDRESS = '0xd8724322f44e5c58d7a815f542036fb17dbbf839'
export const OETH_CONVEX_ADDRESS = '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63'
export const OETH_CURVE_REWARD_LP_ADDRESS = '0x24b65dc1cf053a8d96872c323d29e86ec43eb33a'
export const OETH_ETH_AMO_METAPOOL = '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'
export const OETH_FRAX_STAKING_ADDRESS = '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5'
export const OETH_MORPHO_AAVE_ADDRESS = '0xc1fc9e5ec3058921ea5025d703cbe31764756319'
export const OETH_STRATEGY_BALANCER_ADDRESS = '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc'
export const OETH_NATIVE_STRATEGY_ADDRESSES = [
  '0x34edb2ee25751ee67f68a45813b22811687c0238',
  '0x4685db8bf2df743c861d71e6cfb5347222992076',
  '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63',
]
export const OETH_VAULT_ERC20_ADDRESSES = [WETH_ADDRESS, STETH_ADDRESS, RETH_ADDRESS, FRXETH_ADDRESS]

// superOETHb
export const SUPER_OETH_BASE_ADDRESS = '0xdbfefd2e8460a6ee4955a68582f85708baea60a3'
export const SUPER_WOETH_BASE_ADDRESS = '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6'
export const SUPER_OETH_VAULT_BASE_ADDRESS = '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93'
export const SUPER_OETH_BASE_ORACLE_ROUTER_ADDRESS = '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83'

// PrimeETH Related
export const PRIME_ETH_ADDRESS = '0x6ef3d766dfe02dc4bf04aae9122eb9a0ded25615'
export const PRIME_ETH_LRT_DEPOSIT_POOL = '0xa479582c8b64533102f6f528774c536e354b8d32'
export const YNLSDE_ADDRESS = '0x35ec69a77b79c255e5d47d5a3bdbefefe342630c'

// OGV Related
export const OGV_ADDRESS = '0x9c354503c38481a7a7a51629142963f98ecc12d0'
export const VEOGV_ADDRESS = '0x0c4576ca1c365868e162554af8e385dc3e7c66d9'
export const OGV_GOVERNANCE_ADDRESS = '0x3cdd07c16614059e66344a7b579dab4f9516c0b6'
export const OGV_OGN_MIGRATOR_ADDRESS = '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'

// ----------------
// ----------------

// Token Helper Objects & Types
export const tokens = {
  // Origin ERC20 Tokens
  OGN: OGN_ADDRESS,
  xOGN: XOGN_ADDRESS,
  OGV: OGV_ADDRESS,
  veOGV: VEOGV_ADDRESS,

  // Origin OTokens
  OETH: OETH_ADDRESS,
  OUSD: OUSD_ADDRESS,
  wOETH: WOETH_ADDRESS,
  wOETH_arbitrum: WOETH_ARBITRUM_ADDRESS,

  // Dollar
  DAI: DAI_ADDRESS,
  USDT: USDT_ADDRESS,
  USDC: USDC_ADDRESS,
  LUSD: LUSD_ADDRESS,
  CRV3: CRV3_ADDRESS,

  // Ether
  ETH: ETH_ADDRESS,
  WETH: WETH_ADDRESS,
  stETH: STETH_ADDRESS,
  wstETH: WSTETH_ADDRESS,
  rETH: RETH_ADDRESS,
  frxETH: FRXETH_ADDRESS,
  sfrxETH: SFRXETH_ADDRESS,
  primeETH: PRIME_ETH_ADDRESS,

  // Non-stable
  BAL: BAL_ADDRESS,
} as const
export type TokenSymbol = keyof typeof tokens
export type TokenAddress = (typeof tokens)[TokenSymbol]

// Strategy Helper Objects & Types
export const strategies = {
  oeth: {
    NativeStrategy: OETH_NATIVE_STRATEGY_ADDRESSES,
    ConvexEthMetaStrategy: '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63',
    FraxETHStrategy: '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5',
    MorphoAaveStrategy: '0xc1fc9e5ec3058921ea5025d703cbe31764756319',
    BalancerMetaPoolStrategy: '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc',
  },
  ousd: {
    ConvexOUSDMetaStrategy: '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90',
    AaveStrategy: '0x5e3646a1db86993f73e6b74a57d8640b69f7e259',
    MorphoCompoundStrategy: '0x5a4eee58744d1430876d5ca93cab5ccb763c037d',
    MorphoAaveStrategy: '0x79f2188ef9350a1dc11a062cca0abe90684b0197',
    FluxStrategy: '0x76bf500b6305dc4ea851384d3d5502f1c7a0ed44',
    Generalized4626Strategy: '0x6b69b755c629590ed59618a2712d8a2957ca98fc',
    MetaMorphoStrategy: '0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0',
    MakerStrategy: '0x6b69b755c629590ed59618a2712d8a2957ca98fc',
    GauntletPrimeUSDCStrategy: '0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1',
    GauntletPrimeUSDTStrategy: '0xe3ae7c80a1b02ccd3fb0227773553aeb14e32f26',
    SkySavingsRateStrategy: '0x5bd9af9c2506d29b6d79cb878284a270190eaeaa',
    OUSDCurveAMOStrategy: '0x26a02ec47acc2a3442b757f45e0a82b8e993ce11',
    // CompoundStrategy: '0x9c459eeb3fa179a40329b81c1635525e9a0ef094', // Deprecated
    // ConvexStrategy: '0xea2ef2e2e5a749d4a66b41db9ad85a38aa264cb3', // Deprecated
    // LUSDMetaStrategy: '0x7a192dd9cc4ea9bdedec9992df74f1da55e60a19', // Deprecated
  },
} as const

export type OETHStrategyKey = keyof typeof strategies.oeth
export type OETHStrategyAddress = (typeof strategies.oeth)[OETHStrategyKey]
export const oethStrategyArray = Object.values(strategies.oeth)
export type OUSDStrategyKey = keyof typeof strategies.ousd
export type OUSDStrategyAddress = (typeof strategies.ousd)[OUSDStrategyKey]
export const ousdStrategyArray = Object.values(strategies.ousd)

export const oeth = {
  address: OETH_ADDRESS,
  wrapped: WOETH_ADDRESS,
  vault: OETH_VAULT_ADDRESS,
  dripper: OETH_DRIPPER_ADDRESS,
  zapper: OETH_ZAPPER_ADDRESS,
  harvester: OETH_HARVESTER_ADDRESS,
  vaultTokens: OETH_VAULT_ERC20_ADDRESSES,
}

export const oeth_base = {
  address: SUPER_OETH_BASE_ADDRESS,
  vault: SUPER_OETH_VAULT_BASE_ADDRESS,
  wrapped: SUPER_WOETH_BASE_ADDRESS,
  oracleRouter: SUPER_OETH_BASE_ORACLE_ROUTER_ADDRESS,
}

export const ousd = {
  address: OUSD_ADDRESS,
  vault: OUSD_VAULT_ADDRESS,
  dripper: OUSD_DRIPPER_ADDRESS,
  harvester: OUSD_HARVESTER_ADDRESS,
  vaultTokens: OUSD_VAULT_ERC20_ADDRESSES,
}

export const ogv = {
  address: OGV_ADDRESS,
  stakedAddress: VEOGV_ADDRESS,
  governance: OGV_GOVERNANCE_ADDRESS,
}

export const ogn = {
  address: OGN_ADDRESS,
  stakedAddress: XOGN_ADDRESS,
  governance: OGN_GOVERNANCE_ADDRESS,
  ogvMigrator: OGV_OGN_MIGRATOR_ADDRESS,
}

export const arm = {
  address: '0x85b78aca6deae198fbf201c82daf6ca21942acc6',
  capManager: '0xf54ebff575f699d281645c6f14fe427dffe629cf',
  zapper: '0x01f30b7358ba51f637d1aa05d9b4a60f76dad680',
}

export const COMPOUND_GOVERNANCE_ALPHA = '0xc0da01a04c3f3e0be433606045bb7017a7323e38'
export const COMPOUND_GOVERNANCE_BRAVO = '0xc0da02939e1441f497fd74f78ce7decb17b66529'
export const COMPOUND_TIMELOCK = '0x6d903f6003cca6255d85cca4d3b5e5146dc33925'
export const COMPOUND_COMPTROLLER = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'
export const COMPOUND_COMPTROLLER_G7 = '0xbe7616b06f71e363a310aa8ce8ad99654401ead7'
export const compound = {
  governanceAlpha: COMPOUND_GOVERNANCE_ALPHA,
  governanceBravo: COMPOUND_GOVERNANCE_BRAVO,
  timelock: COMPOUND_TIMELOCK,
  comptroller: COMPOUND_COMPTROLLER,
  comptroller_g7: COMPOUND_COMPTROLLER_G7,
}

export const multisig = {
  '5/8': GOVERNANCE_ADMIN_MULTISIG,
  '2/8': GOVERNANCE_GUARDIAN_MULTISIG,
  'multichain-guardian': '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971',
}

export const buybacks = {
  operator: '0xbb077e716a5f1f1b63ed5244ebff5214e50fec8c',
  legacyOperator: '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2',
}

export const addresses = {
  buybacks,
  multisig,
  tokens,
  strategies,
  oeth,
  ousd,
  ogv,
  ogn,
  arm,
  compound,
  origin: uniq(
    [
      ...Object.values(ogn),
      ...Object.values(omit(oeth, 'vaultTokens')),
      ...Object.values(strategies.oeth),
      ...Object.values(omit(ousd, 'vaultTokens')),
      ...Object.values(strategies.ousd),
      ...Object.values(ogv),
      ...Object.values(arm),
    ]
      .flat()
      .map((a) => a.toLowerCase()),
  ),
  originBase: uniq([...Object.values(oeth_base)]),
}
