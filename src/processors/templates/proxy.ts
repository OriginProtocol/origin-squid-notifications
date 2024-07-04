import * as governedUpgradeabilityProxyAbi from '../../abi/governed-upgradeability-proxy'
import { NotifyTarget, Severity, notifyTargets } from '../../notify/const'
import { EventProcessorParams, createEventProcessor } from './event'

export const createGovernedUpgradeabilityProxyProcessor = (
  params: {
    address: string[]
    severity?: Severity
    notifyTarget?: NotifyTarget
  } & Omit<EventProcessorParams, 'tracks'>,
) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: governedUpgradeabilityProxyAbi.events,
        severity: params.severity,
        notifyTarget: params.notifyTarget,
      },
    ],
  })
}
