import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    NewAdmin: event("0x71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c", "NewAdmin(address)", {"newAdmin": indexed(p.address)}),
    NewPendingAdmin: event("0x69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a756", "NewPendingAdmin(address)", {"newPendingAdmin": indexed(p.address)}),
    NewDelay: event("0x948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c", "NewDelay(uint256)", {"newDelay": indexed(p.uint256)}),
    CancelTransaction: event("0x2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf87", "CancelTransaction(bytes32,address,uint256,string,bytes,uint256)", {"txHash": indexed(p.bytes32), "target": indexed(p.address), "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}),
    ExecuteTransaction: event("0xa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e7", "ExecuteTransaction(bytes32,address,uint256,string,bytes,uint256)", {"txHash": indexed(p.bytes32), "target": indexed(p.address), "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}),
    QueueTransaction: event("0x76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f", "QueueTransaction(bytes32,address,uint256,string,bytes,uint256)", {"txHash": indexed(p.bytes32), "target": indexed(p.address), "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}),
}

export const functions = {
    executeTransaction: fun("0x0825f38f", "executeTransaction(address,uint256,string,bytes,uint256)", {"target": p.address, "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}, p.bytes),
    acceptAdmin: fun("0x0e18b681", "acceptAdmin()", {}, ),
    pendingAdmin: viewFun("0x26782247", "pendingAdmin()", {}, p.address),
    queueTransaction: fun("0x3a66f901", "queueTransaction(address,uint256,string,bytes,uint256)", {"target": p.address, "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}, p.bytes32),
    setPendingAdmin: fun("0x4dd18bf5", "setPendingAdmin(address)", {"pendingAdmin_": p.address}, ),
    cancelTransaction: fun("0x591fcdfe", "cancelTransaction(address,uint256,string,bytes,uint256)", {"target": p.address, "value": p.uint256, "signature": p.string, "data": p.bytes, "eta": p.uint256}, ),
    delay: viewFun("0x6a42b8f8", "delay()", {}, p.uint256),
    MAXIMUM_DELAY: viewFun("0x7d645fab", "MAXIMUM_DELAY()", {}, p.uint256),
    MINIMUM_DELAY: viewFun("0xb1b43ae5", "MINIMUM_DELAY()", {}, p.uint256),
    GRACE_PERIOD: viewFun("0xc1a287e2", "GRACE_PERIOD()", {}, p.uint256),
    setDelay: fun("0xe177246e", "setDelay(uint256)", {"delay_": p.uint256}, ),
    queuedTransactions: viewFun("0xf2b06537", "queuedTransactions(bytes32)", {"_0": p.bytes32}, p.bool),
    admin: viewFun("0xf851a440", "admin()", {}, p.address),
}

export class Contract extends ContractBase {

    pendingAdmin() {
        return this.eth_call(functions.pendingAdmin, {})
    }

    delay() {
        return this.eth_call(functions.delay, {})
    }

    MAXIMUM_DELAY() {
        return this.eth_call(functions.MAXIMUM_DELAY, {})
    }

    MINIMUM_DELAY() {
        return this.eth_call(functions.MINIMUM_DELAY, {})
    }

    GRACE_PERIOD() {
        return this.eth_call(functions.GRACE_PERIOD, {})
    }

    queuedTransactions(_0: QueuedTransactionsParams["_0"]) {
        return this.eth_call(functions.queuedTransactions, {_0})
    }

    admin() {
        return this.eth_call(functions.admin, {})
    }
}

/// Event types
export type NewAdminEventArgs = EParams<typeof events.NewAdmin>
export type NewPendingAdminEventArgs = EParams<typeof events.NewPendingAdmin>
export type NewDelayEventArgs = EParams<typeof events.NewDelay>
export type CancelTransactionEventArgs = EParams<typeof events.CancelTransaction>
export type ExecuteTransactionEventArgs = EParams<typeof events.ExecuteTransaction>
export type QueueTransactionEventArgs = EParams<typeof events.QueueTransaction>

/// Function types
export type ExecuteTransactionParams = FunctionArguments<typeof functions.executeTransaction>
export type ExecuteTransactionReturn = FunctionReturn<typeof functions.executeTransaction>

export type AcceptAdminParams = FunctionArguments<typeof functions.acceptAdmin>
export type AcceptAdminReturn = FunctionReturn<typeof functions.acceptAdmin>

export type PendingAdminParams = FunctionArguments<typeof functions.pendingAdmin>
export type PendingAdminReturn = FunctionReturn<typeof functions.pendingAdmin>

export type QueueTransactionParams = FunctionArguments<typeof functions.queueTransaction>
export type QueueTransactionReturn = FunctionReturn<typeof functions.queueTransaction>

export type SetPendingAdminParams = FunctionArguments<typeof functions.setPendingAdmin>
export type SetPendingAdminReturn = FunctionReturn<typeof functions.setPendingAdmin>

export type CancelTransactionParams = FunctionArguments<typeof functions.cancelTransaction>
export type CancelTransactionReturn = FunctionReturn<typeof functions.cancelTransaction>

export type DelayParams = FunctionArguments<typeof functions.delay>
export type DelayReturn = FunctionReturn<typeof functions.delay>

export type MAXIMUM_DELAYParams = FunctionArguments<typeof functions.MAXIMUM_DELAY>
export type MAXIMUM_DELAYReturn = FunctionReturn<typeof functions.MAXIMUM_DELAY>

export type MINIMUM_DELAYParams = FunctionArguments<typeof functions.MINIMUM_DELAY>
export type MINIMUM_DELAYReturn = FunctionReturn<typeof functions.MINIMUM_DELAY>

export type GRACE_PERIODParams = FunctionArguments<typeof functions.GRACE_PERIOD>
export type GRACE_PERIODReturn = FunctionReturn<typeof functions.GRACE_PERIOD>

export type SetDelayParams = FunctionArguments<typeof functions.setDelay>
export type SetDelayReturn = FunctionReturn<typeof functions.setDelay>

export type QueuedTransactionsParams = FunctionArguments<typeof functions.queuedTransactions>
export type QueuedTransactionsReturn = FunctionReturn<typeof functions.queuedTransactions>

export type AdminParams = FunctionArguments<typeof functions.admin>
export type AdminReturn = FunctionReturn<typeof functions.admin>

