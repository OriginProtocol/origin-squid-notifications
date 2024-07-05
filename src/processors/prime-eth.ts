import * as lrtDepositPoolAbi from '../abi/lrt-deposit-pool'
import { PRIMEETH_LRT_DEPOSIT_POOL } from '../utils/addresses'
import { createEventProcessor } from './templates/event'

createEventProcessor({
  name: 'primeETH LRT Deposit Pool',
  topic: 'primeETH',
  chainId: 1,
  tracks: [
    {
      address: [PRIMEETH_LRT_DEPOSIT_POOL],
      events: lrtDepositPoolAbi.events,
      includedEvents: ['WithdrawalRequested', 'WithdrawalClaimed'],
    },
  ],
})
