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
> - Governance Proposal Activity
> - Mints & Burns
> - Buyback swaps
> - Strategist updates
> - Strategy deposits/withdrawals
> - Events
> - Trace activity

### Frequent Commands

#### Start processing from the latest block

```shell
npm run process
```

#### Start processing from block number 123456

```shell
BLOCK_FROM=123456 npm run process
```

#### Resume processing from where you last stopped

```shell
npm run resume
```

#### Generate ABIs

```shell
npm run generate-abis
```

#### Generate Digest

```shell
npm run digest
```

#### Deploy

> [!NOTE]
> We want to do update deploys to prevent gaps in processing.

```shell
sqd deploy . --update
```

### [How to contribute](CONTRIBUTE.md)

<img alt="neo-ai.png" height="300" src="neo-ai.png" width="300"/>
