import prettyjson from 'prettyjson'

import { jsonify } from '@originprotocol/squid-utils'

import { getAddressesPyName } from './addresses/names'
import { formatAmount } from './formatAmount'

export function formatJson(json: unknown) {
  return prettyjson.renderString(
    jsonify(json, (k, v) => {
      if (typeof v === 'string' && v.length > 100) {
        return `(${Math.floor(v.length / 2 - 1)} bytes)`
      }

      // Add address name if possible
      if (typeof v === 'string' && v.startsWith('0x')) {
        const addressName = getAddressesPyName(v)
        if (addressName) {
          return `${v} (${addressName})`
        }
      }

      if (
        typeof v === 'bigint' &&
        (k.includes('value') ||
          k.includes('amount') ||
          k.includes('Amount') ||
          k.includes('points') ||
          k.includes('alance') ||
          k.includes('upply') ||
          k.includes('redits') ||
          k.includes('yield') ||
          k.includes('fee') ||
          k.includes('weth'))
      ) {
        if (v === 0n) return '0'
        return `${v.toString()} | ${formatAmount(v)}`
      }

      if (typeof v === 'bigint' && v <= 31536000n && (k === 'newStakeDuration' || k === 'newDuration')) {
        return `${v.toString()} | ${v / 60n / 60n / 24n} days`
      }

      // Convert to date if criteria met
      const n = Number(v)
      if (n > 1514764800 && n < 7258118400000) {
        return new Date(n * 1000).toJSON()
      }

      return v
    }),
    { noColor: true },
  )
}
