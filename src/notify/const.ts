import { HexColorString } from 'discord.js'

import {
  OETH_ADDRESS,
  OGN_ADDRESS,
  OGV_ADDRESS,
  OUSD_ADDRESS,
  PRIME_ETH_ADDRESS,
  XOGN_ADDRESS,
} from '../utils/addresses'
import { baseAddresses } from '../utils/addresses/addresses-base'
import { getAddressesPyName } from '../utils/addresses/names'

export type Severity = 'low' | 'medium' | 'high' | 'critical' | 'broken'
export type Topic = 'OGN' | 'xOGN' | 'OETH' | 'superOETHb' | 'OUSD' | 'primeETH'

export const severityEmojis: Record<Severity, string> = {
  low: 'ℹ️',
  medium: '🟨',
  high: '🟥',
  critical: '🟪',
  broken: '💔',
}

export const severityColors: Record<Severity, HexColorString> = {
  low: '#0099ff',
  medium: '#edb50d',
  high: '#d62c1d',
  critical: '#bc3bff',
  broken: '#ff4638',
}

export const topicThumbnails: Record<Topic, string> = {
  OGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  xOGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-xogn-logo.png',
  OETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-ether-oeth-logo.png',
  superOETHb: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-super-oethb-logo.png',
  OUSD: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-dollar-ousd-logo.png',
  primeETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/prime-eth-logo.png',
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

export const assetIcons: Record<string, `<:${string}>`> = {
  [PRIME_ETH_ADDRESS]: '<:prime_staked_ETH:1202845677332463716>',
  [OETH_ADDRESS]: '<:origin_ether_oeth:1091365232770814033>',
  [OUSD_ADDRESS]: '<:origin_dollar_ousd:1052865068511014973>',
  [OGV_ADDRESS]: '<:origin_defi_governance_ogv:1052865020276514867>',
  [OGN_ADDRESS]: '<:origin_token_ogn:1052864969420570656>',
  [XOGN_ADDRESS]: '<:xogn_staked_origin_token:1245864423285850202>',
  [baseAddresses.superOETHb.address]: '<:super_oeth:1273652568014454914>',
}

export const discordIconOrName = (address: string): string | undefined =>
  assetIcons[address.toLowerCase()] ?? getAddressesPyName(address)
