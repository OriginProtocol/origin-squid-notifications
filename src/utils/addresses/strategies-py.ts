export const OUSD_BACKING_ASSETS = ['USDC', 'USDT', 'DAI']
export const OETH_BACKING_ASSETS = ['WETH', 'FRXETH', 'RETH', 'STETH']

// OUSD Contracts
export const OUSD_VAULT = '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'
export const STRATCOMP = '0x9c459eeb3fa179a40329b81c1635525e9a0ef094'
export const STRATCONVEX = '0xea2ef2e2e5a749d4a66b41db9ad85a38aa264cb3'
export const STRATAAVE = '0x5e3646a1db86993f73e6b74a57d8640b69f7e259'
export const MORPHO = '0x5a4eee58744d1430876d5ca93cab5ccb763c037d'
export const OUSD_METASTRAT = '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90'
export const MORPHO_AAVE = '0x79f2188ef9350a1dc11a062cca0abe90684b0197'
export const LUSD_METASTRAT = '0x7a192dd9cc4ea9bdedec9992df74f1da55e60a19'
export const FLUX_STRAT = '0x76bf500b6305dc4ea851384d3d5502f1c7a0ed44'

export const MAKER_DSR_STRAT = '0x6b69b755c629590ed59618a2712d8a2957ca98fc'

// OETH Contracts
export const OETH_VAULT = '0x39254033945aa2e4809cc2977e7087bee48bd7ab'
export const FRAX_ETH_STRATEGY = '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5'
export const OETH_CURVE_AMO_STRATEGY = '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63'
export const OETH_MORPHO_AAVE_STRATEGY = '0xc1fc9e5ec3058921ea5025d703cbe31764756319'
export const OETH_BALANCER_RETH_STRATEGY = '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc'

// OUSD Strategies
export const OUSD_STRATEGIES = {
  vault_holding: {
    NAME: 'OUSD Vault',
    ADDRESS: OUSD_VAULT,
    HARDCODED: true,
    SUPPORTED_ASSETS: OUSD_BACKING_ASSETS,
    ICON_NAME: 'ousd-icon.svg',
  },
  compstrat_holding: {
    NAME: 'Compound Strategy',
    ADDRESS: STRATCOMP,
    HARDCODED: true,
    SUPPORTED_ASSETS: ['USDC', 'USDT', 'DAI', 'COMP'],
    ICON_NAME: 'comp-icon.svg',
  },
  threepoolstrat_holding: {
    NAME: 'Convex Strategy',
    ADDRESS: STRATCONVEX,
    HARDCODED: true,
    HIDDEN: true,
    SUPPORTED_ASSETS: OUSD_BACKING_ASSETS,
    ICON_NAME: 'convex.png',
  },
  aavestrat_holding: {
    NAME: 'Aave Strategy',
    ADDRESS: STRATAAVE,
    HARDCODED: true,
    SUPPORTED_ASSETS: OUSD_BACKING_ASSETS,
    ICON_NAME: 'aave-icon.svg',
  },
  morpho_strat: {
    NAME: 'Morpho Compound',
    ADDRESS: MORPHO,
    FROM_BLOCK: 15949661,
    SUPPORTED_ASSETS: ['USDC', 'USDT', 'DAI', 'COMP'],
    IS_COMPOUND_COMPATIBLE: true,
    ICON_NAME: 'morpho.png',
  },
  ousd_metastrat: {
    NAME: 'OUSD MetaStrategy',
    ADDRESS: OUSD_METASTRAT,
    FROM_BLOCK: 15896478,
    SUPPORTED_ASSETS: ['USDC', 'USDT', 'DAI', 'OUSD'],
    IS_OUSD_META: true,
    ICON_NAME: 'buffer-icon.svg',
  },
  lusd_metastrat: {
    NAME: 'Convex LUSD+3Crv',
    ADDRESS: LUSD_METASTRAT,
    FROM_BLOCK: 16226329,
    SUPPORTED_ASSETS: ['USDC', 'USDT', 'DAI', 'LUSD'],
    ICON_NAME: 'convex.png',
  },
  morpho_aave_strat: {
    NAME: 'Morpho Aave',
    ADDRESS: MORPHO_AAVE,
    FROM_BLOCK: 16331904,
    SUPPORTED_ASSETS: OUSD_BACKING_ASSETS,
    ICON_NAME: 'morpho.png',
  },
  flux_strat: {
    NAME: 'Flux Strategy',
    ADDRESS: FLUX_STRAT,
    FROM_BLOCK: 17877302,
    SUPPORTED_ASSETS: OUSD_BACKING_ASSETS,
    ICON_NAME: 'buffer-icon.svg',
  },
  dsr_strat: {
    NAME: 'Maker DSR Strategy',
    ADDRESS: MAKER_DSR_STRAT,
    FROM_BLOCK: 17883033,
    SUPPORTED_ASSETS: 'DAI',
    ICON_NAME: 'buffer-icon.svg',
  },
}

// OETH Strategies
export const OETH_STRATEGIES = {
  vault_holding: {
    NAME: 'OETH Vault',
    HARDCODED: true,
    ADDRESS: OETH_VAULT,
    FROM_BLOCK: 17067001,
    SUPPORTED_ASSETS: OETH_BACKING_ASSETS,
    ICON_NAME: 'oeth-icon.svg',
  },
  frax_eth_strat: {
    NAME: 'FraxETH',
    ADDRESS: FRAX_ETH_STRATEGY,
    FROM_BLOCK: 17067224,
    SUPPORTED_ASSETS: ['FRXETH'],
    ICON_NAME: 'frxeth-icon.svg',
  },
  oeth_curve_amo: {
    NAME: 'OETH/ETH Curve AMO',
    ADDRESS: OETH_CURVE_AMO_STRATEGY,
    FROM_BLOCK: 17249902,
    SUPPORTED_ASSETS: ['ETH', 'OETH'],
    ICON_NAME: 'oeth-icon.svg',
  },
  oeth_morpho_aave_strat: {
    NAME: 'Morpho Aave',
    ADDRESS: OETH_MORPHO_AAVE_STRATEGY,
    FROM_BLOCK: 17367105,
    SUPPORTED_ASSETS: ['WETH'],
    ICON_NAME: 'morpho.png',
  },
  oeth_balancer_reth_strat: {
    NAME: 'Balancer rETH/WETH Pool Strategy',
    ADDRESS: OETH_BALANCER_RETH_STRATEGY,
    FROM_BLOCK: 18156220,
    SUPPORTED_ASSETS: ['WETH', 'RETH'],
    ICON_NAME: 'buffer-icon.svg',
  },
}
