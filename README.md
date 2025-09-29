# Origin Subsquid - Notifications

This squid is strictly for creating notifications which will feed into Discord or wherever else we need.

### Composition

This squid is deployed to subsquid cloud. It contains:

- 1 Processor
  - The processor triggers the notifications.
- 1 Database
  - The database is hardly used and should rarely if not ever be updated.

> [!NOTE]
> Alerts which are based on metric thresholds should likely be created in Grafana using data from `origin-squid`.
>
> Ideal notifications for this project:
>
> - Governance Proposal Activity
> - Mints & Burns
> - Buyback swaps
> - Strategist updates
> - Strategy deposits/withdrawals
> - Events
> - Trace activity

### Package Manager

This project uses **pnpm** for dependency management with enhanced security settings. Make sure you have pnpm installed:

```shell
npm install -g pnpm
```

### Frequent Commands

#### Install dependencies

```shell
pnpm install
```

#### Start processing from the latest block

```shell
pnpm run process
```

#### Start processing from block number 123456

```shell
BLOCK_FROM=123456 pnpm run process
```

#### Resume processing from where you last stopped

```shell
pnpm run resume
```

#### Generate ABIs

```shell
pnpm run generate-abis
```

#### Generate Digest

```shell
pnpm run digest
```

#### Deploy

> [!NOTE]
> We want to do update deploys to prevent gaps in processing.

```shell
sqd deploy . --update
```

### [How to contribute](CONTRIBUTE.md)

<img alt="neo-ai.png" height="300" src="neo-ai.png" width="300"/>
