import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    StartVote: event("0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394", "StartVote(uint256,address,string,uint256,uint256,uint256,uint256)", {"voteId": indexed(p.uint256), "creator": indexed(p.address), "metadata": p.string, "minBalance": p.uint256, "minTime": p.uint256, "totalSupply": p.uint256, "creatorVotingPower": p.uint256}),
    CastVote: event("0xb34ee265e3d4f5ec4e8b52d59b2a9be8fceca2f274ebc080d8fba797fea9391f", "CastVote(uint256,address,bool,uint256)", {"voteId": indexed(p.uint256), "voter": indexed(p.address), "supports": p.bool, "stake": p.uint256}),
    ExecuteVote: event("0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab", "ExecuteVote(uint256)", {"voteId": indexed(p.uint256)}),
    ChangeSupportRequired: event("0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e", "ChangeSupportRequired(uint64)", {"supportRequiredPct": p.uint64}),
    ChangeMinQuorum: event("0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50", "ChangeMinQuorum(uint64)", {"minAcceptQuorumPct": p.uint64}),
    MinimumBalanceSet: event("0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375", "MinimumBalanceSet(uint256)", {"minBalance": p.uint256}),
    MinimumTimeSet: event("0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580", "MinimumTimeSet(uint256)", {"minTime": p.uint256}),
    ScriptResult: event("0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9", "ScriptResult(address,bytes,bytes,bytes)", {"executor": indexed(p.address), "script": p.bytes, "input": p.bytes, "returnData": p.bytes}),
    RecoverToVault: event("0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02", "RecoverToVault(address,address,uint256)", {"vault": indexed(p.address), "token": indexed(p.address), "amount": p.uint256}),
}

