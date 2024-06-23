# Contributing

## Requirements

- Node.js *(wrote using v20)*
- Docker
- Copy `dev.env` to `.env` and fill in the empty values
- Run `npm ci` to install dependencies

## Local execution

```shell
# Spin down docker, spin up docker, apply db migration
yarn setup

# Build the code and start processing
yarn process
```

> [!WARNING]  
> If you do not run `setup` prior to `process` then the database will remember where you stopped your
> last execution. This means the next time you start `process` it may begin spamming for a lot of events which
> have happened since then.

## Adding notifications

Notifications are triggered through `processors` located at: [src/processors](src/processors)

1. Copy the [src/processors/template.ts](src/processors/example.ts) processor with a new name.
2. Update the `filter` (see [examples](#filtering-examples))
3. Update the `process` function
    - It is important to understand that this function will receive all blocks and logs from all the other processors.
      You *must* filter so that you only take action on what you care about within this processor.
4. Ensure the new processor is imported at [src/processors/index.ts](src/processors/index.ts)

If the ABI you require does not exist:

1. Add ABI JSON to `abi/` *(not `src/abi`)*
2. Run `sqd typegen`
    - The ABI will be created within `src/abi/`

## Filtering examples

Filter OGN transfers coming from an address:

```typescript
const filter = logFilter({
  address: [OGN_ADDRESS],
  topic0: [erc20.events.Transfer.topic],
  topic1: ['0x58890A9cB27586E83Cb51d2d26bbE18a1a647245'],
})
```

Filter OGN transfers going to multiple addresses:

```typescript
const filter = logFilter({
  address: [OGN_ADDRESS],
  topic0: [erc20.events.Transfer.topic],
  topic2: [
    '0x58890A9cB27586E83Cb51d2d26bbE18a1a647245',
    '0x0DD34c397384DE8f21F463096A360a0419D476E1'
  ],
})
```

Filter OGN and OGV transfers and approvals going to multiple addresses:

```typescript
const filter = logFilter({
  address: [
    OGN_ADDRESS,
    OGV_ADDRESS
  ],
  topic0: [
    erc20.events.Approval.topic,
    erc20.events.Transfer.topic,
  ],
  topic2: [
    '0x58890A9cB27586E83Cb51d2d26bbE18a1a647245',
    '0x0DD34c397384DE8f21F463096A360a0419D476E1'
  ],
})
```
