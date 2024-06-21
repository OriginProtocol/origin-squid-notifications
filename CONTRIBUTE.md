# Contributing

## Requirements

- Node.js *(wrote using v20)*
- Docker
- Copy `dev.env` to `.env` and fill in the empty values
- Run `npm ci` to install dependencies

## Local Execution

```shell
# Spin down docker, spin up docker, apply db migration
yarn setup

# Build the code and start processing
yarn process
```

> **:Warning:** If you do not run `setup` prior to `process` then the database will remember where you stopped your
> last execution. This means the next time you start `process` it may begin spamming for a lot of events which
> have happened since then.

