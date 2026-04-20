import { Chain } from 'viem'
import { arbitrum, base, sonic } from 'viem/chains'

import { Context } from '@originprotocol/squid-utils'

import { hyperliquid } from './chains'
import { getAddressesPyName } from './addresses/names'

export const transactionLink = (
  tx: string,
  chain: Chain,
  options?: {
    utm_medium?: 'discord' | string
  },
) => {
  const utmExtra =
    `?utm_campaign=alert_notification` +
    `&utm_content=transaction_url` +
    `&utm_medium=${options?.utm_medium ?? 'discord'}` +
    `&utm_source=alert_notification`

  const networkPath =
    chain.id === base.id
      ? 'base'
      : chain.id === arbitrum.id
      ? 'arbitrum'
      : chain.id === sonic.id
      ? 'sonic'
      : chain.id === hyperliquid.id
      ? 'hyperliquid'
      : 'mainnet'
  return `https://dashboard.tenderly.co/tx/${networkPath}/${tx}` + utmExtra
}

export const addressLink = (ctx: Context, address: string) =>
  `[${getAddressesPyName(address) ?? address}](${
    ctx.chain.blockExplorers?.default?.url ?? 'https://etherscan.io/'
  }/address/${address})`
