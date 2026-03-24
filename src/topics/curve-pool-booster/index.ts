import { pick } from 'lodash'
import { base, mainnet, sonic } from 'viem/chains'

import { Topic } from '@notify/const'
import { Context, Log } from '@originprotocol/squid-utils'
import { addresses } from '@utils/addresses'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import * as otokenCurvePoolBoosterAbi from '../../abi/otoken-curve-pool-booster'
import { CustomFilter, createEventProcessor } from '../../templates/event'

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

const tracks = [
  {
    events: pick(otokenCurvePoolBoosterAbi.events, 'CampaignCreated', 'CampaignClosed', 'FeeCollected'),
    customFilter: poolBoosterFilter,
  },
]

// Mainnet processor
createEventProcessor({
  name: 'Curve Pool Booster',
  chainId: mainnet.id,
  topic: 'OETH',
  tracks,
})

// Base processor
createEventProcessor({
  name: 'Curve Pool Booster (Base)',
  chainId: base.id,
  topic: 'superOETHb',
  tracks,
})

// Sonic processor
createEventProcessor({
  name: 'Curve Pool Booster (Sonic)',
  chainId: sonic.id,
  topic: 'OS',
  tracks,
})
