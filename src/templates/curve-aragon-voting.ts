import { omit } from 'lodash'

import * as curveAragonVotingAbi from '../abi/curve-aragon-voting'
import { EventProcessorParams, createEventProcessor } from './event'

export const createCurveAragonVotingProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: omit(curveAragonVotingAbi.events, 'CastVote'),
      },
    ],
  })
}
