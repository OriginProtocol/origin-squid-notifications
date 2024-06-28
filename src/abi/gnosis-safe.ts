import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AddedOwner: event("0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26", "AddedOwner(address)", {"owner": p.address}),
    ApproveHash: event("0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c", "ApproveHash(bytes32,address)", {"approvedHash": indexed(p.bytes32), "owner": indexed(p.address)}),
    ChangedMasterCopy: event("0x75e41bc35ff1bf14d81d1d2f649c0084a0f974f9289c803ec9898eeec4c8d0b8", "ChangedMasterCopy(address)", {"masterCopy": p.address}),
    ChangedThreshold: event("0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93", "ChangedThreshold(uint256)", {"threshold": p.uint256}),
    DisabledModule: event("0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276", "DisabledModule(address)", {"module": p.address}),
    EnabledModule: event("0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440", "EnabledModule(address)", {"module": p.address}),
    ExecutionFailure: event("0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23", "ExecutionFailure(bytes32,uint256)", {"txHash": p.bytes32, "payment": p.uint256}),
    ExecutionFromModuleFailure: event("0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375", "ExecutionFromModuleFailure(address)", {"module": indexed(p.address)}),
    ExecutionFromModuleSuccess: event("0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8", "ExecutionFromModuleSuccess(address)", {"module": indexed(p.address)}),
    ExecutionSuccess: event("0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e", "ExecutionSuccess(bytes32,uint256)", {"txHash": p.bytes32, "payment": p.uint256}),
    RemovedOwner: event("0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf", "RemovedOwner(address)", {"owner": p.address}),
    SignMsg: event("0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4", "SignMsg(bytes32)", {"msgHash": indexed(p.bytes32)}),
}

