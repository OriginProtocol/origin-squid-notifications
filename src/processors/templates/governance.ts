import * as governanceAbi from '../../abi/governance'
import { notifyTargets } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createGovernanceProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: governanceAbi.events,
        excludedEvents: ['VoteCast', 'VoteCastWithParams'],
        severity: 'high',
        notifyTarget: notifyTargets.Engineering,
      },
    ],
  })
}
