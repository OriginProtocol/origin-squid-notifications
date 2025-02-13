interface CacheEntry<T> {
  value: T
  timestamp: number
}

class CloudflareKVService {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private readonly cacheTTL = 10 * 60 * 1000 // 10 minutes in milliseconds
  private readonly accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  private readonly namespaceId = process.env.CLOUDFLARE_NAMESPACE_ID
  private readonly apiKey = process.env.CLOUDFLARE_KV_KEY
  private readonly baseUrl = 'https://api.cloudflare.com/client/v4'

  private isCacheValid<T>(entry: CacheEntry<T> | undefined): entry is CacheEntry<T> {
    if (!entry) return false
    return Date.now() - entry.timestamp < this.cacheTTL
  }

  async get<T>(key: string): Promise<T | null> {
    // Check cache first
    const cached = this.cache.get(key)
    if (this.isCacheValid(cached)) {
      return cached.value
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      )

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`Failed to fetch KV value: ${response.statusText}`)
      }

      const value = (await response.json()) as T

      // Update cache
      this.cache.set(key, {
        value,
        timestamp: Date.now(),
      })

      return value
    } catch (error) {
      console.error(`Error fetching KV value for key ${key}:`, error)
      return null
    }
  }

  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to set KV value: ${response.statusText}`)
      }

      // Update cache
      this.cache.set(key, {
        value,
        timestamp: Date.now(),
      })

      return true
    } catch (error) {
      console.error(`Error setting KV value for key ${key}:`, error)
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to delete KV value: ${response.statusText}`)
      }

      // Remove from cache
      this.cache.delete(key)

      return true
    } catch (error) {
      console.error(`Error deleting KV value for key ${key}:`, error)
      return false
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  async getOrSet<T>(key: string, value: T): Promise<T> {
    const kvValue = await this.get<T>(key)
    if (kvValue) {
      return kvValue
    }
    this.set(key, value)
    return value
  }
}

// Export a singleton instance
export const cloudflareKV = new CloudflareKVService()
