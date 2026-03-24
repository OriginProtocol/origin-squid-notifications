# Plan: Persistent Alert Data & Configurable Filtering

## Checklist

### Phase 1: Squid DB — Event & Trace Tables
- [x] Design EventRecord schema (modeled after Dune `ethereum.logs` + decoded data)
- [x] Design TraceRecord schema (modeled after Dune `ethereum.traces` + decoded data)
- [x] Design AbiData lookup table (event/function name + signature by topic0/sighash)
- [x] Update `schema.graphql` with EventRecord, TraceRecord, AbiData entities
- [x] Generate TypeORM models (`sqd codegen`)
- [x] Generate DB migration (`sqd migration:generate`)
- [x] Update `DEFAULT_FIELDS` in `batch-processor-fields.ts` for new trace/tx fields
- [x] Create ABI registry (`src/utils/abi-registry.ts`) — auto-loads all ABIs, indexes by topic0/sighash
- [x] Create persistence processor (`src/processors/persistence.ts`) — upserts all logs/traces to DB
- [x] Wire persistence processor into all 3 main entry points (main.ts, main-base.ts, main-sonic.ts)
- [x] Add `sqd serve` command to `commands.json` for GraphQL API
- [x] Identify backfill start blocks (Jan 1 2025: mainnet 21525891, base 24450127, sonic 2118322)
- [x] Test local processing with backfill blocks
- [x] Verify data in DB via `sqd serve` GraphQL API

### Phase 2: Notification Deduplication Tracking
- [x] Add NotificationLog entity to schema
- [x] Generate models + migration
- [x] Implement DB-backed dedup (`checkAndLogNotification` in `src/notify/notification-log.ts`)
- [x] Wire dedup into `notifyForEvent` and `notifyForTrace`
- [x] Remove `uniqueEventsFired` / `uniqueTracesFired` in-memory Sets
- [ ] Remove `eventState` per-batch dedup (kept for now — serves as rate limiter)
- [x] Test reprocessing safety

### Phase 3: Alert Config DB
- [x] Design `alert_rule` table with AND/OR filter expression support (`src/alert-config/migration.sql`)
- [x] Design `contract_info` table (`src/alert-config/migration.sql`)
- [x] Define TypeScript types for AlertRule, FilterExpression, ContractInfo (`src/alert-config/types.ts`)
- [x] Implement filter evaluator with comparison operators (`src/alert-config/evaluate-filter.ts`)
- [x] Implement config loader with connection pooling and 5-min cache refresh (`src/alert-config/config-loader.ts`)
- [x] Implement rule matching functions (`findMatchingEventRules`, `findMatchingTraceRules`)
- [x] Generate seed data (`src/alert-config/seed-rules.sql`) from code-driven processors
- [ ] Create separate Postgres instance
- [ ] Run migration.sql against it
- [ ] Add `ALERT_CONFIG_DB_URL` to squid secrets
- [ ] Seed initial alert rules

### Phase 4: Config-Driven Alerting
- [x] Build `config-alert.ts` processor — loads DB rules, builds subscriptions, matches events/traces
- [x] Wire rule matching + filter evaluation into notification pipeline (calls `notifyForEvent`/`notifyForTrace`)
- [x] Generic Discord embed renderer for config-driven alerts
- [x] Config-alert is primary processor on all chains (Base/Sonic: sole processor; mainnet: alongside OGN custom processors)

### Phase 5: Historical Backfill & Reprocessing
- [ ] ~~Implement BACKFILL mode (persist only, no notifications)~~ → replaced by Phase 7 backfill script
- [ ] Run backfill for mainnet/base/sonic from Jan 1 2025
- [ ] ~~Query-based retroactive alerting tool/script~~ → replaced by Phase 7 backfill script

### Phase 6: Transition
- [x] Delete hardcoded topic processors replaced by config-alert (arm, governance, oeth, ogn, os, ousd, prime-eth, superoethb, xogn)
- [x] Delete unused template factories (burn, chainlink-keeper, governance, origin-arm, otoken, etc.)
- [x] Keep OGN Alerts + OGN Buybacks as code-driven processors (custom `process()` logic)
- [x] Exclude code-driven processors from DB seed (`generate-seed.ts`)
- [ ] Remove `eventState` per-batch dedup (Phase 2 leftover — still serves as rate limiter)

