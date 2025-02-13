import { cloudflareKV } from './cloudflare-kv'

export const meetsLimit = async (type: string, event: string, token: string, amount: bigint) => {
  const configLimit = await cloudflareKV.getOrSet(`${type}-${event}-limit-${token}`, 0).then((limit) => BigInt(limit))
  return (amount < 0n ? -amount : amount) >= configLimit
}
