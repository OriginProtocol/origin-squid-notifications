import { omit } from 'lodash'

import * as governedUpgradeabilityProxy from '../abi/governed-upgradeability-proxy'
import * as otokenBuybackAbi from '../abi/otoken-buyback'
import { discordIconOrName } from '../notify/const'
import { renderEventDiscordEmbed } from '../notify/event/renderers/utils'
import { formatAmount } from '../utils/formatAmount'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenBuybackProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: omit(otokenBuybackAbi.events, Object.keys(governedUpgradeabilityProxy.events)),
        renderers: {
          OTokenBuyback: (p) => {
            const data = otokenBuybackAbi.events.OTokenBuyback.decode(p.log)
            renderEventDiscordEmbed(p, {
              fields: [
                {
                  name: formatAmount(data.swapAmountIn),
                  value: `${discordIconOrName(data.oToken) ?? data.oToken} Sent`,
                  inline: true,
                },
                {
                  name: formatAmount(data.amountOut),
                  value: `${discordIconOrName(data.swappedFor) ?? data.swappedFor} Received`,
                  inline: true,
                },
              ],
            })
          },
        },
      },
    ],
  })
}
