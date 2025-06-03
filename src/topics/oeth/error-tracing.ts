import { createTraceErrorProcessor } from 'templates/trace-errors'

import { oethABIs } from '@utils/addresses/address-abis'

// Error Tracing for OETH
createTraceErrorProcessor({
  name: 'OETH Error Trace',
  chainId: 1,
  address: Object.keys(oethABIs),
  abi: Object.values(oethABIs),
  topic: 'OETH',
  severity: 'high',
})
