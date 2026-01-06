import { createEventProcessor } from 'templates/event'

import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { OETH_ETH_PRICE_FEED } from '@utils/addresses'
import { baseAddresses } from '@utils/addresses/addresses-base'

import * as oethEthPriceFeedAbi from '../../abi/oeth-eth-price-feed'
import * as woethExchangeRateOracleAbi from '../../abi/woeth-exchange-rate-oracle'

// Shared renderer for Chainlink oracle ownership events
const ownershipTransferRequestedRenderer = (params: any, abi: typeof oethEthPriceFeedAbi) => {
  const data = abi.events.OwnershipTransferRequested.decode(params.log)
  renderEventDiscordEmbed(params, {
    description: `Oracle ownership transfer requested`,
    fields: [
      {
        name: 'From',
        value: `[${data.from.slice(0, 10)}...](https://etherscan.io/address/${data.from})`,
        inline: true,
      },
      {
        name: 'To',
        value: `[${data.to.slice(0, 10)}...](https://etherscan.io/address/${data.to})`,
        inline: true,
      },
    ],
  })
}

const ownershipTransferredRenderer = (params: any, abi: typeof oethEthPriceFeedAbi) => {
  const data = abi.events.OwnershipTransferred.decode(params.log)
  renderEventDiscordEmbed(params, {
    description: `Oracle ownership transferred`,
    fields: [
      {
        name: 'From',
        value: `[${data.from.slice(0, 10)}...](https://etherscan.io/address/${data.from})`,
        inline: true,
      },
      {
        name: 'To',
        value: `[${data.to.slice(0, 10)}...](https://etherscan.io/address/${data.to})`,
        inline: true,
      },
    ],
  })
}

// OETH/ETH Chainlink Price Feed Oracle (Ethereum mainnet)
createEventProcessor({
  name: 'OETH/ETH Price Feed',
  topic: 'OETH',
  chainId: 1,
  tracks: [
    {
      address: [OETH_ETH_PRICE_FEED],
      events: {
        OwnershipTransferRequested: oethEthPriceFeedAbi.events.OwnershipTransferRequested,
        OwnershipTransferred: oethEthPriceFeedAbi.events.OwnershipTransferred,
      },
      severity: 'high',
      renderers: {
        OwnershipTransferRequested: (params) => ownershipTransferRequestedRenderer(params, oethEthPriceFeedAbi),
        OwnershipTransferred: (params) => ownershipTransferredRenderer(params, oethEthPriceFeedAbi),
      },
    },
  ],
})

// wOETH Exchange Rate Oracle (Base)
createEventProcessor({
  name: 'wOETH Exchange Rate Oracle (Base)',
  topic: 'superOETHb',
  chainId: 8453,
  tracks: [
    {
      address: [baseAddresses.superOETHb.woethExchangeRateOracle],
      events: {
        OwnershipTransferRequested: woethExchangeRateOracleAbi.events.OwnershipTransferRequested,
        OwnershipTransferred: woethExchangeRateOracleAbi.events.OwnershipTransferred,
      },
      severity: 'high',
      renderers: {
        OwnershipTransferRequested: (params) => ownershipTransferRequestedRenderer(params, woethExchangeRateOracleAbi),
        OwnershipTransferred: (params) => ownershipTransferredRenderer(params, woethExchangeRateOracleAbi),
      },
    },
  ],
})
