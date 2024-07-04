import { WebhookClient, WebhookMessageCreateOptions } from 'discord.js'

import { Severity, Topic, severityEmojis, topicThumbnails } from './const'

const url = process.env[process.env.DISCORD_WEBHOOK_URL_ENV ?? 'DISCORD_WEBHOOK_URL'] ?? ''

export const discordClient = url ? new WebhookClient({ url }) : undefined
let messageQueue: WebhookMessageCreateOptions[] = []

export interface DiscordOptions {
  title: string
  description: string
  files?: WebhookMessageCreateOptions['files']
  severity?: Severity
  topic?: Topic
  links?: Record<string, string>
  mentions?: string[]
}

export const processDiscordQueue = async () => {
  for (const message of messageQueue) {
    await sendMessage(message)
  }
  messageQueue = []
}

export const sendMessage = async (message: WebhookMessageCreateOptions, retries = 3) => {
  try {
    await discordClient?.send(message)
  } catch (err) {
    if (retries > 0) {
      await sendMessage(message, retries - 1)
    }
    throw err
  }
}

export const notifyDiscord = ({
  title,
  description,
  files,
  severity = 'low',
  topic,
  links,
  mentions,
}: DiscordOptions) => {
  const linkString = links
    ? '   |   ' +
      Object.entries(links)
        .map(([title, link]) => `[${title}](<${link}>)`)
        .join('   |   ')
    : ''
  let mentionString = mentions ? '   |   ' + mentions.join(' ') : ''
  if (process.env.DISCORD_MENTION_OVERRIDE) {
    mentionString = `   |   ${process.env.DISCORD_MENTION_OVERRIDE}`
  }
  const content = `
### ${severityEmojis[severity]}   ${title}${linkString}${mentionString}
${description}
    `
    .trim()
    .slice(0, 2000)

  const payload: WebhookMessageCreateOptions = {
    username: topic,
    avatarURL: topic ? topicThumbnails[topic] : undefined,
    content,
    files,
    allowedMentions: {
      parse: ['users', 'roles'],
    },
  }
  messageQueue.push(payload)
}
