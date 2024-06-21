import {
  ComponentType,
  EmbedType,
  MessagePayload,
  RawFile,
  WebhookClient,
  WebhookMessageCreateOptions,
} from 'discord.js'

const url = process.env.DISCORD_WEBHOOK_URL ?? ''
const username = process.env.DISCORD_USERNAME ?? 'McFly'
const avatarURL =
  process.env.DISCORD_AVATAR_URL ??
  'https://files.oaiusercontent.com/file-UgvaKYuPD2VXj1e1qu5eMB56?se=2024-06-21T19%3A14%3A09Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D8646ef88-da99-48b1-a318-44c23beccfb1.webp&sig=xOvbmIU4Is1xrn1xCltCD0YIzXofNsr5SwhHQKosXFg%3D'

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

export const notify = async ({
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
