import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    ClaimRewards: event("0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f", "ClaimRewards(address,address[],uint256[])", {"user": indexed(p.address), "rewardTokens": p.array(p.address), "rewardAmounts": p.array(p.uint256)}),
    Deposit: event("0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59", "Deposit(address,address,address,uint256,uint256)", {"caller": indexed(p.address), "receiver": indexed(p.address), "tokenIn": indexed(p.address), "amountDeposited": p.uint256, "amountSyOut": p.uint256}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    Redeem: event("0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c", "Redeem(address,address,address,uint256,uint256)", {"caller": indexed(p.address), "receiver": indexed(p.address), "tokenOut": indexed(p.address), "amountSyToRedeem": p.uint256, "amountTokenOut": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
}

export const functions = {
    accruedRewards: viewFun("0x128fced1", "accruedRewards(address)", {"_0": p.address}, p.array(p.uint256)),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "amount": p.uint256}, p.bool),
    asset: viewFun("0x38d52e0f", "asset()", {}, p.address),
    assetInfo: viewFun("0xa40bee50", "assetInfo()", {}, {"assetType": p.uint8, "assetAddress": p.address, "assetDecimals": p.uint8}),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    claimOwnership: fun("0x4e71e0c8", "claimOwnership()", {}, ),
    claimRewards: fun("0xef5cfb8c", "claimRewards(address)", {"_0": p.address}, p.array(p.uint256)),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    deposit: fun("0x20e8c565", "deposit(address,address,uint256,uint256)", {"receiver": p.address, "tokenIn": p.address, "amountTokenToDeposit": p.uint256, "minSharesOut": p.uint256}, p.uint256),
    exchangeRate: viewFun("0x3ba0b9a9", "exchangeRate()", {}, p.uint256),
    getRewardTokens: viewFun("0xc4f59f9b", "getRewardTokens()", {}, p.array(p.address)),
    getTokensIn: viewFun("0x213cae63", "getTokensIn()", {}, p.array(p.address)),
    getTokensOut: viewFun("0x071bc3c9", "getTokensOut()", {}, p.array(p.address)),
    isValidTokenIn: viewFun("0xfa5a4f06", "isValidTokenIn(address)", {"token": p.address}, p.bool),
    isValidTokenOut: viewFun("0x784367d6", "isValidTokenOut(address)", {"token": p.address}, p.bool),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    pendingOwner: viewFun("0xe30c3978", "pendingOwner()", {}, p.address),
    previewDeposit: viewFun("0xb8f82b26", "previewDeposit(address,uint256)", {"tokenIn": p.address, "amountTokenToDeposit": p.uint256}, p.uint256),
    previewRedeem: viewFun("0xcbe52ae3", "previewRedeem(address,uint256)", {"tokenOut": p.address, "amountSharesToRedeem": p.uint256}, p.uint256),
    pricingInfo: viewFun("0x14b3aa0f", "pricingInfo()", {}, {"refToken": p.address, "refStrictlyEqual": p.bool}),
    redeem: fun("0x769f8e5d", "redeem(address,uint256,address,uint256,bool)", {"receiver": p.address, "amountSharesToRedeem": p.uint256, "tokenOut": p.address, "minTokenOut": p.uint256, "burnFromInternalBalance": p.bool}, p.uint256),
    rewardIndexesCurrent: fun("0xf8b2f991", "rewardIndexesCurrent()", {}, p.array(p.uint256)),
    rewardIndexesStored: viewFun("0xda88ecb4", "rewardIndexesStored()", {}, p.array(p.uint256)),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
    transferOwnership: fun("0x078dfbe7", "transferOwnership(address,bool,bool)", {"newOwner": p.address, "direct": p.bool, "renounce": p.bool}, ),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    yieldToken: viewFun("0x76d5de85", "yieldToken()", {}, p.address),
}

export class Contract extends ContractBase {

