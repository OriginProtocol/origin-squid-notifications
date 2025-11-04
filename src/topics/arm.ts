import { sonic } from 'viem/chains'

import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import { createOriginArmProcessor } from '../templates/origin-arm'
import { addresses } from '../utils/addresses'

createOriginArmProcessor({
  name: 'Origin Lido ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arms['ARM-WETH-stETH'].address,
  symbol0: 'WETH',
  symbol1: 'stETH',
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
  capManagerAddress: addresses.arms['ARM-WETH-eETH'].capManager,
  zapperAddress: addresses.arms['ARM-WETH-eETH'].zapper,
})

createOriginArmProcessor({
  name: 'Origin OS ARM',
  topic: 'ARM',
  chainId: sonic.id,
  address: sonicAddresses.arms['ARM-WS-OS'].address,
  symbol0: 'WS',
  symbol1: 'OS',
  capManagerAddress: sonicAddresses.arms['ARM-WS-OS'].capManager,
  zapperAddress: sonicAddresses.arms['ARM-WS-OS'].zapper,
})
