import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ClaimRewards: event("0x9aa05b3d70a9e3e2f004f039648839560576334fb45c81f91b6db03ad9e2efc9", "ClaimRewards(address,address,uint256)", {"from": indexed(p.address), "reward": indexed(p.address), "amount": p.uint256}),
    Deposit: event("0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15", "Deposit(address,uint256,uint256)", {"from": indexed(p.address), "tokenId": indexed(p.uint256), "amount": p.uint256}),
    NotifyReward: event("0x52977ea98a2220a03ee9ba5cb003ada08d394ea10155483c95dc2dc77a7eb24b", "NotifyReward(address,address,uint256,uint256)", {"from": indexed(p.address), "reward": indexed(p.address), "epoch": indexed(p.uint256), "amount": p.uint256}),
    Withdraw: event("0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568", "Withdraw(address,uint256,uint256)", {"from": indexed(p.address), "tokenId": indexed(p.uint256), "amount": p.uint256}),
}

export const functions = {
    DURATION: viewFun("0x1be05289", "DURATION()", {}, p.uint256),
    _deposit: fun("0xf3207723", "_deposit(uint256,uint256)", {"amount": p.uint256, "tokenId": p.uint256}, ),
    _withdraw: fun("0x9e2bf22c", "_withdraw(uint256,uint256)", {"amount": p.uint256, "tokenId": p.uint256}, ),
    authorized: viewFun("0x456cb7c6", "authorized()", {}, p.address),
    balanceOf: viewFun("0x9cc7f708", "balanceOf(uint256)", {"_0": p.uint256}, p.uint256),
    checkpoints: viewFun("0x49dcc204", "checkpoints(uint256,uint256)", {"_0": p.uint256, "_1": p.uint256}, {"timestamp": p.uint256, "balanceOf": p.uint256}),
    earned: viewFun("0x3e491d47", "earned(address,uint256)", {"token": p.address, "tokenId": p.uint256}, p.uint256),
    getPriorBalanceIndex: viewFun("0xa28d4c9c", "getPriorBalanceIndex(uint256,uint256)", {"tokenId": p.uint256, "timestamp": p.uint256}, p.uint256),
    getPriorSupplyIndex: viewFun("0x76f4be36", "getPriorSupplyIndex(uint256)", {"timestamp": p.uint256}, p.uint256),
    getReward: fun("0xf5f8d365", "getReward(uint256,address[])", {"tokenId": p.uint256, "tokens": p.array(p.address)}, ),
    isReward: viewFun("0x4d5ce038", "isReward(address)", {"_0": p.address}, p.bool),
    isTrustedForwarder: viewFun("0x572b6c05", "isTrustedForwarder(address)", {"forwarder": p.address}, p.bool),
    lastEarn: viewFun("0xf25e55a5", "lastEarn(address,uint256)", {"_0": p.address, "_1": p.uint256}, p.uint256),
    notifyRewardAmount: fun("0xb66503cf", "notifyRewardAmount(address,uint256)", {"token": p.address, "amount": p.uint256}, ),
    numCheckpoints: viewFun("0x50589793", "numCheckpoints(uint256)", {"_0": p.uint256}, p.uint256),
    rewards: viewFun("0xf301af42", "rewards(uint256)", {"_0": p.uint256}, p.address),
    rewardsListLength: viewFun("0xe6886396", "rewardsListLength()", {}, p.uint256),
    supplyCheckpoints: viewFun("0xf7412baf", "supplyCheckpoints(uint256)", {"_0": p.uint256}, {"timestamp": p.uint256, "supply": p.uint256}),
    supplyNumCheckpoints: viewFun("0xe8111a12", "supplyNumCheckpoints()", {}, p.uint256),
    tokenRewardsPerEpoch: viewFun("0x92777b29", "tokenRewardsPerEpoch(address,uint256)", {"_0": p.address, "_1": p.uint256}, p.uint256),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    ve: viewFun("0x1f850716", "ve()", {}, p.address),
    voter: viewFun("0x46c96aac", "voter()", {}, p.address),
}

export class Contract extends ContractBase {

    DURATION() {
        return this.eth_call(functions.DURATION, {})
    }

    authorized() {
        return this.eth_call(functions.authorized, {})
    }

    balanceOf(_0: BalanceOfParams["_0"]) {
        return this.eth_call(functions.balanceOf, {_0})
    }

    checkpoints(_0: CheckpointsParams["_0"], _1: CheckpointsParams["_1"]) {
        return this.eth_call(functions.checkpoints, {_0, _1})
    }

    earned(token: EarnedParams["token"], tokenId: EarnedParams["tokenId"]) {
        return this.eth_call(functions.earned, {token, tokenId})
    }

    getPriorBalanceIndex(tokenId: GetPriorBalanceIndexParams["tokenId"], timestamp: GetPriorBalanceIndexParams["timestamp"]) {
        return this.eth_call(functions.getPriorBalanceIndex, {tokenId, timestamp})
    }

    getPriorSupplyIndex(timestamp: GetPriorSupplyIndexParams["timestamp"]) {
        return this.eth_call(functions.getPriorSupplyIndex, {timestamp})
    }

    isReward(_0: IsRewardParams["_0"]) {
        return this.eth_call(functions.isReward, {_0})
    }

