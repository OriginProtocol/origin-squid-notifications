import { EmbedBuilder } from 'discord.js'

import { Severity, Topic, severityColors } from '../../const'
import { DiscordOptions, notifyDiscord } from '../../discord'

export const renderDiscordEmbed = (params: {
  id: string
  topic: Topic
  severity?: Severity
  title: string
  titleUrl: string
  description?: string
  fields?: { name: string; value: string; inline?: boolean }[]
}) => {
  params.severity = params.severity ?? 'low'
  const embed = new EmbedBuilder()
    .setColor(severityColors[params.severity])
    .setTitle(params.title)
    .setURL(params.titleUrl)

  if (params.description) {
    embed.setDescription(params.description)
  }
  if (params.fields && params.fields?.length > 0) {
    embed.addFields(...params.fields)
  }
  const msg: DiscordOptions = {
    id: params.id,
    embeds: [embed],
    severity: params.severity,
    topic: params.topic,
  }
  return notifyDiscord(msg)
}
