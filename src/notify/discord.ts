import { APIEmbed, WebhookClient, WebhookMessageCreateOptions } from 'discord.js'
import { sortBy } from 'lodash'

import { Severity, Topic, severityEmojis, topicThumbnails } from './const'

const webhookUrls: Record<Topic, string> = {
  Governance: process.env['DISCORD_WEBHOOK_URL_GOVERNANCE'] ?? '',
  OGN: process.env['DISCORD_WEBHOOK_URL_OGN'] ?? '',
  'OGN Alerts': process.env['DISCORD_WEBHOOK_URL_OGN_ALERTS'] ?? '',
  'OGN Buybacks': process.env['DISCORD_WEBHOOK_URL_OGN_BUYBACKS'] ?? '',
  OETH: process.env['DISCORD_WEBHOOK_URL_OETH'] ?? '',
  superOETHb: process.env['DISCORD_WEBHOOK_URL_SUPER_OETH_B'] ?? '',
  superOETHp: process.env['DISCORD_WEBHOOK_URL_SUPER_OETH_P'] ?? '',
  OUSD: process.env['DISCORD_WEBHOOK_URL_OUSD'] ?? '',
  xOGN: process.env['DISCORD_WEBHOOK_URL_XOGN'] ?? '',
  primeETH: process.env['DISCORD_WEBHOOK_URL_PRIME_ETH'] ?? '',
  ARM: process.env['DISCORD_WEBHOOK_URL_ARM'] ?? '',
  OS: process.env['DISCORD_WEBHOOK_URL_OS'] ?? '',
}

const clients: Record<Topic, WebhookClient | undefined> = {
  Governance: new WebhookClient({ url: webhookUrls.Governance }),
  OGN: new WebhookClient({ url: webhookUrls.OGN }),
  'OGN Alerts': new WebhookClient({ url: webhookUrls['OGN Alerts'] }),
  'OGN Buybacks': new WebhookClient({ url: webhookUrls['OGN Buybacks'] }),
  OETH: new WebhookClient({ url: webhookUrls.OETH }),
  superOETHb: new WebhookClient({ url: webhookUrls.superOETHb }),
  superOETHp: new WebhookClient({ url: webhookUrls.superOETHp }),
  OUSD: new WebhookClient({ url: webhookUrls.OUSD }),
  xOGN: new WebhookClient({ url: webhookUrls.xOGN }),
  primeETH: new WebhookClient({ url: webhookUrls.primeETH }),
  ARM: new WebhookClient({ url: webhookUrls.ARM }),
  OS: new WebhookClient({ url: webhookUrls.OS }),
}

let messageQueue: Map<string, { topic: Topic; data: WebhookMessageCreateOptions }> = new Map()

export interface DiscordOptions {
  sortId: string
  title?: string
  description?: string
  embeds?: APIEmbed[]
  files?: WebhookMessageCreateOptions['files']
  severity?: Severity
  topic: Topic
  links?: Record<string, string>
  mentions?: string[]
  flags?: WebhookMessageCreateOptions['flags']
}

export const processDiscordQueue = async () => {
  const sortedMessageEntries = sortBy([...messageQueue.entries()], (e) => e[0])
  for (const [sortId, message] of sortedMessageEntries) {
    console.log(`Sending message id: ${sortId}`)
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
  sortId,
  title,
  description,
  embeds,
  files,
  severity = 'low',
  topic,
  links,
  mentions,
  flags,
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
    flags,
  }
  if (messageQueue.has(sortId)) {
    console.error(`Duplicate message received: ${sortId}`)
    console.log('Current payload:', payload)
    console.log('Existing payload:', messageQueue.get(sortId)?.data)
    return
  }
  messageQueue.set(sortId, { topic, data: payload })
}
