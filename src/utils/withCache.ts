// Generic cache interface
interface CacheEntry<T> {
  data: T
  timestamp: number
}

/**
 * Higher-order function that wraps any function with caching
 * Uses function scope to contain cache, no manual keys required
 * @param fn The function to wrap with caching
 * @param durationMs Cache duration in milliseconds (default: 5 minutes)
 * @returns A cached version of the original function
 */
export function withCache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  durationMs: number = 5 * 60 * 1000, // Default 5 minutes
): (...args: TArgs) => Promise<TReturn> {
  // Each wrapped function gets its own cache map
  const cache = new Map<string, CacheEntry<TReturn>>()

  return async (...args: TArgs): Promise<TReturn> => {
    const now = Date.now()
    // Create cache key from arguments
    const cacheKey = JSON.stringify(args)
    const cachedEntry = cache.get(cacheKey)

    // Check if we have valid cached data
    if (cachedEntry && now - cachedEntry.timestamp < durationMs) {
      return cachedEntry.data
    }

    // Fetch fresh data
    const data = await fn(...args)

    // Update cache
    cache.set(cacheKey, {
      data,
      timestamp: now,
    })

    return data
  }
}
