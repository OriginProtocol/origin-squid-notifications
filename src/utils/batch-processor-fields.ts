// node_modules/@subsquid/evm-processor/src/ds-rpc/request.ts#L118
import { FieldSelection } from '@subsquid/evm-processor'

export const DEFAULT_FIELDS: FieldSelection = {
  transaction: {
    from: true,
    to: true,
    hash: true,
    gas: true,
    gasUsed: true,
    value: true,
    sighash: true,
    input: true,
    status: true,
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
    callGas: true,
    callResultGasUsed: true,
    callResultOutput: true,
    createFrom: true,
    createValue: true,
    createGas: true,
    createResultAddress: true,
    createResultGasUsed: true,
    suicideRefundAddress: true,
    suicideAddress: true,
    suicideBalance: true,
    subtraces: true,
    error: true,
    revertReason: true,
  },
}