export const functions = {
    hasInitialized: viewFun("0x0803fac0", "hasInitialized()", {}, p.bool),
    minTime: viewFun("0x1aa43078", "minTime()", {}, p.uint256),
    votePct: fun("0x1e526610", "votePct(uint256,uint256,uint256,bool)", {"_voteId": p.uint256, "_yeaPct": p.uint256, "_nayPct": p.uint256, "_executesIfDecided": p.bool}, ),
    getEVMScriptExecutor: viewFun("0x2914b9bd", "getEVMScriptExecutor(bytes)", {"_script": p.bytes}, p.address),
    canCreateNewVote: viewFun("0x2d573501", "canCreateNewVote(address)", {"_sender": p.address}, p.bool),
    getRecoveryVault: viewFun("0x32f0a3b5", "getRecoveryVault()", {}, p.address),
    MODIFY_QUORUM_ROLE: viewFun("0x3c624c75", "MODIFY_QUORUM_ROLE()", {}, p.bytes32),
    getVoterState: viewFun("0x4b12311c", "getVoterState(uint256,address)", {"_voteId": p.uint256, "_voter": p.address}, p.uint8),
    getVote: viewFun("0x5a55c1f0", "getVote(uint256)", {"_voteId": p.uint256}, {"open": p.bool, "executed": p.bool, "startDate": p.uint64, "snapshotBlock": p.uint64, "supportRequired": p.uint64, "minAcceptQuorum": p.uint64, "yea": p.uint256, "nay": p.uint256, "votingPower": p.uint256, "script": p.bytes}),
    changeMinAcceptQuorumPct: fun("0x5eb24332", "changeMinAcceptQuorumPct(uint64)", {"_minAcceptQuorumPct": p.uint64}, ),
    MODIFY_SUPPORT_ROLE: viewFun("0x62de7e5a", "MODIFY_SUPPORT_ROLE()", {}, p.bytes32),
    lastCreateVoteTimes: viewFun("0x7bbddcfc", "lastCreateVoteTimes(address)", {"_0": p.address}, p.uint256),
    changeSupportRequiredPct: fun("0x7c1d0b87", "changeSupportRequiredPct(uint64)", {"_supportRequiredPct": p.uint64}, ),
    allowRecoverability: viewFun("0x7e7db6e1", "allowRecoverability(address)", {"token": p.address}, p.bool),
    appId: viewFun("0x80afdea8", "appId()", {}, p.bytes32),
    ENABLE_VOTE_CREATION: viewFun("0x868ce31a", "ENABLE_VOTE_CREATION()", {}, p.bytes32),
    getInitializationBlock: viewFun("0x8b3dd749", "getInitializationBlock()", {}, p.uint256),
    minBalanceUpperLimit: viewFun("0x8b568327", "minBalanceUpperLimit()", {}, p.uint256),
    setMinTime: fun("0x93f89a80", "setMinTime(uint256)", {"_minTime": p.uint256}, ),
    transferToVault: fun("0x9d4941d8", "transferToVault(address)", {"_token": p.address}, ),
    canPerform: viewFun("0xa1658fad", "canPerform(address,bytes32,uint256[])", {"_sender": p.address, "_role": p.bytes32, "_params": p.array(p.uint256)}, p.bool),
    getEVMScriptRegistry: viewFun("0xa479e508", "getEVMScriptRegistry()", {}, p.address),
    initialize: fun("0xa87f8624", "initialize(address,uint64,uint64,uint64,uint256,uint256,uint256,uint256,uint256,uint256)", {"_token": p.address, "_supportRequiredPct": p.uint64, "_minAcceptQuorumPct": p.uint64, "_voteTime": p.uint64, "_minBalance": p.uint256, "_minTime": p.uint256, "_minBalanceLowerLimit": p.uint256, "_minBalanceUpperLimit": p.uint256, "_minTimeLowerLimit": p.uint256, "_minTimeUpperLimit": p.uint256}, ),
    SET_MIN_BALANCE_ROLE: viewFun("0xb6f68254", "SET_MIN_BALANCE_ROLE()", {}, p.bytes32),
    minTimeLowerLimit: viewFun("0xb8795725", "minTimeLowerLimit()", {}, p.uint256),
    voteTime: viewFun("0xbcf93dd6", "voteTime()", {}, p.uint64),
    CREATE_VOTES_ROLE: viewFun("0xbe2c64d4", "CREATE_VOTES_ROLE()", {}, p.bytes32),
    canForward: viewFun("0xc0774df3", "canForward(address,bytes)", {"_sender": p.address, "_1": p.bytes}, p.bool),
    SET_MIN_TIME_ROLE: viewFun("0xc54c24b5", "SET_MIN_TIME_ROLE()", {}, p.bytes32),
    minBalance: viewFun("0xc5bb8758", "minBalance()", {}, p.uint256),
    setMinBalance: fun("0xc91d956c", "setMinBalance(uint256)", {"_minBalance": p.uint256}, ),
    canExecute: viewFun("0xcc63604a", "canExecute(uint256)", {"_voteId": p.uint256}, p.bool),
    canVote: viewFun("0xcdb2867b", "canVote(uint256,address)", {"_voteId": p.uint256, "_voter": p.address}, p.bool),
    kernel: viewFun("0xd4aae0c4", "kernel()", {}, p.address),
    'newVote(bytes,string)': fun("0xd5db2c80", "newVote(bytes,string)", {"_executionScript": p.bytes, "_metadata": p.string}, p.uint256),
    forward: fun("0xd948d468", "forward(bytes)", {"_evmScript": p.bytes}, ),
    disableVoteCreationOnce: fun("0xdc177eec", "disableVoteCreationOnce()", {}, ),
    minAcceptQuorumPct: viewFun("0xdc474b1a", "minAcceptQuorumPct()", {}, p.uint64),
    isPetrified: viewFun("0xde4796ed", "isPetrified()", {}, p.bool),
    votesLength: viewFun("0xde4f6347", "votesLength()", {}, p.uint256),
    vote: fun("0xdf133bca", "vote(uint256,bool,bool)", {"_voteData": p.uint256, "_supports": p.bool, "_executesIfDecided": p.bool}, ),
    enableVoteCreationOnce: fun("0xdf136602", "enableVoteCreationOnce()", {}, ),
    minTimeUpperLimit: viewFun("0xdf352197", "minTimeUpperLimit()", {}, p.uint256),
    minBalanceLowerLimit: viewFun("0xeb1e3b77", "minBalanceLowerLimit()", {}, p.uint256),
    enableVoteCreation: viewFun("0xee0f160e", "enableVoteCreation()", {}, p.bool),
    'newVote(bytes,string,bool,bool)': fun("0xf4b00513", "newVote(bytes,string,bool,bool)", {"_executionScript": p.bytes, "_metadata": p.string, "_castVote": p.bool, "_executesIfDecided": p.bool}, p.uint256),
    executeVote: fun("0xf98a4eca", "executeVote(uint256)", {"_voteId": p.uint256}, ),
    supportRequiredPct: viewFun("0xfad167ab", "supportRequiredPct()", {}, p.uint64),
    token: viewFun("0xfc0c546a", "token()", {}, p.address),
    PCT_BASE: viewFun("0xfc157cb4", "PCT_BASE()", {}, p.uint64),
    isForwarder: viewFun("0xfd64eccb", "isForwarder()", {}, p.bool),
    DISABLE_VOTE_CREATION: viewFun("0xff311838", "DISABLE_VOTE_CREATION()", {}, p.bytes32),
}

