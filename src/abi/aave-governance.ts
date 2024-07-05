import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CancellationFeeRedeemed: event("0xe2470238697bf7475f7230e5f3d01e088062f9610e00bcfb223e3a774949a09a", "CancellationFeeRedeemed(uint256,address,uint256,bool)", {"proposalId": indexed(p.uint256), "to": indexed(p.address), "cancellationFee": p.uint256, "success": indexed(p.bool)}),
    CancellationFeeUpdated: event("0x5b81b8e66a81fbba6ded220cf668cb5da777acaa83cafe789c2699cad0efd808", "CancellationFeeUpdated(uint256)", {"cancellationFee": p.uint256}),
    GasLimitUpdated: event("0x3d1394ba0f6fca9c1e344f10a3efe1bfca63bc591232bb0d76755690f409450c", "GasLimitUpdated(uint256)", {"gasLimit": indexed(p.uint256)}),
    GuardianUpdated: event("0x064d28d3d3071c5cbc271a261c10c2f0f0d9e319390397101aa0eb23c6bad909", "GuardianUpdated(address,address)", {"oldGuardian": p.address, "newGuardian": p.address}),
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", "Initialized(uint8)", {"version": p.uint8}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    PayloadSent: event("0x9c687134d572ff69f3e23f40470562650574c5c7cab9f535268763b2d00da65b", "PayloadSent(uint256,uint40,address,uint256,uint256,uint256)", {"proposalId": indexed(p.uint256), "payloadId": p.uint40, "payloadsController": indexed(p.address), "chainId": indexed(p.uint256), "payloadNumberOnProposal": p.uint256, "numberOfPayloadsOnProposal": p.uint256}),
    PowerStrategyUpdated: event("0xfc61eef8f2b4da4ee7bfb9f335f064e2a35a3f6e8e65c3168eafe813aafe4c58", "PowerStrategyUpdated(address)", {"newPowerStrategy": indexed(p.address)}),
    ProposalCanceled: event("0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c", "ProposalCanceled(uint256)", {"proposalId": indexed(p.uint256)}),
    ProposalCreated: event("0xcc914becfa276bbc067049bf8db2d34ebbdc1bafa851e4d4936aaed376c08dbe", "ProposalCreated(uint256,address,uint8,bytes32)", {"proposalId": indexed(p.uint256), "creator": indexed(p.address), "accessLevel": indexed(p.uint8), "ipfsHash": p.bytes32}),
    ProposalExecuted: event("0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f", "ProposalExecuted(uint256)", {"proposalId": indexed(p.uint256)}),
    ProposalFailed: event("0x2bed878481293fc7587c48352c8b09aeeca52bed666011d7f916706ec72d6d6d", "ProposalFailed(uint256,uint128,uint128)", {"proposalId": indexed(p.uint256), "votesFor": p.uint128, "votesAgainst": p.uint128}),
    ProposalQueued: event("0xe39e7fc9f2013b8ab01110f66610f9fb8675d3126e69b3752f0084afc72be19a", "ProposalQueued(uint256,uint128,uint128)", {"proposalId": indexed(p.uint256), "votesFor": p.uint128, "votesAgainst": p.uint128}),
    RepresentativeUpdated: event("0x918b5bd4499a75f73bb64f14ae0254255f5421d0ecc4dd853c7bfdd7cf65e8fd", "RepresentativeUpdated(address,address,uint256)", {"voter": indexed(p.address), "representative": indexed(p.address), "chainId": indexed(p.uint256)}),
    VoteForwarded: event("0xf78ab0f6be87fe178c5f1b1fc0a1da52c65e7ac9a866215631dec7ffb1bd108d", "VoteForwarded(uint256,address,bool,(address,uint128)[])", {"proposalId": indexed(p.uint256), "voter": indexed(p.address), "support": indexed(p.bool), "votingAssetsWithSlot": p.array(p.struct({"underlyingAsset": p.address, "slot": p.uint128}))}),
    VotingActivated: event("0x45f1db29750f423920a6edede3a80ea19ceb9de3eabc072078eb539ca348dca0", "VotingActivated(uint256,bytes32,uint24)", {"proposalId": indexed(p.uint256), "snapshotBlockHash": indexed(p.bytes32), "votingDuration": p.uint24}),
    VotingConfigUpdated: event("0xa743f6cc30e98a5cb8e1148f36749c33167ec405cf4262bf6c7ae093d2a6c63f", "VotingConfigUpdated(uint8,uint24,uint24,uint256,uint256,uint256)", {"accessLevel": indexed(p.uint8), "votingDuration": p.uint24, "coolDownBeforeVotingStart": p.uint24, "yesThreshold": p.uint256, "yesNoDifferential": p.uint256, "minPropositionPower": p.uint256}),
    VotingPortalUpdated: event("0x5e1f23fe5aaf4ee57082b5f445e00d5a47343503b24ab1532a6c8cd15ba97008", "VotingPortalUpdated(address,bool)", {"votingPortal": indexed(p.address), "approved": indexed(p.bool)}),
}

