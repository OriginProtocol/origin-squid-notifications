import { pick } from 'lodash'

import * as fixedRateRewardsSource from '../abi/fixed-rate-rewards-source'
import { notifyTargets } from '../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createFixedRateRewardsSourceProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: pick(fixedRateRewardsSource.events, ['RewardsPerSecondChanged', 'RewardsTargetChange']),
        severity: 'high',
        notifyTarget: notifyTargets.Engineering,
      },
      {
        address: params.address,
        events: pick(fixedRateRewardsSource.events, 'RewardCollected'),
        severity: 'low',
      },
    ],
  })
}
