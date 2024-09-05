import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    GovernorshipTransferred: event("0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a", "GovernorshipTransferred(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    PendingGovernorshipTransfer: event("0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d", "PendingGovernorshipTransfer(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    RewardProceedsAddressChanged: event("0x50f4ca9002119593802480c412cb5e106ae726647a31dcf8a7e7ed4e6794bf5e", "RewardProceedsAddressChanged(address)", {"newProceedsAddress": p.address}),
    RewardProceedsTransferred: event("0x42e60aae8f000883c46e2f449fa76268e374ce1b962f46ca9360ab98b18f5799", "RewardProceedsTransferred(address,address,uint256,uint256)", {"token": indexed(p.address), "farmer": p.address, "protcolYield": p.uint256, "farmerFee": p.uint256}),
    RewardTokenConfigUpdated: event("0x5eb6073ba3980477f03b1ce0dccba754d48454bbd65a115dcd42db65ca1fefd2", "RewardTokenConfigUpdated(address,uint16,uint16,uint8,address,bytes,uint256,bool)", {"tokenAddress": p.address, "allowedSlippageBps": p.uint16, "harvestRewardBps": p.uint16, "swapPlatform": p.uint8, "swapPlatformAddr": p.address, "swapData": p.bytes, "liquidationLimit": p.uint256, "doSwapRewardToken": p.bool}),
    RewardTokenSwapped: event("0xa861903141bc68b536d5048a576afcc645630e1b18a4296ef34cbd4d1407f709", "RewardTokenSwapped(address,address,uint8,uint256,uint256)", {"rewardToken": indexed(p.address), "swappedInto": indexed(p.address), "swapPlatform": p.uint8, "amountIn": p.uint256, "amountOut": p.uint256}),
    SupportedStrategyUpdate: event("0x013ed61add17cbfcbbd95bf8543da67c89658c5477d3f3199a1a2d58ecf1913f", "SupportedStrategyUpdate(address,bool)", {"strategyAddress": p.address, "isSupported": p.bool}),
}

export const functions = {
    balancerPoolId: viewFun("0xda70696c", "balancerPoolId(address)", {"_0": p.address}, p.bytes32),
    baseTokenAddress: viewFun("0x7cb374bd", "baseTokenAddress()", {}, p.address),
    baseTokenDecimals: viewFun("0x82aa1c88", "baseTokenDecimals()", {}, p.uint256),
    claimGovernance: fun("0x5d36b190", "claimGovernance()", {}, ),
    curvePoolIndices: viewFun("0xe48d7fc5", "curvePoolIndices(address)", {"_0": p.address}, {"rewardTokenIndex": p.uint128, "baseTokenIndex": p.uint128}),
    governor: viewFun("0x0c340a24", "governor()", {}, p.address),
    'harvestAndSwap(address)': fun("0x548f5ae5", "harvestAndSwap(address)", {"_strategyAddr": p.address}, ),
    'harvestAndSwap(address,address)': fun("0xa994317f", "harvestAndSwap(address,address)", {"_strategyAddr": p.address, "_rewardTo": p.address}, ),
    isGovernor: viewFun("0xc7af3352", "isGovernor()", {}, p.bool),
    rewardProceedsAddress: viewFun("0xb76e83af", "rewardProceedsAddress()", {}, p.address),
    rewardTokenConfigs: viewFun("0x587c8440", "rewardTokenConfigs(address)", {"_0": p.address}, {"allowedSlippageBps": p.uint16, "harvestRewardBps": p.uint16, "swapPlatformAddr": p.address, "doSwapRewardToken": p.bool, "swapPlatform": p.uint8, "liquidationLimit": p.uint256}),
    setRewardProceedsAddress: fun("0xb13dc20a", "setRewardProceedsAddress(address)", {"_rewardProceedsAddress": p.address}, ),
    setRewardTokenConfig: fun("0x2579153d", "setRewardTokenConfig(address,(uint16,uint16,address,bool,uint8,uint256),bytes)", {"_tokenAddress": p.address, "tokenConfig": p.struct({"allowedSlippageBps": p.uint16, "harvestRewardBps": p.uint16, "swapPlatformAddr": p.address, "doSwapRewardToken": p.bool, "swapPlatform": p.uint8, "liquidationLimit": p.uint256}), "swapData": p.bytes}, ),
    setSupportedStrategy: fun("0x65f6fa94", "setSupportedStrategy(address,bool)", {"_strategyAddress": p.address, "_isSupported": p.bool}, ),
    supportedStrategies: viewFun("0xee3be5f5", "supportedStrategies(address)", {"_0": p.address}, p.bool),
    transferGovernance: fun("0xd38bfff4", "transferGovernance(address)", {"_newGovernor": p.address}, ),
    transferToken: fun("0x1072cbea", "transferToken(address,uint256)", {"_asset": p.address, "_amount": p.uint256}, ),
    uniswapV2Path: viewFun("0xdac4db4e", "uniswapV2Path(address,uint256)", {"_0": p.address, "_1": p.uint256}, p.address),
    uniswapV3Path: viewFun("0x2dfbe831", "uniswapV3Path(address)", {"_0": p.address}, p.bytes),
    vaultAddress: viewFun("0x430bf08a", "vaultAddress()", {}, p.address),
}

export class Contract extends ContractBase {

    balancerPoolId(_0: BalancerPoolIdParams["_0"]) {
        return this.eth_call(functions.balancerPoolId, {_0})
    }

    baseTokenAddress() {
        return this.eth_call(functions.baseTokenAddress, {})
    }

    baseTokenDecimals() {
        return this.eth_call(functions.baseTokenDecimals, {})
    }

    curvePoolIndices(_0: CurvePoolIndicesParams["_0"]) {
        return this.eth_call(functions.curvePoolIndices, {_0})
    }

    governor() {
        return this.eth_call(functions.governor, {})
    }

    isGovernor() {
        return this.eth_call(functions.isGovernor, {})
    }

    rewardProceedsAddress() {
        return this.eth_call(functions.rewardProceedsAddress, {})
    }

    rewardTokenConfigs(_0: RewardTokenConfigsParams["_0"]) {
        return this.eth_call(functions.rewardTokenConfigs, {_0})
    }

    supportedStrategies(_0: SupportedStrategiesParams["_0"]) {
        return this.eth_call(functions.supportedStrategies, {_0})
    }

    uniswapV2Path(_0: UniswapV2PathParams["_0"], _1: UniswapV2PathParams["_1"]) {
        return this.eth_call(functions.uniswapV2Path, {_0, _1})
    }

    uniswapV3Path(_0: UniswapV3PathParams["_0"]) {
        return this.eth_call(functions.uniswapV3Path, {_0})
    }

    vaultAddress() {
        return this.eth_call(functions.vaultAddress, {})
    }
}

/// Event types
export type GovernorshipTransferredEventArgs = EParams<typeof events.GovernorshipTransferred>
export type PendingGovernorshipTransferEventArgs = EParams<typeof events.PendingGovernorshipTransfer>
export type RewardProceedsAddressChangedEventArgs = EParams<typeof events.RewardProceedsAddressChanged>
export type RewardProceedsTransferredEventArgs = EParams<typeof events.RewardProceedsTransferred>
export type RewardTokenConfigUpdatedEventArgs = EParams<typeof events.RewardTokenConfigUpdated>
export type RewardTokenSwappedEventArgs = EParams<typeof events.RewardTokenSwapped>
export type SupportedStrategyUpdateEventArgs = EParams<typeof events.SupportedStrategyUpdate>

/// Function types
export type BalancerPoolIdParams = FunctionArguments<typeof functions.balancerPoolId>
export type BalancerPoolIdReturn = FunctionReturn<typeof functions.balancerPoolId>

export type BaseTokenAddressParams = FunctionArguments<typeof functions.baseTokenAddress>
export type BaseTokenAddressReturn = FunctionReturn<typeof functions.baseTokenAddress>

export type BaseTokenDecimalsParams = FunctionArguments<typeof functions.baseTokenDecimals>
export type BaseTokenDecimalsReturn = FunctionReturn<typeof functions.baseTokenDecimals>

export type ClaimGovernanceParams = FunctionArguments<typeof functions.claimGovernance>
export type ClaimGovernanceReturn = FunctionReturn<typeof functions.claimGovernance>

export type CurvePoolIndicesParams = FunctionArguments<typeof functions.curvePoolIndices>
export type CurvePoolIndicesReturn = FunctionReturn<typeof functions.curvePoolIndices>

export type GovernorParams = FunctionArguments<typeof functions.governor>
export type GovernorReturn = FunctionReturn<typeof functions.governor>

export type HarvestAndSwapParams_0 = FunctionArguments<typeof functions['harvestAndSwap(address)']>
export type HarvestAndSwapReturn_0 = FunctionReturn<typeof functions['harvestAndSwap(address)']>

export type HarvestAndSwapParams_1 = FunctionArguments<typeof functions['harvestAndSwap(address,address)']>
export type HarvestAndSwapReturn_1 = FunctionReturn<typeof functions['harvestAndSwap(address,address)']>

export type IsGovernorParams = FunctionArguments<typeof functions.isGovernor>
export type IsGovernorReturn = FunctionReturn<typeof functions.isGovernor>

export type RewardProceedsAddressParams = FunctionArguments<typeof functions.rewardProceedsAddress>
export type RewardProceedsAddressReturn = FunctionReturn<typeof functions.rewardProceedsAddress>

export type RewardTokenConfigsParams = FunctionArguments<typeof functions.rewardTokenConfigs>
export type RewardTokenConfigsReturn = FunctionReturn<typeof functions.rewardTokenConfigs>

export type SetRewardProceedsAddressParams = FunctionArguments<typeof functions.setRewardProceedsAddress>
export type SetRewardProceedsAddressReturn = FunctionReturn<typeof functions.setRewardProceedsAddress>

export type SetRewardTokenConfigParams = FunctionArguments<typeof functions.setRewardTokenConfig>
export type SetRewardTokenConfigReturn = FunctionReturn<typeof functions.setRewardTokenConfig>

export type SetSupportedStrategyParams = FunctionArguments<typeof functions.setSupportedStrategy>
export type SetSupportedStrategyReturn = FunctionReturn<typeof functions.setSupportedStrategy>

export type SupportedStrategiesParams = FunctionArguments<typeof functions.supportedStrategies>
export type SupportedStrategiesReturn = FunctionReturn<typeof functions.supportedStrategies>

export type TransferGovernanceParams = FunctionArguments<typeof functions.transferGovernance>
export type TransferGovernanceReturn = FunctionReturn<typeof functions.transferGovernance>

export type TransferTokenParams = FunctionArguments<typeof functions.transferToken>
export type TransferTokenReturn = FunctionReturn<typeof functions.transferToken>

export type UniswapV2PathParams = FunctionArguments<typeof functions.uniswapV2Path>
export type UniswapV2PathReturn = FunctionReturn<typeof functions.uniswapV2Path>

export type UniswapV3PathParams = FunctionArguments<typeof functions.uniswapV3Path>
export type UniswapV3PathReturn = FunctionReturn<typeof functions.uniswapV3Path>

export type VaultAddressParams = FunctionArguments<typeof functions.vaultAddress>
export type VaultAddressReturn = FunctionReturn<typeof functions.vaultAddress>

