import { pick } from 'lodash'

import * as otokenAbi from '../../abi/otoken'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: pick(otokenAbi.events, [
          'AccountRebasingDisabled',
          'AccountRebasingEnabled',
          'TotalSupplyUpdatedHighres',
        ]),
      },
    ],
  })
}
