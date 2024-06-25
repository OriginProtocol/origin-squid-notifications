import * as otokenAbi from '../../abi/otoken'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './events'

export const createOTokenProcessor = ({
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
    description: `Notify OToken events for ${address}.`,
    chainId,
    address,
    topic,
    events: otokenAbi.events,
    includedEvents: ['AccountRebasingDisabled', 'AccountRebasingEnabled', 'TotalSupplyUpdatedHighres'],
  })
}
