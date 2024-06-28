import { CHAINLINK_KEEPER_REGISTRY } from '../utils/addresses/addresses-py'
import { createChainlinkKeeperProcessor } from './templates/chainlink-keeper'

createChainlinkKeeperProcessor({
  name: 'Chainlink Keeper',
  chainId: 1,
  address: [CHAINLINK_KEEPER_REGISTRY],
  topic: 'OGN',
})
