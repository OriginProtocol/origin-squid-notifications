import { createOriginArmProcessor } from '../templates/origin-arm'
import { addresses } from '../utils/addresses'

// OTokens

// OToken Strategies
// Zapper
createOriginArmProcessor({
  name: 'Origin Lido ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arm.address,
  capManagerAddress: addresses.arm.capManager,
  zapperAddress: addresses.arm.zapper,
})
