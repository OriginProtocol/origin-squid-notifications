import * as erc20Abi from '../../abi/erc20'
import { Topic } from '../../notify/discord'
import { createEventProcessor } from './event'

export const createBurnProcessor = ({
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
    description: `Notify burn events for ${address.join(', ')}`,
    chainId,
    address,
    topic,
    events: erc20Abi.events,
    includedEvents: ['Transfer'],
    topic2: [
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000001',
      '0x000000000000000000000000000000000000dEaD',
    ],
  })
}
