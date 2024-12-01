import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    multiSend: fun("0x8d80ff0a", "multiSend(bytes)", {"transactions": p.bytes}, ),
}

export class Contract extends ContractBase {
}

/// Function types
export type MultiSendParams = FunctionArguments<typeof functions.multiSend>
export type MultiSendReturn = FunctionReturn<typeof functions.multiSend>

