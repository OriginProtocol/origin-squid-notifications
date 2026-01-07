import 'tsconfig-paths/register'
import '../src/env'
import * as fs from 'fs'
import * as path from 'path'

import { originABIs, oethBaseABIs, poolBoosterBaseABIs, sonicABIs } from '../src/utils/addresses/address-abis'
import { arms, armOperators, OETH_WETH_ARM } from '../src/utils/addresses/addresses'

const GITHUB_API_BASE = 'https://api.github.com/repos/OriginProtocol/origin-docs/contents'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/OriginProtocol/origin-docs/refs/heads/en'
const REGISTRY_PATH = 'registry/contracts'
const BRANCH = 'en'

interface Contract {
  name: string
  address: string
  chain: string
  registry: string
}

// Get all addresses that have event tracking (ABIs defined)
function getEventTrackedAddresses(): Set<string> {
  const tracked = new Set<string>()

  // Mainnet contracts with ABIs
  Object.keys(originABIs).forEach((addr) => tracked.add(addr.toLowerCase()))

  // Base contracts with ABIs
  Object.keys(oethBaseABIs).forEach((addr) => tracked.add(addr.toLowerCase()))
  Object.keys(poolBoosterBaseABIs).forEach((addr) => tracked.add(addr.toLowerCase()))

  // Sonic contracts with ABIs
  Object.keys(sonicABIs).forEach((addr) => tracked.add(addr.toLowerCase()))

  // ARM contracts (tracked via templates, not ABI mappings)
  Object.values(arms).forEach((arm) => {
    tracked.add(arm.address.toLowerCase())
    tracked.add(arm.capManager.toLowerCase())
    if (arm.zapper) tracked.add(arm.zapper.toLowerCase())
    if (arm.morphoStrategy) tracked.add(arm.morphoStrategy.toLowerCase())
    if (arm.pendleSy) tracked.add(arm.pendleSy.toLowerCase())
  })
  Object.values(armOperators).forEach((addr) => tracked.add(addr.toLowerCase()))
  tracked.add(OETH_WETH_ARM.toLowerCase()) // Legacy ARM

  return tracked
}

