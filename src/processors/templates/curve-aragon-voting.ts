import { pick } from 'lodash'

import * as curveAragonVotingAbi from '../../abi/curve-aragon-voting'
import { Topic } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createCurveAragonVotingProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: pick(curveAragonVotingAbi.events, 'CastVote'),
      },
    ],
  })
}
