import {
  FRAX_ETH_STRATEGY,
  OETH_CURVE_AMO_STRATEGY,
  OETH_VAULT,
  OUSD_VAULT,
  STRATAAVE,
  STRATCOMP,
  STRATCONVEX,
} from './strategies-py'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// Assets
export const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
export const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
export const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'
export const COMP = '0xc00e94cb662c3520282e6f5717214004a7f26888'
export const CDAI = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643'
export const CUSDC = '0x39aa39c021dfbae8fac545936693ac917d5e7563'
export const CUSDT = '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9'
export const LUSD = '0x5f98805a4e8be255a32880fdec7f6728c6568ba0'
export const ADAI_V1 = '0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d'
export const ADAI_V2 = '0x028171bca77440897b824ca71d1c56cac55b68a3'
export const AUSDC = '0xbcca60bb61934080951369a648fb03df4f96263c'
export const AUSDT = '0x3ed3b47dd13ec9a98b44e6204a523e766b225811'
export const LINK = '0x514910771af9ca656af840dff83e8264ecf986ca'
export const CVX = '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'

export const THREEPOOL = '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490'

export const ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
export const FRXETH = '0x5e8422345238f34275888049021821e8e08caa1f'
export const SFRXETH = '0xac3e018457b222d93114458476f3e3416abbe38f'
export const RETH = '0xae78736cd615f374d3085123a210448e74fc6393'
export const STETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'

// OUSD
export const GOVERNOR = '0x8e7bdfecd1164c46ad51b58e49a611f954d23377'
export const GOVERNORV2 = '0x830622bdd79cc677ee6594e20bbda5b26568b781'
export const GOVERNORV3 = '0x72426ba137dec62657306b12b1e869d43fec6ec7'
export const OUSD = '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'
export const WOUSD = '0xd2af830e8cbdfed6cc11bab697bb25496ed6fa62'
export const TIMELOCK = '0x52bebd3d7f37ec4284853fd5861ae71253a7f428'
export const COMPENSATION_CLAIMS = '0x9c94df9d594ba1eb94430c006c269c314b1a8281'
export const GOVERNANCE = '0x3cdd07c16614059e66344a7b579dab4f9516c0b6'
export const GOVERNANCE_TIMELOCK = '0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f'

// OGN
export const OGN = '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
export const OGN_STAKING = '0x501804b374ef06fa9c427476147ac09f1551b9a0'
export const STORY_STAKING_SERIES = '0xcce8e784c777fb9435f89f4e45f8b7fc49f7669f'
export const STORY_STAKING_SEASON_ONE = '0x7436f9ffd073d9ab7e3904866e03270dc18d4c33'
export const STORY_STAKING_SEASON_TWO = '0x6639cdb3ea7a48b0ad95b47bec78023c6f706160'
export const STORY_STAKING_SEASON_THREE = '0x07b0226465a50300f91c8a7930f90aecae3d6ed4'
export const STORY_STAKING_SEASONS = [STORY_STAKING_SEASON_ONE, STORY_STAKING_SEASON_TWO, STORY_STAKING_SEASON_THREE]
export const STORY_STAKING_VAULT = '0xc626f08cf88972332cfcb48b227409658be67a1c'
export const OGN_REWARDS_SOURCE = '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'

// OGV
export const OGV = '0x9c354503c38481a7a7a51629142963f98ecc12d0'
export const VEOGV = '0x0c4576ca1c365868e162554af8e385dc3e7c66d9'
export const REWARDS_SOURCE = '0x7d82e86cf1496f9485a8ea04012afeb3c7489397'
export const OGV_BUYBACK_LEGACY = '0x6c5cdfb47150efc52072cb93eea1e0f123529748'
export const OUSD_BUYBACK_PROXY = '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab'
export const OETH_BUYBACK_PROXY = '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2'

// OETH
export const OETH = '0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'
export const WOETH = '0xdcee70654261af21c44c093c300ed3bb97b78192'
export const OETH_ZAPPER = '0x8c135f50c7317a93cc95bb208a494e5ade5b66b0'
export const OETH_ETH_AMO_METAPOOL = '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'
export const OETH_CURVE_AMO_REWARDS_POOL = '0x24b65dc1cf053a8d96872c323d29e86ec43eb33a'
export const OETH_ETH_AMO_CURVE_GUAGE = '0xd03be91b1932715709e18021734fcb91bb431715'

// Strategies
export const STRATCOMP1 = '0xd5433168ed0b1f7714819646606db509d9d8ec1f'
export const STRATCOMP2 = STRATCOMP
export const STRATAAVEDAI = '0x9f2b18751376cf6a3432eb158ba5f9b1abd2f7ce'
export const STRATAAVE2 = STRATAAVE
export const STRAT3POOL = '0x3c5fe0a3922777343cbd67d3732fcdc9f2fa6f2f'
export const STRATCONVEX1 = STRATCONVEX

export const OUSD_USDT_UNISWAP = '0xcc01d9d54d06b6a0b6d09a9f79c3a6438e505f71'
export const OUSD_USDT_UNISWAP_V3 = '0x129360c964e2e13910d603043f6287e5e9383374'
export const OUSD_USDT_SUSHI = '0xe4455fdec181561e9ffe909dde46aaeaedc55283'
export const SNOWSWAP = '0x7c2fa8c30db09e8b3c147ac67947829447bf07bd'

// Oracles
export const MIX_ORACLE = '0x4d4f5e7a1fe57f5ceb38bfce8653effa5e584458' // Meta oracle
export const OPEN_ORACLE = '0x922018674c12a7f0d394ebeef9b58f186cde13c1' // Token prices
export const CHAINLINK_ORACLE = '0x8de3ac42f800a1186b6d70cb91e0d6876cc36759' // Tokens

