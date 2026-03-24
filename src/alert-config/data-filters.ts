// Data filters applied to specific alert rules by slug ID.
// These are the initial seed values — once in the DB, they're managed there.

export const DATA_FILTERS: Record<string, object> = {
  // ARM Transfer swap rules (track 3 = Transfer events) — min 0.1 ETH
  'origin-lido-arm-3': { op: 'gte', field: 'value', value: '100000000000000000' },
  'origin-ethena-arm-3': { op: 'gte', field: 'value', value: '100000000000000000' },
  'origin-ether-fi-arm-3': { op: 'gte', field: 'value', value: '100000000000000000' },
  'origin-os-arm-3-sonic': { op: 'gte', field: 'value', value: '100000000000000000' },
  // Aerodrome CL pools — min 0.1 ETH on either amount
  'aerodrome-cl-pools-base': {
    op: 'OR',
    conditions: [
      { op: 'gte', field: 'amount0', value: '100000000000000000' },
      { op: 'gte', field: 'amount1', value: '100000000000000000' },
    ],
  },
  // Zapper mint — min 0.1 ETH
  'superoethb-zapper-base': { op: 'gte', field: 'amount', value: '100000000000000000' },
}
