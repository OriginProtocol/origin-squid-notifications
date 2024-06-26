import { WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

const url = process.env[process.env.DISCORD_WEBHOOK_URL_ENV ?? 'DISCORD_WEBHOOK_URL'] ?? ''

const client = url ? new WebhookClient({ url }) : undefined

export type Severity = 'info' | 'warning' | 'error' | 'success' | 'broken'
const severityColors: Record<Severity, number> = {
  info: 0x2196f3,
  warning: 0xff9800,
  error: 0xf44336,
  success: 0x4caf50,
  broken: 0xf44356,
}
const severityEmojis: Record<Severity, string> = {
  info: ':information_source:',
  warning: ':warning:',
  error: ':bangbang:',
  success: ':white_check_mark:',
  broken: ':broken_heart:',
}

export type Topic = 'OGN' | 'xOGN' | 'OETH' | 'OUSD'
const topicThumbnails: Record<Topic, string> = {
  OGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  xOGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-xogn-logo.png',
  OETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-ether-oeth-logo.png',
  OUSD: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-dollar-ousd-logo.png',
}

export const notifyDiscord = async ({
  title,
  description,
  files,
  severity = 'info',
  topic,
  links,
}: {
  title: string
  description: string
  files?: WebhookMessageCreateOptions['files']
  severity?: 'info' | 'warning' | 'error' | 'success' | 'broken'
  topic?: Topic
  links?: Record<string, string>
}) => {
  const linkString = links
    ? '   |   ' +
      Object.entries(links)
        .map(([title, link]) => `[${title}](<${link}>)`)
        .join('   |   ')
    : ''
  const payload: WebhookMessageCreateOptions = {
    username: topic,
    avatarURL: topic ? topicThumbnails[topic] : undefined,
    content: `
### ${severityEmojis[severity]}   ${title}${linkString}
${description}
    `
      .trim()
      .slice(0, 2000),
    files,
  }
  await client?.send(payload)
}
