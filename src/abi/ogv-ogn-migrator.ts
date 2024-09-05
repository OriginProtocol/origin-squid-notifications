import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Decommissioned: event("0x4bd04f3440c9bf56a25f7b9e1ac75a9803bd83123a127cf9748129c938630b39", "Decommissioned()", {}),
    GovernorshipTransferred: event("0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a", "GovernorshipTransferred(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    LockupsMigrated: event("0xb5895e6e094fe35ea6fb07a0d870556bd8873cb5b013db35577ac4b8fc9ba911", "LockupsMigrated(address,uint256[],uint256,uint256)", {"user": indexed(p.address), "ogvLockupIds": p.array(p.uint256), "newStakeAmount": p.uint256, "newDuration": p.uint256}),
    PendingGovernorshipTransfer: event("0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d", "PendingGovernorshipTransfer(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    TokenExchanged: event("0x9c1f21412e7678ca4f1e877049ce3e4db3d039e316e6b55b1de2aef667ae4996", "TokenExchanged(uint256,uint256)", {"ogvAmountIn": p.uint256, "ognAmountOut": p.uint256}),
}

export const functions = {
    CONVERSION_RATE: viewFun("0x2c8bff31", "CONVERSION_RATE()", {}, p.uint256),
    claimGovernance: fun("0x5d36b190", "claimGovernance()", {}, ),
    endTime: viewFun("0x3197cbb6", "endTime()", {}, p.uint256),
    governor: viewFun("0x0c340a24", "governor()", {}, p.address),
    isGovernor: viewFun("0xc7af3352", "isGovernor()", {}, p.bool),
    isMigrationActive: viewFun("0x0e913a6c", "isMigrationActive()", {}, p.bool),
    'migrate(uint256)': fun("0x454b0608", "migrate(uint256)", {"ogvAmount": p.uint256}, p.uint256),
    'migrate(uint256[],uint256,uint256,bool,uint256,uint256)': fun("0x5e1da48d", "migrate(uint256[],uint256,uint256,bool,uint256,uint256)", {"lockupIds": p.array(p.uint256), "ogvAmountFromWallet": p.uint256, "ognAmountFromWallet": p.uint256, "migrateRewards": p.bool, "newStakeAmount": p.uint256, "newStakeDuration": p.uint256}, ),
    ogn: viewFun("0x602bc098", "ogn()", {}, p.address),
    ognStaking: viewFun("0x8a4d8f35", "ognStaking()", {}, p.address),
    ogv: viewFun("0x142561cf", "ogv()", {}, p.address),
    ogvStaking: viewFun("0x2b478a7f", "ogvStaking()", {}, p.address),
    start: fun("0xbe9a6555", "start()", {}, ),
    transferExcessTokens: fun("0x71628056", "transferExcessTokens(address)", {"treasury": p.address}, ),
    transferGovernance: fun("0xd38bfff4", "transferGovernance(address)", {"_newGovernor": p.address}, ),
}

export class Contract extends ContractBase {

    CONVERSION_RATE() {
        return this.eth_call(functions.CONVERSION_RATE, {})
    }

    endTime() {
        return this.eth_call(functions.endTime, {})
    }

    governor() {
        return this.eth_call(functions.governor, {})
    }

    isGovernor() {
        return this.eth_call(functions.isGovernor, {})
    }

    isMigrationActive() {
        return this.eth_call(functions.isMigrationActive, {})
    }

    ogn() {
        return this.eth_call(functions.ogn, {})
    }

    ognStaking() {
        return this.eth_call(functions.ognStaking, {})
    }

    ogv() {
        return this.eth_call(functions.ogv, {})
    }

    ogvStaking() {
        return this.eth_call(functions.ogvStaking, {})
    }
}

/// Event types
export type DecommissionedEventArgs = EParams<typeof events.Decommissioned>
export type GovernorshipTransferredEventArgs = EParams<typeof events.GovernorshipTransferred>
export type LockupsMigratedEventArgs = EParams<typeof events.LockupsMigrated>
export type PendingGovernorshipTransferEventArgs = EParams<typeof events.PendingGovernorshipTransfer>
export type TokenExchangedEventArgs = EParams<typeof events.TokenExchanged>

/// Function types
export type CONVERSION_RATEParams = FunctionArguments<typeof functions.CONVERSION_RATE>
export type CONVERSION_RATEReturn = FunctionReturn<typeof functions.CONVERSION_RATE>

export type ClaimGovernanceParams = FunctionArguments<typeof functions.claimGovernance>
export type ClaimGovernanceReturn = FunctionReturn<typeof functions.claimGovernance>

export type EndTimeParams = FunctionArguments<typeof functions.endTime>
export type EndTimeReturn = FunctionReturn<typeof functions.endTime>

export type GovernorParams = FunctionArguments<typeof functions.governor>
export type GovernorReturn = FunctionReturn<typeof functions.governor>

export type IsGovernorParams = FunctionArguments<typeof functions.isGovernor>
export type IsGovernorReturn = FunctionReturn<typeof functions.isGovernor>

export type IsMigrationActiveParams = FunctionArguments<typeof functions.isMigrationActive>
export type IsMigrationActiveReturn = FunctionReturn<typeof functions.isMigrationActive>

export type MigrateParams_0 = FunctionArguments<typeof functions['migrate(uint256)']>
export type MigrateReturn_0 = FunctionReturn<typeof functions['migrate(uint256)']>

export type MigrateParams_1 = FunctionArguments<typeof functions['migrate(uint256[],uint256,uint256,bool,uint256,uint256)']>
export type MigrateReturn_1 = FunctionReturn<typeof functions['migrate(uint256[],uint256,uint256,bool,uint256,uint256)']>

export type OgnParams = FunctionArguments<typeof functions.ogn>
export type OgnReturn = FunctionReturn<typeof functions.ogn>

export type OgnStakingParams = FunctionArguments<typeof functions.ognStaking>
export type OgnStakingReturn = FunctionReturn<typeof functions.ognStaking>

export type OgvParams = FunctionArguments<typeof functions.ogv>
export type OgvReturn = FunctionReturn<typeof functions.ogv>

export type OgvStakingParams = FunctionArguments<typeof functions.ogvStaking>
export type OgvStakingReturn = FunctionReturn<typeof functions.ogvStaking>

export type StartParams = FunctionArguments<typeof functions.start>
export type StartReturn = FunctionReturn<typeof functions.start>

export type TransferExcessTokensParams = FunctionArguments<typeof functions.transferExcessTokens>
export type TransferExcessTokensReturn = FunctionReturn<typeof functions.transferExcessTokens>

export type TransferGovernanceParams = FunctionArguments<typeof functions.transferGovernance>
export type TransferGovernanceReturn = FunctionReturn<typeof functions.transferGovernance>

