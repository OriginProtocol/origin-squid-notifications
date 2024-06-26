import * as curveAragonVotingAbi from '../../abi/curve-aragon-voting'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createCurveAragonVotingProcessor = ({
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
    description: `Notify Curve Aragon Voting events for ${address}.`,
    chainId,
    address,
    topic,
    events: curveAragonVotingAbi.events,
    excludedEvents: ['CastVote'],
  })
}
