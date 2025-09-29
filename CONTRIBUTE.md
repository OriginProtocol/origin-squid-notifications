# Contributing

## Requirements

- Node.js *(wrote using v20)*
- Docker
- Copy `dev.env` to `.env` and fill in the empty values
- Run `pnpm install` to install dependencies

## Local execution

```shell
# Build the code, spin-up docker-compose, and start processing
pnpm run process
```

## Adding notifications

Notifications are triggered through `processors` located at: [src/processors](src/processors)

1. View existing processors in [src/processors](src/processors)
2. Follow the patterns shown within to create a processor of your own.
3. If you need more raw control of things you can copy from [this example](src/processors/examples/example.ts)

If the ABI you require does not exist:

1. Add ABI JSON to `abi/`
2. Run `pnpm run generate-abis`
    - The ABI will be created within `src/abi/`

## `pnpm run process` examples

```shell
# Start processing at a specific block
BLOCK_FROM=12345678 pnpm run process
```

```shell
# Start processors matching a certain name
PROCESSOR=Burn pnpm run process
```

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