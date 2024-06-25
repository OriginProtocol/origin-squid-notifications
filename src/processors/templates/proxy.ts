import * as governedUpgradeabilityProxyAbi from '../../abi/governed-upgradeability-proxy'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './events'

export const createGovernedUpgradeabilityProxyProcessor = ({
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
    description: `Notify InitializeGovernedUpgradeabilityProxy events from ${address.join(', ')}.`,
    chainId,
    address,
    topic,
    events: governedUpgradeabilityProxyAbi.events,
  })
}
