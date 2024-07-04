import * as chainlinkKeeperAbi from '../../abi/chainlink-keeper-registry'
import { Topic } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createChainlinkKeeperProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: chainlinkKeeperAbi.events,
        includedEvents: ['UpkeepPerformed', 'UpkeepCanceled', 'FundsAdded', 'FundsWithdrawn'],
      },
    ],
  })
}
