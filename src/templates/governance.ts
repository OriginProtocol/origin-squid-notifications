import { omit } from 'lodash'

import * as governanceAbi from '../abi/governance'
import { notifyTargets } from '../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createGovernanceProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: omit(governanceAbi.events, ['VoteCast', 'VoteCastWithParams']),
        severity: 'high',
        notifyTarget: notifyTargets.Engineering,
      },
    ],
  })
}
