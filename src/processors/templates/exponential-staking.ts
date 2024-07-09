import { omit } from 'lodash'

import * as exponentialStakingAbi from '../../abi/exponential-staking'
import { EventProcessorParams, createEventProcessor } from './event'

export const createExponentialStakingProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: omit(exponentialStakingAbi.events, ['Approval', 'Transfer', 'Reward', 'Penalty']),
      },
    ],
  })
}
