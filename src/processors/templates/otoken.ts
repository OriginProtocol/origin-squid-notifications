import * as otokenAbi from '../../abi/otoken'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: otokenAbi.events,
        includedEvents: ['AccountRebasingDisabled', 'AccountRebasingEnabled', 'TotalSupplyUpdatedHighres'],
      },
    ],
  })
}
