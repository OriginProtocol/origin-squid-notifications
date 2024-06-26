import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as otokenBuybackAbi from '../../abi/otoken-buyback'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createOTokenBuybackProcessor = ({
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
    description: `Notify for OToken Buyback events from ${address}`,
    chainId,
    address,
    topic,
    events: otokenBuybackAbi.events,
    excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
  })
}