export class Contract extends ContractBase {

    hasInitialized() {
        return this.eth_call(functions.hasInitialized, {})
    }

    minTime() {
        return this.eth_call(functions.minTime, {})
    }

    getEVMScriptExecutor(_script: GetEVMScriptExecutorParams["_script"]) {
        return this.eth_call(functions.getEVMScriptExecutor, {_script})
    }

    canCreateNewVote(_sender: CanCreateNewVoteParams["_sender"]) {
        return this.eth_call(functions.canCreateNewVote, {_sender})
    }

    getRecoveryVault() {
        return this.eth_call(functions.getRecoveryVault, {})
    }

    MODIFY_QUORUM_ROLE() {
        return this.eth_call(functions.MODIFY_QUORUM_ROLE, {})
    }

    getVoterState(_voteId: GetVoterStateParams["_voteId"], _voter: GetVoterStateParams["_voter"]) {
        return this.eth_call(functions.getVoterState, {_voteId, _voter})
    }

    getVote(_voteId: GetVoteParams["_voteId"]) {
        return this.eth_call(functions.getVote, {_voteId})
    }

    MODIFY_SUPPORT_ROLE() {
        return this.eth_call(functions.MODIFY_SUPPORT_ROLE, {})
    }

    lastCreateVoteTimes(_0: LastCreateVoteTimesParams["_0"]) {
        return this.eth_call(functions.lastCreateVoteTimes, {_0})
    }

    allowRecoverability(token: AllowRecoverabilityParams["token"]) {
        return this.eth_call(functions.allowRecoverability, {token})
    }

    appId() {
        return this.eth_call(functions.appId, {})
    }

    ENABLE_VOTE_CREATION() {
        return this.eth_call(functions.ENABLE_VOTE_CREATION, {})
    }

    getInitializationBlock() {
        return this.eth_call(functions.getInitializationBlock, {})
    }

    minBalanceUpperLimit() {
        return this.eth_call(functions.minBalanceUpperLimit, {})
    }

    canPerform(_sender: CanPerformParams["_sender"], _role: CanPerformParams["_role"], _params: CanPerformParams["_params"]) {
        return this.eth_call(functions.canPerform, {_sender, _role, _params})
    }

    getEVMScriptRegistry() {
        return this.eth_call(functions.getEVMScriptRegistry, {})
    }

    SET_MIN_BALANCE_ROLE() {
        return this.eth_call(functions.SET_MIN_BALANCE_ROLE, {})
    }

    minTimeLowerLimit() {
        return this.eth_call(functions.minTimeLowerLimit, {})
    }

    voteTime() {
        return this.eth_call(functions.voteTime, {})
    }

    CREATE_VOTES_ROLE() {
        return this.eth_call(functions.CREATE_VOTES_ROLE, {})
    }

    canForward(_sender: CanForwardParams["_sender"], _1: CanForwardParams["_1"]) {
        return this.eth_call(functions.canForward, {_sender, _1})
    }

    SET_MIN_TIME_ROLE() {
        return this.eth_call(functions.SET_MIN_TIME_ROLE, {})
    }