export const CHAINLINK_ETH_USD_FEED = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419' // ETH
export const CHAINLINK_DAI_ETH_FEED = '0x773616e4d11a78f511299002da57a0a94577f1f4'
export const CHAINLINK_USDC_ETH_FEED = '0x986b5e1e1755e3c2440e960477f25201b0a8bbd4'
export const CHAINLINK_USDT_ETH_FEED = '0xee9f2375b4bdf6387aa8265dd4fb8f16512a1d46'

export const CHAINLINK_KEEPER_REGISTRY = '0x7b3ec232b08bd7b4b3305be0c044d907b2df960b'
// Related, see OUSD_KEEPER_UPKEEP_ID in blockchain.const
export const OUSD_KEEPER = '0x321e130c0a9cadb0f1ff07f024d6adb290788efb'

// Compound
export const COMPOUND_GOVERNOR_ALPHA = '0xc0da01a04c3f3e0be433606045bb7017a7323e38'
export const COMPOUND_GOVERNOR_BRAVO = '0xc0da02939e1441f497fd74f78ce7decb17b66529'
export const COMPOUND_TIMELOCK = '0x6d903f6003cca6255d85cca4d3b5e5146dc33925'

export const COMPOUND_COMPTROLLER = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'
export const COMPOUND_COMPTROLLER_G7 = '0xbe7616b06f71e363a310aa8ce8ad99654401ead7'

// Aave v1
export const AAVE_LENDING_POOL_V1 = '0x398ec7346dcd622edc5ae82352f02be94c62d119'
export const AAVE_LENDING_POOL_CORE_V1 = '0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3'
export const AAVE_PROTO_GOVERNANCE_V1 = '0x8a2efd9a790199f4c94c6effe210fce0b4724f52'

// Aave v2
export const AAVE_LENDING_POOL_V2 = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'

// Curve
export const CURVE_CRV_TOKEN = '0xd533a949740bb3306d119cc777fa900ba034cd52'
export const CURVE_3CRV_TOKEN = '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490'
export const CURVE_3POOL = '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'
export const CURVE_ANOTHER_3POOL = '0xa79828df1850e8a3a3064576f380d90aecdd3359'
export const CURVE_METAPOOL = '0x87650d7bbfc3a9f10587d7778206671719d9910d' // aka OUSD<>3CRV MetaPool
export const CURVE_METAPOOL_GAUGE = '0x25f0ce4e2f8dba112d9b115710ac297f816087cd'
export const LUSD_METAPOOL = '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca'

// Various
export const METAMASK_SWAP_ROUTER = '0x881d40237659c251811cec9c364ef91dc08d300c'
export const FLIPPER = '0xcecad69d7d4ed6d52efcfa028af8732f27e08f70'
export const DRIPPER = '0x80c898ae5e56f888365e235ceb8cea3eb726cb58'
export const OETH_DRIPPER = '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3'
export const UNISWAP_V3_ROUTER = '0xe592427a0aece92de3edee1f18e0157c05861564'
export const OX_EXCHANGE = '0xdef1c0ded9bec7f1a1670819833240f027b25eff'
export const ONE_INCH_V3 = '0x11111112542d85b3ef69ae05771c2dccff4faa26'
export const SUSHISWAP = '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f'
export const UNISWAP_V2 = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
export const MISTX_ROUTER = '0xa58f22e0766b3764376c92915ba545d583c19dbc'
export const CVX_3POOL_REWARDS_POOL = '0x689440f2ff927e1f24c72f1087e1faf471ece1c8'
export const CVX_OUSD_REWARDS_POOL = '0x7d536a737c13561e0d2decf1152a653b4e615158'
export const CVX_LUSD_REWARDS_POOL = '0x2ad92a7ae036a038ff02b96c88de868ddf3f8190'

// Curve Governance

// This is kinda confusing and I never got an answer from Curve discord but they
// have two voting contracts "installed" in their Aragon DAO app.  They are
// exactly the same (bytecode/source) but have slightly different parameters.

// This contract needs 51% support to pass
export const CURVE_ARAGON_51 = '0xe478de485ad2fe566d49342cbd03e49ed7db3356'
// This contract needs 60% support to pass
export const CURVE_ARAGON_60 = '0xbcff8b0b9419b9a88c44546519b1e909cf330399'

// Flux Finance Governance
export const FLUX_TIMELOCK = '0x2c5898da4df1d45eab2b7b192a361c3b9eb18d9c'
export const FLUX_DAO = '0x336505ec1bcc1a020eede459f57581725d23465a'

const CONTRACT_ADDR_TO_NAME: Record<string, string> = {
  [OUSD]: 'OUSD Token',
  [COMP]: 'COMP Token',
  [OUSD_VAULT]: 'OUSD Vault',
  [GOVERNANCE]: 'OUSD Governance',
  [GOVERNANCE_TIMELOCK]: 'OUSD Timelock',
  [MIX_ORACLE]: 'MixOracle',
  [CHAINLINK_ORACLE]: 'ChainlinkOracle',
  [OGN_STAKING]: 'OGN Staking',
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
  [DRIPPER]: 'Dripper',
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
  [CVX]: 'CVX',

  // OETH Contracts
  [OETH]: 'OETH Token',
  [OETH_VAULT]: 'OETH Vault',
  [FRAX_ETH_STRATEGY]: 'FraxETH Strategy',
  [OETH_ZAPPER]: 'OETH Zapper',
  [OETH_CURVE_AMO_STRATEGY]: 'OETH/ETH Curve AMO Strategy',
}

export const getAddressesPyName = (address: string): string | undefined => CONTRACT_ADDR_TO_NAME[address]
