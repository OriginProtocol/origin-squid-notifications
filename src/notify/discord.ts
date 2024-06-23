import { WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

const url = process.env[process.env.DISCORD_WEBHOOK_URL_ENV ?? 'DISCORD_WEBHOOK_URL'] ?? ''
const username = process.env.DISCORD_USERNAME ?? 'McFly'
const client = new WebhookClient({ url })

export type Severity = 'info' | 'warning' | 'error' | 'success'
const severityColors: Record<Severity, number> = {
  info: 0x2196f3,
  warning: 0xff9800,
  error: 0xf44336,
  success: 0x4caf50,
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
  topic?: 'OGN' | 'xOGN' | 'OETH' | 'OUSD'
}) => {
  const payload: WebhookMessageCreateOptions = {
    username,
    avatarURL: topic ? topicThumbnails[topic] : undefined,
    content: `
**${title}**
${description}
    `.trim(),
    files,
  }
  await client.send(payload)
}
