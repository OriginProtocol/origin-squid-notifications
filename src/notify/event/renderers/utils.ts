import { EmbedBuilder } from 'discord.js'

import { Severity, Topic, severityColors } from '../../const'
import { DiscordOptions } from '../../discord'

export const renderDiscordEmbed = (params: {
  topic: Topic
  severity?: Severity
  title: string
  titleUrl: string
  description: string
  fields: { name: string; value: string; inline?: boolean }[]
}) => {
  params.severity = params.severity ?? 'low'
  const embeds = new EmbedBuilder()
    .setColor(severityColors[params.severity])
    .setTitle(params.title)
    .setURL(params.titleUrl)
    .setDescription(params.description)
    .addFields(...params.fields)
  const msg: DiscordOptions = {
    title: params.title,
    embeds: [embeds],
    severity: params.severity,
    topic: params.topic,
  }
  return msg
}
