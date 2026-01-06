# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Subsquid-based notification system for Origin Protocol. It monitors blockchain events across Ethereum mainnet, Base, and Sonic chains and sends notifications to Discord webhooks. The database is minimal—this squid focuses on real-time event processing, not data storage.

## Common Commands

```shell
pnpm install              # Install dependencies
pnpm run process          # Build & start mainnet processor (spins up local DB via docker-compose)
pnpm run process:base     # Build & start Base chain processor
pnpm run process:sonic    # Build & start Sonic chain processor
pnpm run resume           # Resume without rebuild/DB setup
pnpm run generate-abis    # Generate TypeScript from ABI JSON files in abi/
pnpm run prettier-fix     # Format code
sqd deploy . --update     # Deploy to Subsquid Cloud (use --update to prevent gaps)
```

### Environment Variables for Development

- `BLOCK_FROM=123456` - Start processing from specific block
- `PROCESSOR=Name` - Filter to processors matching "Name"

Example: `BLOCK_FROM=18102886 PROCESSOR=Trace pnpm run process`

## Architecture

### Entry Points (Chain-Specific)
- `src/main.ts` - Ethereum mainnet processor
- `src/main-base.ts` - Base chain processor
- `src/main-sonic.ts` - Sonic chain processor

### Topics System (`src/topics/`)
Topics group related notifications by product (OETH, OUSD, OGN, etc.). Each topic folder contains processor definitions organized by concern:
- `core-contracts.ts` - Main token/vault events
- `strategies.ts` - Strategy contract events
- `error-tracing.ts` - Transaction failure tracking
- `index.ts` - Exports all processors for the topic

The `src/topics/index.ts` auto-loads all topic folders at runtime.

### Templates (`src/templates/`)
Reusable processor factories for common patterns:
- `event.ts` - Generic event processor (`createEventProcessor`)
- `otoken.ts` - OToken contract events
- `otoken-vaults.ts` - Vault events (mint, redeem, rebase)
- `burn.ts` - Token burn tracking
- `governance.ts` - Governance proposals
- `trace.ts` / `trace-errors.ts` - Transaction tracing

### Notification System (`src/notify/`)
- `discord.ts` - Discord webhook integration with message queue
- `const.ts` - Topics, severities, and webhook mappings
- `event/` - Event rendering and formatting for Discord embeds

### Path Aliases
Configured in `.cursorrules` and `tsconfig.json`:
- `@abi/*` → `src/abi/*`
- `@utils/*` → `src/utils/*`
- `@notify/*` → `src/notify/*`
- `@processors/*` → `src/processors/*`

## Contract Tracking Workflow

This is the core workflow for understanding and expanding notification coverage:

### 1. Check What We Currently Notify On
```shell
pnpm run digest > digest.log
```
Outputs all registered processors with their tracked addresses, events, and topics. Review `digest.log` to see current coverage.

### 2. Check What We Should Be Notifying On
```shell
pnpm run registry
```
Scrapes the [Origin Protocol contract registry](https://docs.originprotocol.com/registry/contracts) and compares against our tracking. Outputs `registry-comparison.md` showing:
- Which contracts have proxy monitoring vs event handlers
- Contracts needing event tracking (have proxy but no events)
- Completely untracked contracts

### 3. Fetch ABIs for Missing Contracts
```shell
pnpm run fetch-abi <address> <name> [chain]
```
Fetches verified contract ABI from Etherscan/block explorer and saves to `abi/`.

Examples:
```shell
pnpm run fetch-abi 0x703118c4cbcccbf2ab31913e0f8075fbbb15f563 oeth-eth-price-feed
pnpm run fetch-abi 0xdbfefd2e8460a6ee4955a68582f85708baea60a3 super-oeth base
```
Requires `ETHERSCAN_API_KEY` env var (free at etherscan.io/apis).

### 4. Generate TypeScript Types & Create Processor
```shell
pnpm run generate-abis
```
Generates TypeScript types in `src/abi/` from all JSON files in `abi/`.

Then create a processor in the appropriate `src/topics/` subfolder:
```typescript
import { createEventProcessor } from 'templates/event'

createEventProcessor({
  name: 'My Processor',
  chainId: 1,  // 1=mainnet, 8453=base, 146=sonic
  topic: 'OETH',  // Maps to Discord webhook
  tracks: [{ address: [...], events: myAbi.events }]
})
```

### 5. Add Human-Readable Names for New Addresses
When adding new contract addresses, register human-readable names in `src/utils/addresses/names.ts`. This file maps addresses to display names used in Discord notifications.

Add entries to `CONTRACT_ADDR_TO_NAME` under the appropriate chain:
```typescript
[mainnet.id]: {
  [MY_NEW_CONTRACT]: 'My New Contract',
  // ...
},
[base.id]: {
  [baseAddresses.myContract]: 'My Base Contract',
  // ...
},
[sonic.id]: {
  // ...
},
```

## Key Concepts

- **Topic** - Product area (OETH, OUSD, OGN, etc.) that maps to a Discord channel
- **Severity** - low, medium, high, critical, broken, highlight
- **NotifyTarget** - Optional email/Discord mention configuration
- **Processor** - Subscribes to blockchain events and triggers notifications