export const functions = {
    ACHIEVABLE_VOTING_PARTICIPATION: viewFun("0x46a3d430", "ACHIEVABLE_VOTING_PARTICIPATION()", {}, p.uint256),
    CANCELLATION_FEE_COLLECTOR: viewFun("0xc3a76d92", "CANCELLATION_FEE_COLLECTOR()", {}, p.address),
    COOLDOWN_PERIOD: viewFun("0x6e99d52f", "COOLDOWN_PERIOD()", {}, p.uint256),
    CROSS_CHAIN_CONTROLLER: viewFun("0xc4956366", "CROSS_CHAIN_CONTROLLER()", {}, p.address),
    MIN_VOTING_DURATION: viewFun("0xeaf1061c", "MIN_VOTING_DURATION()", {}, p.uint256),
    NAME: viewFun("0xa3f4df7e", "NAME()", {}, p.string),
    PRECISION_DIVIDER: viewFun("0x62af1ed6", "PRECISION_DIVIDER()", {}, p.uint256),
    PROPOSAL_EXPIRATION_TIME: viewFun("0xb26ccf47", "PROPOSAL_EXPIRATION_TIME()", {}, p.uint256),
    activateVoting: fun("0xf6ead0b9", "activateVoting(uint256)", {"proposalId": p.uint256}, ),
    addVotingPortals: fun("0xc3b4b661", "addVotingPortals(address[])", {"votingPortals": p.array(p.address)}, ),
    cancelProposal: fun("0xe0a8f6f5", "cancelProposal(uint256)", {"proposalId": p.uint256}, ),
    createProposal: fun("0x3bec1bfc", "createProposal((uint256,uint8,address,uint40)[],address,bytes32)", {"payloads": p.array(p.struct({"chain": p.uint256, "accessLevel": p.uint8, "payloadsController": p.address, "payloadId": p.uint40})), "votingPortal": p.address, "ipfsHash": p.bytes32}, p.uint256),
    executeProposal: fun("0x0d61b519", "executeProposal(uint256)", {"proposalId": p.uint256}, ),
    getCancellationFee: viewFun("0x9c0401c6", "getCancellationFee()", {}, p.uint256),
    getGasLimit: viewFun("0x1a93d1c3", "getGasLimit()", {}, p.uint256),
    getPowerStrategy: viewFun("0x0f3424bb", "getPowerStrategy()", {}, p.address),
    getProposal: viewFun("0xc7f758a8", "getProposal(uint256)", {"proposalId": p.uint256}, p.struct({"state": p.uint8, "accessLevel": p.uint8, "creationTime": p.uint40, "votingDuration": p.uint24, "votingActivationTime": p.uint40, "queuingTime": p.uint40, "cancelTimestamp": p.uint40, "creator": p.address, "votingPortal": p.address, "snapshotBlockHash": p.bytes32, "ipfsHash": p.bytes32, "forVotes": p.uint128, "againstVotes": p.uint128, "cancellationFee": p.uint256, "payloads": p.array(p.struct({"chain": p.uint256, "accessLevel": p.uint8, "payloadsController": p.address, "payloadId": p.uint40}))})),
    getProposalState: viewFun("0x9080936f", "getProposalState(uint256)", {"proposalId": p.uint256}, p.uint8),
    getProposalsCount: viewFun("0x98e527d3", "getProposalsCount()", {}, p.uint256),
    getRepresentativeByChain: viewFun("0xad6036cf", "getRepresentativeByChain(address,uint256)", {"voter": p.address, "chainId": p.uint256}, p.address),
    getRepresentedVotersByChain: viewFun("0x21916b81", "getRepresentedVotersByChain(address,uint256)", {"representative": p.address, "chainId": p.uint256}, p.array(p.address)),
    getVotingConfig: viewFun("0x1c84e321", "getVotingConfig(uint8)", {"accessLevel": p.uint8}, p.struct({"coolDownBeforeVotingStart": p.uint24, "votingDuration": p.uint24, "yesThreshold": p.uint56, "yesNoDifferential": p.uint56, "minPropositionPower": p.uint56})),
    getVotingPortalsCount: viewFun("0x38fe05be", "getVotingPortalsCount()", {}, p.uint256),
    guardian: viewFun("0x452a9320", "guardian()", {}, p.address),
    initialize: fun("0xb3809b13", "initialize(address,address,address,(uint8,uint24,uint24,uint256,uint256,uint256)[],address[],uint256,uint256)", {"owner": p.address, "guardian": p.address, "powerStrategy": p.address, "votingConfigs": p.array(p.struct({"accessLevel": p.uint8, "coolDownBeforeVotingStart": p.uint24, "votingDuration": p.uint24, "yesThreshold": p.uint256, "yesNoDifferential": p.uint256, "minPropositionPower": p.uint256})), "votingPortals": p.array(p.address), "gasLimit": p.uint256, "cancellationFee": p.uint256}, ),
    initializeWithRevision: fun("0xefe61a2f", "initializeWithRevision(uint256)", {"gasLimit": p.uint256}, ),
    isVotingPortalApproved: viewFun("0x5ca4d552", "isVotingPortalApproved(address)", {"votingPortal": p.address}, p.bool),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    queueProposal: fun("0x71b32bb1", "queueProposal(uint256,uint128,uint128)", {"proposalId": p.uint256, "forVotes": p.uint128, "againstVotes": p.uint128}, ),
    redeemCancellationFee: fun("0x9043ffc3", "redeemCancellationFee(uint256[])", {"proposalIds": p.array(p.uint256)}, ),
    removeVotingPortals: fun("0x19ebdc34", "removeVotingPortals(address[])", {"votingPortals": p.array(p.address)}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    rescueVotingPortal: fun("0x00992745", "rescueVotingPortal(address)", {"votingPortal": p.address}, ),
    setPowerStrategy: fun("0x079b1fdd", "setPowerStrategy(address)", {"powerStrategy": p.address}, ),
    setVotingConfigs: fun("0x4e352319", "setVotingConfigs((uint8,uint24,uint24,uint256,uint256,uint256)[])", {"votingConfigs": p.array(p.struct({"accessLevel": p.uint8, "coolDownBeforeVotingStart": p.uint24, "votingDuration": p.uint24, "yesThreshold": p.uint256, "yesNoDifferential": p.uint256, "minPropositionPower": p.uint256}))}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    updateCancellationFee: fun("0x1aefa2d1", "updateCancellationFee(uint256)", {"cancellationFee": p.uint256}, ),
    updateGasLimit: fun("0xf687d12a", "updateGasLimit(uint256)", {"gasLimit": p.uint256}, ),
    updateGuardian: fun("0xfc525395", "updateGuardian(address)", {"newGuardian": p.address}, ),
    updateRepresentativesForChain: fun("0x133539ec", "updateRepresentativesForChain((address,uint256)[])", {"representatives": p.array(p.struct({"representative": p.address, "chainId": p.uint256}))}, ),
}

export class Contract extends ContractBase {

    ACHIEVABLE_VOTING_PARTICIPATION() {
        return this.eth_call(functions.ACHIEVABLE_VOTING_PARTICIPATION, {})
    }

    CANCELLATION_FEE_COLLECTOR() {
        return this.eth_call(functions.CANCELLATION_FEE_COLLECTOR, {})
    }

    COOLDOWN_PERIOD() {
        return this.eth_call(functions.COOLDOWN_PERIOD, {})
    }

    CROSS_CHAIN_CONTROLLER() {
        return this.eth_call(functions.CROSS_CHAIN_CONTROLLER, {})
    }

    MIN_VOTING_DURATION() {
        return this.eth_call(functions.MIN_VOTING_DURATION, {})
    }

    NAME() {
        return this.eth_call(functions.NAME, {})
    }

    PRECISION_DIVIDER() {
        return this.eth_call(functions.PRECISION_DIVIDER, {})
    }

    PROPOSAL_EXPIRATION_TIME() {
        return this.eth_call(functions.PROPOSAL_EXPIRATION_TIME, {})
    }

    getCancellationFee() {
        return this.eth_call(functions.getCancellationFee, {})
    }

    getGasLimit() {
        return this.eth_call(functions.getGasLimit, {})
    }

    getPowerStrategy() {
        return this.eth_call(functions.getPowerStrategy, {})
    }

    getProposal(proposalId: GetProposalParams["proposalId"]) {
        return this.eth_call(functions.getProposal, {proposalId})
    }

    getProposalState(proposalId: GetProposalStateParams["proposalId"]) {
        return this.eth_call(functions.getProposalState, {proposalId})
    }

    getProposalsCount() {
        return this.eth_call(functions.getProposalsCount, {})
    }

    getRepresentativeByChain(voter: GetRepresentativeByChainParams["voter"], chainId: GetRepresentativeByChainParams["chainId"]) {
        return this.eth_call(functions.getRepresentativeByChain, {voter, chainId})
    }

    getRepresentedVotersByChain(representative: GetRepresentedVotersByChainParams["representative"], chainId: GetRepresentedVotersByChainParams["chainId"]) {
        return this.eth_call(functions.getRepresentedVotersByChain, {representative, chainId})
    }

    getVotingConfig(accessLevel: GetVotingConfigParams["accessLevel"]) {
        return this.eth_call(functions.getVotingConfig, {accessLevel})
    }

    getVotingPortalsCount() {
        return this.eth_call(functions.getVotingPortalsCount, {})
    }

    guardian() {
        return this.eth_call(functions.guardian, {})
    }

    isVotingPortalApproved(votingPortal: IsVotingPortalApprovedParams["votingPortal"]) {
        return this.eth_call(functions.isVotingPortalApproved, {votingPortal})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }
}

/// Event types
export type CancellationFeeRedeemedEventArgs = EParams<typeof events.CancellationFeeRedeemed>
export type CancellationFeeUpdatedEventArgs = EParams<typeof events.CancellationFeeUpdated>
export type GasLimitUpdatedEventArgs = EParams<typeof events.GasLimitUpdated>
export type GuardianUpdatedEventArgs = EParams<typeof events.GuardianUpdated>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PayloadSentEventArgs = EParams<typeof events.PayloadSent>
export type PowerStrategyUpdatedEventArgs = EParams<typeof events.PowerStrategyUpdated>
export type ProposalCanceledEventArgs = EParams<typeof events.ProposalCanceled>
export type ProposalCreatedEventArgs = EParams<typeof events.ProposalCreated>
export type ProposalExecutedEventArgs = EParams<typeof events.ProposalExecuted>
export type ProposalFailedEventArgs = EParams<typeof events.ProposalFailed>
export type ProposalQueuedEventArgs = EParams<typeof events.ProposalQueued>
export type RepresentativeUpdatedEventArgs = EParams<typeof events.RepresentativeUpdated>
export type VoteForwardedEventArgs = EParams<typeof events.VoteForwarded>
export type VotingActivatedEventArgs = EParams<typeof events.VotingActivated>
export type VotingConfigUpdatedEventArgs = EParams<typeof events.VotingConfigUpdated>
export type VotingPortalUpdatedEventArgs = EParams<typeof events.VotingPortalUpdated>

/// Function types
export type ACHIEVABLE_VOTING_PARTICIPATIONParams = FunctionArguments<typeof functions.ACHIEVABLE_VOTING_PARTICIPATION>
export type ACHIEVABLE_VOTING_PARTICIPATIONReturn = FunctionReturn<typeof functions.ACHIEVABLE_VOTING_PARTICIPATION>

export type CANCELLATION_FEE_COLLECTORParams = FunctionArguments<typeof functions.CANCELLATION_FEE_COLLECTOR>
export type CANCELLATION_FEE_COLLECTORReturn = FunctionReturn<typeof functions.CANCELLATION_FEE_COLLECTOR>

export type COOLDOWN_PERIODParams = FunctionArguments<typeof functions.COOLDOWN_PERIOD>
export type COOLDOWN_PERIODReturn = FunctionReturn<typeof functions.COOLDOWN_PERIOD>

export type CROSS_CHAIN_CONTROLLERParams = FunctionArguments<typeof functions.CROSS_CHAIN_CONTROLLER>
export type CROSS_CHAIN_CONTROLLERReturn = FunctionReturn<typeof functions.CROSS_CHAIN_CONTROLLER>

export type MIN_VOTING_DURATIONParams = FunctionArguments<typeof functions.MIN_VOTING_DURATION>
export type MIN_VOTING_DURATIONReturn = FunctionReturn<typeof functions.MIN_VOTING_DURATION>

export type NAMEParams = FunctionArguments<typeof functions.NAME>
export type NAMEReturn = FunctionReturn<typeof functions.NAME>

export type PRECISION_DIVIDERParams = FunctionArguments<typeof functions.PRECISION_DIVIDER>
export type PRECISION_DIVIDERReturn = FunctionReturn<typeof functions.PRECISION_DIVIDER>

export type PROPOSAL_EXPIRATION_TIMEParams = FunctionArguments<typeof functions.PROPOSAL_EXPIRATION_TIME>
export type PROPOSAL_EXPIRATION_TIMEReturn = FunctionReturn<typeof functions.PROPOSAL_EXPIRATION_TIME>

export type ActivateVotingParams = FunctionArguments<typeof functions.activateVoting>
export type ActivateVotingReturn = FunctionReturn<typeof functions.activateVoting>

export type AddVotingPortalsParams = FunctionArguments<typeof functions.addVotingPortals>
export type AddVotingPortalsReturn = FunctionReturn<typeof functions.addVotingPortals>

export type CancelProposalParams = FunctionArguments<typeof functions.cancelProposal>
export type CancelProposalReturn = FunctionReturn<typeof functions.cancelProposal>

export type CreateProposalParams = FunctionArguments<typeof functions.createProposal>
export type CreateProposalReturn = FunctionReturn<typeof functions.createProposal>

export type ExecuteProposalParams = FunctionArguments<typeof functions.executeProposal>
export type ExecuteProposalReturn = FunctionReturn<typeof functions.executeProposal>

export type GetCancellationFeeParams = FunctionArguments<typeof functions.getCancellationFee>
export type GetCancellationFeeReturn = FunctionReturn<typeof functions.getCancellationFee>

export type GetGasLimitParams = FunctionArguments<typeof functions.getGasLimit>
export type GetGasLimitReturn = FunctionReturn<typeof functions.getGasLimit>

export type GetPowerStrategyParams = FunctionArguments<typeof functions.getPowerStrategy>
export type GetPowerStrategyReturn = FunctionReturn<typeof functions.getPowerStrategy>

export type GetProposalParams = FunctionArguments<typeof functions.getProposal>
export type GetProposalReturn = FunctionReturn<typeof functions.getProposal>

export type GetProposalStateParams = FunctionArguments<typeof functions.getProposalState>
export type GetProposalStateReturn = FunctionReturn<typeof functions.getProposalState>

export type GetProposalsCountParams = FunctionArguments<typeof functions.getProposalsCount>
export type GetProposalsCountReturn = FunctionReturn<typeof functions.getProposalsCount>

export type GetRepresentativeByChainParams = FunctionArguments<typeof functions.getRepresentativeByChain>
export type GetRepresentativeByChainReturn = FunctionReturn<typeof functions.getRepresentativeByChain>

export type GetRepresentedVotersByChainParams = FunctionArguments<typeof functions.getRepresentedVotersByChain>
export type GetRepresentedVotersByChainReturn = FunctionReturn<typeof functions.getRepresentedVotersByChain>

export type GetVotingConfigParams = FunctionArguments<typeof functions.getVotingConfig>
export type GetVotingConfigReturn = FunctionReturn<typeof functions.getVotingConfig>

export type GetVotingPortalsCountParams = FunctionArguments<typeof functions.getVotingPortalsCount>
export type GetVotingPortalsCountReturn = FunctionReturn<typeof functions.getVotingPortalsCount>

export type GuardianParams = FunctionArguments<typeof functions.guardian>
export type GuardianReturn = FunctionReturn<typeof functions.guardian>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type InitializeWithRevisionParams = FunctionArguments<typeof functions.initializeWithRevision>
export type InitializeWithRevisionReturn = FunctionReturn<typeof functions.initializeWithRevision>

export type IsVotingPortalApprovedParams = FunctionArguments<typeof functions.isVotingPortalApproved>
export type IsVotingPortalApprovedReturn = FunctionReturn<typeof functions.isVotingPortalApproved>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type QueueProposalParams = FunctionArguments<typeof functions.queueProposal>
export type QueueProposalReturn = FunctionReturn<typeof functions.queueProposal>

export type RedeemCancellationFeeParams = FunctionArguments<typeof functions.redeemCancellationFee>
export type RedeemCancellationFeeReturn = FunctionReturn<typeof functions.redeemCancellationFee>

export type RemoveVotingPortalsParams = FunctionArguments<typeof functions.removeVotingPortals>
export type RemoveVotingPortalsReturn = FunctionReturn<typeof functions.removeVotingPortals>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RescueVotingPortalParams = FunctionArguments<typeof functions.rescueVotingPortal>
export type RescueVotingPortalReturn = FunctionReturn<typeof functions.rescueVotingPortal>

export type SetPowerStrategyParams = FunctionArguments<typeof functions.setPowerStrategy>
export type SetPowerStrategyReturn = FunctionReturn<typeof functions.setPowerStrategy>

export type SetVotingConfigsParams = FunctionArguments<typeof functions.setVotingConfigs>
export type SetVotingConfigsReturn = FunctionReturn<typeof functions.setVotingConfigs>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpdateCancellationFeeParams = FunctionArguments<typeof functions.updateCancellationFee>
export type UpdateCancellationFeeReturn = FunctionReturn<typeof functions.updateCancellationFee>

export type UpdateGasLimitParams = FunctionArguments<typeof functions.updateGasLimit>
export type UpdateGasLimitReturn = FunctionReturn<typeof functions.updateGasLimit>

export type UpdateGuardianParams = FunctionArguments<typeof functions.updateGuardian>
export type UpdateGuardianReturn = FunctionReturn<typeof functions.updateGuardian>

export type UpdateRepresentativesForChainParams = FunctionArguments<typeof functions.updateRepresentativesForChain>
export type UpdateRepresentativesForChainReturn = FunctionReturn<typeof functions.updateRepresentativesForChain>