export const functions = {
    NAME: viewFun("0xa3f4df7e", "NAME()", {}, p.string),
    VERSION: viewFun("0xffa1ad74", "VERSION()", {}, p.string),
    addOwnerWithThreshold: fun("0x0d582f13", "addOwnerWithThreshold(address,uint256)", {"owner": p.address, "_threshold": p.uint256}, ),
    approveHash: fun("0xd4d9bdcd", "approveHash(bytes32)", {"hashToApprove": p.bytes32}, ),
    approvedHashes: viewFun("0x7d832974", "approvedHashes(address,bytes32)", {"_0": p.address, "_1": p.bytes32}, p.uint256),
    changeMasterCopy: fun("0x7de7edef", "changeMasterCopy(address)", {"_masterCopy": p.address}, ),
    changeThreshold: fun("0x694e80c3", "changeThreshold(uint256)", {"_threshold": p.uint256}, ),
    disableModule: fun("0xe009cfde", "disableModule(address,address)", {"prevModule": p.address, "module": p.address}, ),
    domainSeparator: viewFun("0xf698da25", "domainSeparator()", {}, p.bytes32),
    enableModule: fun("0x610b5925", "enableModule(address)", {"module": p.address}, ),
    encodeTransactionData: viewFun("0xe86637db", "encodeTransactionData(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,uint256)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8, "safeTxGas": p.uint256, "baseGas": p.uint256, "gasPrice": p.uint256, "gasToken": p.address, "refundReceiver": p.address, "_nonce": p.uint256}, p.bytes),
    execTransaction: fun("0x6a761202", "execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8, "safeTxGas": p.uint256, "baseGas": p.uint256, "gasPrice": p.uint256, "gasToken": p.address, "refundReceiver": p.address, "signatures": p.bytes}, p.bool),
    execTransactionFromModule: fun("0x468721a7", "execTransactionFromModule(address,uint256,bytes,uint8)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8}, p.bool),
    execTransactionFromModuleReturnData: fun("0x5229073f", "execTransactionFromModuleReturnData(address,uint256,bytes,uint8)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8}, {"success": p.bool, "returnData": p.bytes}),
    getMessageHash: viewFun("0x0a1028c4", "getMessageHash(bytes)", {"message": p.bytes}, p.bytes32),
    getModules: viewFun("0xb2494df3", "getModules()", {}, p.array(p.address)),
    getModulesPaginated: viewFun("0xcc2f8452", "getModulesPaginated(address,uint256)", {"start": p.address, "pageSize": p.uint256}, {"array": p.array(p.address), "next": p.address}),
    getOwners: viewFun("0xa0e67e2b", "getOwners()", {}, p.array(p.address)),
    getThreshold: viewFun("0xe75235b8", "getThreshold()", {}, p.uint256),
    getTransactionHash: viewFun("0xd8d11f78", "getTransactionHash(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,uint256)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8, "safeTxGas": p.uint256, "baseGas": p.uint256, "gasPrice": p.uint256, "gasToken": p.address, "refundReceiver": p.address, "_nonce": p.uint256}, p.bytes32),
    isOwner: viewFun("0x2f54bf6e", "isOwner(address)", {"owner": p.address}, p.bool),
    isValidSignature: fun("0x20c13b0b", "isValidSignature(bytes,bytes)", {"_data": p.bytes, "_signature": p.bytes}, p.bytes4),
    nonce: viewFun("0xaffed0e0", "nonce()", {}, p.uint256),
    removeOwner: fun("0xf8dc5dd9", "removeOwner(address,address,uint256)", {"prevOwner": p.address, "owner": p.address, "_threshold": p.uint256}, ),
    requiredTxGas: fun("0xc4ca3a9c", "requiredTxGas(address,uint256,bytes,uint8)", {"to": p.address, "value": p.uint256, "data": p.bytes, "operation": p.uint8}, p.uint256),
    setFallbackHandler: fun("0xf08a0323", "setFallbackHandler(address)", {"handler": p.address}, ),
    setup: fun("0xb63e800d", "setup(address[],uint256,address,bytes,address,address,uint256,address)", {"_owners": p.array(p.address), "_threshold": p.uint256, "to": p.address, "data": p.bytes, "fallbackHandler": p.address, "paymentToken": p.address, "payment": p.uint256, "paymentReceiver": p.address}, ),
    signMessage: fun("0x85a5affe", "signMessage(bytes)", {"_data": p.bytes}, ),
    signedMessages: viewFun("0x5ae6bd37", "signedMessages(bytes32)", {"_0": p.bytes32}, p.uint256),
    swapOwner: fun("0xe318b52b", "swapOwner(address,address,address)", {"prevOwner": p.address, "oldOwner": p.address, "newOwner": p.address}, ),
}

export class Contract extends ContractBase {

    NAME() {
        return this.eth_call(functions.NAME, {})
    }

    VERSION() {
        return this.eth_call(functions.VERSION, {})
    }

    approvedHashes(_0: ApprovedHashesParams["_0"], _1: ApprovedHashesParams["_1"]) {
        return this.eth_call(functions.approvedHashes, {_0, _1})
    }

    domainSeparator() {
        return this.eth_call(functions.domainSeparator, {})
    }

    encodeTransactionData(to: EncodeTransactionDataParams["to"], value: EncodeTransactionDataParams["value"], data: EncodeTransactionDataParams["data"], operation: EncodeTransactionDataParams["operation"], safeTxGas: EncodeTransactionDataParams["safeTxGas"], baseGas: EncodeTransactionDataParams["baseGas"], gasPrice: EncodeTransactionDataParams["gasPrice"], gasToken: EncodeTransactionDataParams["gasToken"], refundReceiver: EncodeTransactionDataParams["refundReceiver"], _nonce: EncodeTransactionDataParams["_nonce"]) {
        return this.eth_call(functions.encodeTransactionData, {to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce})
    }

    getMessageHash(message: GetMessageHashParams["message"]) {
        return this.eth_call(functions.getMessageHash, {message})
    }

    getModules() {
        return this.eth_call(functions.getModules, {})
    }

    getModulesPaginated(start: GetModulesPaginatedParams["start"], pageSize: GetModulesPaginatedParams["pageSize"]) {
        return this.eth_call(functions.getModulesPaginated, {start, pageSize})
    }

    getOwners() {
        return this.eth_call(functions.getOwners, {})
    }

    getThreshold() {
        return this.eth_call(functions.getThreshold, {})
    }

    getTransactionHash(to: GetTransactionHashParams["to"], value: GetTransactionHashParams["value"], data: GetTransactionHashParams["data"], operation: GetTransactionHashParams["operation"], safeTxGas: GetTransactionHashParams["safeTxGas"], baseGas: GetTransactionHashParams["baseGas"], gasPrice: GetTransactionHashParams["gasPrice"], gasToken: GetTransactionHashParams["gasToken"], refundReceiver: GetTransactionHashParams["refundReceiver"], _nonce: GetTransactionHashParams["_nonce"]) {
        return this.eth_call(functions.getTransactionHash, {to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce})
    }

    isOwner(owner: IsOwnerParams["owner"]) {
        return this.eth_call(functions.isOwner, {owner})
    }

    nonce() {
        return this.eth_call(functions.nonce, {})
    }

    signedMessages(_0: SignedMessagesParams["_0"]) {
        return this.eth_call(functions.signedMessages, {_0})
    }
}

/// Event types
export type AddedOwnerEventArgs = EParams<typeof events.AddedOwner>
export type ApproveHashEventArgs = EParams<typeof events.ApproveHash>
export type ChangedMasterCopyEventArgs = EParams<typeof events.ChangedMasterCopy>
export type ChangedThresholdEventArgs = EParams<typeof events.ChangedThreshold>
export type DisabledModuleEventArgs = EParams<typeof events.DisabledModule>
export type EnabledModuleEventArgs = EParams<typeof events.EnabledModule>
export type ExecutionFailureEventArgs = EParams<typeof events.ExecutionFailure>
export type ExecutionFromModuleFailureEventArgs = EParams<typeof events.ExecutionFromModuleFailure>
export type ExecutionFromModuleSuccessEventArgs = EParams<typeof events.ExecutionFromModuleSuccess>
export type ExecutionSuccessEventArgs = EParams<typeof events.ExecutionSuccess>
export type RemovedOwnerEventArgs = EParams<typeof events.RemovedOwner>
export type SignMsgEventArgs = EParams<typeof events.SignMsg>

/// Function types
export type NAMEParams = FunctionArguments<typeof functions.NAME>
export type NAMEReturn = FunctionReturn<typeof functions.NAME>

export type VERSIONParams = FunctionArguments<typeof functions.VERSION>
export type VERSIONReturn = FunctionReturn<typeof functions.VERSION>

export type AddOwnerWithThresholdParams = FunctionArguments<typeof functions.addOwnerWithThreshold>
export type AddOwnerWithThresholdReturn = FunctionReturn<typeof functions.addOwnerWithThreshold>

export type ApproveHashParams = FunctionArguments<typeof functions.approveHash>
export type ApproveHashReturn = FunctionReturn<typeof functions.approveHash>

export type ApprovedHashesParams = FunctionArguments<typeof functions.approvedHashes>
export type ApprovedHashesReturn = FunctionReturn<typeof functions.approvedHashes>

export type ChangeMasterCopyParams = FunctionArguments<typeof functions.changeMasterCopy>
export type ChangeMasterCopyReturn = FunctionReturn<typeof functions.changeMasterCopy>

export type ChangeThresholdParams = FunctionArguments<typeof functions.changeThreshold>
export type ChangeThresholdReturn = FunctionReturn<typeof functions.changeThreshold>

export type DisableModuleParams = FunctionArguments<typeof functions.disableModule>
export type DisableModuleReturn = FunctionReturn<typeof functions.disableModule>

export type DomainSeparatorParams = FunctionArguments<typeof functions.domainSeparator>
export type DomainSeparatorReturn = FunctionReturn<typeof functions.domainSeparator>

export type EnableModuleParams = FunctionArguments<typeof functions.enableModule>
export type EnableModuleReturn = FunctionReturn<typeof functions.enableModule>

export type EncodeTransactionDataParams = FunctionArguments<typeof functions.encodeTransactionData>
export type EncodeTransactionDataReturn = FunctionReturn<typeof functions.encodeTransactionData>

export type ExecTransactionParams = FunctionArguments<typeof functions.execTransaction>
export type ExecTransactionReturn = FunctionReturn<typeof functions.execTransaction>

export type ExecTransactionFromModuleParams = FunctionArguments<typeof functions.execTransactionFromModule>
export type ExecTransactionFromModuleReturn = FunctionReturn<typeof functions.execTransactionFromModule>

export type ExecTransactionFromModuleReturnDataParams = FunctionArguments<typeof functions.execTransactionFromModuleReturnData>
export type ExecTransactionFromModuleReturnDataReturn = FunctionReturn<typeof functions.execTransactionFromModuleReturnData>

export type GetMessageHashParams = FunctionArguments<typeof functions.getMessageHash>
export type GetMessageHashReturn = FunctionReturn<typeof functions.getMessageHash>

export type GetModulesParams = FunctionArguments<typeof functions.getModules>
export type GetModulesReturn = FunctionReturn<typeof functions.getModules>

export type GetModulesPaginatedParams = FunctionArguments<typeof functions.getModulesPaginated>
export type GetModulesPaginatedReturn = FunctionReturn<typeof functions.getModulesPaginated>

export type GetOwnersParams = FunctionArguments<typeof functions.getOwners>
export type GetOwnersReturn = FunctionReturn<typeof functions.getOwners>

export type GetThresholdParams = FunctionArguments<typeof functions.getThreshold>
export type GetThresholdReturn = FunctionReturn<typeof functions.getThreshold>

export type GetTransactionHashParams = FunctionArguments<typeof functions.getTransactionHash>
export type GetTransactionHashReturn = FunctionReturn<typeof functions.getTransactionHash>

export type IsOwnerParams = FunctionArguments<typeof functions.isOwner>
export type IsOwnerReturn = FunctionReturn<typeof functions.isOwner>

export type IsValidSignatureParams = FunctionArguments<typeof functions.isValidSignature>
export type IsValidSignatureReturn = FunctionReturn<typeof functions.isValidSignature>

export type NonceParams = FunctionArguments<typeof functions.nonce>
export type NonceReturn = FunctionReturn<typeof functions.nonce>

export type RemoveOwnerParams = FunctionArguments<typeof functions.removeOwner>
export type RemoveOwnerReturn = FunctionReturn<typeof functions.removeOwner>

export type RequiredTxGasParams = FunctionArguments<typeof functions.requiredTxGas>
export type RequiredTxGasReturn = FunctionReturn<typeof functions.requiredTxGas>

export type SetFallbackHandlerParams = FunctionArguments<typeof functions.setFallbackHandler>
export type SetFallbackHandlerReturn = FunctionReturn<typeof functions.setFallbackHandler>

export type SetupParams = FunctionArguments<typeof functions.setup>
export type SetupReturn = FunctionReturn<typeof functions.setup>

export type SignMessageParams = FunctionArguments<typeof functions.signMessage>
export type SignMessageReturn = FunctionReturn<typeof functions.signMessage>

export type SignedMessagesParams = FunctionArguments<typeof functions.signedMessages>
export type SignedMessagesReturn = FunctionReturn<typeof functions.signedMessages>

export type SwapOwnerParams = FunctionArguments<typeof functions.swapOwner>
export type SwapOwnerReturn = FunctionReturn<typeof functions.swapOwner>

