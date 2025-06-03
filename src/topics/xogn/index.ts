import { createExponentialStakingProcessor } from 'templates/exponential-staking'

import { XOGN_ADDRESS } from '@utils/addresses'

createExponentialStakingProcessor({ name: 'OGN Staking', chainId: 1, address: [XOGN_ADDRESS], topic: 'xOGN' })