// Fetch directory listing from GitHub API
async function fetchDirectoryListing(dirPath: string): Promise<{ name: string; type: string; path: string }[]> {
  const url = `${GITHUB_API_BASE}/${dirPath}?ref=${BRANCH}`
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch directory listing: ${response.statusText}`)
  }
  return response.json()
}

// Fetch raw markdown content
async function fetchRawMarkdown(filePath: string): Promise<{ content: string; url: string }> {
  const url = `${GITHUB_RAW_BASE}/${filePath}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`)
  }
  return { content: await response.text(), url }
}

// Parse HTML tables in markdown to extract contracts
function parseMarkdownForContracts(markdown: string, registry: string): Contract[] {
  const contracts: Contract[] = []

  // Track current chain from headers (#### Ethereum, #### Base, etc.)
  let currentChain = 'Ethereum'

  // Split by lines and process
  const lines = markdown.split('\n')

  for (const line of lines) {
    // Check for chain headers (#### Ethereum, #### Base, #### Sonic, etc.)
    const chainMatch = line.match(/^#{1,4}\s+(Ethereum|Base|Arbitrum|Sonic|Mainnet|Deprecated)/i)
    if (chainMatch) {
      currentChain = chainMatch[1]
      if (currentChain.toLowerCase() === 'mainnet') {
        currentChain = 'Ethereum'
      }
      continue
    }
  }

  // Parse HTML table rows: <tr><td>Name</td><td><a href="...">0xAddress</a></td></tr>
  // Also handles: <tr><td>Name</td><td>0xAddress</td></tr>
  const tableRowRegex = /<tr>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>(?:<a[^>]*>)?(0x[a-fA-F0-9]{40})(?:<\/a>)?<\/td>\s*<\/tr>/gi

  // Match markdown table rows: | Name | 0xAddress |
  // Handles both with and without links: | Name | [0x...](url) | or | Name | 0x... |
  const mdTableRowRegex = /\|\s*([^|]+?)\s*\|\s*\[?(0x[a-fA-F0-9]{40})\]?(?:\([^)]+\))?\s*\|/gi

  let match: RegExpExecArray | null
  const chainPositions: { chain: string; pos: number }[] = []

  // Find all chain headers and their positions (including Deprecated to track section boundaries)
  const chainHeaderRegex = /#{1,4}\s+(Ethereum|Base|Arbitrum|Sonic|Mainnet|Deprecated)/gi
  let chainMatch: RegExpExecArray | null
  while ((chainMatch = chainHeaderRegex.exec(markdown)) !== null) {
    let chain = chainMatch[1]
    if (chain.toLowerCase() === 'mainnet') chain = 'Ethereum'
    chainPositions.push({ chain, pos: chainMatch.index })
  }

  // Helper to determine chain from position
  const getChainForPosition = (pos: number): string => {
    let chain = 'Ethereum'
    for (const cp of chainPositions) {
      if (cp.pos < pos) {
        chain = cp.chain
      } else {
        break
      }
    }
    return chain
  }

  // Find all HTML table rows (name first, then address)
  while ((match = tableRowRegex.exec(markdown)) !== null) {
    const name = match[1].trim()
    const address = match[2].toLowerCase()
    const pos = match.index
    const chain = getChainForPosition(pos)

    // Skip deprecated section entries
    if (chain.toLowerCase() === 'deprecated') {
      continue
    }

    contracts.push({ name, address, chain, registry })
  }

  // Find markdown table rows
  while ((match = mdTableRowRegex.exec(markdown)) !== null) {
    const name = match[1].trim()
    const address = match[2].toLowerCase()
    const pos = match.index
    const chain = getChainForPosition(pos)

    // Skip header rows and deprecated
    if (name.toLowerCase().includes('contract') || name.toLowerCase().includes('---') || chain.toLowerCase() === 'deprecated') {
      continue
    }

    contracts.push({ name, address, chain, registry })
  }

  return contracts
}

// Read digest.log and extract proxy/governance tracked addresses
function getProxyTrackedAddresses(): Set<string> {
  const digestPath = path.join(__dirname, '..', 'digest.log')
  const tracked = new Set<string>()

  try {
    const content = fs.readFileSync(digestPath, 'utf-8')
    const addressRegex = /0x[a-fA-F0-9]{40}/g
    const addresses = content.match(addressRegex) || []
    addresses.forEach((addr) => tracked.add(addr.toLowerCase()))
  } catch (error) {
    console.error('Error reading digest.log:', error)
  }

  return tracked
}

// Main function
async function main() {
  console.log('# Origin Protocol Contract Registry Scraper')
  console.log(`Generated: ${new Date().toISOString()}`)
  console.log('')

  const allContracts: Contract[] = []

  try {
    // Get list of files in registry/contracts
    console.log('Fetching directory listing from GitHub...')
    const files = await fetchDirectoryListing(REGISTRY_PATH)

    // Also check for subdirectories (like arm-registry)
    const mdFiles: { name: string; path: string }[] = []
    const subdirs: { name: string; path: string }[] = []

    for (const file of files) {
      if (file.type === 'file' && file.name.endsWith('.md') && file.name !== 'README.md') {
        mdFiles.push({ name: file.name, path: file.path })
      } else if (file.type === 'dir') {
        subdirs.push({ name: file.name, path: file.path })
      }
    }

    // Check subdirectories for more .md files
    for (const subdir of subdirs) {
      console.log(`  Checking subdirectory: ${subdir.name}`)
      try {
        const subFiles = await fetchDirectoryListing(subdir.path)
        for (const file of subFiles) {
          if (file.type === 'file' && file.name.endsWith('.md') && file.name !== 'README.md') {
            mdFiles.push({ name: file.name, path: file.path })
          }
        }
      } catch (err) {
        console.error(`    Error fetching ${subdir.path}:`, err)
      }
    }

    console.log(`Found ${mdFiles.length} registry files to process\n`)

    // Process each markdown file
    for (const file of mdFiles) {
      const registryName = file.name
        .replace('.md', '')
        .replace('-registry', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      try {
        const { content: markdown, url } = await fetchRawMarkdown(file.path)
        const contracts = parseMarkdownForContracts(markdown, registryName)
        console.log(`Processing: ${file.name} (${registryName}) - Found ${contracts.length} contracts`)
        if (contracts.length === 0) {
          console.log(`  URL: ${url}`)
        }
        allContracts.push(...contracts)
      } catch (err) {
        console.error(`  Error processing ${file.name}:`, err)
      }
    }
  } catch (err) {
    console.error('Error fetching from GitHub:', err)
    process.exit(1)
  }

  // Get tracked addresses
  console.log('\nReading tracking data...')
  const proxyTrackedAddresses = getProxyTrackedAddresses()
  const eventTrackedAddresses = getEventTrackedAddresses()
  console.log(`  Proxy/Governance tracked: ${proxyTrackedAddresses.size} addresses`)
  console.log(`  Event tracked (with ABIs): ${eventTrackedAddresses.size} addresses`)

  // Generate markdown output
  let markdown = '# Origin Protocol Contract Registry\n\n'
  markdown += `Generated: ${new Date().toISOString()}\n\n`
  markdown += 'This file compares contracts from the [Origin Protocol registry](https://docs.originprotocol.com/registry/contracts) against our tracking.\n\n'
  markdown += '**Legend:**\n'
  markdown += '- **Proxy**: Contract is monitored for proxy/governance events (admin changes, upgrades)\n'
  markdown += '- **Events**: Contract has specific event handlers with ABIs defined\n\n'
  markdown += 'Data source: https://github.com/OriginProtocol/origin-docs/tree/en/registry/contracts\n\n'

  // Group by registry
  const byRegistry = new Map<string, Contract[]>()
  for (const contract of allContracts) {
    const existing = byRegistry.get(contract.registry) || []
    existing.push(contract)
    byRegistry.set(contract.registry, existing)
  }

  // Output each registry
  for (const [registry, contracts] of byRegistry) {
    markdown += `## ${registry}\n\n`
    markdown += '| Contract | Chain | Address | Proxy | Events |\n'
    markdown += '|----------|-------|---------|:-----:|:------:|\n'

    // Dedupe by address
    const seen = new Set<string>()
    for (const contract of contracts) {
      if (seen.has(contract.address)) continue
      seen.add(contract.address)

      const hasProxy = proxyTrackedAddresses.has(contract.address)
      const hasEvents = eventTrackedAddresses.has(contract.address)
      const proxyIcon = hasProxy ? '✅' : '❌'
      const eventsIcon = hasEvents ? '✅' : '❌'
      markdown += `| ${contract.name} | ${contract.chain} | \`${contract.address}\` | ${proxyIcon} | ${eventsIcon} |\n`
    }

    markdown += '\n'
  }

  // Summary section
  const uniqueContracts = new Set(allContracts.map((c) => c.address))
  const proxyCount = [...uniqueContracts].filter((addr) => proxyTrackedAddresses.has(addr)).length
  const eventsCount = [...uniqueContracts].filter((addr) => eventTrackedAddresses.has(addr)).length
  const fullyTrackedCount = [...uniqueContracts].filter(
    (addr) => proxyTrackedAddresses.has(addr) && eventTrackedAddresses.has(addr),
  ).length
  const untrackedCount = [...uniqueContracts].filter(
    (addr) => !proxyTrackedAddresses.has(addr) && !eventTrackedAddresses.has(addr),
  ).length

  markdown += '## Summary\n\n'
  markdown += `- **Total contracts in registry:** ${uniqueContracts.size}\n`
  markdown += `- **Proxy tracked only:** ${proxyCount - fullyTrackedCount}\n`
  markdown += `- **Event tracked only:** ${eventsCount - fullyTrackedCount}\n`
  markdown += `- **Fully tracked (both):** ${fullyTrackedCount}\n`
  markdown += `- **Not tracked at all:** ${untrackedCount}\n\n`

  // List contracts needing event tracking (have proxy but no events)
  markdown += '## Contracts Needing Event Tracking\n\n'
  markdown += 'These contracts have proxy monitoring but no specific event handlers:\n\n'
  markdown += '| Registry | Contract | Chain | Address |\n'
  markdown += '|----------|----------|-------|--------|\n'

  const needsEventsSeen = new Set<string>()
  for (const contract of allContracts) {
    if (needsEventsSeen.has(contract.address)) continue
    if (!proxyTrackedAddresses.has(contract.address)) continue
    if (eventTrackedAddresses.has(contract.address)) continue
    needsEventsSeen.add(contract.address)

    markdown += `| ${contract.registry} | ${contract.name} | ${contract.chain} | \`${contract.address}\` |\n`
  }

  if (needsEventsSeen.size === 0) {
    markdown += '| *None* | | | |\n'
  }

  // List completely untracked contracts
  markdown += '\n## Completely Untracked Contracts\n\n'
  markdown += 'These contracts have no tracking at all:\n\n'
  markdown += '| Registry | Contract | Chain | Address |\n'
  markdown += '|----------|----------|-------|--------|\n'

  const untrackedSeen = new Set<string>()
  for (const contract of allContracts) {
    if (untrackedSeen.has(contract.address)) continue
    if (proxyTrackedAddresses.has(contract.address)) continue
    if (eventTrackedAddresses.has(contract.address)) continue
    untrackedSeen.add(contract.address)

    markdown += `| ${contract.registry} | ${contract.name} | ${contract.chain} | \`${contract.address}\` |\n`
  }

  if (untrackedSeen.size === 0) {
    markdown += '| *None* | | | |\n'
  }

  // Write to file
  const outputPath = path.join(__dirname, '..', 'registry-comparison.md')
  fs.writeFileSync(outputPath, markdown)
  console.log(`\nOutput written to: ${outputPath}`)

  // Console summary
  console.log('\n=== CONTRACTS NEEDING EVENT TRACKING ===\n')
  needsEventsSeen.clear()
  for (const contract of allContracts) {
    if (needsEventsSeen.has(contract.address)) continue
    if (!proxyTrackedAddresses.has(contract.address)) continue
    if (eventTrackedAddresses.has(contract.address)) continue
    needsEventsSeen.add(contract.address)
    console.log(`[${contract.registry}] ${contract.name} (${contract.chain}): ${contract.address}`)
  }
  if (needsEventsSeen.size === 0) {
    console.log('All proxy-tracked contracts have event handlers!')
  }

  console.log('\n=== COMPLETELY UNTRACKED CONTRACTS ===\n')
  untrackedSeen.clear()
  for (const contract of allContracts) {
    if (untrackedSeen.has(contract.address)) continue
    if (proxyTrackedAddresses.has(contract.address)) continue
    if (eventTrackedAddresses.has(contract.address)) continue
    untrackedSeen.add(contract.address)
    console.log(`[${contract.registry}] ${contract.name} (${contract.chain}): ${contract.address}`)
  }
  if (untrackedSeen.size === 0) {
    console.log('All contracts have some form of tracking!')
  }
}

main().catch(console.error)
