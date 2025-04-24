// node_modules/@subsquid/evm-processor/src/ds-rpc/request.ts#L118
import { FieldSelection } from '@subsquid/evm-processor'

export const DEFAULT_FIELDS: FieldSelection = {
  transaction: {
    from: true,
    to: true,
    hash: true,
    gas: true,
    value: true,
    sighash: true,
    input: true,
  },
  block: {
    timestamp: true,
  },
  log: {
    transactionHash: true,
    topics: true,
    data: true,
  },
  trace: {
    callFrom: true,
    callTo: true,
    callSighash: true,
    callValue: true,
    callInput: true,
    createResultAddress: true,
    suicideRefundAddress: true,
    suicideAddress: true,
    suicideBalance: true,
    error: true,
    revertReason: true,
  },
}