    minBalance() {
        return this.eth_call(functions.minBalance, {})
    }

    canExecute(_voteId: CanExecuteParams["_voteId"]) {
        return this.eth_call(functions.canExecute, {_voteId})
    }

    canVote(_voteId: CanVoteParams["_voteId"], _voter: CanVoteParams["_voter"]) {
        return this.eth_call(functions.canVote, {_voteId, _voter})
    }

    kernel() {
        return this.eth_call(functions.kernel, {})
    }

    minAcceptQuorumPct() {
        return this.eth_call(functions.minAcceptQuorumPct, {})
    }

    isPetrified() {
        return this.eth_call(functions.isPetrified, {})
    }

    votesLength() {
        return this.eth_call(functions.votesLength, {})
    }

    minTimeUpperLimit() {
        return this.eth_call(functions.minTimeUpperLimit, {})
    }

    minBalanceLowerLimit() {
        return this.eth_call(functions.minBalanceLowerLimit, {})
    }

    enableVoteCreation() {
        return this.eth_call(functions.enableVoteCreation, {})
    }

    supportRequiredPct() {
        return this.eth_call(functions.supportRequiredPct, {})
    }

    token() {
        return this.eth_call(functions.token, {})
    }

    PCT_BASE() {
        return this.eth_call(functions.PCT_BASE, {})
    }

    isForwarder() {
        return this.eth_call(functions.isForwarder, {})
    }

    DISABLE_VOTE_CREATION() {
        return this.eth_call(functions.DISABLE_VOTE_CREATION, {})
    }
}

/// Event types
export type StartVoteEventArgs = EParams<typeof events.StartVote>
export type CastVoteEventArgs = EParams<typeof events.CastVote>
export type ExecuteVoteEventArgs = EParams<typeof events.ExecuteVote>
export type ChangeSupportRequiredEventArgs = EParams<typeof events.ChangeSupportRequired>
export type ChangeMinQuorumEventArgs = EParams<typeof events.ChangeMinQuorum>
export type MinimumBalanceSetEventArgs = EParams<typeof events.MinimumBalanceSet>
export type MinimumTimeSetEventArgs = EParams<typeof events.MinimumTimeSet>
export type ScriptResultEventArgs = EParams<typeof events.ScriptResult>
export type RecoverToVaultEventArgs = EParams<typeof events.RecoverToVault>

/// Function types
export type HasInitializedParams = FunctionArguments<typeof functions.hasInitialized>
export type HasInitializedReturn = FunctionReturn<typeof functions.hasInitialized>

export type MinTimeParams = FunctionArguments<typeof functions.minTime>
export type MinTimeReturn = FunctionReturn<typeof functions.minTime>

export type VotePctParams = FunctionArguments<typeof functions.votePct>
export type VotePctReturn = FunctionReturn<typeof functions.votePct>

export type GetEVMScriptExecutorParams = FunctionArguments<typeof functions.getEVMScriptExecutor>
export type GetEVMScriptExecutorReturn = FunctionReturn<typeof functions.getEVMScriptExecutor>

export type CanCreateNewVoteParams = FunctionArguments<typeof functions.canCreateNewVote>
export type CanCreateNewVoteReturn = FunctionReturn<typeof functions.canCreateNewVote>

export type GetRecoveryVaultParams = FunctionArguments<typeof functions.getRecoveryVault>
export type GetRecoveryVaultReturn = FunctionReturn<typeof functions.getRecoveryVault>

export type MODIFY_QUORUM_ROLEParams = FunctionArguments<typeof functions.MODIFY_QUORUM_ROLE>
export type MODIFY_QUORUM_ROLEReturn = FunctionReturn<typeof functions.MODIFY_QUORUM_ROLE>

export type GetVoterStateParams = FunctionArguments<typeof functions.getVoterState>
export type GetVoterStateReturn = FunctionReturn<typeof functions.getVoterState>

export type GetVoteParams = FunctionArguments<typeof functions.getVote>
export type GetVoteReturn = FunctionReturn<typeof functions.getVote>

