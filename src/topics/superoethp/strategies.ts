import { omit } from 'lodash'
import { createEventProcessor } from 'templates/event'
import { plumeMainnet } from 'viem/chains'

import * as strategyBridgedWOETHABI from '@abi/strategy-bridged-woeth'
import { discordIconOrName } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { WOETH_ADDRESS } from '@utils/addresses/addresses'
import { plumeAddresses } from '@utils/addresses/addresses-plume'
import { formatAmount } from '@utils/formatAmount'

// Bridged WOETH Strategy
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
