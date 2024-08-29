import * as aeroCLPoolAbi from '../../../abi/aerodrome-cl-pool'
import * as aeroPoolAbi from '../../../abi/aerodrome-pool'
import { baseAddresses } from '../../../utils/addresses/addresses-base'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatAmount } from '../../../utils/formatAmount'
import { transactionLink } from '../../../utils/links'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed } from './utils'

registerEventRenderer(aeroPoolAbi.events.Swap.topic, async (params) => {
  const { log } = params
  const data = aeroPoolAbi.events.Swap.decode(log)
  const amounts = `${formatAmount(data.amount0In - data.amount0Out)}, ${formatAmount(data.amount1In - data.amount1Out)}`
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${getAddressesPyName(log.address)} - Swap for ${amounts}`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
  })
})

registerEventRenderer(aeroCLPoolAbi.events.Swap.topic, async (params) => {
  const { log } = params
  const data = aeroCLPoolAbi.events.Swap.decode(log)
  const amounts = `${formatAmount(data.amount0)}, ${formatAmount(data.amount1)}`
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${getAddressesPyName(log.address)} - Swap for ${amounts}`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
  })
})
