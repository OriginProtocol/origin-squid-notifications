import { HexColorString } from 'discord.js'

import { plumeAddresses } from '@utils/addresses/addresses-plume'
import { sonicAddresses } from '@utils/addresses/addresses-sonic'

import {
  OETH_ADDRESS,
  OGN_ADDRESS,
  OGV_ADDRESS,
  OUSD_ADDRESS,
  PRIME_ETH_ADDRESS,
  WOETH_ADDRESS,
  XOGN_ADDRESS,
} from '../utils/addresses'
import { baseAddresses } from '../utils/addresses/addresses-base'
import { getAddressesPyName } from '../utils/addresses/names'

export type Severity = 'low' | 'medium' | 'high' | 'critical' | 'broken' | 'highlight'
export type Topic =
  | 'Governance'
  | 'OGN'
  | 'OGN Alerts'
  | 'OGN Buybacks'
  | 'xOGN'
  | 'OETH'
  | 'superOETHb'
  | 'superOETHp'
  | 'OUSD'
  | 'primeETH'
  | 'ARM'
  | 'OS'

export const severityEmojis: Record<Severity, string> = {
  low: 'ℹ️',
  medium: '🟨',
  high: '🟥',
  critical: '🟪',
  broken: '💔',
  highlight: '🥳',
}

export const severityColors: Record<Severity, HexColorString> = {
  low: '#0099ff',
  medium: '#edb50d',
  high: '#d62c1d',
  critical: '#bc3bff',
  broken: '#ff4638',
  highlight: '#1285FF',
}

export const topicThumbnails: Record<Topic, string> = {
  Governance: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  OGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  'OGN Alerts': 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  'OGN Buybacks': 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png',
  xOGN: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-xogn-logo.png',
  OETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-ether-oeth-logo.png',
  superOETHb: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-super-oethb-logo.png',
  superOETHp: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-super-oethb-logo.png',
  OUSD: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-dollar-ousd-logo.png',
  primeETH: 'https://origin-squid-notifications.s3.amazonaws.com/images/prime-eth-logo.png',
  ARM: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-protocol-ogn-logo.png', // TODO: Add ARM thumbnail
  OS: 'https://origin-squid-notifications.s3.amazonaws.com/images/origin-sonic-os-logo.png',
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
  ContractsTeam: {
    email: ['engineering@originprotocol.com'],
    discordMentions: ['<@&1252601672019087502>'],
  } as NotifyTarget,
} as const

export const assetIcons: Record<string, `<:${string}>`> = {
  [PRIME_ETH_ADDRESS]: '<:prime_staked_ETH:1202845677332463716>',
  [OETH_ADDRESS]: '<:origin_ether_oeth:1091365232770814033>',
  [WOETH_ADDRESS]: '<:wrapped_oeth:1278109190992171141>',
  [baseAddresses.tokens.bridgedWOETH]: '<:wrapped_oeth:1278109190992171141>',
  [OUSD_ADDRESS]: '<:origin_dollar_ousd:1052865068511014973>',
  [OGV_ADDRESS]: '<:origin_defi_governance_ogv:1052865020276514867>',
  [OGN_ADDRESS]: '<:origin_token_ogn:1052864969420570656>',
  [baseAddresses.tokens.OGN]: '<:origin_token_ogn:1052864969420570656>',
  [XOGN_ADDRESS]: '<:xogn_staked_origin_token:1245864423285850202>',
  [baseAddresses.superOETHb.address]: '<:super_oeth:1273652568014454914>',
  [baseAddresses.superOETHb.wrapped]: '<:wrapped_superoeth:1278095593025310800>',
  [plumeAddresses.superOETHp.wrapped]: '<:wrapped_superoeth:1278095593025310800>',
  [sonicAddresses.OS.address]: '<:origin_sonic_os:1326419890302750730>',
}

export const discordIconOrName = (address: string): string | undefined =>
  assetIcons[address.toLowerCase()] ?? getAddressesPyName(address)
