import { EmbedBuilder, EmbedData, WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

import { Severity, Topic, severityEmojis, topicThumbnails } from './const'

const url = process.env[process.env.DISCORD_WEBHOOK_URL_ENV ?? 'DISCORD_WEBHOOK_URL'] ?? ''
const primeURL = process.env['DISCORD_WEBHOOK_URL_PRIME_ETH'] ?? ''

const discordClient = url ? new WebhookClient({ url }) : undefined
const discordClientPrimeEth = primeURL ? new WebhookClient({ url: primeURL }) : undefined

const clients: Record<Topic, WebhookClient | undefined> = {
  OGN: discordClient,
  OETH: discordClient,
  OUSD: discordClient,
  xOGN: discordClient,
  primeETH: discordClientPrimeEth,
}

let messageQueue: { topic: Topic; data: WebhookMessageCreateOptions }[] = []

export interface DiscordOptions {
  title: string
  description?: string
  embeds?: EmbedBuilder[]
  files?: WebhookMessageCreateOptions['files']
  severity?: Severity
  topic: Topic
  links?: Record<string, string>
  mentions?: string[]
}

export const processDiscordQueue = async () => {
  for (const message of messageQueue) {
    await sendMessage(message.topic, message.data)
  }
  messageQueue = []
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
  title,
  description,
  embeds,
  files,
  severity = 'low',
  topic,
  links,
  mentions,
}: DiscordOptions) => {
  let content
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

  if (description) {
    content = `
### ${severityEmojis[severity]}   ${title}${linkString}${mentionString}
${description}
    `
      .trim()
      .slice(0, 2000)
  }

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
  messageQueue.push({ topic, data: payload })
}
