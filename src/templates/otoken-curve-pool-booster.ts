import { pick } from 'lodash'

import { Topic } from '@notify/const'
import { Context, Log } from '@originprotocol/squid-utils'
import { addresses } from '@utils/addresses'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import * as otokenCurvePoolBoosterAbi from '../abi/otoken-curve-pool-booster'
import { CustomFilter, EventProcessorParams, createEventProcessor } from './event'

const tokenToTopic: Record<string, Topic> = {
  [addresses.tokens.OUSD.toLowerCase()]: 'OUSD',
  [addresses.tokens.OETH.toLowerCase()]: 'OETH',
  [baseAddresses.tokens.superOETHb.toLowerCase()]: 'superOETHb',
  [sonicAddresses.tokens.OS.toLowerCase()]: 'OS',
}

const poolBoosterCache = new Map<string, { include: boolean; topic?: Topic }>()

const poolBoosterFilter: CustomFilter = async (ctx: Context, log: Log) => {
  if (poolBoosterCache.has(log.address)) {
    return poolBoosterCache.get(log.address)!
  }
  try {
    const contract = new otokenCurvePoolBoosterAbi.Contract(ctx, log.block, log.address)
    const rewardToken = (await contract.rewardToken()).toLowerCase()
    const topic = tokenToTopic[rewardToken]
    const result = { include: !!topic, topic }
    poolBoosterCache.set(log.address, result)
    return result
  } catch (err) {
    const result = { include: false } as const
    poolBoosterCache.set(log.address, result)
    return result
  }
}

export const createOTokenCurvePoolBoosterProcessor = (params: Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        events: pick(otokenCurvePoolBoosterAbi.events, 'CampaignCreated', 'CampaignClosed', 'FeeCollected'),
        customFilter: poolBoosterFilter,
      },
    ],
  })
}
