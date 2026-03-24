# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Subsquid-based notification system for Origin Protocol. It monitors blockchain events and traces across Ethereum mainnet, Base, and Sonic chains, persists them to a database, and sends notifications to Discord webhooks based on configurable alert rules stored in a separate Postgres database.

## User Interaction

You are encouraged to ask the user questions in order to save time and effort.

## Common Commands

```shell
pnpm install              # Install dependencies
pnpm run process          # Build & start mainnet processor (spins up local DB via docker-compose)
pnpm run process:base     # Build & start Base chain processor
pnpm run process:sonic    # Build & start Sonic chain processor
pnpm run resume           # Resume without rebuild/DB setup
pnpm run prettier-fix     # Format code
pnpm run backfill         # Backfill EventRecord/TraceRecord for specific rules (see below)
pnpm run digest-db        # Output all DB-driven alert rules and code-driven processors
pnpm run generate-seed    # Regenerate seed-rules.sql from code-driven processors
pnpm run generate-abi-seed # Regenerate seed-abis.sql from abi/*.json files
```

### Deployment

The `v3` branch auto-deploys to Subsquid Cloud. To deploy:

1. Merge your feature branch into `main`
2. Merge `main` into `v3`

Manual deploy (requires updating `squid.yaml` version first):
```shell
sqd deploy . --update     # Deploy to Subsquid Cloud (use --update to prevent gaps)
```

### Environment Variables for Development

- `BLOCK_FROM=123456` - Start processing from specific block
- `PROCESSOR=Name` - Filter code-driven processors matching "Name" (OGN Alerts, OGN Buybacks)
- `ALERT=Name` - Filter config-driven alert rules by display name or ID (substring match)
- `ALERT_CONFIG_DB_MIGRATION=true` - Run DB migration + seed on startup (for local dev)

Examples:
```shell
BLOCK_FROM=21540000 ALERT="Lido ARM" pnpm run process   # Debug specific alert rules
BLOCK_FROM=21540000 PROCESSOR=Buyback pnpm run process   # Debug code-driven processors
```

### Backfill Command

Backfills EventRecord/TraceRecord for alert rules without sending notifications:
```shell
pnpm run backfill -- --chain 1 --from 21525891                    # All rules on mainnet
pnpm run backfill -- --chain 8453 --from 24450127 --rule oeth-vault  # Specific rule on Base
```

## Architecture

### Two Databases

| | Squid DB (Subsquid Cloud Postgres) | Alert Config DB (Separate Postgres) |
|---|---|---|
| **Purpose** | Raw on-chain data (EventRecord, TraceRecord) + notification dedup | Alert rules, ABIs, topic definitions |
| **Managed by** | Subsquid migrations, TypeORM | `migration.sql`, seeded at startup |
| **Connection** | `DB_URL` or `DB_HOST`/`DB_PORT`/etc. | `ALERT_CONFIG_DB_URL` |

### Entry Points (Chain-Specific)
- `src/main.ts` - Ethereum mainnet processor
- `src/main-base.ts` - Base chain processor
- `src/main-sonic.ts` - Sonic chain processor
- `src/backfill.ts` - Standalone backfill script

Each entry point runs this startup sequence:
1. `initAlertConfigDb()` — creates DB, runs migration, seeds data (when `ALERT_CONFIG_DB_MIGRATION=true`)
2. `abiRegistry.loadFromDb()` — loads ABIs from alert_config DB, builds decode maps
3. `loadWalletLabels()` — loads address names from Railway DB

### Processors (`src/processors/`)
- **`config-alert.ts`** - Config-driven alert processor. Loads rules from alert_config DB, subscribes to matching events/traces, evaluates filters, sends notifications. This is the primary processor for all chains.
- **`persistence.ts`** - Persists all events and traces to EventRecord/TraceRecord tables in the squid DB. Runs alongside config-alert on every chain.

### Code-Driven Processors (`src/topics/`)
Two processors with custom `process()` logic that can't be expressed as DB rules:
- `ogn-alerts/` - OGN staking alerts with custom logic
- `ogn-buybacks/` - OGN buyback tracking

These are loaded by `src/topics/index.ts` and run alongside config-alert on mainnet only.

