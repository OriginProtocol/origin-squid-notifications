import { event, indexed } from '@subsquid/evm-abi'
import * as p from '@subsquid/evm-codec'

import { discordIconOrName } from '../../const'
import { registerEventRenderer } from '../event'
import { renderEventDiscordEmbed } from './utils'
import { formatAmount } from '../../../utils/formatAmount'

const OTokenBuyback = event(
  '0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743',
  'OTokenBuyback(address,address,uint256,uint256)',
  { oToken: indexed(p.address), swappedFor: indexed(p.address), swapAmountIn: p.uint256, amountOut: p.uint256 },
)

// OTokenBuyback — shows oToken sent and token received with icons
registerEventRenderer(OTokenBuyback.topic, async (params) => {
  const data = OTokenBuyback.decode(params.log)
  renderEventDiscordEmbed(params, {
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
})
