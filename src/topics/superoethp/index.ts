import { omit } from 'lodash'
import { createBurnProcessor } from 'templates/burn'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'
import { createTraceErrorProcessor } from 'templates/trace-errors'
import { plumeMainnet } from 'viem/chains'

import * as strategyBridgedWOETHABI from '@abi/strategy-bridged-woeth'
import { discordIconOrName } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { oethPlumeABIs } from '@utils/addresses/address-abis'
import { WOETH_ADDRESS } from '@utils/addresses/addresses'
import { plumeAddresses } from '@utils/addresses/addresses-plume'
import { formatAmount } from '@utils/formatAmount'

const chainId = plumeMainnet.id

// OTokens
createOTokenProcessor({
  name: 'superOETHp Contract',
  chainId,
  address: [plumeAddresses.superOETHp.address],
  topic: 'superOETHp',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'superOETHp Vault',
  chainId,
  address: [plumeAddresses.superOETHp.vault],
  topic: 'superOETHp',
})

// Strategies
createEventProcessor({
  name: 'superOETHp Bridged WOETH Strategy',
  chainId: plumeMainnet.id,
  topic: 'superOETHp',
  tracks: [
    {
      severity: 'low',
      events: omit(strategyBridgedWOETHABI.events, 'GovernorshipTransferred', 'PendingGovernorshipTransfer'),
      address: [plumeAddresses.superOETHp.strategies.bridgedWOETH],
      renderers: {
        WOETHPriceUpdated: (params) => {
          const data = strategyBridgedWOETHABI.events.WOETHPriceUpdated.decode(params.log)
          const amountF = formatAmount(data.newValue, 18, {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
          })
          const changeP = formatAmount(
            ((data.newValue * 1_000000000_000000000n) / data.oldValue - 1_000000000_000000000n) * 100n,
          )
          renderEventDiscordEmbed(params, {
            fields: [
              {
                name: `${amountF} (+${changeP}%)`,
                value: discordIconOrName(WOETH_ADDRESS) ?? WOETH_ADDRESS,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})

// Burns
createBurnProcessor({
  name: 'superOETHp Burn',
  chainId,
  address: [plumeAddresses.superOETHp.address],
  topic: 'superOETHp',
})
createBurnProcessor({
  name: 'wsuperOETHp Burn',
  chainId,
  address: [plumeAddresses.superOETHp.wrapped],
  topic: 'superOETHp',
})

// Error Tracing
createTraceErrorProcessor({
  name: 'Plume Error Trace',
  chainId,
  address: Object.keys(oethPlumeABIs),
  abi: Object.values(oethPlumeABIs),
  topic: 'superOETHp',
  severity: 'high',
})
