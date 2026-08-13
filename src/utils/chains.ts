import { defineChain } from 'viem'

export const hyperliquid = defineChain({
  id: 999,
  name: 'Hyperliquid',
  nativeCurrency: { decimals: 18, name: 'HYPE', symbol: 'HYPE' },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'HyperEVMScan', url: 'https://hyperevmscan.io' },
  },
})
