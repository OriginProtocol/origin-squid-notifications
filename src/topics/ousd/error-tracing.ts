import { createTraceErrorProcessor } from 'templates/trace-errors'

import { ousdABIs } from '@utils/addresses/address-abis'

// Error Tracing for OUSD
createTraceErrorProcessor({
  name: 'OUSD Error Trace',
  chainId: 1,
  address: Object.keys(ousdABIs),
  abi: Object.values(ousdABIs),
  topic: 'OUSD',
  severity: 'high',
})
