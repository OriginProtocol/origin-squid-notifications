import { EmbedBuilder, WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

import { Severity, Topic, severityEmojis, topicThumbnails } from './const'

const webhookUrls: Record<Topic, string> = {
  OGN: process.env['DISCORD_WEBHOOK_URL_OGN'] ?? '',
  OETH: process.env['DISCORD_WEBHOOK_URL_OETH'] ?? '',
  OUSD: process.env['DISCORD_WEBHOOK_URL_OUSD'] ?? '',
  xOGN: process.env['DISCORD_WEBHOOK_URL_XOGN'] ?? '',
  primeETH: process.env['DISCORD_WEBHOOK_URL_PRIME_ETH'] ?? '',
}

const clients: Record<Topic, WebhookClient | undefined> = {
  OGN: new WebhookClient({ url: webhookUrls.OGN }),
  OETH: new WebhookClient({ url: webhookUrls.OETH }),
  OUSD: new WebhookClient({ url: webhookUrls.OUSD }),
  xOGN: new WebhookClient({ url: webhookUrls.xOGN }),
  primeETH: new WebhookClient({ url: webhookUrls.primeETH }),
}

let messageQueue: Map<string, { topic: Topic; data: WebhookMessageCreateOptions }> = new Map()

export interface DiscordOptions {
  id: string
  title?: string
  description?: string
  embeds?: EmbedBuilder[]
  files?: WebhookMessageCreateOptions['files']
  severity?: Severity
  topic: Topic
  links?: Record<string, string>
  mentions?: string[]
}

export const processDiscordQueue = async () => {
  for (const message of messageQueue.values()) {
    await sendMessage(message.topic, message.data)
  }
  messageQueue.clear()
}

export const sendMessage = async (topic: Topic, message: WebhookMessageCreateOptions, retries = 3) => {
  try {
    await clients[topic]?.send(message)
  } catch (err) {
    if (retries > 0) {
      await sendMessage(topic, message, retries - 1)
    }
    throw err
  }
}

export const notifyDiscord = ({
  id,
  title,
  description,
  embeds,
  files,
  severity = 'low',
  topic,
  links,
  mentions,
}: DiscordOptions) => {
  let content = ''
  const linkString = links
    ? '   |   ' +
      Object.entries(links)
        .map(([title, link]) => `[${title}](<${link}>)`)
        .join('   |   ')
    : ''
  let mentionString = mentions ? '   |   ' + mentions.join(' ') : ''
  if (mentions?.length && process.env.DISCORD_MENTION_OVERRIDE) {
    mentionString = `   |   ${process.env.DISCORD_MENTION_OVERRIDE}`
  }

  if (title) {
    content = `### ${severityEmojis[severity]}   ${title}${linkString}${mentionString}`
  }
  if (description) {
    content += `\n${description}`
  }
  content = content.trim().slice(0, 2000)

  const payload: WebhookMessageCreateOptions = {
    username: topic,
    avatarURL: topic ? topicThumbnails[topic] : undefined,
    content,
    files,
    allowedMentions: {
      parse: ['users', 'roles'],
    },
    embeds,
  }
  messageQueue.set(id, { topic, data: payload })
}
