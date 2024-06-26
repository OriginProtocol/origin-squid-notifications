import * as governanceAbi from '../../abi/governance'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createGovernanceProcessor = ({
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
    description: `Notify governance events for ${address}. (excludes VoteCast* events)`,
    chainId,
    address,
    topic,
    events: governanceAbi.events,
    excludedEvents: ['VoteCast', 'VoteCastWithParams'],
  })
}
