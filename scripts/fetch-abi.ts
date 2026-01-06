import 'tsconfig-paths/register'
import '../src/env'
import * as fs from 'fs'
import * as path from 'path'

// Etherscan V2 unified API endpoint
const ETHERSCAN_V2_URL = 'https://api.etherscan.io/v2/api'

// Chain configurations
const CHAIN_CONFIG: Record<string, { chainId: number; useEtherscanV2: boolean; legacyUrl?: string }> = {
  ethereum: { chainId: 1, useEtherscanV2: true },
  base: { chainId: 8453, useEtherscanV2: true },
  arbitrum: { chainId: 42161, useEtherscanV2: true },
  optimism: { chainId: 10, useEtherscanV2: true },
  polygon: { chainId: 137, useEtherscanV2: true },
  sonic: { chainId: 146, useEtherscanV2: false, legacyUrl: 'https://api.sonicscan.org/api' },
}

const CHAIN_ALIASES: Record<string, string> = {
  eth: 'ethereum',
  mainnet: 'ethereum',
  arb: 'arbitrum',
  op: 'optimism',
  poly: 'polygon',
}

interface AbiResponse {
  status: string
  message: string
  result: string
}

async function fetchAbi(address: string, chain: string): Promise<any[]> {
  const normalizedChain = CHAIN_ALIASES[chain.toLowerCase()] || chain.toLowerCase()
  const chainConfig = CHAIN_CONFIG[normalizedChain]

  if (!chainConfig) {
    throw new Error(`Unsupported chain: ${chain}. Supported: ${Object.keys(CHAIN_CONFIG).join(', ')}`)
  }

  const apiKey = process.env.ETHERSCAN_API_KEY

  let url: string
  if (chainConfig.useEtherscanV2) {
    if (!apiKey) {
      throw new Error('ETHERSCAN_API_KEY is required. Get one free at https://etherscan.io/apis')
    }
    const params = new URLSearchParams({
      chainid: chainConfig.chainId.toString(),
      module: 'contract',
      action: 'getabi',
      address: address,
      apikey: apiKey,
    })
    url = `${ETHERSCAN_V2_URL}?${params.toString()}`
    console.log(`Fetching ABI from Etherscan V2 (${normalizedChain}, chainId: ${chainConfig.chainId})...`)
  } else {
    const legacyApiKey = process.env.SONICSCAN_API_KEY
    const params = new URLSearchParams({
      module: 'contract',
      action: 'getabi',
      address: address,
      ...(legacyApiKey ? { apikey: legacyApiKey } : {}),
    })
    url = `${chainConfig.legacyUrl}?${params.toString()}`
    console.log(`Fetching ABI from ${normalizedChain} explorer...`)
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }

  const data: AbiResponse = await response.json()

  if (data.status !== '1') {
    if (data.result.includes('not verified')) {
      throw new Error(`Contract ${address} is not verified on ${normalizedChain}`)
    }
    throw new Error(`API error: ${data.message} - ${data.result}`)
  }

  return JSON.parse(data.result)
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log(`
Usage: npm run fetch-abi <address> <name> [chain]

Arguments:
  address  - Contract address (0x...)
  name     - Name for the ABI file (e.g., "oeth-zapper" or "OethZapper")
  chain    - Chain to fetch from (default: ethereum)
             Supported: ethereum, base, arbitrum, optimism, polygon, sonic

Examples:
  npm run fetch-abi 0x703118c4cbcccbf2ab31913e0f8075fbbb15f563 oeth-eth-price-feed
  npm run fetch-abi 0x85b78aca6deae198fbf201c82daf6ca21942acc6 lido-arm
  npm run fetch-abi 0xdbfefd2e8460a6ee4955a68582f85708baea60a3 super-oeth base

Environment variables:
  ETHERSCAN_API_KEY  - Required for Etherscan V2 (covers most chains)
                       Get one free at https://etherscan.io/apis
`)
    process.exit(1)
  }

  const [address, name, chain = 'ethereum'] = args

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    console.error(`Invalid address format: ${address}`)
    process.exit(1)
  }

  const fileName = toKebabCase(name)
  const abiDir = path.join(__dirname, '..', 'abi')
  const outputPath = path.join(abiDir, `${fileName}.json`)

  try {
    console.log(`Fetching ABI for ${address} on ${chain}...\n`)
    const abi = await fetchAbi(address, chain)

    const events = abi.filter((x) => x.type === 'event')
    const functions = abi.filter((x) => x.type === 'function')
    console.log(`Found ${abi.length} ABI entries (${events.length} events, ${functions.length} functions)`)

    fs.writeFileSync(outputPath, JSON.stringify(abi, null, 2))
    console.log(`\nSaved to: ${outputPath}`)
    console.log(`\nNext: Run 'npm run generate-abis' to generate TypeScript types`)
  } catch (error) {
    console.error(`\nError: ${error instanceof Error ? error.message : error}`)
    process.exit(1)
  }
}

main().catch(console.error)