export type ChangeMinAcceptQuorumPctParams = FunctionArguments<typeof functions.changeMinAcceptQuorumPct>
export type ChangeMinAcceptQuorumPctReturn = FunctionReturn<typeof functions.changeMinAcceptQuorumPct>

export type MODIFY_SUPPORT_ROLEParams = FunctionArguments<typeof functions.MODIFY_SUPPORT_ROLE>
export type MODIFY_SUPPORT_ROLEReturn = FunctionReturn<typeof functions.MODIFY_SUPPORT_ROLE>

export type LastCreateVoteTimesParams = FunctionArguments<typeof functions.lastCreateVoteTimes>
export type LastCreateVoteTimesReturn = FunctionReturn<typeof functions.lastCreateVoteTimes>

export type ChangeSupportRequiredPctParams = FunctionArguments<typeof functions.changeSupportRequiredPct>
export type ChangeSupportRequiredPctReturn = FunctionReturn<typeof functions.changeSupportRequiredPct>

export type AllowRecoverabilityParams = FunctionArguments<typeof functions.allowRecoverability>
export type AllowRecoverabilityReturn = FunctionReturn<typeof functions.allowRecoverability>

export type AppIdParams = FunctionArguments<typeof functions.appId>
export type AppIdReturn = FunctionReturn<typeof functions.appId>

export type ENABLE_VOTE_CREATIONParams = FunctionArguments<typeof functions.ENABLE_VOTE_CREATION>
export type ENABLE_VOTE_CREATIONReturn = FunctionReturn<typeof functions.ENABLE_VOTE_CREATION>

export type GetInitializationBlockParams = FunctionArguments<typeof functions.getInitializationBlock>
export type GetInitializationBlockReturn = FunctionReturn<typeof functions.getInitializationBlock>

export type MinBalanceUpperLimitParams = FunctionArguments<typeof functions.minBalanceUpperLimit>
export type MinBalanceUpperLimitReturn = FunctionReturn<typeof functions.minBalanceUpperLimit>

export type SetMinTimeParams = FunctionArguments<typeof functions.setMinTime>
export type SetMinTimeReturn = FunctionReturn<typeof functions.setMinTime>

export type TransferToVaultParams = FunctionArguments<typeof functions.transferToVault>
export type TransferToVaultReturn = FunctionReturn<typeof functions.transferToVault>

export type CanPerformParams = FunctionArguments<typeof functions.canPerform>
export type CanPerformReturn = FunctionReturn<typeof functions.canPerform>

export type GetEVMScriptRegistryParams = FunctionArguments<typeof functions.getEVMScriptRegistry>
export type GetEVMScriptRegistryReturn = FunctionReturn<typeof functions.getEVMScriptRegistry>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type SET_MIN_BALANCE_ROLEParams = FunctionArguments<typeof functions.SET_MIN_BALANCE_ROLE>
export type SET_MIN_BALANCE_ROLEReturn = FunctionReturn<typeof functions.SET_MIN_BALANCE_ROLE>

export type MinTimeLowerLimitParams = FunctionArguments<typeof functions.minTimeLowerLimit>
export type MinTimeLowerLimitReturn = FunctionReturn<typeof functions.minTimeLowerLimit>

export type VoteTimeParams = FunctionArguments<typeof functions.voteTime>
export type VoteTimeReturn = FunctionReturn<typeof functions.voteTime>

export type CREATE_VOTES_ROLEParams = FunctionArguments<typeof functions.CREATE_VOTES_ROLE>
export type CREATE_VOTES_ROLEReturn = FunctionReturn<typeof functions.CREATE_VOTES_ROLE>

export type CanForwardParams = FunctionArguments<typeof functions.canForward>
export type CanForwardReturn = FunctionReturn<typeof functions.canForward>

export type SET_MIN_TIME_ROLEParams = FunctionArguments<typeof functions.SET_MIN_TIME_ROLE>
export type SET_MIN_TIME_ROLEReturn = FunctionReturn<typeof functions.SET_MIN_TIME_ROLE>

export type MinBalanceParams = FunctionArguments<typeof functions.minBalance>
export type MinBalanceReturn = FunctionReturn<typeof functions.minBalance>

