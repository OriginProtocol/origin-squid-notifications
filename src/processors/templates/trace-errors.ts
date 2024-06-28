import { fun, viewFun } from '@subsquid/evm-abi'

import { DiscordOptions, Topic } from '../../notify/discord'
import { createTraceProcessor } from './trace'

export const createTraceErrorProcessor = ({
  name,
  chainId,
  address,
  abi,
  topic,
  discordOptions,
}: {
  name: string
  chainId: number
  address: string[]
  abi: { functions: Record<string, ReturnType<typeof viewFun | typeof fun>> }[]
  topic: Topic
  discordOptions?: Partial<DiscordOptions>
}) => {
  return createTraceProcessor({
    name,
    description: `Detect errors occurring in ${address.join(', ')}`,
    chainId,
    traceParams: [
      { type: ['call'], callFrom: address, error: true },
      { type: ['call'], callTo: address, error: true },
    ],
    abi,
    topic,
    discordOptions,
  })
}
