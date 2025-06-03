import { omit, pick } from 'lodash'
import { createBurnProcessor } from 'templates/burn'
import { createCurveAragonVotingProcessor } from 'templates/curve-aragon-voting'
import { createEventProcessor } from 'templates/event'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenBuybackProcessor } from 'templates/otoken-buyback'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'
import { createTraceProcessor } from 'templates/trace'
import { createTraceErrorProcessor } from 'templates/trace-errors'

import { discordIconOrName, notifyTargets } from '@notify/const'
import { simpleEventRenderer } from '@notify/event/renderers/simple'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_ETH_AMO_METAPOOL,
  OETH_NATIVE_STRATEGY_ADDRESSES,
  OETH_VAULT_ADDRESS,
  OETH_ZAPPER_ADDRESS,
  WOETH_ADDRESS,
} from '@utils/addresses'
import { oethABIs } from '@utils/addresses/address-abis'
import { CURVE_ARAGON_51, CURVE_ARAGON_60 } from '@utils/addresses/ousd-analytics'
import { formatAmount } from '@utils/formatAmount'

import * as strategyCurveMetapoolAbi from '../../abi/curve-metapool'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as oethZapperAbi from '../../abi/oeth-zapper'
import * as strategyNativeStakingAbi from '../../abi/strategy-native-staking'

createCurveAragonVotingProcessor({
  name: 'Curve Aragon Voting (51%)',
  chainId: 1,
  address: [CURVE_ARAGON_51],
  topic: 'OETH',
})

createCurveAragonVotingProcessor({
  name: 'Curve Aragon Voting (60%)',
  chainId: 1,
  address: [CURVE_ARAGON_60],
  topic: 'OETH',
})

createTraceErrorProcessor({
  name: 'OETH Error Trace',
  chainId: 1,
  address: Object.keys(oethABIs),
  abi: Object.values(oethABIs),
  topic: 'OETH',
  severity: 'high',
})

createTraceProcessor({
  name: 'OETH Native Staking - Suicide Refund Received',
  topic: 'OETH',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
  chainId: 1,
  markEventsNotified: false,
  abi: [strategyNativeStakingAbi],
  traceParams: [
    {
      type: ['suicide'],
      suicideRefundAddress: OETH_NATIVE_STRATEGY_ADDRESSES,
    },
  ],
})

createOTokenBuybackProcessor({ name: 'OETH Buyback', chainId: 1, address: [OETH_BUYBACK], topic: 'OETH' })

createBurnProcessor({ name: 'OETH Burn', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createBurnProcessor({ name: 'WOETH Burn', chainId: 1, address: [WOETH_ADDRESS], topic: 'OETH' })

createEventProcessor({
  name: 'OETH Zapper',
  topic: 'OETH',
  chainId: 1,
  tracks: [
    {
      address: [OETH_ZAPPER_ADDRESS],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://etherscan.io/address/${data.minter})`,
            fields: [
              {
                name: formatAmount(data.amount),
                value: discordIconOrName(data.asset) ?? data.asset,
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})
createOTokenVaultProcessor({ name: 'OETH Vault', chainId: 1, address: [OETH_VAULT_ADDRESS], topic: 'OETH' })

createEventProcessor({
  name: 'OETH Native Staking Strategy',
  chainId: 1,
  topic: 'OETH',
  tracks: [
    {
      address: OETH_NATIVE_STRATEGY_ADDRESSES,
      events: omit(strategyNativeStakingAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Paused',
        'PTokenAdded',
        'PTokenRemoved',
      ]),
      renderers: {
        ETHStaked: simpleEventRenderer,
        SSVValidatorExitCompleted: simpleEventRenderer,
        SSVValidatorExitInitiated: simpleEventRenderer,
        SSVValidatorRegistered: simpleEventRenderer,
        StakeETHTallyReset: simpleEventRenderer,
      },
    },
    {
      address: OETH_NATIVE_STRATEGY_ADDRESSES,
      events: pick(strategyNativeStakingAbi.events, 'Paused', 'PTokenAdded', 'PTokenRemoved'),
      severity: 'high',
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
createEventProcessor({
  name: 'OETH Curve AMO Strategy',
  chainId: 1,
  topic: 'OETH',
  tracks: [
    {
      address: [OETH_ETH_AMO_METAPOOL],
      events: omit(strategyCurveMetapoolAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Transfer',
        'Approval',
        'TokenExchange',
      ]),
    },
    {
      address: [OETH_ETH_AMO_METAPOOL],
      events: pick(strategyCurveMetapoolAbi.events, 'PTokenRemoved'),
      severity: 'high',
    },
  ],
})
createOTokenProcessor({ name: 'OETH Contract', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
