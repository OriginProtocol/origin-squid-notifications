import { formatEther, formatUnits } from 'viem'

// Format map [value, maxDigits]
const mappings = [
  [10000000, 0],
  [100000, 1],
  [100, 2],
  [1, 4],
  [0.1, 4],
  [0.0001, 5],
  [0.000001, 6],
  [0.00000001, 8],
  [0.0000000001, 10],
] as const

export function formatAmount(amount: string | bigint | number, decimals = 18, options?: Intl.NumberFormatOptions) {
  if (!amount || amount === 0n) return '0'

  const amt =
    typeof amount === 'string'
      ? +formatUnits(BigInt(amount), decimals)
      : typeof amount === 'bigint'
      ? +formatUnits(amount, decimals)
      : amount

  for (const [threshold, maxDigits] of mappings) {
    if (amt >= threshold) {
      return amt.toLocaleString('en', {
        maximumFractionDigits: maxDigits,
        ...options,
      })
    }
  }

  for (const [threshold, maxDigits] of mappings) {
    if (amt <= -threshold) {
      return amt.toLocaleString('en', {
        maximumFractionDigits: maxDigits,
        ...options,
      })
    }
  }

  return `~0`
}

export function formatChange(amount: string | bigint | number, decimals = 18, options?: Intl.NumberFormatOptions) {
  if (Number(amount) > 0) return `+${formatAmount(amount, decimals, options)}`
  return formatAmount(amount, decimals, options)
}
