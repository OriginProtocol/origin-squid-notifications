import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CVXShareBpsUpdated: event("0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787", "CVXShareBpsUpdated(uint256)", {"bps": p.uint256}),
    GovernorshipTransferred: event("0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a", "GovernorshipTransferred(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    OTokenBuyback: event("0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743", "OTokenBuyback(address,address,uint256,uint256)", {"oToken": indexed(p.address), "swappedFor": indexed(p.address), "swapAmountIn": p.uint256, "amountOut": p.uint256}),
    PendingGovernorshipTransfer: event("0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d", "PendingGovernorshipTransfer(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    RewardsSourceUpdated: event("0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd", "RewardsSourceUpdated(address)", {"_address": indexed(p.address)}),
    StrategistUpdated: event("0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee", "StrategistUpdated(address)", {"_address": p.address}),
    SwapRouterUpdated: event("0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df", "SwapRouterUpdated(address)", {"_address": indexed(p.address)}),
    TreasuryManagerUpdated: event("0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4", "TreasuryManagerUpdated(address)", {"_address": indexed(p.address)}),
}

export const functions = {
    balanceForCVX: viewFun("0x6f2ff9e0", "balanceForCVX()", {}, p.uint256),
    balanceForOGN: viewFun("0x3551fb78", "balanceForOGN()", {}, p.uint256),
    claimGovernance: fun("0x5d36b190", "claimGovernance()", {}, ),
    cvx: viewFun("0x923c1d61", "cvx()", {}, p.address),
    cvxLocker: viewFun("0x8d68f9ff", "cvxLocker()", {}, p.address),
    cvxShareBps: viewFun("0x17cf0122", "cvxShareBps()", {}, p.uint256),
    governor: viewFun("0x0c340a24", "governor()", {}, p.address),
    initialize: fun("0xf7013ef6", "initialize(address,address,address,address,uint256)", {"_swapRouter": p.address, "_strategistAddr": p.address, "_treasuryManagerAddr": p.address, "_rewardsSource": p.address, "_cvxShareBps": p.uint256}, ),
    isGovernor: viewFun("0xc7af3352", "isGovernor()", {}, p.bool),
    lockAllCVX: fun("0x113f2ec7", "lockAllCVX()", {}, ),
    oToken: viewFun("0x1a32aad6", "oToken()", {}, p.address),
    ogn: viewFun("0x602bc098", "ogn()", {}, p.address),
    rewardsSource: viewFun("0xf7240d2f", "rewardsSource()", {}, p.address),
    safeApproveAllTokens: fun("0xad1728cb", "safeApproveAllTokens()", {}, ),
    setCVXShareBps: fun("0x87f8b719", "setCVXShareBps(uint256)", {"_bps": p.uint256}, ),
    setRewardsSource: fun("0xd1c76638", "setRewardsSource(address)", {"_address": p.address}, ),
    setStrategistAddr: fun("0x773540b3", "setStrategistAddr(address)", {"_address": p.address}, ),
    setSwapRouter: fun("0x41273657", "setSwapRouter(address)", {"_router": p.address}, ),
    setTreasuryManager: fun("0xfe47a9f2", "setTreasuryManager(address)", {"_address": p.address}, ),
    strategistAddr: viewFun("0x570d8e1d", "strategistAddr()", {}, p.address),
    swapForCVX: fun("0xdd0a6514", "swapForCVX(uint256,uint256,bytes)", {"oTokenAmount": p.uint256, "minCVX": p.uint256, "swapData": p.bytes}, ),
    swapForOGN: fun("0xbe50c839", "swapForOGN(uint256,uint256,bytes)", {"oTokenAmount": p.uint256, "minOGN": p.uint256, "swapData": p.bytes}, ),
    swapRouter: viewFun("0xc31c9c07", "swapRouter()", {}, p.address),
    transferGovernance: fun("0xd38bfff4", "transferGovernance(address)", {"_newGovernor": p.address}, ),
    transferToken: fun("0x1072cbea", "transferToken(address,uint256)", {"token": p.address, "amount": p.uint256}, ),
    treasuryManager: viewFun("0x3cea70d9", "treasuryManager()", {}, p.address),
    updateBuybackSplits: fun("0x75d7a6b4", "updateBuybackSplits()", {}, ),
}

export class Contract extends ContractBase {

    balanceForCVX() {
        return this.eth_call(functions.balanceForCVX, {})
    }

    balanceForOGN() {
        return this.eth_call(functions.balanceForOGN, {})
    }

    cvx() {
        return this.eth_call(functions.cvx, {})
    }

    cvxLocker() {
        return this.eth_call(functions.cvxLocker, {})
    }

    cvxShareBps() {
        return this.eth_call(functions.cvxShareBps, {})
    }

    governor() {
        return this.eth_call(functions.governor, {})
    }

    isGovernor() {
        return this.eth_call(functions.isGovernor, {})
    }

    oToken() {
        return this.eth_call(functions.oToken, {})
    }

    ogn() {
        return this.eth_call(functions.ogn, {})
    }

    rewardsSource() {
        return this.eth_call(functions.rewardsSource, {})
    }

    strategistAddr() {
        return this.eth_call(functions.strategistAddr, {})
    }

    swapRouter() {
        return this.eth_call(functions.swapRouter, {})
    }

    treasuryManager() {
        return this.eth_call(functions.treasuryManager, {})
    }
}

/// Event types
export type CVXShareBpsUpdatedEventArgs = EParams<typeof events.CVXShareBpsUpdated>
export type GovernorshipTransferredEventArgs = EParams<typeof events.GovernorshipTransferred>
export type OTokenBuybackEventArgs = EParams<typeof events.OTokenBuyback>
export type PendingGovernorshipTransferEventArgs = EParams<typeof events.PendingGovernorshipTransfer>
export type RewardsSourceUpdatedEventArgs = EParams<typeof events.RewardsSourceUpdated>
export type StrategistUpdatedEventArgs = EParams<typeof events.StrategistUpdated>
export type SwapRouterUpdatedEventArgs = EParams<typeof events.SwapRouterUpdated>
export type TreasuryManagerUpdatedEventArgs = EParams<typeof events.TreasuryManagerUpdated>

/// Function types
export type BalanceForCVXParams = FunctionArguments<typeof functions.balanceForCVX>
export type BalanceForCVXReturn = FunctionReturn<typeof functions.balanceForCVX>

export type BalanceForOGNParams = FunctionArguments<typeof functions.balanceForOGN>
export type BalanceForOGNReturn = FunctionReturn<typeof functions.balanceForOGN>

export type ClaimGovernanceParams = FunctionArguments<typeof functions.claimGovernance>
export type ClaimGovernanceReturn = FunctionReturn<typeof functions.claimGovernance>

export type CvxParams = FunctionArguments<typeof functions.cvx>
export type CvxReturn = FunctionReturn<typeof functions.cvx>

export type CvxLockerParams = FunctionArguments<typeof functions.cvxLocker>
export type CvxLockerReturn = FunctionReturn<typeof functions.cvxLocker>

export type CvxShareBpsParams = FunctionArguments<typeof functions.cvxShareBps>
export type CvxShareBpsReturn = FunctionReturn<typeof functions.cvxShareBps>

export type GovernorParams = FunctionArguments<typeof functions.governor>
export type GovernorReturn = FunctionReturn<typeof functions.governor>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsGovernorParams = FunctionArguments<typeof functions.isGovernor>
export type IsGovernorReturn = FunctionReturn<typeof functions.isGovernor>

export type LockAllCVXParams = FunctionArguments<typeof functions.lockAllCVX>
export type LockAllCVXReturn = FunctionReturn<typeof functions.lockAllCVX>

export type OTokenParams = FunctionArguments<typeof functions.oToken>
export type OTokenReturn = FunctionReturn<typeof functions.oToken>

export type OgnParams = FunctionArguments<typeof functions.ogn>
export type OgnReturn = FunctionReturn<typeof functions.ogn>

export type RewardsSourceParams = FunctionArguments<typeof functions.rewardsSource>
export type RewardsSourceReturn = FunctionReturn<typeof functions.rewardsSource>

export type SafeApproveAllTokensParams = FunctionArguments<typeof functions.safeApproveAllTokens>
export type SafeApproveAllTokensReturn = FunctionReturn<typeof functions.safeApproveAllTokens>

export type SetCVXShareBpsParams = FunctionArguments<typeof functions.setCVXShareBps>
export type SetCVXShareBpsReturn = FunctionReturn<typeof functions.setCVXShareBps>

export type SetRewardsSourceParams = FunctionArguments<typeof functions.setRewardsSource>
export type SetRewardsSourceReturn = FunctionReturn<typeof functions.setRewardsSource>

export type SetStrategistAddrParams = FunctionArguments<typeof functions.setStrategistAddr>
export type SetStrategistAddrReturn = FunctionReturn<typeof functions.setStrategistAddr>

export type SetSwapRouterParams = FunctionArguments<typeof functions.setSwapRouter>
export type SetSwapRouterReturn = FunctionReturn<typeof functions.setSwapRouter>

export type SetTreasuryManagerParams = FunctionArguments<typeof functions.setTreasuryManager>
export type SetTreasuryManagerReturn = FunctionReturn<typeof functions.setTreasuryManager>

export type StrategistAddrParams = FunctionArguments<typeof functions.strategistAddr>
export type StrategistAddrReturn = FunctionReturn<typeof functions.strategistAddr>

export type SwapForCVXParams = FunctionArguments<typeof functions.swapForCVX>
export type SwapForCVXReturn = FunctionReturn<typeof functions.swapForCVX>

export type SwapForOGNParams = FunctionArguments<typeof functions.swapForOGN>
export type SwapForOGNReturn = FunctionReturn<typeof functions.swapForOGN>

export type SwapRouterParams = FunctionArguments<typeof functions.swapRouter>
export type SwapRouterReturn = FunctionReturn<typeof functions.swapRouter>

export type TransferGovernanceParams = FunctionArguments<typeof functions.transferGovernance>
export type TransferGovernanceReturn = FunctionReturn<typeof functions.transferGovernance>

export type TransferTokenParams = FunctionArguments<typeof functions.transferToken>
export type TransferTokenReturn = FunctionReturn<typeof functions.transferToken>

export type TreasuryManagerParams = FunctionArguments<typeof functions.treasuryManager>
export type TreasuryManagerReturn = FunctionReturn<typeof functions.treasuryManager>

export type UpdateBuybackSplitsParams = FunctionArguments<typeof functions.updateBuybackSplits>
export type UpdateBuybackSplitsReturn = FunctionReturn<typeof functions.updateBuybackSplits>

