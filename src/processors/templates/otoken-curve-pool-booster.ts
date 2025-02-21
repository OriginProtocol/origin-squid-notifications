import { pick } from 'lodash'

import { Topic } from '@notify/const'
import { EventRendererParams } from '@notify/event'
import { defaultEventRenderer } from '@notify/event/renderers/default'
import { Context, Log } from '@originprotocol/squid-utils'
import { addresses } from '@utils/addresses'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import * as otokenCurvePoolBoosterAbi from '../../abi/otoken-curve-pool-booster'
import { EventProcessorParams, createEventProcessor } from './event'

const tokenToTopic: Record<string, Topic> = {
  [addresses.tokens.OUSD.toLowerCase()]: 'OUSD',
  [addresses.tokens.OETH.toLowerCase()]: 'OETH',
  [baseAddresses.tokens.superOETHb.toLowerCase()]: 'superOETHb',
  [sonicAddresses.tokens.OS.toLowerCase()]: 'OS',
}

interface ValidationResult {
  isValid: boolean
  topic?: Topic
}

const poolBoosterCache = new Map<string, ValidationResult>()

const isPoolBooster = async (ctx: Context, log: Log): Promise<ValidationResult> => {
  if (poolBoosterCache.has(log.address)) {
    return poolBoosterCache.get(log.address)!
  }
  try {
    const contract = new otokenCurvePoolBoosterAbi.Contract(ctx, log.block, log.address)
    const rewardToken = (await contract.rewardToken()).toLowerCase()
    const topic = tokenToTopic[rewardToken]
    const result: ValidationResult = { isValid: !!topic, topic }
    poolBoosterCache.set(log.address, result)
    return result
  } catch (err) {
    const result: ValidationResult = { isValid: false }
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
        renderers: {
          CampaignCreated: async (p: EventRendererParams) => {
            const validation = await isPoolBooster(p.ctx, p.log)
            if (validation.isValid && validation.topic) {
              return defaultEventRenderer({ ...p, topic: validation.topic })
            }
          },
          CampaignClosed: async (p: EventRendererParams) => {
            const validation = await isPoolBooster(p.ctx, p.log)
            if (validation.isValid && validation.topic) {
              return defaultEventRenderer({ ...p, topic: validation.topic })
            }
          },
          FeeCollected: async (p: EventRendererParams) => {
            const validation = await isPoolBooster(p.ctx, p.log)
            if (validation.isValid && validation.topic) {
              return defaultEventRenderer({ ...p, topic: validation.topic })
            }
          },
        },
      },
    ],
  })
}
