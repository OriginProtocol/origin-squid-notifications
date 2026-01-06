# Origin Protocol Contract Registry

Generated: 2026-01-06T18:57:33.267Z

This file compares contracts from the [Origin Protocol registry](https://docs.originprotocol.com/registry/contracts) against our tracking.

**Legend:**
- **Proxy**: Contract is monitored for proxy/governance events (admin changes, upgrades)
- **Events**: Contract has specific event handlers with ABIs defined

Data source: https://github.com/OriginProtocol/origin-docs/tree/en/registry/contracts

## Oeth

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Origin Ether (ERC-20) | Ethereum | `0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3` | ✅ | ✅ |
| Wrapped OETH (ERC-4626) | Ethereum | `0xdcee70654261af21c44c093c300ed3bb97b78192` | ✅ | ✅ |
| Vault | Ethereum | `0x39254033945aa2e4809cc2977e7087bee48bd7ab` | ✅ | ✅ |
| Zapper | Ethereum | `0xda0485c1e74a7ef690e99d8286c243942edaa07b` | ✅ | ❌ |
| Harvester Simple | Ethereum | `0x6d416e576eecbb9f897856a7c86007905274ed04` | ✅ | ❌ |
| FixedRateDripper | Ethereum | `0xe3b3b4fc77505ecfaacf6dd21619a8cc12fcc501` | ✅ | ❌ |
| Compounding Staking Strategy | Ethereum | `0xaf04828ed923216c77dc22a2fc8e077fdadaa87d` | ✅ | ✅ |
| Compounding Staking Strategy View | Ethereum | `0xedf495f92c2ebdee8b797e9c503aa7a3302a9c88` | ✅ | ❌ |
| BeaconProofs | Ethereum | `0xc4444c5d9e7c1a5a0a01c5e4b11692d589dcaf22` | ✅ | ❌ |
| Second Native Staking Strategy | Ethereum | `0x4685db8bf2df743c861d71e6cfb5347222992076` | ✅ | ✅ |
| Second Native Staking Fee Accumulator | Ethereum | `0xfee31c09fa5e9cdbc1f80c90b42b58640be91ddf` | ✅ | ❌ |
| Third Native Staking Strategy | Ethereum | `0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63` | ✅ | ✅ |
| Third Native Staking Fee Accumulator | Ethereum | `0x49674fbce040d95366604d1db3392e9bdea14d48` | ✅ | ❌ |
| Curve OETH+WETH (AMO) Strategy | Ethereum | `0xba0e352ab5c13861c26e4e773e7a833c3a223fe6` | ✅ | ❌ |
| OETH / ETH Price Feed (Chainlink Oracle) | Ethereum | `0x703118c4cbcccbf2ab31913e0f8075fbbb15f563` | ✅ | ✅ |
| wOETH LayerZero Adapter | Ethereum | `0x7d1bea5807e6af125826d56ff477745bb89972b8` | ❌ | ❌ |
| wOETH (ERC-20) | Arbitrum | `0xd8724322f44e5c58d7a815f542036fb17dbbf839` | ✅ | ❌ |
| OETH / wOETH Exchange Rate (Chainlink Oracle) | Arbitrum | `0x03a1f4b19aaea6e68f0f104dc4346da3e942cc45` | ❌ | ❌ |
| OETH / wOETH Exchange Rate (Chainlink Oracle) | Base | `0xe96eb1eda83d18cbac224233319fa5071464e1b9` | ✅ | ✅ |

## Os

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Origin Sonic (ERC-20) | Sonic | `0xb1e25689d55734fd3fffc939c4c3eb52dff8a794` | ✅ | ✅ |
| Wrapped OS (ERC-4626) | Sonic | `0x9f0df7799f6fdad409300080cff680f5a23df4b1` | ✅ | ✅ |
| Vault | Sonic | `0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186` | ✅ | ✅ |
| Oracle Router | Sonic | `0xe68e0c66950a7e02335fc9f44daa05d115c4e88b` | ✅ | ✅ |
| Dripper | Sonic | `0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03` | ✅ | ✅ |
| Zapper | Sonic | `0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21` | ✅ | ❌ |
| Sonic Staking Strategy | Sonic | `0x596b0401479f6dfe1caf8c12838311fee742b95c` | ✅ | ❌ |
| SwapX AMO Strategy | Sonic | `0xbe19cc5654e30daf04ad3b5e06213d70f4e882ee` | ✅ | ❌ |
| Harvester | Sonic | `0x7b0383b31c7662e3f6b6e9c743bc87b93c1f4498` | ✅ | ❌ |
| Timelock | Sonic | `0x31a91336414d3b955e494e7d485a6b06b55fc8fb` | ✅ | ❌ |
| VaultValueChecker | Sonic | `0x06f172e6852085eca886b7f9fd8f7b21db3d2c40` | ✅ | ❌ |

## Ousd

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Origin Dollar (ERC-20) | Ethereum | `0x2a8e1e676ec238d8a992307b495b45b3feaa5e86` | ✅ | ✅ |
| Wrapped OUSD (ERC-4626) | Ethereum | `0xd2af830e8cbdfed6cc11bab697bb25496ed6fa62` | ✅ | ❌ |
| Vault | Ethereum | `0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70` | ✅ | ✅ |
| Curve USDC AMO Strategy | Ethereum | `0x26a02ec47acc2a3442b757f45e0a82b8e993ce11` | ✅ | ❌ |
| Morpho V2 Strategy | Ethereum | `0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e` | ✅ | ❌ |
| Morpho Gauntlet Prime USDC Strategy | Ethereum | `0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1` | ✅ | ❌ |
| Oracle Router | Ethereum | `0x36cfb852d3b84afb3909bcf4ea0dbe8c82ee1c3c` | ❌ | ❌ |
| Curve Pool Booster Factory | Ethereum | `0x8a8809d67e3193486dcf94ad023978cbceed1723` | ✅ | ✅ |

## Pool Booster

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| PoolBooster Central Registry | Ethereum | `0xaa8af8db4b6a827b51786334d26349eb03569731` | ✅ | ✅ |
| PoolBooster Factory Merkl | Ethereum | `0x0fc66355b681503efee7741bd848080d809fd6db` | ✅ | ✅ |
| PoolBooster Factory Curve Mainnet &#x26; Arbitrum | Ethereum | `0x9f4308cdfa4d02c045bc8bd82864013b62d516bb` | ✅ | ✅ |
| PoolBooster Central Registry | Base | `0x157f0b239d7f83d153e6c95f8ad9d341694376e3` | ✅ | ✅ |
| PoolBooster Factory Merkl | Base | `0x1adb902ece465ca681c66187627a622a631a0a63` | ✅ | ✅ |
| CentralRegistry | Sonic | `0x4f3b656aa5fb5e708bf7b63d6ff71623eb4a218a` | ❌ | ❌ |
| Factory: SwapXDouble | Sonic | `0x840081c97256d553a8f234d469d797b9535a3b49` | ❌ | ❌ |
| Factory: SwapXSingle | Sonic | `0x2d7c5a0a60a874a48bd538322f758ef43fa32953` | ❌ | ❌ |
| Factory: Metropolis | Sonic | `0x406c9317a58b5827a64176d06aeb68ed0b5b5b1e` | ❌ | ❌ |
| Factory: Merkl | Sonic | `0xdbe1c1a3de56bea848b4ffd8486dd539e9d490b7` | ❌ | ❌ |

## Safe Modules

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
|  | Ethereum | `0x1b84e64279d63f48ddd88b9b2a7871e817152a44` | ❌ | ❌ |
|  | Ethereum | `0x60d3d6ec213d84dea193dbd79673340061178893` | ❌ | ❌ |
|  | Ethereum | `0x26179ada0f7cb714c11a8190e1f517988c28e759` | ❌ | ❌ |
|  | Ethereum | `0x362dbd4ff662b2e2b05b9cedc91da2dd2c655b26` | ❌ | ❌ |
|  | Ethereum | `0x630c1763d38abe76301f58909fa174e7b84a7ecd` | ❌ | ❌ |
|  | Ethereum | `0xac58c88349e00509fec216e1b61d13b43315e18d` | ❌ | ❌ |
|  | Ethereum | `0xb000833e7c140a5359bef8b92becbcae9aabf64e` | ❌ | ❌ |

## Ethena Susde Usde

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Ethena ARM | Ethereum | `0xceda2d856238aa0d12f6329de20b9115f07c366d` | ✅ | ✅ |
| AAVE Strategy | Ethereum | `0x0dc20109ea012f050beda184844c1ed5ec6da33a` | ✅ | ✅ |
| Cap Manager | Ethereum | `0x687afb5a52a15122fd5fc54a8b52cfd58346fb0c` | ✅ | ✅ |
| Unstaker (example) | Ethereum | `0x77789bb87eadfc429440209f7d28ed55ac15f17a` | ❌ | ❌ |
| Staked USDe | Ethereum | `0x9d39a5de30e57443bff2a8307a4256c8797a3497` | ❌ | ❌ |
| AAVE USDe pool | Ethereum | `0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2` | ❌ | ❌ |
| Owner | Ethereum | `0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899` | ✅ | ✅ |
| Operator | Ethereum | `0x39878253374355dbcc15c86458f084fb6f2d6de7` | ✅ | ✅ |
| Fee Collector | Ethereum | `0xbb077e716a5f1f1b63ed5244ebff5214e50fec8c` | ❌ | ❌ |

## Etherfi Eeth Weth

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| EtherFi ARM | Ethereum | `0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2` | ✅ | ✅ |
| Morpho Strategy | Ethereum | `0x8cf42b82fffa3e7714d62a2ca223acbec1eef095` | ✅ | ✅ |
| Cap Manager | Ethereum | `0xf2a18f7330141ec737eb73a0a5ea8e4d7e9be7ec` | ✅ | ✅ |
| Zapper | Ethereum | `0xe11edbd5ae4fa434af7f8d7f03da1742996e7ab2` | ✅ | ✅ |
| EtherFi Redemption Manager | Ethereum | `0xdadef1ffbfeaab4f68a9fd181395f68b4e4e7ae0` | ❌ | ❌ |
| EtherFi Withdraw NFT | Ethereum | `0x7d5706f6ef3f89b3951e23e557cdfbc3239d4e2c` | ❌ | ❌ |
| EtherFi Withdrawal Queue | Ethereum | `0x308861a430be4cce5502d0a12724771fc6daf216` | ❌ | ❌ |
| Morpho Vault: Gauntlet LRT | Ethereum | `0x4881ef0bf6d2365d3dd6499ccd7532bcdbce0658` | ❌ | ❌ |
| Owner | Ethereum | `0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899` | ✅ | ✅ |
| Operator | Ethereum | `0x39878253374355dbcc15c86458f084fb6f2d6de7` | ✅ | ✅ |
| Fee Collector | Ethereum | `0xbb077e716a5f1f1b63ed5244ebff5214e50fec8c` | ❌ | ❌ |

## Lido Steth Weth

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Lido ARM | Ethereum | `0x85b78aca6deae198fbf201c82daf6ca21942acc6` | ✅ | ✅ |
| Morpho Strategy | Ethereum | `0x29c4bb7b1ebcc53e8cbd16480b5bae52c69806d3` | ✅ | ✅ |
| Cap Manager | Ethereum | `0xf54ebff575f699d281645c6f14fe427dffe629cf` | ✅ | ✅ |
| Zapper | Ethereum | `0x01f30b7358ba51f637d1aa05d9b4a60f76dad680` | ✅ | ✅ |
| Lido Withdrawal Queue | Ethereum | `0x889edc2edab5f40e902b864ad4d7ade8e412f9b1` | ❌ | ❌ |
| Morpho Vault: MEV Capital | Ethereum | `0x9a8bc3b04b7f3d87cfc09ba407dced575f2d61d8` | ❌ | ❌ |
| Pendle ARM SY token | Ethereum | `0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184` | ❌ | ❌ |
| Owner | Ethereum | `0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f` | ✅ | ❌ |
| Operator | Ethereum | `0x39878253374355dbcc15c86458f084fb6f2d6de7` | ✅ | ✅ |
| Fee Collector | Ethereum | `0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971` | ✅ | ✅ |

## Origin Oeth Weth

| Contract | Chain | Address | Proxy | Events |
|----------|-------|---------|:-----:|:------:|
| Origin ARM | Ethereum | `0x6bac785889a4127db0e0cefee88e0a9f1aaf3cc7` | ✅ | ✅ |
| Owner | Ethereum | `0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f` | ✅ | ❌ |
| Operator | Ethereum | `0x4b91827516f79d6f6a1f292ed99671663b09169a` | ✅ | ✅ |

## Summary

- **Total contracts in registry:** 83
- **Proxy tracked only:** 20
- **Event tracked only:** 0
- **Fully tracked (both):** 37
- **Not tracked at all:** 26

## Contracts Needing Event Tracking

These contracts have proxy monitoring but no specific event handlers:

| Registry | Contract | Chain | Address |
|----------|----------|-------|--------|
| Oeth | Zapper | Ethereum | `0xda0485c1e74a7ef690e99d8286c243942edaa07b` |
| Oeth | Harvester Simple | Ethereum | `0x6d416e576eecbb9f897856a7c86007905274ed04` |
| Oeth | FixedRateDripper | Ethereum | `0xe3b3b4fc77505ecfaacf6dd21619a8cc12fcc501` |
| Oeth | Compounding Staking Strategy View | Ethereum | `0xedf495f92c2ebdee8b797e9c503aa7a3302a9c88` |
| Oeth | BeaconProofs | Ethereum | `0xc4444c5d9e7c1a5a0a01c5e4b11692d589dcaf22` |
| Oeth | Second Native Staking Fee Accumulator | Ethereum | `0xfee31c09fa5e9cdbc1f80c90b42b58640be91ddf` |
| Oeth | Third Native Staking Fee Accumulator | Ethereum | `0x49674fbce040d95366604d1db3392e9bdea14d48` |
| Oeth | Curve OETH+WETH (AMO) Strategy | Ethereum | `0xba0e352ab5c13861c26e4e773e7a833c3a223fe6` |
| Oeth | wOETH (ERC-20) | Arbitrum | `0xd8724322f44e5c58d7a815f542036fb17dbbf839` |
| Os | Zapper | Sonic | `0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21` |
| Os | Sonic Staking Strategy | Sonic | `0x596b0401479f6dfe1caf8c12838311fee742b95c` |
| Os | SwapX AMO Strategy | Sonic | `0xbe19cc5654e30daf04ad3b5e06213d70f4e882ee` |
| Os | Harvester | Sonic | `0x7b0383b31c7662e3f6b6e9c743bc87b93c1f4498` |
| Os | Timelock | Sonic | `0x31a91336414d3b955e494e7d485a6b06b55fc8fb` |
| Os | VaultValueChecker | Sonic | `0x06f172e6852085eca886b7f9fd8f7b21db3d2c40` |
| Ousd | Wrapped OUSD (ERC-4626) | Ethereum | `0xd2af830e8cbdfed6cc11bab697bb25496ed6fa62` |
| Ousd | Curve USDC AMO Strategy | Ethereum | `0x26a02ec47acc2a3442b757f45e0a82b8e993ce11` |
| Ousd | Morpho V2 Strategy | Ethereum | `0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e` |
| Ousd | Morpho Gauntlet Prime USDC Strategy | Ethereum | `0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1` |
| Lido Steth Weth | Owner | Ethereum | `0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f` |

## Completely Untracked Contracts

These contracts have no tracking at all:

| Registry | Contract | Chain | Address |
|----------|----------|-------|--------|
| Oeth | wOETH LayerZero Adapter | Ethereum | `0x7d1bea5807e6af125826d56ff477745bb89972b8` |
| Oeth | OETH / wOETH Exchange Rate (Chainlink Oracle) | Arbitrum | `0x03a1f4b19aaea6e68f0f104dc4346da3e942cc45` |
| Ousd | Oracle Router | Ethereum | `0x36cfb852d3b84afb3909bcf4ea0dbe8c82ee1c3c` |
| Pool Booster | CentralRegistry | Sonic | `0x4f3b656aa5fb5e708bf7b63d6ff71623eb4a218a` |
| Pool Booster | Factory: SwapXDouble | Sonic | `0x840081c97256d553a8f234d469d797b9535a3b49` |
| Pool Booster | Factory: SwapXSingle | Sonic | `0x2d7c5a0a60a874a48bd538322f758ef43fa32953` |
| Pool Booster | Factory: Metropolis | Sonic | `0x406c9317a58b5827a64176d06aeb68ed0b5b5b1e` |
| Pool Booster | Factory: Merkl | Sonic | `0xdbe1c1a3de56bea848b4ffd8486dd539e9d490b7` |
| Safe Modules |  | Ethereum | `0x1b84e64279d63f48ddd88b9b2a7871e817152a44` |
| Safe Modules |  | Ethereum | `0x60d3d6ec213d84dea193dbd79673340061178893` |
| Safe Modules |  | Ethereum | `0x26179ada0f7cb714c11a8190e1f517988c28e759` |
| Safe Modules |  | Ethereum | `0x362dbd4ff662b2e2b05b9cedc91da2dd2c655b26` |
| Safe Modules |  | Ethereum | `0x630c1763d38abe76301f58909fa174e7b84a7ecd` |
| Safe Modules |  | Ethereum | `0xac58c88349e00509fec216e1b61d13b43315e18d` |
| Safe Modules |  | Ethereum | `0xb000833e7c140a5359bef8b92becbcae9aabf64e` |
| Ethena Susde Usde | Unstaker (example) | Ethereum | `0x77789bb87eadfc429440209f7d28ed55ac15f17a` |
| Ethena Susde Usde | Staked USDe | Ethereum | `0x9d39a5de30e57443bff2a8307a4256c8797a3497` |
| Ethena Susde Usde | AAVE USDe pool | Ethereum | `0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2` |
| Ethena Susde Usde | Fee Collector | Ethereum | `0xbb077e716a5f1f1b63ed5244ebff5214e50fec8c` |
| Etherfi Eeth Weth | EtherFi Redemption Manager | Ethereum | `0xdadef1ffbfeaab4f68a9fd181395f68b4e4e7ae0` |
| Etherfi Eeth Weth | EtherFi Withdraw NFT | Ethereum | `0x7d5706f6ef3f89b3951e23e557cdfbc3239d4e2c` |
| Etherfi Eeth Weth | EtherFi Withdrawal Queue | Ethereum | `0x308861a430be4cce5502d0a12724771fc6daf216` |
| Etherfi Eeth Weth | Morpho Vault: Gauntlet LRT | Ethereum | `0x4881ef0bf6d2365d3dd6499ccd7532bcdbce0658` |
| Lido Steth Weth | Lido Withdrawal Queue | Ethereum | `0x889edc2edab5f40e902b864ad4d7ade8e412f9b1` |
| Lido Steth Weth | Morpho Vault: MEV Capital | Ethereum | `0x9a8bc3b04b7f3d87cfc09ba407dced575f2d61d8` |
| Lido Steth Weth | Pendle ARM SY token | Ethereum | `0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184` |