### Alert Config System (`src/alert-config/`)
- `migration.sql` - Schema: `chain`, `topic`, `abi`, `alert_rule` tables with validation constraints
- `config-loader.ts` - Loads rules from DB with 5-minute cache refresh, `initAlertConfigDb()` for migration
- `evaluate-filter.ts` - Evaluates AND/OR filter expressions against decoded event/trace data
- `types.ts` - TypeScript types for AlertRule, FilterExpression
- `seed-rules.sql` - Generated seed data for alert rules
- `seed-abis.sql` - Generated seed data for ABI storage

Admin UI: See `../alert-config-admin` — a React + Hono app for managing alert rules via a web interface.

### ABI Registry (`src/utils/abi-registry.ts`)
Dual-mode ABI loading:
1. **DB-loaded (primary)** — Full ABIs stored in the `abi` table, decoded at runtime via viem. Supports fallback decoding when multiple ABIs share the same selector (e.g., different `Deposit` events with different indexed params).
2. **Subsquid-compiled (fallback)** — `src/abi/*.ts` files loaded at import time for code-driven processors. Only 3 remain: `erc20.ts`, `exponential-staking.ts`, `multicall.ts`.

### Notification System (`src/notify/`)
- `discord.ts` - Discord webhook integration with message queue
- `const.ts` - Topics, severities, webhook mappings, emoji/color constants
- `format.ts` - Shared formatting utilities (addresses linked to explorers, BigInt formatting, traderate support)
- `event/event.ts` - Event notification pipeline (Loki + Discord + oncall)
- `event/renderers/default.ts` - Discord embed renderer with structured fields
- `trace.ts` - Trace notification pipeline with Discord embed renderer
- `loki.ts` - Grafana Loki structured logging
- `oncall.ts` - Grafana OnCall webhook for high/critical severity
- `notification-log.ts` - DB-backed notification deduplication

### Path Aliases
Configured in `tsconfig.json`:
- `@abi/*` → `src/abi/*`
- `@utils/*` → `src/utils/*`
- `@notify/*` → `src/notify/*`
- `@processors/*` → `src/processors/*`

## Adding New Alert Rules

The primary way to add notification coverage is through the alert_config database:

### 1. Ensure the ABI is loaded
If the contract's ABI isn't already in the `abi` table, fetch it and add it:
```shell
pnpm run fetch-abi <address> <name> [chain]    # Saves to abi/<name>.json
pnpm run generate-abi-seed                      # Regenerates seed-abis.sql
```

### 2. Create the alert rule
Use the admin UI (`../alert-config-admin`) or insert directly into the `alert_rule` table:
- `chain_id` — 1 (mainnet), 8453 (base), 146 (sonic)
- `match_type` — `event` or `trace`
- `addresses` — contract addresses to watch (NULL = any)
- `topic0s` — event signatures to match (NULL = any)
- `sighashes` — function selectors for traces (NULL = any)
- `data_filters` — optional JSONB filter on decoded data (notification-only — all data is always persisted regardless of filters)
- `topic` — Discord channel (OETH, OUSD, ARM, etc.)
- `severity` — low, medium, high, critical, broken, highlight

Rules are cached for 5 minutes. Changes take effect without redeployment.

### 3. Add human-readable names (optional)
For new addresses, add entries to `CONTRACT_ADDR_TO_NAME` in `src/utils/addresses/names.ts`, or add them to the `wallet_label` table in the Railway database.

### 4. Backfill historical data (optional)
```shell
pnpm run backfill -- --chain <id> --from <block>
```

## Key Concepts

- **Topic** - Product area (OETH, OUSD, OGN, ARM, OS, etc.) that maps to a Discord webhook channel
- **Severity** - low, medium, high, critical, broken, highlight — controls embed color and oncall routing
- **AlertRule** - Database row defining what on-chain activity to watch and how to notify
- **NotifyTarget** - Optional Discord mention or oncall configuration on a rule
- **Processor** - Subscribes to blockchain events/traces and processes each block batch
- **EventRecord / TraceRecord** - Persistent on-chain data in the squid DB (queryable via GraphQL)
