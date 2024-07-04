import * as timelockAbi from '../../abi/timelock'
import { EventProcessorParams, createEventProcessor } from './event'

export const createTimelockProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: timelockAbi.events,
        severity: 'high',
      },
    ],
  })
}
