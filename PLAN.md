# Plan: Persistent Alert Data & Configurable Filtering

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

## Implementation Order

1. **Phase 1** — `schema.graphql` changes, migration, DB writes in notify functions
2. **Phase 2** — NotificationLog table, DB-backed dedup replacing in-memory Sets
3. **Phase 5a** — BACKFILL mode (write-only, no notifications)
4. **Deploy + Backfill** — Start collecting data, fill historical tables
5. **Phase 3** — Set up alert config DB, define schema, populate initial rules
6. **Phase 4** — Config loading, rule evaluation, shadow mode
7. **Phase 6** — Validate, switch over, clean up
