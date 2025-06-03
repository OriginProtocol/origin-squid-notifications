import { createBurnProcessor } from 'templates/burn'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'

import * as oethZapperAbi from '@abi/oeth-zapper'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { sonicAddresses } from '@utils/addresses/addresses-sonic'
import { formatAmount } from '@utils/formatAmount'

const chainId = 146

// Core OS Token Contract
createOTokenProcessor({
  name: 'OS Contract',
  chainId,
  address: [sonicAddresses.OS.address],
  topic: 'OS',
})

// OS Vault Contract
createOTokenVaultProcessor({
  name: 'OS Vault',
  chainId,
  address: [sonicAddresses.OS.vault],
  topic: 'OS',
})

// OS Zapper Contract
createEventProcessor({
  name: 'OS Zapper',
  topic: 'OS',
  chainId,
  tracks: [
    {
      address: [sonicAddresses.OS.zapper],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://sonicscan.org/address/${data.minter})`,
            fields: [
              {
                name: formatAmount(data.amount),
                value: 'S',
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
  name: 'OS Burn',
  chainId,
  address: [sonicAddresses.OS.address],
  topic: 'OS',
})

createBurnProcessor({
  name: 'Wrapped OS Burn',
  chainId,
  address: [sonicAddresses.OS.wrapped],
  topic: 'OS',
})