export type SetMinBalanceParams = FunctionArguments<typeof functions.setMinBalance>
export type SetMinBalanceReturn = FunctionReturn<typeof functions.setMinBalance>

export type CanExecuteParams = FunctionArguments<typeof functions.canExecute>
export type CanExecuteReturn = FunctionReturn<typeof functions.canExecute>

export type CanVoteParams = FunctionArguments<typeof functions.canVote>
export type CanVoteReturn = FunctionReturn<typeof functions.canVote>

export type KernelParams = FunctionArguments<typeof functions.kernel>
export type KernelReturn = FunctionReturn<typeof functions.kernel>

export type NewVoteParams_0 = FunctionArguments<typeof functions['newVote(bytes,string)']>
export type NewVoteReturn_0 = FunctionReturn<typeof functions['newVote(bytes,string)']>

export type ForwardParams = FunctionArguments<typeof functions.forward>
export type ForwardReturn = FunctionReturn<typeof functions.forward>

export type DisableVoteCreationOnceParams = FunctionArguments<typeof functions.disableVoteCreationOnce>
export type DisableVoteCreationOnceReturn = FunctionReturn<typeof functions.disableVoteCreationOnce>

export type MinAcceptQuorumPctParams = FunctionArguments<typeof functions.minAcceptQuorumPct>
export type MinAcceptQuorumPctReturn = FunctionReturn<typeof functions.minAcceptQuorumPct>

export type IsPetrifiedParams = FunctionArguments<typeof functions.isPetrified>
export type IsPetrifiedReturn = FunctionReturn<typeof functions.isPetrified>

export type VotesLengthParams = FunctionArguments<typeof functions.votesLength>
export type VotesLengthReturn = FunctionReturn<typeof functions.votesLength>

export type VoteParams = FunctionArguments<typeof functions.vote>
export type VoteReturn = FunctionReturn<typeof functions.vote>

export type EnableVoteCreationOnceParams = FunctionArguments<typeof functions.enableVoteCreationOnce>
export type EnableVoteCreationOnceReturn = FunctionReturn<typeof functions.enableVoteCreationOnce>

export type MinTimeUpperLimitParams = FunctionArguments<typeof functions.minTimeUpperLimit>
export type MinTimeUpperLimitReturn = FunctionReturn<typeof functions.minTimeUpperLimit>

export type MinBalanceLowerLimitParams = FunctionArguments<typeof functions.minBalanceLowerLimit>
export type MinBalanceLowerLimitReturn = FunctionReturn<typeof functions.minBalanceLowerLimit>

export type EnableVoteCreationParams = FunctionArguments<typeof functions.enableVoteCreation>
export type EnableVoteCreationReturn = FunctionReturn<typeof functions.enableVoteCreation>

export type NewVoteParams_1 = FunctionArguments<typeof functions['newVote(bytes,string,bool,bool)']>
export type NewVoteReturn_1 = FunctionReturn<typeof functions['newVote(bytes,string,bool,bool)']>

export type ExecuteVoteParams = FunctionArguments<typeof functions.executeVote>
export type ExecuteVoteReturn = FunctionReturn<typeof functions.executeVote>

export type SupportRequiredPctParams = FunctionArguments<typeof functions.supportRequiredPct>
export type SupportRequiredPctReturn = FunctionReturn<typeof functions.supportRequiredPct>

export type TokenParams = FunctionArguments<typeof functions.token>
export type TokenReturn = FunctionReturn<typeof functions.token>

export type PCT_BASEParams = FunctionArguments<typeof functions.PCT_BASE>
export type PCT_BASEReturn = FunctionReturn<typeof functions.PCT_BASE>

export type IsForwarderParams = FunctionArguments<typeof functions.isForwarder>
export type IsForwarderReturn = FunctionReturn<typeof functions.isForwarder>

export type DISABLE_VOTE_CREATIONParams = FunctionArguments<typeof functions.DISABLE_VOTE_CREATION>
export type DISABLE_VOTE_CREATIONReturn = FunctionReturn<typeof functions.DISABLE_VOTE_CREATION>

