import { createBurnProcessor } from 'templates/burn'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenBuybackProcessor } from 'templates/otoken-buyback'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'

import { discordIconOrName } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { OETH_ADDRESS, OETH_BUYBACK, OETH_VAULT_ADDRESS, OETH_ZAPPER_ADDRESS, WOETH_ADDRESS } from '@utils/addresses'
import { formatAmount } from '@utils/formatAmount'

import * as oethZapperAbi from '../../abi/oeth-zapper'

// Core OETH Token Contract
createOTokenProcessor({
  name: 'OETH Contract',
  chainId: 1,
  address: [OETH_ADDRESS],
  topic: 'OETH',
})

// OETH Vault Contract
createOTokenVaultProcessor({
  name: 'OETH Vault',
  chainId: 1,
  address: [OETH_VAULT_ADDRESS],
  topic: 'OETH',
})

// OETH Buyback Contract
createOTokenBuybackProcessor({
  name: 'OETH Buyback',
  chainId: 1,
  address: [OETH_BUYBACK],
  topic: 'OETH',
})

// OETH Zapper Contract
createEventProcessor({
  name: 'OETH Zapper',
  topic: 'OETH',
  chainId: 1,
  tracks: [
    {
      address: [OETH_ZAPPER_ADDRESS],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://etherscan.io/address/${data.minter})`,
            fields: [
              {
                name: formatAmount(data.amount),
                value: discordIconOrName(data.asset) ?? data.asset,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})

// Burn Events
createBurnProcessor({
  name: 'OETH Burn',
  chainId: 1,
  address: [OETH_ADDRESS],
  topic: 'OETH',
})

createBurnProcessor({
  name: 'WOETH Burn',
  chainId: 1,
  address: [WOETH_ADDRESS],
  topic: 'OETH',
})