### Phase 7: Alert Rule Backfill Script
- [x] Create `src/backfill.ts` — runs Subsquid processor for a specific rule to backfill EventRecord/TraceRecord
- [x] Parse `--rule <id>` and `--from <block>` from CLI args
- [x] Load rule from alert config DB, build subscriptions (reuse `buildSubscriptions` from config-alert.ts)
- [x] Call `run()` with `stateSchema: 'backfill'` and persistence processor only
- [x] Add `pnpm run backfill` script to package.json

### Phase 8: Database-Backed ABI Storage
- [x] Add `abi` table to `src/alert-config/migration.sql`
- [x] Create `src/generate-abi-seed.ts` to produce `seed-abis.sql` from `abi/*.json`
- [x] Generate `src/alert-config/seed-abis.sql`
- [x] Rewrite `src/utils/abi-registry.ts` to load from DB + decode via viem
- [x] Make registry initialization async, wire into main entry points
- [x] Implement decode wrappers (viem output → subsquid-compatible shape)
- [x] Seed ABI data into local alert_config DB and verify loading
- [x] ~~Auto-populate `event_signature`/`function_signature` from loaded ABIs~~ → removed these tables (redundant with `abi` table)
- [x] Remove `event_signature`/`function_signature` tables and `contract_info` table from schema
- [x] ABI registry fallback decoding: tries all ABI variants for a given selector before failing
- [ ] Verify decoding parity on live data (process a few blocks)
- [ ] Update CLAUDE.md with new ABI workflow

### Phase 9: Contract Name Resolution from Railway DB
- [x] At boot, load wallet labels from Railway DB (`loadWalletLabels`)
- [ ] Replace hardcoded `CONTRACT_ADDR_TO_NAME` in `src/utils/addresses/names.ts` with DB-driven lookup
- [ ] Keep `names.ts` as fallback for addresses not in the DB

### Phase 10: DB-Driven Topics & Webhook Configuration
- [ ] Move Discord webhook URLs into the alert_config DB (new `topic_config` table with name, webhook_url, thumbnail_url)
- [ ] Create `WebhookClient` instances dynamically from DB at startup
- [ ] Change `Topic` type from union to `string` throughout the codebase
- [ ] Allow adding new notification channels without code changes or env var updates

---

## Problem Statement

Currently, all notification data is fire-and-forget: events and traces are processed, sent to Discord/Loki/oncall, and not persisted to any queryable store. The existing `Notification` model/table is defined but never written to. People want:

1. **Queryable history** - Filter and search past alerts by any field, including decoded data
2. **Configurable alerting** - Change what triggers alerts without code deploys, using an external Postgres DB
3. **Backfill capability** - Reprocess historical blocks safely (no duplicate notifications)

## Current Architecture Summary

- **3 processors** (mainnet, base, sonic) run independently, each with its own Subsquid processor
- **Event flow**: `createEventProcessor` -> log matching -> optional `customFilter` -> `notifyForEvent` -> Loki + Discord + oncall
- **Trace flow**: `createTraceProcessor` -> trace matching -> `notifyForTrace` -> Loki + Discord + oncall
- **Database**: PostgreSQL via Subsquid's TypeORM store (5G on Subsquid Cloud), currently unused beyond schema requirement
- **Loki**: Receives structured JSON with labels — essentially the data we want to persist
- **No `ctx.store` usage anywhere** - the DB is available but untouched

## Two Databases

| | Squid DB (Subsquid Cloud Postgres) | Alert Config DB (Separate Postgres) |
|---|---|---|
| **Purpose** | Raw on-chain data + notification tracking | Alert definitions + routing rules |
| **Managed by** | Squid migrations, auto-managed | Manually maintained, queried by squid |
| **Contains** | EventAlert, TraceAlert, NotificationLog | AlertRule, ContractInfo, NotifyConfig |
| **Updated by** | Squid processor (upserts) | Humans (manual SQL/admin tool) |

---

## Phase 1: Squid DB — Event & Trace Tables

### 1a. Schema Design

Replace the unused `Notification` entity with tables for raw on-chain data. Schema modeled after Dune Analytics' `ethereum.logs` and `ethereum.traces` tables, but enhanced with decoded data.

**Reference: Dune vs Our Schema**

| Dune `ethereum.logs` | Our `EventRecord` | Notes |
|---|---|---|
| `block_time` | `timestamp` | |
| `block_number` | `blockNumber` | |
| `block_hash` | `blockHash` | Added |
| `block_date` | — | Can derive from timestamp |
| `contract_address` | `contractAddress` | |
| `topic0` | `topic0` | Event signature hash |
| `topic1` | `topic1` | First indexed param |
| `topic2` | `topic2` | Second indexed param |
| `topic3` | `topic3` | Third indexed param |
| `data` | `data` | Raw non-indexed event data (hex) |
| `tx_hash` | `txHash` | |
| `tx_from` | `txFrom` | Transaction initiator |
| `tx_to` | `txTo` | Transaction recipient |
| `index` (log index in block) | `logIndex` | |
| `tx_index` | `txIndex` | |
| — | `decodedData` (JSON) | **Beyond Dune** — decoded event args |

