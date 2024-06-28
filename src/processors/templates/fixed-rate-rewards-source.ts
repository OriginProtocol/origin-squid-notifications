import * as fixedRateRewardsSource from '../../abi/fixed-rate-rewards-source'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createFixedRateRewardsSourceProcessor = ({
  name,
  chainId,
  address,
  topic,
}: {
  name: string
  chainId: number
  address: string[]
  topic: Topic
}) => {
  return createEventProcessor({
    name,
    description: `Notify FixedRateRewardsSource events for ${address}.`,
    chainId,
    address,
    topic,
    events: fixedRateRewardsSource.events,
    excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
  })
}
