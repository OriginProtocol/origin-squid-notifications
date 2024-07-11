import { pick } from 'lodash'

import * as otokenAbi from '../../abi/otoken'
import { renderDiscordEmbed } from '../../notify/event/renderers/utils'
import { formatAmount } from '../../utils/formatAmount'
import { transactionLink } from '../../utils/links'
import { EventProcessorParams, createEventProcessor } from './event'

export const createOTokenProcessor = (params: { address: string[] } & Omit<EventProcessorParams, 'tracks'>) => {
  return createEventProcessor({
    ...params,
    tracks: [
      {
        address: params.address,
        events: pick(otokenAbi.events, [
          'AccountRebasingDisabled',
          'AccountRebasingEnabled',
          'TotalSupplyUpdatedHighres',
        ]),
        renderers: {
          TotalSupplyUpdatedHighres: async (p) => {
            const contract = new otokenAbi.Contract(p.ctx, { height: p.block.header.height - 1 }, p.log.address)
            const previousSupply = await contract.totalSupply()
            const data = otokenAbi.events.TotalSupplyUpdatedHighres.decode(p.log)
            const diff = data.totalSupply - previousSupply
            renderDiscordEmbed({
              id: p.log.id,
              topic: p.topic,
              severity: p.severity,
              title: `${params.name} - TotalSupplyUpdatedHighres`,
              titleUrl: transactionLink(p.log.transactionHash),
              fields: [
                { name: formatAmount(previousSupply), value: 'Previous', inline: true },
                { name: formatAmount(data.totalSupply), value: 'Current', inline: true },
                { name: formatAmount(diff), value: 'Diff', inline: true },
              ],
            })
          },
        },
      },
    ],
  })
}
