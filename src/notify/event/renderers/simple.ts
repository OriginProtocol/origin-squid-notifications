import { transactionLink } from '../../../utils/links'
import { notifyDiscord } from '../../discord'
import { registerEventRenderer } from '../event'

export const simpleEventRenderer = registerEventRenderer(
  'simple',
  async ({ ctx, topic, severity = 'low', name, eventName, log, notifyTarget }) => {
    let links: Record<string, string> = {
      tx: transactionLink(log.transactionHash, ctx.chain),
    }
    return notifyDiscord({
      id: log.id,
      topic,
      severity,
      title: `${name ?? topic} - ${eventName}`,
      links,
      mentions: notifyTarget?.discordMentions,
    })
  },
)