| Dune `ethereum.traces` | Our `TraceRecord` | Notes |
|---|---|---|
| `block_time` | `timestamp` | |
| `block_number` | `blockNumber` | |
| `block_hash` | `blockHash` | Added |
| `tx_hash` | `txHash` | |
| `tx_index` | `txIndex` | |
| `tx_success` | `txSuccess` | Whether parent tx succeeded |
| `from` | `fromAddress` | |
| `to` | `toAddress` | |
| `value` | `value` | Native token transferred (wei, as string for bigint) |
| `gas` | `gas` | Gas provided |
| `gas_used` | `gasUsed` | Gas consumed |
| `input` | `input` | Raw input data (hex) |
| `output` | `output` | Raw output data (hex) |
| `type` | `type` | call, create, suicide, reward |
| `call_type` | `callType` | call, delegatecall, staticcall |
| `trace_address` | `traceAddress` | Path in call tree |
| `sub_traces` | `subtraces` | Number of child traces |
| `success` | `success` | Whether trace succeeded |
| `error` | `error` | Error message if failed |
| `address` | `createdAddress` | Contract address (create traces) |
| `code` | — | Deployed bytecode (skip — large, rarely needed) |
| `refund_address` | `refundAddress` | Selfdestruct refund target |
| — | `sighash` | **Beyond Dune** — function selector (4 bytes) |
| — | `revertReason` | **Beyond Dune** — decoded revert reason |
| — | `decodedInput` (JSON) | **Beyond Dune** — decoded function input |
| — | `decodedOutput` (JSON) | **Beyond Dune** — decoded function output |

**`schema.graphql`:**

```graphql
type EventRecord @entity {
  id: ID!                          # {chainId}:{blockHeight}:{txIndex}:{logIndex}
  timestamp: DateTime! @index
  blockNumber: Int! @index
  blockHash: String!
  chainId: Int! @index
  contractAddress: String! @index
  topic0: String! @index           # Event signature hash
  topic1: String @index            # First indexed param
  topic2: String @index            # Second indexed param
  topic3: String @index            # Third indexed param
  data: String                     # Raw non-indexed event data (hex)
  txHash: String! @index
  txFrom: String! @index           # Transaction sender
  txTo: String @index              # Transaction recipient (null for contract creation)
  txIndex: Int!
  logIndex: Int!
  decodedData: JSON                # Decoded event args (indexed + non-indexed)
}

type TraceRecord @entity {
  id: ID!                          # {chainId}:{blockHeight}:{txIndex}:{traceAddress}
  timestamp: DateTime! @index
  blockNumber: Int! @index
  blockHash: String!
  chainId: Int! @index
  txHash: String @index
  txIndex: Int
  txSuccess: Boolean               # Whether parent transaction succeeded
  type: String! @index             # call, create, suicide, reward
  callType: String @index          # call, delegatecall, staticcall (call traces only)
  fromAddress: String @index
  toAddress: String @index
  value: String                    # Native token transferred (wei, stored as string)
  gas: BigInt                      # Gas provided
  gasUsed: BigInt                  # Gas consumed
  input: String                    # Raw input data (hex)
  output: String                   # Raw output data (hex)
  sighash: String @index           # Function selector (4 bytes, call traces only)
  traceAddress: [Int!]!            # Path in call tree
  subtraces: Int!                  # Number of child traces
  success: Boolean                 # Whether this trace succeeded
  error: String                    # Error message if failed
  revertReason: String             # Decoded revert reason
  createdAddress: String @index    # New contract address (create traces only)
  refundAddress: String            # Selfdestruct refund target (suicide traces only)
  decodedInput: JSON               # Decoded function input args
  decodedOutput: JSON              # Decoded function output args
}
```

**What lives here vs. the alert config DB:**
- **Here (raw on-chain data):** addresses, log topics, sighash, raw + decoded data, block/tx info, gas, value
- **Alert config DB:** topic (OETH, OUSD, etc.), severity, notify targets, contract names, filtering rules

### 1a-ii. Field Selection Updates

We need to request additional fields from the Subsquid archive that we don't currently fetch. Changes to `src/utils/batch-processor-fields.ts`:

