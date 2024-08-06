import { Chain } from 'viem'
import { arbitrum, base } from 'viem/chains'

export const transactionLink = (
  tx: string,
  chain: Chain,
  options?: {
    utm_medium?: 'discord' | string
  },
) => {
  const networkPath = chain.id === base.id ? 'base' : chain.id === arbitrum.id ? 'arbitrum' : 'mainnet'
  return (
    `https://dashboard.tenderly.co/tx/${networkPath}/${tx}` +
    `?utm_campaign=alert_notification` +
    `&utm_content=transaction_url` +
    `&utm_medium=${options?.utm_medium ?? 'discord'}` +
    `&utm_source=alert_notification`
  )
}
