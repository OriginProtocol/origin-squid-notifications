import { createBurnProcessor } from 'templates/burn'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'
import { base } from 'viem/chains'

import { discordIconOrName } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { baseAddresses } from '@utils/addresses/addresses-base'
import { formatAmount } from '@utils/formatAmount'
import { meetsLimit } from '@utils/limits'

import * as erc20ABI from '../../abi/erc20'
import * as oethZapperAbi from '../../abi/oeth-zapper'

// Core Token Contract
createOTokenProcessor({
  name: 'superOETHb Contract',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})

// Vault Contract
createOTokenVaultProcessor({
  name: 'superOETHb Vault',
  chainId: base.id,
  address: [baseAddresses.superOETHb.vault],
  topic: 'superOETHb',
})

// Zapper Contract
createEventProcessor({
  name: 'superOETHb Zapper',
  topic: 'superOETHb',
  chainId: base.id,
  tracks: [
    {
      address: [baseAddresses.superOETHb.zapper],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: async (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          if ((await meetsLimit('otoken', 'mint', baseAddresses.superOETHb.address, data.amount)) === false) return

          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://basescan.org/address/${data.minter})`,
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

// Bridged WOETH Events
createEventProcessor({
  name: 'Bridged WOETH (Base)',
  chainId: base.id,
  topic: 'superOETHb',
  tracks: [
    {
      severity: 'low',
      events: erc20ABI.events,
      address: [baseAddresses.tokens.bridgedWOETH],
    },
  ],
})

// Burn Events
createBurnProcessor({
  name: 'superOETHb Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.address],
  topic: 'superOETHb',
})

createBurnProcessor({
  name: 'wsuperOETHb Burn',
  chainId: base.id,
  address: [baseAddresses.superOETHb.wrapped],
  topic: 'superOETHb',
})
