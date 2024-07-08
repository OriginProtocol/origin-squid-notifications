export const transactionLink = (
  tx: string,
  chainId: number = 1,
  options?: {
    utm_medium?: 'discord' | string
  },
) => {
  if (chainId !== 1) throw new Error('transactionLink does not yet support other chains')
  return (
    `https://dashboard.tenderly.co/tx/mainnet/${tx}` +
    `?utm_campaign=alert_notification` +
    `&utm_content=transaction_url` +
    `&utm_medium=${options?.utm_medium ?? 'discord'}` +
    `&utm_source=alert_notification`
  )
}
