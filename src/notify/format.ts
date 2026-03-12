import { Chain } from 'viem'
import { arbitrum, base, sonic } from 'viem/chains'

import { getAddressesPyName } from '../utils/addresses/names'

/**
 * Get block explorer base URL for a chain.
 */
export function explorerUrl(chain: Chain): string {
  if (chain.id === base.id) return 'https://basescan.org'
  if (chain.id === sonic.id) return 'https://sonicscan.org'
  if (chain.id === arbitrum.id) return 'https://arbiscan.io'
  return 'https://etherscan.io'
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format an address as a linked Discord markdown string.
 * Shows name if known, always links to block explorer.
 */
export function formatAddress(address: string, chain: Chain): string {
  const explorer = explorerUrl(chain)
  const name = getAddressesPyName(address)
  const link = `${explorer}/address/${address}`
  if (name) return `[${name}](${link}) (\`${truncateAddress(address)}\`)`
  return `[\`${truncateAddress(address)}\`](${link})`
}

/**
 * Format a value for Discord display based on its type.
 */
export function formatValue(value: unknown, key?: string, chain?: Chain): string {
  if (value === null || value === undefined) return '_null_'

  // BigInt
  if (typeof value === 'bigint') return formatBigInt(value, key)

  // Boolean
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'

  // Address
  if (typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value)) {
    return chain ? formatAddress(value, chain) : formatAddressNoLink(value)
  }

  // Short hex string
  if (typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value) && value.length <= 66) {
    return `\`${value}\``
  }

  // Long hex data — truncate
  if (typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value)) {
    return `\`${value.slice(0, 18)}...\``
  }

  // Array
  if (Array.isArray(value)) {
    if (value.length === 0) return '_empty_'
    if (value.length <= 4) return value.map((v) => formatValue(v, key, chain)).join(', ')
    return value.slice(0, 3).map((v) => formatValue(v, key, chain)).join(', ') + ` (+${value.length - 3} more)`
  }

  // Number
  if (typeof value === 'number') return value.toLocaleString('en-US')

  return String(value)
}

function formatAddressNoLink(address: string): string {
  const name = getAddressesPyName(address)
  if (name) return `${name} (\`${truncateAddress(address)}\`)`
  return `\`${truncateAddress(address)}\``
}

/**
 * Format a BigInt for display. Detects 18-decimal token values
 * and shows human-readable form.
 */
function formatBigInt(value: bigint, key?: string): string {
  // Max uint256 (common in approvals)
  if (value === 115792089237316195423570985008687907853269984665640564039457584007913129639935n) {
    return 'Max'
  }

  const abs = value < 0n ? -value : value
  const sign = value < 0n ? '-' : ''

  // Traderate fields use 1e36 precision
  if (key && key.toLowerCase().startsWith('traderate') && abs >= 10n ** 35n) {
    const divisor = 10n ** 36n
    const whole = abs / divisor
    const frac = abs % divisor
    const fracStr = frac.toString().padStart(36, '0').slice(0, 6).replace(/0+$/, '')
    const wholeFormatted = whole.toLocaleString('en-US')
    return fracStr ? `${sign}${wholeFormatted}.${fracStr}` : `${sign}${wholeFormatted}`
  }

  // Looks like an 18-decimal token value (> 1e15)
  if (abs >= 1_000_000_000_000_000n) {
    const decimals = guessDecimals(key)
    const divisor = 10n ** BigInt(decimals)
    const whole = abs / divisor
    const frac = abs % divisor
    const fracStr = frac.toString().padStart(decimals, '0').slice(0, 4).replace(/0+$/, '')
    const wholeFormatted = whole.toLocaleString('en-US')
    return fracStr ? `${sign}${wholeFormatted}.${fracStr}` : `${sign}${wholeFormatted}`
  }

  // Small values — plain number, no thousand separators (avoids confusion in arrays like "66,401, 66,402")
  return `${sign}${abs.toString()}`
}

/**
 * Guess decimal precision from field name.
 */
function guessDecimals(key?: string): number {
  if (!key) return 18
  const k = key.toLowerCase()
  if (k.includes('usdc') || k.includes('usdt') || k.includes('usd_amount')) return 6
  return 18
}
