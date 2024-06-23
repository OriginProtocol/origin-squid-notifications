import { OETH_BUYBACK, OUSD_BUYBACK } from '../utils/addresses'
import { createOTokenBuybackProcessor } from './templates/otoken-buyback'

createOTokenBuybackProcessor({
  name: 'OUSD Buyback',
  chainId: 1,
  address: OUSD_BUYBACK,
  topic: 'OUSD',
})

createOTokenBuybackProcessor({
  name: 'OETH Buyback',
  chainId: 1,
  address: OETH_BUYBACK,
  topic: 'OETH',
})
