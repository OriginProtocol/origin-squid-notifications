import type { FieldCondition, FilterExpression, GroupCondition } from './types'

/**
 * Evaluate a filter expression against decoded data.
 * Returns true if the data matches the filter.
 */
export const evaluateFilter = (filter: FilterExpression | null | undefined, data: unknown): boolean => {
  if (!filter) return true // No filter = match everything
  if ('field' in filter) return evaluateFieldCondition(filter, data)
  return evaluateGroupCondition(filter, data)
}

const evaluateGroupCondition = (group: GroupCondition, data: unknown): boolean => {
  if (group.op === 'AND') {
    return group.conditions.every((c) => evaluateFilter(c, data))
  }
  return group.conditions.some((c) => evaluateFilter(c, data))
}

const evaluateFieldCondition = (condition: FieldCondition, data: unknown): boolean => {
  const fieldValue = getField(data, condition.field)
  if (fieldValue === undefined) return false

  const fieldStr = String(fieldValue)

  switch (condition.op) {
    case 'eq':
      return fieldStr.toLowerCase() === String(condition.value).toLowerCase()
    case 'neq':
      return fieldStr.toLowerCase() !== String(condition.value).toLowerCase()
    case 'gt':
      return compareBigIntSafe(fieldStr, String(condition.value)) > 0
    case 'gte':
      return compareBigIntSafe(fieldStr, String(condition.value)) >= 0
    case 'lt':
      return compareBigIntSafe(fieldStr, String(condition.value)) < 0
    case 'lte':
      return compareBigIntSafe(fieldStr, String(condition.value)) <= 0
    case 'contains':
      return fieldStr.toLowerCase().includes(String(condition.value).toLowerCase())
    case 'startsWith':
      return fieldStr.toLowerCase().startsWith(String(condition.value).toLowerCase())
    case 'endsWith':
      return fieldStr.toLowerCase().endsWith(String(condition.value).toLowerCase())
    case 'in':
      return Array.isArray(condition.value) && condition.value.some((v) => fieldStr.toLowerCase() === v.toLowerCase())
    case 'notIn':
      return Array.isArray(condition.value) && !condition.value.some((v) => fieldStr.toLowerCase() === v.toLowerCase())
    default:
      return false
  }
}

/**
 * Resolve a dot-path field from nested data.
 * e.g. getField({ args: { value: 100 } }, "args.value") => 100
 */
const getField = (data: unknown, path: string): unknown => {
  if (data == null) return undefined
  const parts = path.split('.')
  let current: unknown = data
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

/**
 * Compare two values as BigInts if possible, falling back to string comparison.
 * This handles wei amounts, block numbers, and other large numeric values.
 */
const compareBigIntSafe = (a: string, b: string): number => {
  try {
    const aBig = BigInt(a)
    const bBig = BigInt(b)
    if (aBig < bBig) return -1
    if (aBig > bBig) return 1
    return 0
  } catch {
    return a.localeCompare(b)
  }
}
