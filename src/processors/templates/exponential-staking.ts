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
        events: {
          Approval: exponentialStakingAbi.events.Approval,
          Transfer: exponentialStakingAbi.events.Transfer,
          Reward: exponentialStakingAbi.events.Reward,
          Penalty: exponentialStakingAbi.events.Penalty,
        },
      },
    ],
  })
}