```typescript
// Fields to ADD to DEFAULT_FIELDS:
block: {
  timestamp: true,
  hash: true,           // NEW — for blockHash
},
transaction: {
  from: true,
  to: true,
  hash: true,
  gas: true,
  value: true,
  sighash: true,
  input: true,
  status: true,         // NEW — for txSuccess on traces
  gasUsed: true,        // NEW — useful context
},
trace: {
  // existing...
  callGas: true,        // NEW — gas provided
  callResultGasUsed: true,  // NEW — gas consumed
  callResultOutput: true,   // NEW — return data
  createFrom: true,     // NEW — for create traces
  createValue: true,    // NEW — for create traces
  createGas: true,      // NEW — for create traces
  createResultGasUsed: true, // NEW — for create traces
  createResultCode: true,   // already present
  createResultAddress: true, // already present
  subtraces: true,      // NEW — child trace count
}
```

### 1b. Write to DB in Processing Pipeline

Modify `notifyForEvent` and `notifyForTrace` to persist records via `ctx.store.upsert()`.

**Key points:**
- Upserts make reprocessing idempotent — same block range can be processed multiple times safely
- Data is already assembled for Loki; we just also write it to DB
- `ctx.store` is already threaded through to both notify functions
- Batch upserts per block for performance

### 1c. Migration & Deploy

```shell
pnpm run generate-schema   # Creates migration from schema.graphql changes
sqd deploy . --update      # Deploy without gaps
```

---

## Phase 2: Notification Deduplication Tracking

This is the critical piece that makes reprocessing safe. Without it, reprocessing a block range would re-send all Discord/oncall notifications.

### 2a. NotificationLog Table

```graphql
type NotificationLog @entity {
  id: ID!                          # Same as EventRecord.id or TraceRecord.id
  alertRuleId: String! @index      # Which alert rule triggered this notification
  channel: String! @index          # "discord" | "oncall" | "loki"
  notifiedAt: DateTime! @index     # When the notification was sent
  chainId: Int! @index
}
```

### 2b. Dedup Logic

Before sending any notification:
1. Compute the record ID (e.g., `1:18500000:42:7`)
2. Compute a composite key: `{recordId}:{alertRuleId}:{channel}`
3. Check if `NotificationLog` exists for this key
4. If exists, skip. If not, send notification and write the log entry.

