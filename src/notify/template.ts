import type { AlertRule, RendererRecord, TemplateFieldFormat, TemplateRendererConfig } from '../alert-config'
import { transactionLink } from '../utils/links'
import { severityColors } from './const'
import { notifyDiscord } from './discord'
import type { EventRendererParams } from './event/event'
import { formatAddress, formatValue } from './format'
import type { NotifyForTraceInput } from './trace'

type TemplateContext = {
  decoded: Record<string, unknown>
  meta: Record<string, unknown>
  rule: Record<string, unknown>
}

export const isTemplateRenderer = (renderer: RendererRecord | null | undefined): boolean =>
  !!renderer && renderer.mode === 'template'

export const createEventTemplateRenderer =
  (renderer: RendererRecord, rule: AlertRule) =>
  async (params: EventRendererParams): Promise<void> => {
    const config = normalizeTemplateConfig(renderer.configJson)
    const decoded = safeDecode(params.event, params.log)
    const meta = {
      chainId: params.ctx.chain.id,
      blockNumber: params.log.block.height,
      contractAddress: params.log.address,
      txHash: params.log.transactionHash,
      txIndex: params.log.transactionIndex,
      logIndex: params.log.logIndex,
      timestamp: params.log.block.timestamp,
      eventName: params.eventName,
      selector: params.event.topic,
    }

    notifyDiscord({
      sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
      topic: params.topic,
      severity: params.severity ?? 'low',
      embeds: [
        {
          color: severityColors[params.severity ?? 'low'],
          title:
            interpolateTemplate(config.titleTemplate, { decoded, meta, rule: toRuleTemplateContext(rule) }) ??
            `${params.name ?? rule.displayName ?? rule.topic} - ${params.eventName}`,
          url: transactionLink(params.log.transactionHash, params.ctx.chain),
          description:
            interpolateTemplate(config.descriptionTemplate, {
              decoded,
              meta,
              rule: toRuleTemplateContext(rule),
            }) ??
            rule.description ??
            undefined,
          fields: buildFields(config, { decoded, meta, rule: toRuleTemplateContext(rule) }, params.ctx.chain),
        },
      ],
      mentions: params.notifyTarget?.discordMentions,
    })
  }

export const createTraceTemplateRenderer =
  (renderer: RendererRecord, rule: AlertRule) =>
  async (input: NotifyForTraceInput): Promise<void> => {
    const config = normalizeTemplateConfig(renderer.configJson)
    const decoded =
      (input.functionData && typeof input.functionData === 'object' && !Array.isArray(input.functionData)
        ? (input.functionData as Record<string, unknown>)
        : { value: input.functionData }) ?? {}

    const meta = {
      chainId: input.ctx.chain.id,
      blockNumber: input.trace.block.height,
      contractAddress: input.trace.type === 'call' ? input.trace.action.to : input.trace.transaction?.to,
      txHash: input.trace.transaction?.hash,
      traceAddress: JSON.stringify(input.trace.traceAddress),
      timestamp: input.trace.block.timestamp,
      functionName: input.functionName ?? input.trace.type,
      selector: input.trace.type === 'call' ? input.trace.action.sighash : undefined,
      error: input.trace.error ?? undefined,
      fromAddress: input.trace.type === 'call' ? input.trace.action.from : undefined,
      toAddress: input.trace.type === 'call' ? input.trace.action.to : undefined,
    }

    notifyDiscord({
      sortId: `${input.trace.block.height}:${input.trace.transactionIndex}:${JSON.stringify(input.trace.traceAddress)}`,
      topic: input.topic,
      severity: input.severity ?? 'low',
      embeds: [
        {
          color: severityColors[input.severity ?? 'low'],
          title:
            interpolateTemplate(config.titleTemplate, { decoded, meta, rule: toRuleTemplateContext(rule) }) ??
            `${input.name ?? rule.displayName ?? rule.topic} - ${input.functionName ?? input.trace.type}`,
          url: input.trace.transaction?.hash
            ? transactionLink(input.trace.transaction.hash, input.ctx.chain)
            : undefined,
          description:
            interpolateTemplate(config.descriptionTemplate, {
              decoded,
              meta,
              rule: toRuleTemplateContext(rule),
            }) ??
            rule.description ??
            undefined,
          fields: buildFields(config, { decoded, meta, rule: toRuleTemplateContext(rule) }, input.ctx.chain),
        },
      ],
      mentions: input.notifyTarget?.discordMentions,
    })
  }

function normalizeTemplateConfig(configJson: RendererRecord['configJson']): TemplateRendererConfig {
  if (configJson && typeof configJson === 'object' && !Array.isArray(configJson)) {
    return configJson as TemplateRendererConfig
  }
  return {}
}

function buildFields(
  config: TemplateRendererConfig,
  context: TemplateContext,
  chain: EventRendererParams['ctx']['chain'],
) {
  return (config.fields ?? [])
    .map((field) => {
      const rawValue = getPathValue(context, field.path)
      if (field.hideIfEmpty && isEmpty(rawValue)) return null
      return {
        name: field.label || field.path,
        value: formatTemplateField(rawValue, field.format ?? 'auto', chain),
        inline: field.inline ?? true,
      }
    })
    .filter((field): field is NonNullable<typeof field> => !!field)
    .slice(0, 25)
}

function formatTemplateField(
  value: unknown,
  format: TemplateFieldFormat,
  chain: EventRendererParams['ctx']['chain'],
): string {
  if (value == null) return '_null_'
  if (format === 'timestamp') {
    const timestamp = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(timestamp)) {
      return `<t:${Math.floor(timestamp / 1000)}:R>`
    }
  }
  if (format === 'txHash' && typeof value === 'string') {
    return `[${value.slice(0, 10)}...${value.slice(-6)}](${transactionLink(value, chain)})`
  }
  if (format === 'address' && typeof value === 'string') {
    return formatAddress(value, chain)
  }
  if (format === 'raw') {
    return typeof value === 'string' ? value : JSON.stringify(value)
  }
  return formatValue(value, undefined, chain)
}

function interpolateTemplate(template: string | undefined, context: TemplateContext): string | undefined {
  if (!template?.trim()) return undefined
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, path) =>
    stringifyTemplateValue(getPathValue(context, path)),
  )
}

function stringifyTemplateValue(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value)
  if (Array.isArray(value)) return value.map((item) => stringifyTemplateValue(item)).join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function getPathValue(source: unknown, path: string): unknown {
  return path
    .split('.')
    .filter(Boolean)
    .reduce<unknown>((current, key) => {
      if (current == null || typeof current !== 'object') return undefined
      return (current as Record<string, unknown>)[key]
    }, source)
}

function isEmpty(value: unknown): boolean {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0)
}

function safeDecode(event: EventRendererParams['event'], log: EventRendererParams['log']): Record<string, unknown> {
  try {
    const decoded = event.decode(log)
    if (decoded && typeof decoded === 'object' && !Array.isArray(decoded)) {
      return decoded as Record<string, unknown>
    }
    return decoded == null ? {} : { value: decoded }
  } catch {
    return {}
  }
}

function toRuleTemplateContext(rule: AlertRule): Record<string, unknown> {
  return {
    id: rule.id,
    topic: rule.topic,
    severity: rule.severity,
    displayName: rule.displayName,
    description: rule.description,
    chainId: rule.chainId,
    matchType: rule.matchType,
  }
}
