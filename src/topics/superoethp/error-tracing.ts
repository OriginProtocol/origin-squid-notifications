import { createTraceErrorProcessor } from 'templates/trace-errors'
import { plumeMainnet } from 'viem/chains'

import { oethPlumeABIs } from '@utils/addresses/address-abis'

const chainId = plumeMainnet.id

// Error Tracing for superOETHp (Plume chain)
createTraceErrorProcessor({
  name: 'Plume Error Trace',
  chainId,
  address: Object.keys(oethPlumeABIs),
  abi: Object.values(oethPlumeABIs),
  topic: 'superOETHp',
  severity: 'high',
})