    isTrustedForwarder(forwarder: IsTrustedForwarderParams["forwarder"]) {
        return this.eth_call(functions.isTrustedForwarder, {forwarder})
    }

    lastEarn(_0: LastEarnParams["_0"], _1: LastEarnParams["_1"]) {
        return this.eth_call(functions.lastEarn, {_0, _1})
    }

    numCheckpoints(_0: NumCheckpointsParams["_0"]) {
        return this.eth_call(functions.numCheckpoints, {_0})
    }

    rewards(_0: RewardsParams["_0"]) {
        return this.eth_call(functions.rewards, {_0})
    }

    rewardsListLength() {
        return this.eth_call(functions.rewardsListLength, {})
    }

    supplyCheckpoints(_0: SupplyCheckpointsParams["_0"]) {
        return this.eth_call(functions.supplyCheckpoints, {_0})
    }

    supplyNumCheckpoints() {
        return this.eth_call(functions.supplyNumCheckpoints, {})
    }

    tokenRewardsPerEpoch(_0: TokenRewardsPerEpochParams["_0"], _1: TokenRewardsPerEpochParams["_1"]) {
        return this.eth_call(functions.tokenRewardsPerEpoch, {_0, _1})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    ve() {
        return this.eth_call(functions.ve, {})
    }

    voter() {
        return this.eth_call(functions.voter, {})
    }
}

/// Event types
export type ClaimRewardsEventArgs = EParams<typeof events.ClaimRewards>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type NotifyRewardEventArgs = EParams<typeof events.NotifyReward>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>

/// Function types
export type DURATIONParams = FunctionArguments<typeof functions.DURATION>
export type DURATIONReturn = FunctionReturn<typeof functions.DURATION>

export type _depositParams = FunctionArguments<typeof functions._deposit>
export type _depositReturn = FunctionReturn<typeof functions._deposit>

export type _withdrawParams = FunctionArguments<typeof functions._withdraw>
export type _withdrawReturn = FunctionReturn<typeof functions._withdraw>

export type AuthorizedParams = FunctionArguments<typeof functions.authorized>
export type AuthorizedReturn = FunctionReturn<typeof functions.authorized>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type CheckpointsParams = FunctionArguments<typeof functions.checkpoints>
export type CheckpointsReturn = FunctionReturn<typeof functions.checkpoints>

export type EarnedParams = FunctionArguments<typeof functions.earned>
export type EarnedReturn = FunctionReturn<typeof functions.earned>

export type GetPriorBalanceIndexParams = FunctionArguments<typeof functions.getPriorBalanceIndex>
export type GetPriorBalanceIndexReturn = FunctionReturn<typeof functions.getPriorBalanceIndex>

export type GetPriorSupplyIndexParams = FunctionArguments<typeof functions.getPriorSupplyIndex>
export type GetPriorSupplyIndexReturn = FunctionReturn<typeof functions.getPriorSupplyIndex>

export type GetRewardParams = FunctionArguments<typeof functions.getReward>
export type GetRewardReturn = FunctionReturn<typeof functions.getReward>

export type IsRewardParams = FunctionArguments<typeof functions.isReward>
export type IsRewardReturn = FunctionReturn<typeof functions.isReward>

export type IsTrustedForwarderParams = FunctionArguments<typeof functions.isTrustedForwarder>
export type IsTrustedForwarderReturn = FunctionReturn<typeof functions.isTrustedForwarder>

export type LastEarnParams = FunctionArguments<typeof functions.lastEarn>
export type LastEarnReturn = FunctionReturn<typeof functions.lastEarn>

export type NotifyRewardAmountParams = FunctionArguments<typeof functions.notifyRewardAmount>
export type NotifyRewardAmountReturn = FunctionReturn<typeof functions.notifyRewardAmount>

export type NumCheckpointsParams = FunctionArguments<typeof functions.numCheckpoints>
export type NumCheckpointsReturn = FunctionReturn<typeof functions.numCheckpoints>

export type RewardsParams = FunctionArguments<typeof functions.rewards>
export type RewardsReturn = FunctionReturn<typeof functions.rewards>

export type RewardsListLengthParams = FunctionArguments<typeof functions.rewardsListLength>
export type RewardsListLengthReturn = FunctionReturn<typeof functions.rewardsListLength>

export type SupplyCheckpointsParams = FunctionArguments<typeof functions.supplyCheckpoints>
export type SupplyCheckpointsReturn = FunctionReturn<typeof functions.supplyCheckpoints>

export type SupplyNumCheckpointsParams = FunctionArguments<typeof functions.supplyNumCheckpoints>
export type SupplyNumCheckpointsReturn = FunctionReturn<typeof functions.supplyNumCheckpoints>

export type TokenRewardsPerEpochParams = FunctionArguments<typeof functions.tokenRewardsPerEpoch>
export type TokenRewardsPerEpochReturn = FunctionReturn<typeof functions.tokenRewardsPerEpoch>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type VeParams = FunctionArguments<typeof functions.ve>
export type VeReturn = FunctionReturn<typeof functions.ve>

export type VoterParams = FunctionArguments<typeof functions.voter>
export type VoterReturn = FunctionReturn<typeof functions.voter>

