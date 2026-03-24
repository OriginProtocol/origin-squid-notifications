import type { NotifyTarget, Severity, Topic } from '@notify/const'

// ─── Filter Expression Language ───────────────────────────────────────────────
//
// Filters are evaluated against decoded event/trace data (the decodedData,
// decodedInput, or decodedOutput JSON fields on EventRecord/TraceRecord).
//
// Supports nested AND/OR grouping with comparison operators on any field.
//
// Examples:
//
//   // Simple: amount >= 1 ETH
//   { field: "amount", op: "gte", value: "1000000000000000000" }
//
//   // AND: amount >= 1 ETH and recipient is not zero address
//   {
//     op: "AND",
//     conditions: [
//       { field: "amount", op: "gte", value: "1000000000000000000" },
//       { field: "to", op: "neq", value: "0x0000000000000000000000000000000000000000" }
//     ]
//   }
//
//   // OR: from is Alice or Bob
//   {
//     op: "OR",
//     conditions: [
//       { field: "from", op: "eq", value: "0xalice..." },
//       { field: "from", op: "eq", value: "0xbob..." }
//     ]
//   }
//
//   // Nested: (amount >= 1 ETH) AND (from is Alice OR from is Bob)
//   {
//     op: "AND",
//     conditions: [
//       { field: "amount", op: "gte", value: "1000000000000000000" },
//       {
//         op: "OR",
//         conditions: [
//           { field: "from", op: "eq", value: "0xalice..." },
//           { field: "from", op: "eq", value: "0xbob..." }
//         ]
//       }
//     ]
//   }

export type ComparisonOp =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'in'
  | 'notIn'

export interface FieldCondition {
  field: string // dot-path into decoded data, e.g. "amount", "from", "args.value"
  op: ComparisonOp
  value: string | string[] // string[] for "in" / "notIn" operators
}

export interface GroupCondition {
  op: 'AND' | 'OR'
  conditions: FilterExpression[]
}

export type FilterExpression = FieldCondition | GroupCondition

// ─── Alert Rule ───────────────────────────────────────────────────────────────

export interface AlertRule {
  id: string
  enabled: boolean
  chainId: number

  matchType: 'event' | 'trace'

  // Matching criteria (null/undefined = match any)
  addresses: string[] | null
  topic0s: string[] | null // event signature hashes
  topic1s: string[] | null // first indexed param
  topic2s: string[] | null // second indexed param
  topic3s: string[] | null // third indexed param
  sighashes: string[] | null // function selectors

  // Trace-specific matching (null = any, ignored for event rules)
  traceType: string[] | null // 'call', 'create', 'suicide', 'reward'
  callFrom: string[] | null // caller addresses
  callTo: string[] | null // callee addresses
  suicideRefundAddress: string[] | null
  traceError: boolean | null // true = only failed traces

  // Conditions on decoded data
  dataFilters: FilterExpression | null

  // Notification routing
  topic: Topic
  severity: Severity
  notifyTargets: NotifyTarget | null

  // Subscription options
  transactionLogs: boolean

  // Display
  displayName: string | null
  description: string | null
}

export type RendererMode = 'default' | 'template'

export type TemplateFieldFormat = 'auto' | 'address' | 'txHash' | 'timestamp' | 'raw'

export interface TemplateRendererField {
  id: string
  label: string
  path: string
  inline?: boolean
  format?: TemplateFieldFormat
  hideIfEmpty?: boolean
}

export interface TemplateRendererConfig {
  titleTemplate?: string
  descriptionTemplate?: string
  fields?: TemplateRendererField[]
}

export interface RendererRecord {
  id: string
  name: string
  mode: RendererMode
  chainId: number | null
  matchType: 'event' | 'trace'
  abiNames: string[] | null
  contractAddresses: string[] | null
  topic0: string | null
  sighash: string | null
  configJson: TemplateRendererConfig | Record<string, unknown> | null
}

// ─── Contract Info ────────────────────────────────────────────────────────────

export interface ContractInfo {
  address: string
  chainId: number
  name: string
  product: string | null
  tags: string[] | null
}
