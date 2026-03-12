# Code-Driven Processors

This directory contains processors with custom `process()` logic that cannot be expressed as database alert rules.

## Current Topics

- **`ogn-alerts/`** — OGN staking alerts with custom APY and milestone detection logic
- **`ogn-buybacks/`** — OGN buyback tracking with USD value calculations and monthly stats

These run alongside the config-driven alert processor on mainnet only.

## When to add a code-driven processor

Only add processors here when the alert requires business logic beyond what the config database supports (e.g., computing derived values, aggregating across multiple events, tracking state over time).

For standard event/trace monitoring, use the alert config database instead — see [CONTRIBUTE.md](../../CONTRIBUTE.md).
