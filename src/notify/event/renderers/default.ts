import { OGN_GOVERNANCE_ADDRESS } from '../../../utils/addresses'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { transactionLink } from '../../../utils/links'
import { severityColors } from '../../const'
import { notifyDiscord } from '../../discord'
import { explorerUrl, formatAddress, formatValue } from '../../format'
import { registerEventRenderer } from '../event'

export const defaultEventRenderer = registerEventRenderer(
  'default',
  async ({ ctx, topic, severity = 'low', name, eventName, event, log, notifyTarget }) => {
    let data: any
    try {
      data = event.decode(log)
    } catch {
      // Decoding can fail on topic/signature mismatches
    }

    const sortId = `${log.block.height}:${log.transactionIndex}:${log.logIndex}`
    const addressName = getAddressesPyName(log.address)
    const txUrl = transactionLink(log.transactionHash, ctx.chain)
    const explorer = explorerUrl(ctx.chain)
    const timestamp = new Date(log.block.timestamp)

    // Build embed fields from decoded data
    const fields: { name: string; value: string; inline: boolean }[] = []

    // Contract field
    const contractDisplay = addressName
      ? `[${addressName}](${explorer}/address/${log.address})`
      : `[\`${log.address.slice(0, 6)}...${log.address.slice(-4)}\`](${explorer}/address/${log.address})`
    fields.push({ name: 'Contract', value: contractDisplay, inline: true })

    // Block field
    fields.push({
      name: 'Block',
      value: `[${log.block.height.toLocaleString('en-US')}](${explorer}/block/${log.block.height})`,
      inline: true,
    })

    // Time field
    fields.push({
      name: 'Time',
      value: `<t:${Math.floor(timestamp.getTime() / 1000)}:R>`,
      inline: true,
    })

    // Decoded data fields
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      for (const [key, value] of Object.entries(data)) {
        const formatted = formatValue(value, key, ctx.chain)
        const isLong = formatted.length > 40
        fields.push({ name: key, value: formatted, inline: !isLong })
      }
    } else if (data !== undefined) {
      fields.push({ name: 'Data', value: formatValue(data, undefined, ctx.chain), inline: false })
    }

    // Governance link
    let description: string | undefined
    if (data && 'proposalId' in data && log.address === OGN_GOVERNANCE_ADDRESS) {
      const proposalUrl = `https://app.originprotocol.com/#/ogn/governance/1:${OGN_GOVERNANCE_ADDRESS}:${data.proposalId}`
      description = `[View Proposal](${proposalUrl})`
    }

    // Trim to Discord's 25-field limit
    if (fields.length > 25) fields.length = 25

    return notifyDiscord({
      sortId,
      topic,
      severity,
      embeds: [
        {
          color: severityColors[severity],
          title: `${name ?? topic} - ${eventName}`,
          url: txUrl,
          description,
          fields,
          footer: {
            text: `tx ${log.transactionHash.slice(0, 10)}...${log.transactionHash.slice(-6)}`,
          },
        },
      ],
      mentions: notifyTarget?.discordMentions,
    })
  },
)
