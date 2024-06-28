import * as chainlinkKeeperAbi from '../../abi/chainlink-keeper-registry'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createChainlinkKeeperProcessor = ({
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
    description: `Notify Chainlink Keeper Registry events for ${address}.`,
    chainId,
    address,
    topic,
    events: chainlinkKeeperAbi.events,
    includedEvents: ['UpkeepPerformed', 'UpkeepCanceled', 'FundsAdded', 'FundsWithdrawn'],
  })
}
