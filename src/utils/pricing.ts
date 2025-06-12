import { withCache } from './withCache'

interface CoinGeckoPriceResponse {
  'origin-protocol': {
    usd: number
  }
}

/**
 * Internal function to fetch OGN price from CoinGecko API
 */
async function fetchCoingeckoPrice(
  token: 'OGN' | 'OETH' | 'superOETHb' | 'superOETHp' | 'OUSD' | 'OS' | 'WETH' | 'USDC',
): Promise<number> {
  if (token === 'OUSD' || token === 'USDC') return 1
  try {
    const id = {
      OGN: 'origin-protocol',
      WETH: 'ethereum',
      OETH: 'ethereum',
      superOETHb: 'ethereum',
      superOETHp: 'ethereum',
      OS: 'sonic',
    }

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id[token]}&vs_currencies=usd`)

    if (!response.ok) {
      throw new Error(`CoinGecko API request failed: ${response.status} ${response.statusText}`)
    }

    const data: any = await response.json()

    if (!data[id[token]]?.usd) {
      throw new Error('Invalid response format from CoinGecko API')
    }

    return data[id[token]].usd
  } catch (error) {
    throw new Error(`Failed to fetch OGN price: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Fetches the current USD price of OGN token from CoinGecko API
 * Uses caching to avoid frequent API calls (5-minute cache duration)
 * @returns Promise<number> The current USD price of OGN
 */
export const getCoingeckoPrice = withCache(fetchCoingeckoPrice)
export const convertToUsd = async (amount: number, ...params: Parameters<typeof getCoingeckoPrice>) => {
  const price = await getCoingeckoPrice(...params)
  return amount * price
}