This means:
- **Reprocessing blocks** = safe (records upserted, notifications skipped if already sent)
- **Adding a new alert rule** = processes existing EventRecord/TraceRecord data and sends notifications only for the new rule
- **Changing an alert rule** = new rule ID means new notifications (old rule's notifications are preserved in log)

### 2c. Interaction with BLOCK_FROM

The current `BLOCK_FROM` guards (in-memory `uniqueEventsFired`/`uniqueTracesFired` Sets) become unnecessary once NotificationLog exists. The DB-backed dedup is strictly better:
- Survives restarts
- Works across reprocessing runs
- Doesn't have the arbitrary 5-trace limit

---

## Phase 3: Alert Config DB — Schema Design

A separate Postgres database, manually maintained, that the squid connects to and queries for alert routing decisions.

### 3a. Connection

- Squid connects via a `ALERT_CONFIG_DB_URL` environment variable
- Read-only connection from squid's perspective
- Config is loaded at startup and can be refreshed periodically (or on-demand)

### 3b. Alert Rule Table

```sql
CREATE TABLE alert_rule (
  id            TEXT PRIMARY KEY,          -- human-readable: "oeth-vault-mint", "ousd-transfer-large"
  enabled       BOOLEAN NOT NULL DEFAULT true,
  chain_id      INTEGER NOT NULL,

  -- Matching criteria (what on-chain data does this rule apply to?)
  match_type    TEXT NOT NULL,             -- 'event' | 'trace'
  addresses     TEXT[],                    -- contract addresses (NULL = any)
  topic0        TEXT[],                    -- event signatures (NULL = any, for events only)
  sighash       TEXT[],                    -- function selectors (NULL = any, for traces only)

  -- Data filters (conditions on decoded data, evaluated at notification time)
  data_filters  JSONB,                     -- filter expressions on decoded data

  -- Notification routing
  topic         TEXT NOT NULL,             -- 'OETH', 'OUSD', etc. — maps to Discord webhook
  severity      TEXT NOT NULL DEFAULT 'low',
  notify_targets JSONB,                   -- {"discord_mentions": [...], "oncall": true, ...}

  -- Metadata
  description   TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
```

### 3c. Data Filters

The `data_filters` JSONB column holds filter expressions evaluated against decoded event/trace data. Simple comparison-based format:

```jsonc
// Example: Only alert on transfers > 1 ETH
{
  "conditions": [
    { "field": "value", "op": "gte", "value": "1000000000000000000" }
  ]
}

// Example: Only alert when 'from' is a specific address
{
  "conditions": [
    { "field": "from", "op": "eq", "value": "0xabc..." }
  ]
}

// Example: Multiple conditions (AND)
{
  "conditions": [
    { "field": "amount", "op": "gte", "value": "1000000000000000000" },
    { "field": "to", "op": "neq", "value": "0x0000000000000000000000000000000000000000" }
  ]
}
```

**Supported operators:** `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `contains`

This is intentionally simple. Complex filtering logic that can't be expressed here stays in code as `customFilter` functions (which can coexist with config-driven rules).

### 3d. Contract Info Table (Optional)

```sql
CREATE TABLE contract_info (
  address       TEXT NOT NULL,
  chain_id      INTEGER NOT NULL,
  name          TEXT NOT NULL,             -- Human-readable: "OETH Vault", "Curve AMO"
  product       TEXT,                      -- "OETH", "OUSD", etc.
  tags          TEXT[],                    -- ["vault", "strategy", "governance"]
  PRIMARY KEY (address, chain_id)
);
```

This replaces the hardcoded `CONTRACT_ADDR_TO_NAME` mappings in `src/utils/addresses/names.ts` over time.

### 3e. Config Loading Strategy

**At startup:**
- Load all enabled `alert_rule` rows into memory
- Load `contract_info` for name resolution
- Build lookup structures: index by `(chain_id, match_type, topic0/sighash)`

**Refresh:**
- Poll for changes every N minutes (simple, reliable)
- Or: reload on SIGHUP signal for manual refresh during development
- Full reload is fine — the dataset is small (hundreds of rules at most)

---

## Phase 4: Integration — Config-Driven Alerting

### 4a. New Processing Pipeline

```
Event/Trace detected by Subsquid processor
  |
  v
Persist to DB (EventRecord / TraceRecord) -- always, unconditionally
  |
  v
Match against loaded AlertRules
  |-- Find rules where: chain_id matches, match_type matches,
  |   address in rule.addresses (or rule.addresses is NULL),
  |   topic0/sighash matches (or rule's is NULL)
  |
  v
For each matching rule:
  |
  v
Evaluate data_filters against decoded data
  |-- If filters pass:
  |     Check NotificationLog for dedup
  |     If not already notified:
  |       Send to configured channels (Discord, oncall, Loki)
  |       Write NotificationLog entry
  |-- If filters fail: skip
```

### 4b. Where This Logic Lives

Two options:

**Option A: Replace notify functions**
Rewrite `notifyForEvent`/`notifyForTrace` to:
1. Persist record
2. Query alert rules
3. Evaluate filters
4. Send notifications

This is a bigger change but cleaner long-term.

**Option B: Layer on top**
Keep existing notify functions mostly intact, add a new `evaluateAlertRules()` step that runs after persistence. Existing hardcoded logic continues to work alongside config-driven rules.

**Recommendation:** Option B for transition, migrate to Option A over time. This lets us validate config-driven alerts against existing behavior before removing hardcoded logic.

### 4c. Coexistence with Existing Hardcoded Logic

During transition, both systems run:
- Hardcoded processors continue to match events/traces and call notify functions
- Config-driven rules also evaluate the same events/traces
- NotificationLog prevents duplicates if both systems try to notify for the same thing
- We can gradually disable hardcoded notifications as config rules prove reliable

### 4d. Custom Renderers

Currently, Discord messages are formatted by custom renderer functions (per-event-type formatting with embeds, links, etc.). These need to coexist with config-driven alerts.

**Approach:**
- Config-driven alerts use a generic Discord embed format (event name, decoded data, links)
- Custom renderers can be registered for specific `alert_rule.id` values for richer formatting
- Over time, we can build a template system in the config DB if needed

---

## Phase 5: Historical Backfill & Reprocessing

### 5a. Backfill Mode

`BACKFILL=true` environment variable changes behavior:
- **Does** write to DB (EventRecord/TraceRecord via upsert)
- **Does** evaluate alert rules and check NotificationLog
- **Does NOT** send notifications (just logs what *would* be sent)
- Removes the `uniqueEventsFired`/`uniqueTracesFired` in-memory caps

### 5b. Reprocessing for New Alert Rules

When a new alert rule is added to the config DB:
1. Squid picks it up on next config refresh
2. Going forward, new events/traces are evaluated against the new rule
3. To retroactively alert on historical data: query EventRecord/TraceRecord tables directly from the alert config system, or run a targeted backfill

**Alternative approach — query-based retroactive alerting:**
Instead of reprocessing blocks, query the already-persisted EventRecord/TraceRecord tables:
```sql
-- Find all historical events matching a new alert rule
SELECT * FROM event_record
WHERE chain_id = 1
  AND contract_address = ANY('{0xabc...}')
  AND topic0 = '0xddf...'
  AND decoded_data->>'value' > '1000000000000000000';
```
This is faster than reprocessing and doesn't require running the squid. Could be a script or admin tool.

### 5c. Backfill Execution

```shell
BACKFILL=true BLOCK_FROM=18000000 pnpm run process        # mainnet
BACKFILL=true BLOCK_FROM=5000000 pnpm run process:base     # base
BACKFILL=true BLOCK_FROM=1000000 pnpm run process:sonic    # sonic
```

---

## Phase 6: Transition Plan

### Step-by-step rollout:

1. **Deploy Phase 1** (EventRecord + TraceRecord tables)
   - DB writes added alongside existing notification logic
   - No behavior change to existing alerts
   - Data starts accumulating immediately

2. **Deploy Phase 2** (NotificationLog table)
   - Replace in-memory dedup (`uniqueEventsFired`/`uniqueTracesFired`) with DB-backed dedup
   - Existing notifications start being tracked
   - Reprocessing becomes safe

3. **Run historical backfill**
   - Populate EventRecord/TraceRecord for desired historical range
   - No notifications sent (BACKFILL mode)

4. **Set up Alert Config DB**
   - Create the separate Postgres instance
   - Populate initial alert rules mirroring current hardcoded behavior
   - Add `ALERT_CONFIG_DB_URL` to squid secrets

5. **Deploy Phase 4** (config-driven alerting, shadow mode)
   - Config rules evaluated alongside existing hardcoded logic
   - Log discrepancies between what config would do vs what hardcoded logic does
   - NotificationLog prevents any actual duplicate notifications

6. **Validate and switch over**
   - Confirm config-driven alerts match expected behavior
   - Disable hardcoded notification logic
   - Config becomes the source of truth

7. **Clean up**
   - Remove hardcoded filtering/routing code
   - Remove `customFilter`, `discordExcludeFilter`, etc. (or keep as escape hatches)
   - Remove in-memory dedup Sets

---

## Open Questions

- [ ] Desired historical depth for backfill? (All time? Last 6 months?)
- [ ] Any concern about DB storage on Subsquid Cloud? (Currently 5G allocated, decoded JSON data will grow)
- [ ] Should the GraphQL API be exposed for querying EventRecord/TraceRecord, or will queries go through the alert config DB / admin tool?
- [ ] Config refresh interval — how quickly should new/changed rules take effect?
- [ ] Do we want a simple admin UI for the alert config DB, or is raw SQL sufficient initially?
- [ ] Should `contract_info` replace `addresses/names.ts` completely, or coexist?
- [ ] For the data_filters expression language — is the simple comparison-based format sufficient, or do we need OR logic, nested conditions, etc.?

---

## Phase 7: Alert Rule Backfill Script

### Problem

When a new alert rule is added, the live processor only evaluates it against future blocks. Historical events/traces that match the rule are already persisted in `EventRecord`/`TraceRecord` by the persistence processor, but no one has evaluated alert rules against them.

### Approach

Reuses the existing Subsquid `run()` framework and persistence processor — no custom archive querying. The script:

1. Loads the target alert rule from the alert config DB
2. Builds `logFilter`/`traceFilter` subscriptions from the rule (same as `config-alert.ts` does)
3. Creates a processor with those subscriptions + the persistence processor's `process()` logic
4. Calls `run()` with a **separate `stateSchema`** (e.g. `'backfill'`) so it doesn't interfere with the live processor's cursor
5. Sets `BLOCK_FROM` to the specified start block

The processor framework handles all archive querying, batching, and data formatting — we get the same `Context` with the same block/log/trace structure the live processor uses.

### Usage

```shell
# Backfill events for a specific rule from a given block
pnpm run backfill -- --rule oeth-vault-mint --from 21525891
```

### Key points

- **Reuses `run()`**: Same Subsquid processor framework, same archive gateway, same `Context` shape
- **Reuses persistence processor**: Same decode + upsert logic for EventRecord/TraceRecord
- **Separate state schema**: `'backfill'` schema has its own cursor — doesn't touch the live processor's progress
- **Upserts**: If some records already exist, they get updated, not duplicated
- **Can run alongside the live processor**: Different state schema means no conflicts
- **No notifications**: Only the persistence processor runs, not config-alert

### Checklist

- [ ] Create `src/backfill.ts`
- [ ] Parse `--rule <id>` and `--from <block>` from CLI args
- [ ] Load rule from alert config DB
- [ ] Build logFilter/traceFilter from rule (reuse `buildSubscriptions` from config-alert.ts)
- [ ] Create a processor with rule subscriptions + persistence process() logic
- [ ] Call `run()` with `stateSchema: 'backfill'`, `fromNow: false`
- [ ] Add `pnpm run backfill` script to package.json

---

## Phase 8: Database-Backed ABI Storage

### Problem

ABIs are currently stored as JSON files in `abi/`, compiled to TypeScript via `pnpm run generate-abis` (uses `@subsquid/evm-typegen`), and loaded at import time from `src/abi/`. This has several drawbacks:
- Adding/removing ABIs requires a code change, codegen step, and redeploy
- The compiled TypeScript files are tightly coupled to subsquid's codec library
- An admin UI would need filesystem access to manage ABIs

### Goal

Store ABIs in the alert config database and use **viem** (already a dependency) for runtime decoding. The `abiRegistry` interface stays the same — consumers don't need to change — but ABIs are loaded from DB instead of filesystem.

### What Changes

| Component | Before | After |
|-----------|--------|-------|
| ABI storage | `abi/*.json` → `src/abi/*.ts` (codegen) | `abi` table in alert config DB |
| ABI loading | `require()` compiled TS at import | DB query at startup, cached |
| Event decoding | `@subsquid/evm-abi` AbiEvent.decode() | viem `decodeEventLog()` |
| Function decoding | `@subsquid/evm-abi` AbiFunction.decode()/decodeResult() | viem `decodeFunctionData()` / `decodeFunctionResult()` |
| Selector computation | Pre-computed in codegen | viem `toEventSelector()` / `toFunctionSelector()` |

### What Stays the Same

- **`abiRegistry` API**: `getEvent()`, `getFunction()`, `getEventInfo()`, `getFunctionInfo()`, `getAllEntries()` — same signatures, same return shape
- **Direct `@abi/` imports in code-driven processors**: OGN Alerts, OGN Buybacks, and governance renderer import compiled subsquid ABIs directly (`@abi/exponential-staking`, `@abi/erc20`, etc.). These keep working — the compiled files remain for code-driven processors that need type-safe access. The DB-backed registry is for dynamic/config-driven usage only.
- **`persistence.ts` and `config-alert.ts`**: They call `abiRegistry.getEvent(topic0).decode(log)` etc. — the wrapper adapts viem's output to match.

### Checklist

#### Step 1: Create `abi` table in migration.sql
- [ ] Add `abi` table: `name TEXT PK`, `abi_json JSONB NOT NULL`, `created_at TIMESTAMPTZ`
- [ ] Drop the FK constraints on `alert_rule.topic0s` → `event_signature` and `alert_rule.sighashes` → `function_signature` (signatures will be derived from ABIs)
- [ ] Keep `event_signature` and `function_signature` tables as derived views/caches (auto-populated from `abi` table via trigger or at load time)

#### Step 2: Generate ABI seed SQL
- [ ] Create script `src/generate-abi-seed.ts` that reads all 49 `abi/*.json` files
- [ ] Output INSERT statements: `INSERT INTO abi (name, abi_json) VALUES ('erc20', '[...]'::jsonb) ON CONFLICT DO NOTHING;`
- [ ] Add `pnpm run generate-abi-seed` script to package.json
- [ ] Generate initial `src/alert-config/seed-abis.sql`

#### Step 3: Replace ABI registry internals
- [ ] Rewrite `src/utils/abi-registry.ts`:
  - Load ABIs from DB via `ALERT_CONFIG_DB_URL` at startup (same pool as alert config)
  - Parse each ABI JSON, compute topic0/sighash using viem's `toEventSelector()`/`toFunctionSelector()`
  - Build lookup maps: `topic0 → { abi, abiItem, name, signature }`, `sighash → { abi, abiItem, name, signature }`
  - Implement decode wrappers that call viem and return the same shape as subsquid decoders
- [ ] Make `abiRegistry` initialization async (it currently runs synchronously at import time)
  - Add `await abiRegistry.initialize()` call in main entry points before processor setup
  - Or: lazy-init on first use with a Promise
- [ ] Ensure `getEvent(topic0).decode(log)` returns same shape as subsquid's `AbiEvent.decode()`
  - subsquid returns: `{ field1: value1, field2: value2, ... }` (named object)
  - viem `decodeEventLog` returns: `{ eventName, args: { field1, field2, ... } }` — wrapper extracts `.args`
- [ ] Ensure `getFunction(sighash).decode(input)` returns same shape
  - subsquid returns: `{ param1: value1, param2: value2, ... }` (named object)
  - viem `decodeFunctionData` returns: `{ functionName, args }` — wrapper extracts `args` as named object
- [ ] Ensure `getFunction(sighash).decodeResult(output)` works
  - viem `decodeFunctionResult` returns the decoded return value(s)
- [ ] Populate `event_signature` and `function_signature` tables from loaded ABIs (replaces seed data)

#### Step 4: Verify decoding parity
- [ ] Write test script that decodes sample events/traces with both subsquid and viem
- [ ] Compare outputs for: BigInt handling, address casing, struct/tuple decoding, array params
- [ ] Known differences to handle:
  - viem returns checksummed addresses; subsquid returns lowercase
  - viem BigInt vs subsquid BigInt — should be compatible
  - Indexed event params: viem includes them in args; subsquid includes them too
- [ ] Run against live data: process a few blocks and compare decoded output

#### Step 5: Clean up (after verification)
- [ ] Remove `pnpm run generate-abis` from workflow (no longer needed for config-driven alerts)
- [ ] Keep `abi/*.json` files as source-of-truth for seed generation
- [ ] Keep `src/abi/*.ts` compiled files for code-driven processors (OGN Alerts, Buybacks, governance renderer)
- [ ] Update CLAUDE.md to reflect new ABI workflow

### Database Schema

```sql
-- In migration.sql (alert config DB)
CREATE TABLE abi (
  name            TEXT PRIMARY KEY,
  abi_json        JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

The `event_signature` and `function_signature` tables remain but become derived data:
- On ABI load, the registry computes all selectors and populates these tables
- This keeps the FK constraints on `alert_rule` working
- Admin UI can upload a whole ABI file; selectors are auto-extracted

### viem Decoding API

```typescript
import { decodeEventLog, decodeFunctionData, decodeFunctionResult,
         toEventSelector, toFunctionSelector } from 'viem'

// Compute selectors from ABI items
const topic0 = toEventSelector(abiItem)     // '0xddf252...'
const sighash = toFunctionSelector(abiItem) // '0xa9059cbb'

// Decode event log
const decoded = decodeEventLog({ abi, data: log.data, topics: log.topics })
// → { eventName: 'Transfer', args: { from: '0x...', to: '0x...', value: 1000n } }

// Decode function input
const decoded = decodeFunctionData({ abi, data: trace.action.input })
// → { functionName: 'transfer', args: { _to: '0x...', _value: 1000n } }

// Decode function output
const decoded = decodeFunctionResult({ abi, data: trace.result.output, functionName: 'balanceOf' })
// → 1000n (or named object for multiple returns)
```

### Impact on Consumers

| Consumer | Change needed? | Details |
|----------|---------------|---------|
| `config-alert.ts` | No | Uses `abiRegistry.getEvent(topic0).decode(log)` — wrapper handles it |
| `persistence.ts` | No | Same API: `getEvent()`, `getFunction()`, `.decode()`, `.decodeResult()` |
| `digest-db.ts` | No | Uses `abiRegistry.getEventInfo()` — same API |
| `generate-seed.ts` | No | Uses `abiRegistry.getAllEntries()` — same API |
| `ogn-alerts/index.ts` | No | Direct `@abi/exponential-staking` import — compiled TS stays |
| `buybacks.ts` | No | Direct `@abi/erc20` import — compiled TS stays |
| `governance.ts` | No | Direct `@abi/*` imports — compiled TS stays |

---

## Implementation Order

1. **Phase 1** — `schema.graphql` changes, migration, DB writes in notify functions
2. **Phase 2** — NotificationLog table, DB-backed dedup replacing in-memory Sets
3. **Phase 5a** — BACKFILL mode (write-only, no notifications)
4. **Deploy + Backfill** — Start collecting data, fill historical tables
5. **Phase 3** — Set up alert config DB, define schema, populate initial rules
6. **Phase 4** — Config loading, rule evaluation, shadow mode
7. **Phase 6** — Validate, switch over, clean up