    accruedRewards(_0: AccruedRewardsParams["_0"]) {
        return this.eth_call(functions.accruedRewards, {_0})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    asset() {
        return this.eth_call(functions.asset, {})
    }

    assetInfo() {
        return this.eth_call(functions.assetInfo, {})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    exchangeRate() {
        return this.eth_call(functions.exchangeRate, {})
    }

    getRewardTokens() {
        return this.eth_call(functions.getRewardTokens, {})
    }

    getTokensIn() {
        return this.eth_call(functions.getTokensIn, {})
    }

    getTokensOut() {
        return this.eth_call(functions.getTokensOut, {})
    }

    isValidTokenIn(token: IsValidTokenInParams["token"]) {
        return this.eth_call(functions.isValidTokenIn, {token})
    }

    isValidTokenOut(token: IsValidTokenOutParams["token"]) {
        return this.eth_call(functions.isValidTokenOut, {token})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    previewDeposit(tokenIn: PreviewDepositParams["tokenIn"], amountTokenToDeposit: PreviewDepositParams["amountTokenToDeposit"]) {
        return this.eth_call(functions.previewDeposit, {tokenIn, amountTokenToDeposit})
    }

    previewRedeem(tokenOut: PreviewRedeemParams["tokenOut"], amountSharesToRedeem: PreviewRedeemParams["amountSharesToRedeem"]) {
        return this.eth_call(functions.previewRedeem, {tokenOut, amountSharesToRedeem})
    }

    pricingInfo() {
        return this.eth_call(functions.pricingInfo, {})
    }

    rewardIndexesStored() {
        return this.eth_call(functions.rewardIndexesStored, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    yieldToken() {
        return this.eth_call(functions.yieldToken, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ClaimRewardsEventArgs = EParams<typeof events.ClaimRewards>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type RedeemEventArgs = EParams<typeof events.Redeem>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>

/// Function types
export type AccruedRewardsParams = FunctionArguments<typeof functions.accruedRewards>
export type AccruedRewardsReturn = FunctionReturn<typeof functions.accruedRewards>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type AssetParams = FunctionArguments<typeof functions.asset>
export type AssetReturn = FunctionReturn<typeof functions.asset>

export type AssetInfoParams = FunctionArguments<typeof functions.assetInfo>
export type AssetInfoReturn = FunctionReturn<typeof functions.assetInfo>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type ClaimOwnershipParams = FunctionArguments<typeof functions.claimOwnership>
export type ClaimOwnershipReturn = FunctionReturn<typeof functions.claimOwnership>

export type ClaimRewardsParams = FunctionArguments<typeof functions.claimRewards>
export type ClaimRewardsReturn = FunctionReturn<typeof functions.claimRewards>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type ExchangeRateParams = FunctionArguments<typeof functions.exchangeRate>
export type ExchangeRateReturn = FunctionReturn<typeof functions.exchangeRate>

export type GetRewardTokensParams = FunctionArguments<typeof functions.getRewardTokens>
export type GetRewardTokensReturn = FunctionReturn<typeof functions.getRewardTokens>

export type GetTokensInParams = FunctionArguments<typeof functions.getTokensIn>
export type GetTokensInReturn = FunctionReturn<typeof functions.getTokensIn>

export type GetTokensOutParams = FunctionArguments<typeof functions.getTokensOut>
export type GetTokensOutReturn = FunctionReturn<typeof functions.getTokensOut>

export type IsValidTokenInParams = FunctionArguments<typeof functions.isValidTokenIn>
export type IsValidTokenInReturn = FunctionReturn<typeof functions.isValidTokenIn>

export type IsValidTokenOutParams = FunctionArguments<typeof functions.isValidTokenOut>
export type IsValidTokenOutReturn = FunctionReturn<typeof functions.isValidTokenOut>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type PreviewDepositParams = FunctionArguments<typeof functions.previewDeposit>
export type PreviewDepositReturn = FunctionReturn<typeof functions.previewDeposit>

export type PreviewRedeemParams = FunctionArguments<typeof functions.previewRedeem>
export type PreviewRedeemReturn = FunctionReturn<typeof functions.previewRedeem>

export type PricingInfoParams = FunctionArguments<typeof functions.pricingInfo>
export type PricingInfoReturn = FunctionReturn<typeof functions.pricingInfo>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RewardIndexesCurrentParams = FunctionArguments<typeof functions.rewardIndexesCurrent>
export type RewardIndexesCurrentReturn = FunctionReturn<typeof functions.rewardIndexesCurrent>

export type RewardIndexesStoredParams = FunctionArguments<typeof functions.rewardIndexesStored>
export type RewardIndexesStoredReturn = FunctionReturn<typeof functions.rewardIndexesStored>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type YieldTokenParams = FunctionArguments<typeof functions.yieldToken>
export type YieldTokenReturn = FunctionReturn<typeof functions.yieldToken>

