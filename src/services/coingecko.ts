export interface PriceResponse {
  [key: string]: {
    usd: number
  }
}

interface CacheEntry {
  data: PriceResponse
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_DURATION = 5 * 60 * 1000

export async function getPrice(): Promise<PriceResponse> {
  const cacheKey = 'bitcoin-price'
  const now = Date.now()

  // Check cache
  const cached = cache.get(cacheKey)
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  // Fetch data
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-cg-demo-api-key': import.meta.env.CG_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch price data')
  }

  const data = (await response.json()) as PriceResponse

  // Store in cache
  cache.set(cacheKey, {
    data,
    timestamp: now,
  })

  return data
}
