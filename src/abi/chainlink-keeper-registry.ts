import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ConfigSet: event("0xeb3c06937e6595fd80ec1add18a195026d5cf65f122cc3ffedbfb18a9ed80b39", "ConfigSet(uint32,uint24,uint32,uint24,uint16,uint256,uint256)", {"paymentPremiumPPB": p.uint32, "blockCountPerTurn": p.uint24, "checkGasLimit": p.uint32, "stalenessSeconds": p.uint24, "gasCeilingMultiplier": p.uint16, "fallbackGasPrice": p.uint256, "fallbackLinkPrice": p.uint256}),
    FundsAdded: event("0xafd24114486da8ebfc32f3626dada8863652e187461aa74d4bfa734891506203", "FundsAdded(uint256,address,uint96)", {"id": indexed(p.uint256), "from": indexed(p.address), "amount": p.uint96}),
    FundsWithdrawn: event("0xf3b5906e5672f3e524854103bcafbbdba80dbdfeca2c35e116127b1060a68318", "FundsWithdrawn(uint256,uint256,address)", {"id": indexed(p.uint256), "amount": p.uint256, "to": p.address}),
    KeepersUpdated: event("0x056264c94f28bb06c99d13f0446eb96c67c215d8d707bce2655a98ddf1c0b71f", "KeepersUpdated(address[],address[])", {"keepers": p.array(p.address), "payees": p.array(p.address)}),
    OwnershipTransferRequested: event("0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278", "OwnershipTransferRequested(address,address)", {"from": indexed(p.address), "to": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"from": indexed(p.address), "to": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    PayeeshipTransferRequested: event("0x84f7c7c80bb8ed2279b4aab5f61cd05e6374073d38f46d7f32de8c30e9e38367", "PayeeshipTransferRequested(address,address,address)", {"keeper": indexed(p.address), "from": indexed(p.address), "to": indexed(p.address)}),
    PayeeshipTransferred: event("0x78af32efdcad432315431e9b03d27e6cd98fb79c405fdc5af7c1714d9c0f75b3", "PayeeshipTransferred(address,address,address)", {"keeper": indexed(p.address), "from": indexed(p.address), "to": indexed(p.address)}),
    PaymentWithdrawn: event("0x9819093176a1851202c7bcfa46845809b4e47c261866550e94ed3775d2f40698", "PaymentWithdrawn(address,uint256,address,address)", {"keeper": indexed(p.address), "amount": indexed(p.uint256), "to": indexed(p.address), "payee": p.address}),
    RegistrarChanged: event("0x9bf4a5b30267728df68663e14adb47e559863967c419dc6030638883408bed2e", "RegistrarChanged(address,address)", {"from": indexed(p.address), "to": indexed(p.address)}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
    UpkeepCanceled: event("0x91cb3bb75cfbd718bbfccc56b7f53d92d7048ef4ca39a3b7b7c6d4af1f791181", "UpkeepCanceled(uint256,uint64)", {"id": indexed(p.uint256), "atBlockHeight": indexed(p.uint64)}),
    UpkeepPerformed: event("0xcaacad83e47cc45c280d487ec84184eee2fa3b54ebaa393bda7549f13da228f6", "UpkeepPerformed(uint256,bool,address,uint96,bytes)", {"id": indexed(p.uint256), "success": indexed(p.bool), "from": indexed(p.address), "payment": p.uint96, "performData": p.bytes}),
    UpkeepRegistered: event("0xbae366358c023f887e791d7a62f2e4316f1026bd77f6fb49501a917b3bc5d012", "UpkeepRegistered(uint256,uint32,address)", {"id": indexed(p.uint256), "executeGas": p.uint32, "admin": p.address}),
}

export const functions = {
    FAST_GAS_FEED: viewFun("0x4584a419", "FAST_GAS_FEED()", {}, p.address),
    LINK: viewFun("0x1b6b6d23", "LINK()", {}, p.address),
    LINK_ETH_FEED: viewFun("0xad178361", "LINK_ETH_FEED()", {}, p.address),
    acceptOwnership: fun("0x79ba5097", "acceptOwnership()", {}, ),
    acceptPayeeship: fun("0xb121e147", "acceptPayeeship(address)", {"keeper": p.address}, ),
    addFunds: fun("0x948108f7", "addFunds(uint256,uint96)", {"id": p.uint256, "amount": p.uint96}, ),
    cancelUpkeep: fun("0xc8048022", "cancelUpkeep(uint256)", {"id": p.uint256}, ),
    checkUpkeep: fun("0xc41b813a", "checkUpkeep(uint256,address)", {"id": p.uint256, "from": p.address}, {"performData": p.bytes, "maxLinkPayment": p.uint256, "gasLimit": p.uint256, "adjustedGasWei": p.uint256, "linkEth": p.uint256}),
    getCanceledUpkeepList: viewFun("0x2cb6864d", "getCanceledUpkeepList()", {}, p.array(p.uint256)),
    getConfig: viewFun("0xc3f909d4", "getConfig()", {}, {"paymentPremiumPPB": p.uint32, "blockCountPerTurn": p.uint24, "checkGasLimit": p.uint32, "stalenessSeconds": p.uint24, "gasCeilingMultiplier": p.uint16, "fallbackGasPrice": p.uint256, "fallbackLinkPrice": p.uint256}),
    getKeeperInfo: viewFun("0x1e12b8a5", "getKeeperInfo(address)", {"query": p.address}, {"payee": p.address, "active": p.bool, "balance": p.uint96}),
    getKeeperList: viewFun("0x15a126ea", "getKeeperList()", {}, p.array(p.address)),
    getMaxPaymentForGas: viewFun("0x93f0c1fc", "getMaxPaymentForGas(uint256)", {"gasLimit": p.uint256}, p.uint96),
    getMinBalanceForUpkeep: viewFun("0xb657bc9c", "getMinBalanceForUpkeep(uint256)", {"id": p.uint256}, p.uint96),
    getRegistrar: viewFun("0x4d3f7334", "getRegistrar()", {}, p.address),
    getUpkeep: viewFun("0xc7c3a19a", "getUpkeep(uint256)", {"id": p.uint256}, {"target": p.address, "executeGas": p.uint32, "checkData": p.bytes, "balance": p.uint96, "lastKeeper": p.address, "admin": p.address, "maxValidBlocknumber": p.uint64}),
    getUpkeepCount: viewFun("0xfecf27c9", "getUpkeepCount()", {}, p.uint256),
    onTokenTransfer: fun("0xa4c0ed36", "onTokenTransfer(address,uint256,bytes)", {"sender": p.address, "amount": p.uint256, "data": p.bytes}, ),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    performUpkeep: fun("0x7bbaf1ea", "performUpkeep(uint256,bytes)", {"id": p.uint256, "performData": p.bytes}, p.bool),
    recoverFunds: fun("0xb79550be", "recoverFunds()", {}, ),
    registerUpkeep: fun("0xda5c6741", "registerUpkeep(address,uint32,address,bytes)", {"target": p.address, "gasLimit": p.uint32, "admin": p.address, "checkData": p.bytes}, p.uint256),
    setConfig: fun("0x82105f79", "setConfig(uint32,uint24,uint32,uint24,uint16,uint256,uint256)", {"paymentPremiumPPB": p.uint32, "blockCountPerTurn": p.uint24, "checkGasLimit": p.uint32, "stalenessSeconds": p.uint24, "gasCeilingMultiplier": p.uint16, "fallbackGasPrice": p.uint256, "fallbackLinkPrice": p.uint256}, ),
    setKeepers: fun("0xb7fdb436", "setKeepers(address[],address[])", {"keepers": p.array(p.address), "payees": p.array(p.address)}, ),
    setRegistrar: fun("0xfaab9d39", "setRegistrar(address)", {"registrar": p.address}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"_to": p.address}, ),
    transferPayeeship: fun("0xeb5dcd6c", "transferPayeeship(address,address)", {"keeper": p.address, "proposed": p.address}, ),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    withdrawFunds: fun("0x744bfe61", "withdrawFunds(uint256,address)", {"id": p.uint256, "to": p.address}, ),
    withdrawPayment: fun("0xa710b221", "withdrawPayment(address,address)", {"from": p.address, "to": p.address}, ),
}

export class Contract extends ContractBase {

    FAST_GAS_FEED() {
        return this.eth_call(functions.FAST_GAS_FEED, {})
    }

    LINK() {
        return this.eth_call(functions.LINK, {})
    }

    LINK_ETH_FEED() {
        return this.eth_call(functions.LINK_ETH_FEED, {})
    }

    getCanceledUpkeepList() {
        return this.eth_call(functions.getCanceledUpkeepList, {})
    }

    getConfig() {
        return this.eth_call(functions.getConfig, {})
    }

    getKeeperInfo(query: GetKeeperInfoParams["query"]) {
        return this.eth_call(functions.getKeeperInfo, {query})
    }

    getKeeperList() {
        return this.eth_call(functions.getKeeperList, {})
    }

    getMaxPaymentForGas(gasLimit: GetMaxPaymentForGasParams["gasLimit"]) {
        return this.eth_call(functions.getMaxPaymentForGas, {gasLimit})
    }

    getMinBalanceForUpkeep(id: GetMinBalanceForUpkeepParams["id"]) {
        return this.eth_call(functions.getMinBalanceForUpkeep, {id})
    }

    getRegistrar() {
        return this.eth_call(functions.getRegistrar, {})
    }

    getUpkeep(id: GetUpkeepParams["id"]) {
        return this.eth_call(functions.getUpkeep, {id})
    }

    getUpkeepCount() {
        return this.eth_call(functions.getUpkeepCount, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }
}

/// Event types
export type ConfigSetEventArgs = EParams<typeof events.ConfigSet>
export type FundsAddedEventArgs = EParams<typeof events.FundsAdded>
export type FundsWithdrawnEventArgs = EParams<typeof events.FundsWithdrawn>
export type KeepersUpdatedEventArgs = EParams<typeof events.KeepersUpdated>
export type OwnershipTransferRequestedEventArgs = EParams<typeof events.OwnershipTransferRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type PayeeshipTransferRequestedEventArgs = EParams<typeof events.PayeeshipTransferRequested>
export type PayeeshipTransferredEventArgs = EParams<typeof events.PayeeshipTransferred>
export type PaymentWithdrawnEventArgs = EParams<typeof events.PaymentWithdrawn>
export type RegistrarChangedEventArgs = EParams<typeof events.RegistrarChanged>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type UpkeepCanceledEventArgs = EParams<typeof events.UpkeepCanceled>
export type UpkeepPerformedEventArgs = EParams<typeof events.UpkeepPerformed>
export type UpkeepRegisteredEventArgs = EParams<typeof events.UpkeepRegistered>

/// Function types
export type FAST_GAS_FEEDParams = FunctionArguments<typeof functions.FAST_GAS_FEED>
export type FAST_GAS_FEEDReturn = FunctionReturn<typeof functions.FAST_GAS_FEED>

export type LINKParams = FunctionArguments<typeof functions.LINK>
export type LINKReturn = FunctionReturn<typeof functions.LINK>

export type LINK_ETH_FEEDParams = FunctionArguments<typeof functions.LINK_ETH_FEED>
export type LINK_ETH_FEEDReturn = FunctionReturn<typeof functions.LINK_ETH_FEED>

export type AcceptOwnershipParams = FunctionArguments<typeof functions.acceptOwnership>
export type AcceptOwnershipReturn = FunctionReturn<typeof functions.acceptOwnership>

export type AcceptPayeeshipParams = FunctionArguments<typeof functions.acceptPayeeship>
export type AcceptPayeeshipReturn = FunctionReturn<typeof functions.acceptPayeeship>

export type AddFundsParams = FunctionArguments<typeof functions.addFunds>
export type AddFundsReturn = FunctionReturn<typeof functions.addFunds>

export type CancelUpkeepParams = FunctionArguments<typeof functions.cancelUpkeep>
export type CancelUpkeepReturn = FunctionReturn<typeof functions.cancelUpkeep>

export type CheckUpkeepParams = FunctionArguments<typeof functions.checkUpkeep>
export type CheckUpkeepReturn = FunctionReturn<typeof functions.checkUpkeep>

export type GetCanceledUpkeepListParams = FunctionArguments<typeof functions.getCanceledUpkeepList>
export type GetCanceledUpkeepListReturn = FunctionReturn<typeof functions.getCanceledUpkeepList>

export type GetConfigParams = FunctionArguments<typeof functions.getConfig>
export type GetConfigReturn = FunctionReturn<typeof functions.getConfig>

export type GetKeeperInfoParams = FunctionArguments<typeof functions.getKeeperInfo>
export type GetKeeperInfoReturn = FunctionReturn<typeof functions.getKeeperInfo>

export type GetKeeperListParams = FunctionArguments<typeof functions.getKeeperList>
export type GetKeeperListReturn = FunctionReturn<typeof functions.getKeeperList>

export type GetMaxPaymentForGasParams = FunctionArguments<typeof functions.getMaxPaymentForGas>
export type GetMaxPaymentForGasReturn = FunctionReturn<typeof functions.getMaxPaymentForGas>

export type GetMinBalanceForUpkeepParams = FunctionArguments<typeof functions.getMinBalanceForUpkeep>
export type GetMinBalanceForUpkeepReturn = FunctionReturn<typeof functions.getMinBalanceForUpkeep>

export type GetRegistrarParams = FunctionArguments<typeof functions.getRegistrar>
export type GetRegistrarReturn = FunctionReturn<typeof functions.getRegistrar>

export type GetUpkeepParams = FunctionArguments<typeof functions.getUpkeep>
export type GetUpkeepReturn = FunctionReturn<typeof functions.getUpkeep>

export type GetUpkeepCountParams = FunctionArguments<typeof functions.getUpkeepCount>
export type GetUpkeepCountReturn = FunctionReturn<typeof functions.getUpkeepCount>

export type OnTokenTransferParams = FunctionArguments<typeof functions.onTokenTransfer>
export type OnTokenTransferReturn = FunctionReturn<typeof functions.onTokenTransfer>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type PerformUpkeepParams = FunctionArguments<typeof functions.performUpkeep>
export type PerformUpkeepReturn = FunctionReturn<typeof functions.performUpkeep>

export type RecoverFundsParams = FunctionArguments<typeof functions.recoverFunds>
export type RecoverFundsReturn = FunctionReturn<typeof functions.recoverFunds>

export type RegisterUpkeepParams = FunctionArguments<typeof functions.registerUpkeep>
export type RegisterUpkeepReturn = FunctionReturn<typeof functions.registerUpkeep>

export type SetConfigParams = FunctionArguments<typeof functions.setConfig>
export type SetConfigReturn = FunctionReturn<typeof functions.setConfig>

export type SetKeepersParams = FunctionArguments<typeof functions.setKeepers>
export type SetKeepersReturn = FunctionReturn<typeof functions.setKeepers>

export type SetRegistrarParams = FunctionArguments<typeof functions.setRegistrar>
export type SetRegistrarReturn = FunctionReturn<typeof functions.setRegistrar>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TransferPayeeshipParams = FunctionArguments<typeof functions.transferPayeeship>
export type TransferPayeeshipReturn = FunctionReturn<typeof functions.transferPayeeship>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type WithdrawFundsParams = FunctionArguments<typeof functions.withdrawFunds>
export type WithdrawFundsReturn = FunctionReturn<typeof functions.withdrawFunds>

export type WithdrawPaymentParams = FunctionArguments<typeof functions.withdrawPayment>
export type WithdrawPaymentReturn = FunctionReturn<typeof functions.withdrawPayment>

