import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import { Topic } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenVaultProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: otokenVaultAbi.events,
        excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
      },
    ],
  })
}
