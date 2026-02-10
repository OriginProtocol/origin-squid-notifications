import winston from 'winston'
import LokiTransport from 'winston-loki'

const lokiUrl = process.env.LOKI_URL
const lokiUser = process.env.LOKI_USER
const lokiApiKey = process.env.LOKI_API_KEY

export interface LokiLabels {
  topic: string
  severity: string
  chain: string
  address: string
  address_name?: string
  notification_type: 'event' | 'trace' | 'transaction'
  notification_name?: string
}

export interface LokiEntry {
  timestamp: number
  sortId: string
  labels: LokiLabels
  entry: Record<string, unknown>
}

const logger = lokiUrl
  ? winston.createLogger({
      transports: [
        new LokiTransport({
          host: lokiUrl,
          labels: { app: 'origin-squid-notifications' },
          json: true,
          basicAuth: lokiUser && lokiApiKey ? `${lokiUser}:${lokiApiKey}` : undefined,
          format: winston.format.json(),
          replaceTimestamp: true,
          onConnectionError: (err: unknown) => console.error('Loki connection error:', err),
          batching: true,
          interval: 5,
        }),
      ],
    })
  : null

let messageQueue: Map<string, LokiEntry> = new Map()

export const notifyLoki = (entry: LokiEntry) => {
  if (!logger) return
  if (messageQueue.has(entry.sortId)) {
    console.error(`Duplicate Loki entry: ${entry.sortId}`)
    return
  }
  messageQueue.set(entry.sortId, entry)
}

export const processLokiQueue = async () => {
  if (!logger || messageQueue.size === 0) return
  const entries = [...messageQueue.values()]
  messageQueue.clear()

  for (const entry of entries) {
    const payload = Object.fromEntries(
      Object.entries(entry.entry).map(([k, v]) => [k, typeof v === 'bigint' ? v.toString() : v]),
    )
    logger.info({
      message: JSON.stringify(payload, (_key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
      labels: {
        app: 'origin-squid-notifications',
        service_name: 'origin-squid-notifications',
        ...entry.labels,
      },
    })
  }
  console.log(`Queued ${entries.length} entries to Loki`)
}
