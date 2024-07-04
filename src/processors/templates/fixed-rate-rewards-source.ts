import * as fixedRateRewardsSource from '../../abi/fixed-rate-rewards-source'
import { notifyTargets } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createFixedRateRewardsSourceProcessor = (
  params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>,
) => {
  createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: fixedRateRewardsSource.events,
        severity: 'high',
        notifyTarget: notifyTargets.Engineering,
        includedEvents: ['RewardsPerSecondChanged', 'RewardsTargetChange'],
      },
      {
        address: params.address,
        events: fixedRateRewardsSource.events,
        severity: 'low',
        includedEvents: ['RewardCollected'],
      },
    ],
  })
}
