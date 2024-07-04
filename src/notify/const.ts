export type Severity = 'low' | 'medium' | 'high' | 'critical' | 'broken'
export type Topic = 'OGN' | 'xOGN' | 'OETH' | 'OUSD'

export const severityEmojis: Record<Severity, string> = {
  low: 'ℹ️',
  medium: '🟨',
  high: '🟥',
  critical: '🟪',
  broken: '💔',
}

export const topicThumbnails: Record<Topic, string> = {
  OGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  xOGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-xogn-logo.png',
  OETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-ether-oeth-logo.png',
  OUSD: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-dollar-ousd-logo.png',
}

export interface NotifyTarget {
  email?: string[]
  oncall?: boolean
  discordMentions?: string[]
}

export const notifyTargets = {
  default: {} as NotifyTarget,
  chris: {
    email: ['chris@originprotocol.com'],
    discordMentions: ['<@222598812399697921>'],
  } as NotifyTarget,
  Engineering: {
    email: ['engineering@originprotocol.com'],
    discordMentions: ['<@&997340701551513762>'],
  } as NotifyTarget,
} as const
