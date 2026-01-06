import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CurvePoolBoosterPlainCreated: event("0x29517452b3d8f353a0d81b89ef1eb2c73ce0fc391e9d8e46c2c11c068d73bbe5", "CurvePoolBoosterPlainCreated(address)", {"poolBoosterAddress": indexed(p.address)}),
    GovernorshipTransferred: event("0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a", "GovernorshipTransferred(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    PendingGovernorshipTransfer: event("0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d", "PendingGovernorshipTransfer(address,address)", {"previousGovernor": indexed(p.address), "newGovernor": indexed(p.address)}),
    StrategistUpdated: event("0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee", "StrategistUpdated(address)", {"_address": p.address}),
}

export const functions = {
    CREATEX: viewFun("0xa6384c96", "CREATEX()", {}, p.address),
    claimGovernance: fun("0x5d36b190", "claimGovernance()", {}, ),
    computePoolBoosterAddress: viewFun("0x799a572d", "computePoolBoosterAddress(address,address,bytes32)", {"_rewardToken": p.address, "_gauge": p.address, "_salt": p.bytes32}, p.address),
    createCurvePoolBoosterPlain: fun("0x95b63c14", "createCurvePoolBoosterPlain(address,address,address,uint16,address,address,bytes32,address)", {"_rewardToken": p.address, "_gauge": p.address, "_feeCollector": p.address, "_fee": p.uint16, "_campaignRemoteManager": p.address, "_votemarket": p.address, "_salt": p.bytes32, "_expectedAddress": p.address}, p.address),
    encodeSaltForCreateX: viewFun("0xf059e311", "encodeSaltForCreateX(uint256)", {"salt": p.uint256}, p.bytes32),
    governor: viewFun("0x0c340a24", "governor()", {}, p.address),
    initialize: fun("0x485cc955", "initialize(address,address)", {"_governor": p.address, "_strategist": p.address}, ),
    isGovernor: viewFun("0xc7af3352", "isGovernor()", {}, p.bool),
    setStrategistAddr: fun("0x773540b3", "setStrategistAddr(address)", {"_address": p.address}, ),
    strategistAddr: viewFun("0x570d8e1d", "strategistAddr()", {}, p.address),
    transferGovernance: fun("0xd38bfff4", "transferGovernance(address)", {"_newGovernor": p.address}, ),
}

export class Contract extends ContractBase {

    CREATEX() {
        return this.eth_call(functions.CREATEX, {})
    }

    computePoolBoosterAddress(_rewardToken: ComputePoolBoosterAddressParams["_rewardToken"], _gauge: ComputePoolBoosterAddressParams["_gauge"], _salt: ComputePoolBoosterAddressParams["_salt"]) {
        return this.eth_call(functions.computePoolBoosterAddress, {_rewardToken, _gauge, _salt})
    }

    encodeSaltForCreateX(salt: EncodeSaltForCreateXParams["salt"]) {
        return this.eth_call(functions.encodeSaltForCreateX, {salt})
    }

    governor() {
        return this.eth_call(functions.governor, {})
    }

    isGovernor() {
        return this.eth_call(functions.isGovernor, {})
    }

    strategistAddr() {
        return this.eth_call(functions.strategistAddr, {})
    }
}

/// Event types
export type CurvePoolBoosterPlainCreatedEventArgs = EParams<typeof events.CurvePoolBoosterPlainCreated>
export type GovernorshipTransferredEventArgs = EParams<typeof events.GovernorshipTransferred>
export type PendingGovernorshipTransferEventArgs = EParams<typeof events.PendingGovernorshipTransfer>
export type StrategistUpdatedEventArgs = EParams<typeof events.StrategistUpdated>

/// Function types
export type CREATEXParams = FunctionArguments<typeof functions.CREATEX>
export type CREATEXReturn = FunctionReturn<typeof functions.CREATEX>

export type ClaimGovernanceParams = FunctionArguments<typeof functions.claimGovernance>
export type ClaimGovernanceReturn = FunctionReturn<typeof functions.claimGovernance>

export type ComputePoolBoosterAddressParams = FunctionArguments<typeof functions.computePoolBoosterAddress>
export type ComputePoolBoosterAddressReturn = FunctionReturn<typeof functions.computePoolBoosterAddress>

export type CreateCurvePoolBoosterPlainParams = FunctionArguments<typeof functions.createCurvePoolBoosterPlain>
export type CreateCurvePoolBoosterPlainReturn = FunctionReturn<typeof functions.createCurvePoolBoosterPlain>

export type EncodeSaltForCreateXParams = FunctionArguments<typeof functions.encodeSaltForCreateX>
export type EncodeSaltForCreateXReturn = FunctionReturn<typeof functions.encodeSaltForCreateX>

export type GovernorParams = FunctionArguments<typeof functions.governor>
export type GovernorReturn = FunctionReturn<typeof functions.governor>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsGovernorParams = FunctionArguments<typeof functions.isGovernor>
export type IsGovernorReturn = FunctionReturn<typeof functions.isGovernor>

export type SetStrategistAddrParams = FunctionArguments<typeof functions.setStrategistAddr>
export type SetStrategistAddrReturn = FunctionReturn<typeof functions.setStrategistAddr>

export type StrategistAddrParams = FunctionArguments<typeof functions.strategistAddr>
export type StrategistAddrReturn = FunctionReturn<typeof functions.strategistAddr>

export type TransferGovernanceParams = FunctionArguments<typeof functions.transferGovernance>
export type TransferGovernanceReturn = FunctionReturn<typeof functions.transferGovernance>

