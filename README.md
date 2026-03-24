# Origin Subsquid - Notifications

This squid monitors blockchain events and traces across Ethereum mainnet, Base, and Sonic chains and sends notifications to Discord. Alert rules are stored in a config database and can be managed at runtime without redeployment.

### Composition

Deployed to Subsquid Cloud with:

- **3 Chain Processors** (mainnet, Base, Sonic) — each runs config-driven alerts + persistence
- **2 Code-Driven Processors** — OGN Alerts and OGN Buybacks (custom logic that can't be expressed as DB rules)
- **Squid Database** — EventRecord/TraceRecord tables for historical on-chain data
- **Alert Config Database** — alert rules, ABIs, topic definitions (managed separately)

> [!NOTE]
> Alerts based on metric thresholds should be created in Grafana using data from `origin-squid`.
>
> This project handles discrete on-chain event notifications:
> - Contract events (mints, burns, deposits, withdrawals, approvals, etc.)
> - Trace activity (function calls, failed transactions, self-destructs)
> - Governance proposals
> - Buyback swaps

### Package Manager

This project uses **pnpm** for dependency management:

```shell
npm install -g pnpm
```

### Frequent Commands

```shell
pnpm install                  # Install dependencies
pnpm run process              # Build & start mainnet processor
pnpm run process:base         # Build & start Base chain processor
pnpm run process:sonic        # Build & start Sonic chain processor
pnpm run resume               # Resume without rebuild/DB setup
pnpm run backfill             # Backfill historical data for alert rules
pnpm run digest-db            # Output all alert rules and processors
pnpm run generate-seed        # Regenerate seed-rules.sql from code-driven processors
pnpm run generate-abi-seed    # Regenerate seed-abis.sql from abi/*.json files
pnpm run prettier-fix         # Format code
```

#### Environment Variables

```shell
BLOCK_FROM=123456 pnpm run process                    # Start from specific block
PROCESSOR=Buyback pnpm run process                    # Filter code-driven processors
ALERT="Lido ARM" pnpm run process                     # Filter config-driven alert rules
ALERT_CONFIG_DB_MIGRATION=true pnpm run process       # Run DB migration on startup
```

#### Deploy

> [!NOTE]
> Use `--update` deploys to prevent gaps in processing.

```shell
sqd deploy . --update
```

### [How to contribute](CONTRIBUTE.md)

<img alt="neo-ai.png" height="300" src="neo-ai.png" width="300"/>
