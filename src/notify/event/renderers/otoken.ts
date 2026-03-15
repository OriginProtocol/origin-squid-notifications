import { ContractBase, event, viewFun } from '@subsquid/evm-abi'
import * as p from '@subsquid/evm-codec'

import { formatAmount } from '../../../utils/formatAmount'
import { transactionLink } from '../../../utils/links'
import { registerEventRenderer } from '../event'
import { renderDiscordEmbed } from './utils'

const TotalSupplyUpdatedHighres = event(
  '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235',
  'TotalSupplyUpdatedHighres(uint256,uint256,uint256)',
  { totalSupply: p.uint256, rebasingCredits: p.uint256, rebasingCreditsPerToken: p.uint256 },
)

const totalSupplyFn = viewFun('0x18160ddd', 'totalSupply()', {}, p.uint256)

class OTokenContract extends ContractBase {
  totalSupply() {
    return this.eth_call(totalSupplyFn, {})
  }
}

// TotalSupplyUpdatedHighres — shows previous, current, and diff
registerEventRenderer(TotalSupplyUpdatedHighres.topic, async (params) => {
  const data = TotalSupplyUpdatedHighres.decode(params.log)

  let previousSupply: bigint | undefined
  try {
    const contract = new OTokenContract(params.ctx, { height: params.log.block.height - 1 }, params.log.address)
    previousSupply = await contract.totalSupply()
  } catch {
    // RPC call failed — render without diff
  }

  const fields: { name: string; value: string; inline: boolean }[] = []
  if (previousSupply !== undefined) {
    const diff = data.totalSupply - previousSupply
    fields.push(
      { name: formatAmount(previousSupply), value: 'Previous', inline: true },
      { name: formatAmount(data.totalSupply), value: 'Current', inline: true },
      { name: formatAmount(diff), value: 'Diff', inline: true },
    )
  } else {
    fields.push({ name: formatAmount(data.totalSupply), value: 'Total Supply', inline: true })
  }

  renderDiscordEmbed({
    sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${params.name} - TotalSupplyUpdatedHighres`,
    titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
    fields,
  })
})
