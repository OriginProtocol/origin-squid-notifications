import prettyjson from 'prettyjson'

import { jsonify } from './jsonify'

export function formatJson(json: unknown) {
  return prettyjson.renderString(
    jsonify(json, (k, v) => (typeof v === 'string' && v.length > 100 ? `(${Math.floor(v.length / 2 - 1)} bytes)` : v)),
    { noColor: true },
  )
}
