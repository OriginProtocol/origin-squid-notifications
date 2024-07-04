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
        events: exponentialStakingAbi.events,
        excludedEvents: ['Approval', 'Transfer', 'Reward', 'Penalty'],
      },
    ],
  })
}
