import { createPublicClient, http, parseAbi } from 'viem'
import { base, mainnet } from 'viem/chains'

import { withCache } from './withCache'

const registry = {
  ETH_USD: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
  OGN_USD: '0x91d7aed72bf772a0da30199b925acb866acd3d9e', // On Base
  CVX_USD: '0xd962fc30a72a84ce50161031391756bf2876af5d',
}

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env[process.env.RPC_ENV!]! || process.env.RPC_ENDPOINT!),
})
const baseClient = createPublicClient({
  chain: base,
  transport: http(process.env[process.env.RPC_BASE_ENV!]! || process.env.RPC_BASE_ENDPOINT!),
})

const chainlinkAbi = parseAbi(['function latestAnswer() external view returns (int256)'])

/**
 * Internal function to fetch token prices from Chainlink feeds
 */
async function fetchPrice(
  token: 'OGN' | 'OETH' | 'superOETHb' | 'OUSD' | 'WETH' | 'USDC',
): Promise<number> {
  if (token === 'OUSD' || token === 'USDC') return 1

  // ETH derivatives should use ETH price
  if (token === 'OETH' || token === 'superOETHb' || token === 'WETH') {
    const ethPrice = await client.readContract({
      address: registry.ETH_USD as `0x${string}`,
      abi: chainlinkAbi,
      functionName: 'latestAnswer',
    })
    // Chainlink ETH/USD feed returns 8 decimals
    return Number(ethPrice) / 1e8
  }

  if (token === 'OGN') {
    const ognPrice = await baseClient.readContract({
      address: registry.OGN_USD as `0x${string}`,
      abi: chainlinkAbi,
      functionName: 'latestAnswer',
    })
    // Chainlink OGN/USD feed returns 8 decimals
    return Number(ognPrice) / 1e8
  }
  if (token === 'CVX') {
    const cvxPrice = await client.readContract({
      address: registry.CVX_USD as `0x${string}`,
      abi: chainlinkAbi,
      functionName: 'latestAnswer',
    })
    // Chainlink OGN/USD feed returns 8 decimals
    return Number(cvxPrice) / 1e8
  }

  throw new Error(`Unknown token: ${token}`)
}

/**
 * Fetches the current USD price of tokens from Chainlink feeds
 * Uses caching to avoid frequent API calls (5-minute cache duration)
 * @returns Promise<number> The current USD price of the token
 */
export const getPrice = withCache(fetchPrice)
export const convertToUsd = async (amount: number, ...params: Parameters<typeof getPrice>) => {
  const price = await getPrice(...params)
  return amount * price
}
