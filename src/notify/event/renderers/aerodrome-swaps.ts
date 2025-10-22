import { viewFun } from '@subsquid/evm-abi'
import * as p from '@subsquid/evm-codec'
import { meetsLimit } from '@utils/limits'

import * as clHelperAbi from '../../../abi/aerodrome-cl-helper'
import * as aeroCLPoolAbi from '../../../abi/aerodrome-cl-pool'
import * as aeroPoolAbi from '../../../abi/aerodrome-pool'
import { baseAddresses, getAerodromePool } from '../../../utils/addresses/addresses-base'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatAmount, formatChange } from '../../../utils/formatAmount'
import { transactionLink } from '../../../utils/links'
import { discordIconOrName, notifyTargets } from '../../const'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed } from './utils'

// Work around a subsquid bug in encoding.
// The bug revolves around the actual `getAmountsForLiquidity(uint160,uint160,uint160,uint128)` signature
// which causes wrapping of the last variable during encoding.
// This tricks the subsquid encoder into "working"
clHelperAbi.functions.getAmountsForLiquidity = viewFun(
  '0xc72e160b',
  'getAmountsForLiquidity(uint256,uint256,uint256,uint256)',
  {
    sqrtRatioX96: p.uint256,
    sqrtRatioAX96: p.uint256,
    sqrtRatioBX96: p.uint256,
    liquidity: p.uint256,
  },
  { amount0: p.uint256, amount1: p.uint256 },
)

// AMM Pool Swaps
registerEventRenderer(aeroPoolAbi.events.Swap.topic, async (params) => {
  const { log } = params
  const data = aeroPoolAbi.events.Swap.decode(log)
  const pool = getAerodromePool(log.address)
  const token0 = pool?.assets[0].address ?? ''
  const token1 = pool?.assets[1].address ?? ''
  const amount0 = data.amount0In - data.amount0Out
  const amount1 = data.amount1In - data.amount1Out
  const contract = new aeroPoolAbi.Contract(params.ctx, params.block.header, log.address)
  const { _reserve0, _reserve1 } = await contract.getReserves()
  const percentage = ((100 * Math.abs(Number(amount0))) / Number(_reserve0 + amount0)).toFixed(2)

  if ((await meetsLimit('aerodrome', 'swap', token0, amount0)) === false) return
  if ((await meetsLimit('aerodrome', 'swap', token1, amount1)) === false) return

  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${getAddressesPyName(log.address)} - Swap`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    fields: [
      {
        name: `${formatAmount(_reserve0)} (${formatChange(amount0)})`,
        value: discordIconOrName(token0) ?? 'token0',
        inline: true,
      },
      {
        name: `${formatAmount(_reserve1)} (${formatChange(amount1)})`,
        value: discordIconOrName(token1) ?? 'token1',
        inline: true,
      },
      { name: `${percentage}%`, value: 'Percentage', inline: true },
    ],
  })
})

// CL Pool Swaps
registerEventRenderer(aeroCLPoolAbi.events.Swap.topic, async (params) => {
  const { log } = params
  const data = aeroCLPoolAbi.events.Swap.decode(log)
  const pool = getAerodromePool(log.address)
  if (!pool) return defaultEventRenderer(params)

  const token0 = pool.assets[0].address
  const token1 = pool.assets[1].address
  const amount0 = data.amount0
  const amount1 = data.amount1

  if (
    pool.address === baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].address &&
    (amount0 < 0n ? -amount0 : amount0) < 10n ** 17n
  ) {
    return
  }

  const contract = new aeroCLPoolAbi.Contract(params.ctx, params.block.header, log.address)
  const tickData = await contract.ticks(data.tick)
  const helperContract = new clHelperAbi.Contract(params.ctx, params.block.header, baseAddresses.aerodrome.clHelper)
  const [sqrt96Lower, sqrt96Upper] = await Promise.all([
    helperContract.getSqrtRatioAtTick(data.tick),
    helperContract.getSqrtRatioAtTick(data.tick + 1),
  ])
  const liquidityData = await helperContract.getAmountsForLiquidity(
    data.sqrtPriceX96,
    sqrt96Lower,
    sqrt96Upper,
    tickData.liquidityNet,
  )
  const reserve0 = liquidityData.amount0
  const reserve1 = liquidityData.amount1

  const sortId = `${log.block.height}:${log.transactionIndex}:${log.logIndex}`

  let tickHealth: string | undefined = undefined
  if (log.address === baseAddresses.aerodrome.pools['CL1-WETH/superOETHb'].address) {
    if (data.tick === -1) {
      tickHealth = ':white_check_mark:'
    } else {
      tickHealth = ':fire:'
      params.severity = 'medium'
      params.notifyTarget = notifyTargets.Engineering
      // notifyOncall(sortId, { message: 'A swap occurred outside of our desired tick of -1.', params })
    }
  }

  renderDiscordEmbed({
    sortId,
    topic: params.topic,
    severity: params.severity,
    title: `${getAddressesPyName(log.address)} - Swap`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: params.notifyTarget?.discordMentions ? params.notifyTarget.discordMentions.join(',') : undefined,
    fields: [
      {
        name: `${formatAmount(reserve0)} (${formatChange(amount0)})`,
        value: discordIconOrName(token0) ?? 'token0',
        inline: true,
      },
      {
        name: `${formatAmount(reserve1)} (${formatChange(amount1)})`,
        value: discordIconOrName(token1) ?? 'token1',
        inline: true,
      },
      {
        name: `${data.tick}`,
        value: `${tickHealth}  Tick`,
        inline: true,
      },
    ],
  })
})
