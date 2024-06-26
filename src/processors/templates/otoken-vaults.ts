import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createOTokenVaultProcessor = ({
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
    description: `Notify OToken vault events for ${address}.`,
    chainId,
    address,
    topic,
    events: otokenVaultAbi.events,
    excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
  })
}
