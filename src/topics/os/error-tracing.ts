import { createTraceErrorProcessor } from 'templates/trace-errors'

import { sonicABIs } from '@utils/addresses/address-abis'

const chainId = 146

// Error Tracing for OS (Sonic chain)
createTraceErrorProcessor({
  name: 'Sonic Error Trace',
  chainId,
  address: Object.keys(sonicABIs),
  abi: Object.values(sonicABIs),
  topic: 'OS',
  severity: 'high',
})
