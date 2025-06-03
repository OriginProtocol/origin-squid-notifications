# Processor Organization Guide

This directory contains all notification processors organized by topic/protocol. Each topic sends notifications to different webhook URLs/Discord channels based on the `notifyTarget` configuration.

## Directory Structure

### Single-File Topics

For simpler topics with fewer processors, use a single file:

- `arm.ts` - ARM protocol processors
- `prime-eth.ts` - PrimeETH protocol processors

### Multi-File Topics

For complex topics with many processors, organize into subdirectories:

#### Example: `governance/`

```
governance/
├── index.ts       # Exports from all chain-specific files + shared logic
├── mainnet.ts     # Mainnet governance processors
├── base.ts        # Base chain governance processors
├── plume.ts       # Plume chain governance processors
└── os.ts          # Origin Story governance (existing file)
```

#### Example: `superoethb/`

```
superoethb/
├── index.ts           # Exports from all component files
├── core-contracts.ts  # Token, vault, zapper, burns
├── strategies.ts      # All strategy contracts
├── aerodrome.ts       # Aerodrome pools and incentives
└── error-tracing.ts   # Error monitoring
```

#### Example: `oeth/`

```
oeth/
├── index.ts              # Exports from all component files
├── core-contracts.ts     # Token, vault, zapper, buyback, burns
├── strategies.ts         # Native staking + Curve AMO strategies
├── curve-governance.ts   # Aragon voting processors
└── error-tracing.ts      # Error monitoring
```

#### Example: `ousd/`

```
ousd/
├── index.ts                # Exports from all component files
├── core-contracts.ts       # Token, vault, buyback, burns
├── strategies.ts           # Morpho, Maker, Gauntlet, Sky, Curve strategies
├── external-governance.ts  # Aave governance monitoring
└── error-tracing.ts        # Error monitoring
```

#### Example: `superoethp/`

```
superoethp/
├── index.ts           # Exports from all component files
├── core-contracts.ts  # Token, vault, burns (Plume chain)
├── strategies.ts      # Bridged WOETH strategy
└── error-tracing.ts   # Error monitoring
```

#### Example: `os/`

```
os/
├── index.ts           # Exports from all component files
├── core-contracts.ts  # Token, vault, zapper, burns (Sonic chain)
├── strategies.ts      # Ready for future strategies
└── error-tracing.ts   # Error monitoring
```

## Organization Patterns

### By Chain

When processors differ significantly by blockchain:

- `mainnet.ts`, `base.ts`, `plume.ts`, `sonic.ts`
- All processors in each file use the same `chainId`
- Same `topic` and often same `notifyTarget`

### By Component/Protocol

When processors group logically by functionality:

- `core-contracts.ts` - Core protocol contracts (token, vault, etc.)
- `strategies.ts` - Investment/yield strategies
- `pools.ts` - DEX pools and liquidity
- `governance.ts` - Governance and admin functions
- `error-tracing.ts` - Error monitoring and alerts

### By Notification Target

When different parts of a protocol go to different teams:

- `engineering.ts` - High severity, technical alerts → Engineering team
- `operations.ts` - Business metrics → Operations team
- `community.ts` - User-facing events → Community channels

## Maintenance Guidelines

### When to Split a File

Consider splitting when:

- File exceeds ~200 lines
- Processors serve different purposes
- Different notification targets
- Different chains with distinct logic

### File Naming

- Use `kebab-case` for filenames
- Be descriptive: `aerodrome-pools.ts` not `pools.ts`
- Chain names: `mainnet.ts`, `base.ts`, `plume.ts`

### Index File Pattern

Always use this pattern in `index.ts`:

```typescript
// Export all processors from organized subfiles
export * from './mainnet'
export * from './base'
export * from './strategies'
// ... etc
```

### Comments and Organization

- Group related processors with comments
- Use consistent naming patterns
- Document notification targets for each group

## Notification Targets

Common patterns:

- `notifyTargets.Engineering` - Technical/operational alerts
- `notifyTargets.ContractsTeam` - Smart contract events
- `notifyTargets.chris` - Development/testing
- Default (no target) - General notifications

## Organized Topics Summary

### ✅ Fully Organized Topics:

- **Governance** → Chain-specific organization (mainnet, base, plume, os)
- **SuperOETHb** → Component-based (core-contracts, strategies, aerodrome, error-tracing)
- **OETH** → Component-based (core-contracts, strategies, curve-governance, error-tracing)
- **OUSD** → Component-based (core-contracts, strategies, external-governance, error-tracing)
- **SuperOETHp** → Component-based (core-contracts, strategies, error-tracing)
- **OS** → Component-based (core-contracts, strategies, error-tracing)

### 📝 Single-File Topics (Appropriate Size):

- **ARM** - Simple protocol, minimal processors
- **Prime ETH** - Single chain, focused functionality
- **OGN** - Could be organized if it grows significantly
- **xOGN** - Could be organized if it grows significantly

## Examples

### Simple Topic (single file)

```typescript
// arm.ts
createEventProcessor({
  name: 'ARM Protocol',
  chainId: 1,
  topic: 'ARM',
  // ... processor config
})
```

### Complex Topic (organized)

```typescript
// superoethb/index.ts
export * from './core-contracts'
export * from './strategies'
export * from './aerodrome'

// superoethb/core-contracts.ts
createOTokenProcessor({
  name: 'superOETHb Contract',
  topic: 'superOETHb',
  // ...
})
```
