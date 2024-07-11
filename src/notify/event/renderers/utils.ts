import { EmbedBuilder } from 'discord.js'

import { transactionLink } from '../../../utils/links'
import { Severity, Topic, severityColors } from '../../const'
import { DiscordOptions, notifyDiscord } from '../../discord'
import { EventRendererParams } from '../event'

export const renderEventDiscordEmbed = (
  eventRendererParams: EventRendererParams,
  params: {
    description?: string
    fields?: { name: string; value: string; inline?: boolean }[]
  },
) =>
  renderDiscordEmbed({
    id: eventRendererParams.log.id,
    topic: eventRendererParams.topic,
    severity: eventRendererParams.severity,
    title: `${eventRendererParams.name} - ${eventRendererParams.eventName}`,
    titleUrl: transactionLink(eventRendererParams.log.transactionHash),
    ...params,
  })

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
