import { pick } from 'lodash'
import { createBurnProcessor } from 'templates/burn'
import { createChainlinkKeeperProcessor } from 'templates/chainlink-keeper'
import { createEventProcessor } from 'templates/event'
import { createFixedRateRewardsSourceProcessor } from 'templates/fixed-rate-rewards-source'
import { createOTokenCurvePoolBoosterProcessor } from 'templates/otoken-curve-pool-booster'
import { createTraceErrorProcessor } from 'templates/trace-errors'
import { base, mainnet, sonic } from 'viem/chains'

import { discordIconOrName, notifyTargets } from '@notify/const'
import { renderDiscordEmbed } from '@notify/event/renderers/utils'
import {
  OGN_ADDRESS,
  OGN_REWARDS_SOURCE_ADDRESS,
  OGV_ADDRESS,
  OGV_OGN_MIGRATOR_ADDRESS,
  tokens,
} from '@utils/addresses'
import { ognABIs } from '@utils/addresses/address-abis'
import { CHAINLINK_KEEPER_REGISTRY } from '@utils/addresses/ousd-analytics'
import { formatAmount } from '@utils/formatAmount'
import { transactionLink } from '@utils/links'

import * as ogvOgnMigratorAbi from '../../abi/ogv-ogn-migrator'

// Rewards Source
createFixedRateRewardsSourceProcessor({
  name: 'Origin Rewards',
  chainId: mainnet.id,
  address: [OGN_REWARDS_SOURCE_ADDRESS],
  topic: 'OGN',
})

createBurnProcessor({ name: 'OGN Burn', chainId: mainnet.id, address: [OGN_ADDRESS], topic: 'OGN' })

createOTokenCurvePoolBoosterProcessor({
  name: 'Curve Pool Booster',
  chainId: mainnet.id,
  topic: 'OGN',
})

createOTokenCurvePoolBoosterProcessor({
  name: 'Curve Pool Booster',
  chainId: base.id,
  topic: 'OGN',
})

createOTokenCurvePoolBoosterProcessor({
  name: 'Curve Pool Booster',
  chainId: sonic.id,
  topic: 'OGN',
})

// Error Tracing
createTraceErrorProcessor({
  name: 'OGN Error Trace',
  chainId: mainnet.id,
  address: Object.keys(ognABIs),
  abi: Object.values(ognABIs),
  topic: 'OGN',
  severity: 'high',
  excludeFilter: ({ trace, functionName }) =>
    trace.type === 'call' && trace.action.to === tokens.OGN && functionName === 'supportsInterface',
})

// Trace OGV Migrations
createEventProcessor({
  name: 'OGV Migration',
  chainId: mainnet.id,
  topic: 'OGN',
  tracks: [
    {
      severity: 'low',
      address: [OGV_OGN_MIGRATOR_ADDRESS],
      events: pick(ogvOgnMigratorAbi.events, 'LockupsMigrated', 'TokenExchanged'),
      renderers: {
        TokenExchanged: (params) => {
          const data = ogvOgnMigratorAbi.events.TokenExchanged.decode(params.log)
          return renderDiscordEmbed({
            sortId: `${params.log.block.height}:${params.log.transactionIndex}:${params.log.logIndex}`,
            topic: params.topic,
            severity: params.severity,
            title: 'OGV Migration - TokenExchanged',
            titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
            fields: [
              {
                name: formatAmount(data.ogvAmountIn),
                value: `${discordIconOrName(OGV_ADDRESS)} Burned`,
                inline: true,
              },
              {
                name: formatAmount(data.ognAmountOut),
                value: `${discordIconOrName(OGN_ADDRESS)} Received`,
                inline: true,
              },
            ],
          })
        },
      },
    },
    {
      severity: 'high',
      address: [OGV_OGN_MIGRATOR_ADDRESS],
      events: pick(ogvOgnMigratorAbi.events, 'Decommissioned'),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

createChainlinkKeeperProcessor({
  name: 'Chainlink Keeper',
  chainId: mainnet.id,
  address: [CHAINLINK_KEEPER_REGISTRY],
  topic: 'OGN',
})
