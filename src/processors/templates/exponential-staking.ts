import * as exponentialStakingAbi from '../../abi/exponential-staking'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createExponentialStakingProcessor = ({
  name,
  chainId,
  address,
  topic,
}: {
  name: string
  chainId: number
  address: string[]
  topic: Topic
}) => {
  return createEventProcessor({
    name,
    description: `Notify Exponential Staking events for ${address}.`,
    chainId,
    address,
    topic,
    events: exponentialStakingAbi.events,
    excludedEvents: ['Approval', 'Transfer', 'Reward', 'Penalty'],
  })
}
