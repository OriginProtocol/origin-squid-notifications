import { mainnet } from 'viem/chains'

import { CONTRACT_ADDR_TO_NAME } from '@utils/addresses/names'
import { EXTERNAL_ADDR_TO_NAME } from '@utils/addresses/external-names'

interface WalletLabel {
  address: string
  description: string
  product: string | null
  category: string | null
  chain_id: number | null
  deprecated: boolean
}

/**
 * Only return a product if we're confident about it.
 * Returns null for anything ambiguous.
 */
function inferProduct(name: string): string | null {
  const n = name.toLowerCase()
  if (n.includes('ousd')) return 'OUSD'
  if (n.includes('oeth') || n.includes('super oeth') || n.includes('superoethb')) return 'OETH'
  if (n === 'os' || n.startsWith('os ') || n.includes('wrapped os')) return 'OS'
  if (n.includes('ogn') || n.includes('xogn') || n.includes('story staking') || n.includes('rewards')) return 'OGN'
  if (n.includes('ogv') || n.includes('veogv')) return 'OGV'
  if (n.includes('primeeth') || n.includes('prime eth') || n.includes('ynlsde')) return 'primeETH'
  if (n.includes('arm') || n.includes('ethena') || n.includes('etherfi') || n.includes('lido')) return 'ARM'
  if (n.includes('pool booster')) return 'Pool Boosters'
  if (n.includes('aerodrome')) return 'Aerodrome'
  if (n.includes('compound') && !n.includes('staking')) return 'Compound'
  if (n.includes('curve') || n.includes('crv') || n.includes('3pool') || n.includes('metapool')) return 'Curve'
  if (n.includes('aave')) return 'Aave'
  if (n.includes('morpho')) return 'Morpho'
  if (n.includes('flux')) return 'Flux'
  if (n.includes('multisig') || n.includes('timelock') || n.includes('guardian') || n.includes('governance') || n.includes('governor') || n.includes('origin')) return 'Origin'
  return null
}

/**
 * Only return a category if we're confident about it.
 * Returns null for anything ambiguous.
 */
function inferCategory(name: string): string | null {
  const n = name.toLowerCase()
  if (n.includes('strategy') || n.includes('strat')) return 'Strategy'
  if (n.includes('vault')) return 'Vault'
  if (n.includes('dripper')) return 'Dripper'
  if (n.includes('harvester')) return 'Harvester'
  if (n.includes('zapper')) return 'Zapper'
  if (n.includes('oracle') || n.includes('price feed')) return 'Oracle'
  if (n.includes('governance') || n.includes('governor')) return 'Governance'
  if (n.includes('timelock')) return 'Governance'
  if (n.includes('multisig') || n.includes('guardian')) return 'Multisig'
  if (n.includes('buyback')) return 'Buyback'
  if (n.includes('pool booster') || n.includes('factory')) return 'Pool Booster'
  if (n.includes('swap') || n.includes('router') || n.includes('exchange') || n.includes('inch') || n.includes('sushi') || n.includes('uniswap') || n.includes('kyber') || n.includes('paraswap') || n.includes('cow')) return 'DEX'
  if (n.includes('keeper') || n.includes('registry') || n.includes('beacon') || n.includes('proofs') || n.includes('multicall') || n.includes('sfc')) return 'Infrastructure'
  if (n.includes('staking') || n.includes('xogn') || n.includes('veogv')) return 'Staking'
  if (n.includes('migrator')) return 'Migration'
  if (n.includes('mev bot')) return 'MEV'
  if (n.includes('pool') || n.includes('amm') || n.includes('metapool') || n.includes('amo')) return 'Pool'
  if (n.includes('cap manager')) return 'Cap Manager'
  if (n.includes('operator')) return 'Operator'
  if (n.includes('fee accumulator')) return 'Fee Accumulator'
  if (n.includes('reservoir')) return 'Reservoir'
  if (
    n.includes('token') ||
    ['weth', 'cvx', 'comp token', 'link', 'lusd', 'dai', 'usdt', 'usdc', 'crv token', 'aero', 'eth', 's',
      'frxeth', 'reth', 'steth', 'eeth', 'usde', 'susde', 'ogv', 'ogn', 'cbeth (base)',
      'weth (base)', 'usdc (base)', 'wrapped s', 'ousd', 'oeth', 'woeth', 'os',
      'superoethb', 'wsuperoethb', 'wrapped os', 'ynlsde', 'veogv', 'xogn',
      'ogn (base)', 'cdai', 'cusdt', 'cusdc', '3crv token'].includes(n)
  ) return 'Token'
  if (n.includes('.eth') || n.includes('gnosis safe') || n.includes('hot wallet')) return 'Wallet'
  if (n.includes('compensation') || n.includes('claims')) return 'Claims'
  return null
}

function inferDeprecated(name: string): boolean {
  const n = name.toLowerCase()
  return n.includes('deprecated') || n.includes('legacy') || n.includes('old')
}

function escapeSQL(s: string): string {
  return s.replace(/'/g, "''")
}

function sqlValue(v: string | number | boolean | null): string {
  if (v === null) return 'NULL'
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE'
  if (typeof v === 'number') return String(v)
  return `'${escapeSQL(v)}'`
}

const labels: WalletLabel[] = []

// Process CONTRACT_ADDR_TO_NAME (chain-specific)
for (const [chainIdStr, addressMap] of Object.entries(CONTRACT_ADDR_TO_NAME)) {
  const chainId = Number(chainIdStr)
  for (const [address, name] of Object.entries(addressMap)) {
    if (!name) continue
    labels.push({
      address: address.toLowerCase(),
      description: name,
      product: inferProduct(name),
      category: inferCategory(name),
      chain_id: chainId,
      deprecated: inferDeprecated(name),
    })
  }
}

// Process EXTERNAL_ADDR_TO_NAME (chain unknown — null)
for (const [address, name] of Object.entries(EXTERNAL_ADDR_TO_NAME)) {
  labels.push({
    address: address.toLowerCase(),
    description: name,
    product: null,
    category: null,
    chain_id: null,
    deprecated: false,
  })
}

// Generate SQL
console.log('-- Generated wallet_labels seed data')
console.log('-- From CONTRACT_ADDR_TO_NAME and EXTERNAL_ADDR_TO_NAME')
console.log('')
console.log('INSERT INTO public.wallet_labels (address, description, product, category, chain_id, deprecated) VALUES')

const rows = labels.map((l, i) => {
  const comma = i < labels.length - 1 ? ',' : ';'
  return `  (${sqlValue(l.address)}, ${sqlValue(l.description)}, ${sqlValue(l.product)}, ${sqlValue(l.category)}, ${sqlValue(l.chain_id)}, ${sqlValue(l.deprecated)})${comma}`
})

rows.forEach((r) => console.log(r))

console.log('')
console.log(`-- Total: ${labels.length} labels`)
