import * as timelockAbi from '../../abi/timelock'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createTimelockProcessor = ({
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
    description: `Notify timelock events from ${address}.`,
    chainId,
    address,
    topic,
    events: timelockAbi.events,
  })
}
