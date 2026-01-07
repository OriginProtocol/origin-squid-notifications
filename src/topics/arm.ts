import { omit } from 'lodash'
import { mainnet, sonic } from 'viem/chains'

import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import { createOriginArmProcessor } from '../templates/origin-arm'
import { createEventProcessor } from '../templates/event'
import { addresses } from '../utils/addresses'
import * as pendleArmSyAbi from '../abi/pendle-arm-sy'

createOriginArmProcessor({
  name: 'Origin Lido ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arms['ARM-WETH-stETH'].address,
  symbol0: 'WETH',
  symbol1: 'stETH',
  token0: addresses.tokens.WETH,
  token1: addresses.tokens.stETH,
  capManagerAddress: addresses.arms['ARM-WETH-stETH'].capManager,
  zapperAddress: addresses.arms['ARM-WETH-stETH'].zapper,
})

createOriginArmProcessor({
  name: 'Origin Ether.fi ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arms['ARM-WETH-eETH'].address,
  symbol0: 'WETH',
  symbol1: 'eETH',
  token0: addresses.tokens.WETH,
  token1: addresses.tokens.eETH,
  capManagerAddress: addresses.arms['ARM-WETH-eETH'].capManager,
  zapperAddress: addresses.arms['ARM-WETH-eETH'].zapper,
})

createOriginArmProcessor({
  name: 'Origin OS ARM',
  topic: 'ARM',
  chainId: sonic.id,
  address: sonicAddresses.arms['ARM-WS-OS'].address,
  token0: sonicAddresses.tokens.wS,
  token1: sonicAddresses.tokens.OS,
  symbol0: 'WS',
  symbol1: 'OS',
  capManagerAddress: sonicAddresses.arms['ARM-WS-OS'].capManager,
  zapperAddress: sonicAddresses.arms['ARM-WS-OS'].zapper,
  minimumSwapAmount: 10n ** 18n * 1000n, // 1000 S
})

createOriginArmProcessor({
  name: 'Origin Ethena ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arms['ARM-USDe-sUSDe'].address,
  symbol0: 'USDe',
  symbol1: 'sUSDe',
  token0: addresses.tokens.USDe,
  token1: addresses.tokens.sUSDe,
  capManagerAddress: addresses.arms['ARM-USDe-sUSDe'].capManager,
  zapperAddress: addresses.arms['ARM-USDe-sUSDe'].zapper,
})

// Lido ARM Pendle SY Token
createEventProcessor({
  name: 'Lido ARM Pendle SY',
  chainId: mainnet.id,
  topic: 'ARM',
  tracks: [
    {
      address: [addresses.arms['ARM-WETH-stETH'].pendleSy!],
      events: omit(pendleArmSyAbi.events, ['Transfer', 'Approval']),
      severity: 'medium',
    },
  ],
})
