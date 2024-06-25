import { WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

const url = process.env[process.env.DISCORD_WEBHOOK_URL_ENV ?? 'DISCORD_WEBHOOK_URL'] ?? ''

const client = url ? new WebhookClient({ url }) : undefined

export type Severity = 'info' | 'warning' | 'error' | 'success'
const severityColors: Record<Severity, number> = {
  info: 0x2196f3,
  warning: 0xff9800,
  error: 0xf44336,
  success: 0x4caf50,
}
const severityEmojis: Record<Severity, string> = {
  info: ':information_source:',
  warning: ':warning:',
  error: ':bangbang:',
  success: ':white_check_mark:',
}

export type Topic = 'OGN' | 'xOGN' | 'OETH' | 'OUSD'
const topicThumbnails: Record<Topic, string> = {
  OGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  xOGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-xogn-logo.webp',
  OETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-ether-oeth-logo.png',
  OUSD: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-dollar-ousd-logo.png',
}

export const notifyDiscord = async ({
  title,
  description,
  footer,
  files,
  severity = 'info',
  topic,
}: {
  title: string
  description: string
  files?: WebhookMessageCreateOptions['files']
  footer?: string
  severity?: 'info' | 'warning' | 'error' | 'success'
  topic?: Topic
}) => {
  const payload: WebhookMessageCreateOptions = {
    username: topic,
    avatarURL: topic ? topicThumbnails[topic] : undefined,
    content: `
## ${title}  ${severityEmojis[severity]}
${description}
    `
      .trim()
      .slice(0, 2000),
    files,
  }
  await client?.send(payload)
}
