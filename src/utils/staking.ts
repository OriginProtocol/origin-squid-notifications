import { withCache } from './withCache'

type StakingData = {
  ognRewardsPerYear: number
  ognStakePercentage: number
  maxOgnApy: number
}

export const getStakingData = withCache(
  async () => {
    const res = await fetch('https://api.originprotocol.com/api/v2/ogn/staking')
    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.statusText}`)
    }
    return res.json() as Promise<StakingData>
  },
  3000, // 3 seconds
)
