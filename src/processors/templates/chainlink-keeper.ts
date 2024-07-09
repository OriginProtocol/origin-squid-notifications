import { pick } from 'lodash'

import * as chainlinkKeeperAbi from '../../abi/chainlink-keeper-registry'
import { EventProcessorParams, createEventProcessor } from './event'

export const createChainlinkKeeperProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: pick(chainlinkKeeperAbi.events, ['UpkeepPerformed', 'UpkeepCanceled', 'FundsAdded', 'FundsWithdrawn']),
      },
    ],
  })
}
