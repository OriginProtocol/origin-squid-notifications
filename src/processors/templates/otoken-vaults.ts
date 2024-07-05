import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenVaultProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  const highSeverityEvents: (keyof typeof otokenVaultAbi.events)[] = [
    'CapitalPaused',
    'CapitalUnpaused',
    'RebasePaused',
    'RebaseUnpaused',
    'AssetSupported',
    'PriceProviderUpdated',
    'TrusteeAddressChanged',
  ]
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: otokenVaultAbi.events,
        includedEvents: highSeverityEvents,
        severity: 'high',
      },
      {
        address: params.address,
        events: otokenVaultAbi.events,
        excludedEvents: [...Object.keys(governedUpgradeabilityProxy.events), ...highSeverityEvents],
      },
    ],
  })
}
