# Contributing

## Requirements

- Node.js *(v20+)*
- Docker
- Copy `dev.env` to `.env` and fill in the empty values
- Run `pnpm install` to install dependencies

## Local execution

```shell
# Build the code, spin-up docker-compose, and start processing
pnpm run process
```

## Adding notifications

Most notifications are managed through **alert rules** in the config database, not code.

### Config-driven alerts (preferred)

1. Ensure the contract ABI is loaded:
   ```shell
   pnpm run fetch-abi <address> <name> [chain]    # Saves to abi/<name>.json
   pnpm run generate-abi-seed                      # Regenerates seed-abis.sql
   ```

2. Create an alert rule via the [admin UI](`https://github.com/oplabs/alert-config-admin`) or insert directly into the `alert_rule` table with:
   - `chain_id` — 1 (mainnet), 8453 (base), 146 (sonic)
   - `match_type` — `event` or `trace`
   - `addresses` — contract addresses to watch
   - `topic0s` — event signatures to match
   - `topic` — Discord channel (OETH, OUSD, ARM, etc.)
   - `severity` — low, medium, high, critical, broken, highlight

3. Rules are cached for 5 minutes — changes take effect without redeployment.

### Code-driven processors

For alerts requiring custom business logic (e.g., OGN buybacks with USD calculations), add processors in `src/topics/`. See `src/topics/ogn-buybacks/` for an example.

## `pnpm run process` examples

```shell
# Start processing at a specific block
BLOCK_FROM=12345678 pnpm run process

# Filter code-driven processors by name
PROCESSOR=Buyback pnpm run process

# Filter config-driven alert rules by name
ALERT="Lido ARM" pnpm run process
```

## Deployment

The `v3` branch auto-deploys to Subsquid Cloud. To deploy:

1. Merge your feature branch into `main`
2. Merge `main` into `v3`

Manual deploy (requires updating `squid.yaml` first):
```shell
sqd deploy . --update     # Deploy to Subsquid Cloud (use --update to prevent gaps)
```

## Adding human-readable address names

For new contract addresses, either:
- Add entries to `CONTRACT_ADDR_TO_NAME` in `src/utils/addresses/names.ts`
- Add them to the `wallet_label` table in the Railway database
