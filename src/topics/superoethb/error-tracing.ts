import { createTraceErrorProcessor } from 'templates/trace-errors'
import { base } from 'viem/chains'

import { oethBaseABIs } from '@utils/addresses/address-abis'

// Error Tracing for superOETHb
createTraceErrorProcessor({
  name: 'Super OETH Base Error Trace',
  chainId: base.id,
  address: Object.keys(oethBaseABIs),
  abi: Object.values(oethBaseABIs),
  topic: 'superOETHb',
  severity: 'high',
})
