import { OGN_GOVERNANCE_ADDRESS } from '../../../utils/addresses'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatJson } from '../../../utils/formatJson'
import { transactionLink } from '../../../utils/links'
import { md } from '../../../utils/md'
import { notifyDiscord } from '../../discord'
import { registerEventRenderer } from '../event'

export const defaultEventRenderer = registerEventRenderer(
  'default',
  async ({ ctx, topic, severity = 'low', name, eventName, event, log, notifyTarget }) => {
    const data = event.decode(log)
    let addressName = getAddressesPyName(log.address)
    let links: Record<string, string> = {
      tx: transactionLink(log.transactionHash, ctx.chain),
    }
    if ('proposalId' in data && log.address === OGN_GOVERNANCE_ADDRESS) {
      links.proposal = `https://originprotocol.eth.limo/#/more/1:${OGN_GOVERNANCE_ADDRESS}:${data.proposalId}`
    }
    return notifyDiscord({
      id: log.id,
      topic,
      severity,
      title: `${name ?? topic} - ${eventName}`,
      description: md.code(
        formatJson({
          'Block - Time': `${log.block.height} - ${new Date(log.block.timestamp).toISOString()}`,
          Address: `${log.address}${addressName ? ` (${addressName})` : ''}`,
          Transaction: log.transactionHash,
          Event: eventName,
          'Event Data': data,
        }),
      ),
      links,
      mentions: notifyTarget?.discordMentions,
    })
  },
)
