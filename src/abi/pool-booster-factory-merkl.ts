import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    GovernorshipTransferred: event("0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a", "GovernorshipTransferred(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    MerklDistributorUpdated: event("0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9", "MerklDistributorUpdated(address)", {"newDistributor": p.address}),
    PendingGovernorshipTransfer: event("0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d", "PendingGovernorshipTransfer(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
}

export const functions = {
    bribeAll: fun("0xd5177868", "bribeAll(address[])", {"_exclusionList": p.array(p.address)}, ),
    centralRegistry: viewFun("0x8f73dcfa", "centralRegistry()", {}, p.address),
    claimGovernance: fun("0x5d36b190", "claimGovernance()", {}, ),
    computePoolBoosterAddress: viewFun("0xe331db3f", "computePoolBoosterAddress(uint32,address,uint32,bytes,uint256)", {"_campaignType": p.uint32, "_ammPoolAddress": p.address, "_campaignDuration": p.uint32, "campaignData": p.bytes, "_salt": p.uint256}, p.address),
    createPoolBoosterMerkl: fun("0x6720bd3f", "createPoolBoosterMerkl(uint32,address,uint32,bytes,uint256)", {"_campaignType": p.uint32, "_ammPoolAddress": p.address, "_campaignDuration": p.uint32, "campaignData": p.bytes, "_salt": p.uint256}, ),
    governor: viewFun("0x0c340a24", "governor()", {}, p.address),
    isGovernor: viewFun("0xc7af3352", "isGovernor()", {}, p.bool),
    merklDistributor: viewFun("0x2fa4abea", "merklDistributor()", {}, p.address),
    oToken: viewFun("0x1a32aad6", "oToken()", {}, p.address),
    poolBoosterFromPool: viewFun("0xb6eee962", "poolBoosterFromPool(address)", {"_0": p.address}, {"boosterAddress": p.address, "ammPoolAddress": p.address, "boosterType": p.uint8}),
    poolBoosterLength: viewFun("0x17c01cb3", "poolBoosterLength()", {}, p.uint256),
    poolBoosters: viewFun("0x110c1a41", "poolBoosters(uint256)", {"_0": p.uint256}, {"boosterAddress": p.address, "ammPoolAddress": p.address, "boosterType": p.uint8}),
    removePoolBooster: fun("0xe24abe63", "removePoolBooster(address)", {"_poolBoosterAddress": p.address}, ),
    setMerklDistributor: fun("0xdbfba959", "setMerklDistributor(address)", {"_merklDistributor": p.address}, ),
    transferGovernance: fun("0xd38bfff4", "transferGovernance(address)", {"_newGovernor": p.address}, ),
    version: viewFun("0x54fd4d50", "version()", {}, p.uint256),
}

export class Contract extends ContractBase {

    centralRegistry() {
        return this.eth_call(functions.centralRegistry, {})
    }

    computePoolBoosterAddress(_campaignType: ComputePoolBoosterAddressParams["_campaignType"], _ammPoolAddress: ComputePoolBoosterAddressParams["_ammPoolAddress"], _campaignDuration: ComputePoolBoosterAddressParams["_campaignDuration"], campaignData: ComputePoolBoosterAddressParams["campaignData"], _salt: ComputePoolBoosterAddressParams["_salt"]) {
        return this.eth_call(functions.computePoolBoosterAddress, {_campaignType, _ammPoolAddress, _campaignDuration, campaignData, _salt})
    }

    governor() {
        return this.eth_call(functions.governor, {})
    }

    isGovernor() {
        return this.eth_call(functions.isGovernor, {})
    }

    merklDistributor() {
        return this.eth_call(functions.merklDistributor, {})
    }

    oToken() {
        return this.eth_call(functions.oToken, {})
    }

    poolBoosterFromPool(_0: PoolBoosterFromPoolParams["_0"]) {
        return this.eth_call(functions.poolBoosterFromPool, {_0})
    }

    poolBoosterLength() {
        return this.eth_call(functions.poolBoosterLength, {})
    }

    poolBoosters(_0: PoolBoostersParams["_0"]) {
        return this.eth_call(functions.poolBoosters, {_0})
    }

    version() {
        return this.eth_call(functions.version, {})
    }
}

/// Event types
export type GovernorshipTransferredEventArgs = EParams<typeof events.GovernorshipTransferred>
export type MerklDistributorUpdatedEventArgs = EParams<typeof events.MerklDistributorUpdated>
export type PendingGovernorshipTransferEventArgs = EParams<typeof events.PendingGovernorshipTransfer>

/// Function types
export type BribeAllParams = FunctionArguments<typeof functions.bribeAll>
export type BribeAllReturn = FunctionReturn<typeof functions.bribeAll>

export type CentralRegistryParams = FunctionArguments<typeof functions.centralRegistry>
export type CentralRegistryReturn = FunctionReturn<typeof functions.centralRegistry>

export type ClaimGovernanceParams = FunctionArguments<typeof functions.claimGovernance>
export type ClaimGovernanceReturn = FunctionReturn<typeof functions.claimGovernance>

export type ComputePoolBoosterAddressParams = FunctionArguments<typeof functions.computePoolBoosterAddress>
export type ComputePoolBoosterAddressReturn = FunctionReturn<typeof functions.computePoolBoosterAddress>

export type CreatePoolBoosterMerklParams = FunctionArguments<typeof functions.createPoolBoosterMerkl>
export type CreatePoolBoosterMerklReturn = FunctionReturn<typeof functions.createPoolBoosterMerkl>

export type GovernorParams = FunctionArguments<typeof functions.governor>
export type GovernorReturn = FunctionReturn<typeof functions.governor>

export type IsGovernorParams = FunctionArguments<typeof functions.isGovernor>
export type IsGovernorReturn = FunctionReturn<typeof functions.isGovernor>

export type MerklDistributorParams = FunctionArguments<typeof functions.merklDistributor>
export type MerklDistributorReturn = FunctionReturn<typeof functions.merklDistributor>

export type OTokenParams = FunctionArguments<typeof functions.oToken>
export type OTokenReturn = FunctionReturn<typeof functions.oToken>

export type PoolBoosterFromPoolParams = FunctionArguments<typeof functions.poolBoosterFromPool>
export type PoolBoosterFromPoolReturn = FunctionReturn<typeof functions.poolBoosterFromPool>

export type PoolBoosterLengthParams = FunctionArguments<typeof functions.poolBoosterLength>
export type PoolBoosterLengthReturn = FunctionReturn<typeof functions.poolBoosterLength>

export type PoolBoostersParams = FunctionArguments<typeof functions.poolBoosters>
export type PoolBoostersReturn = FunctionReturn<typeof functions.poolBoosters>

export type RemovePoolBoosterParams = FunctionArguments<typeof functions.removePoolBooster>
export type RemovePoolBoosterReturn = FunctionReturn<typeof functions.removePoolBooster>

export type SetMerklDistributorParams = FunctionArguments<typeof functions.setMerklDistributor>
export type SetMerklDistributorReturn = FunctionReturn<typeof functions.setMerklDistributor>

export type TransferGovernanceParams = FunctionArguments<typeof functions.transferGovernance>
export type TransferGovernanceReturn = FunctionReturn<typeof functions.transferGovernance>

export type VersionParams = FunctionArguments<typeof functions.version>
export type VersionReturn = FunctionReturn<typeof functions.version>

