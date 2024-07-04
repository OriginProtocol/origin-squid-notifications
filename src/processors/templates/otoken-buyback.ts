import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as otokenBuybackAbi from '../../abi/otoken-buyback'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenBuybackProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: otokenBuybackAbi.events,
        excludedEvents: Object.keys(governedUpgradeabilityProxy.events),
      },
    ],
  })
}
