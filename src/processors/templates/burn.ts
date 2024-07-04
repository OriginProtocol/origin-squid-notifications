import * as erc20Abi from '../../abi/erc20'
import { EventProcessorParams, createEventProcessor } from './event'

export const createBurnProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: erc20Abi.events,
        includedEvents: ['Transfer'],
        topic2: [
          '0x0000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000001',
          '0x000000000000000000000000000000000000dEaD',
        ],
      },
    ],
  })
}
