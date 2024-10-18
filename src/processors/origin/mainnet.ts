import { omit, pick } from 'lodash'

import * as strategyCurveMetapoolAbi from '../../abi/curve-metapool'
import * as governedUpgradeabilityProxy from '../../abi/governed-upgradeability-proxy'
import * as multisigABIs from '../../abi/multisig'
import * as oethZapperAbi from '../../abi/oeth-zapper'
import * as ogvOgnMigratorAbi from '../../abi/ogv-ogn-migrator'
import * as strategyMetaMorphoAbi from '../../abi/strategy-meta-morpho'
import * as strategyMorphoAaveAbi from '../../abi/strategy-morpho-aave'
import * as strategyNativeStakingAbi from '../../abi/strategy-native-staking'
import { discordIconOrName, notifyTargets } from '../../notify/const'
import { simpleEventRenderer } from '../../notify/event/renderers/simple'
import { renderDiscordEmbed, renderEventDiscordEmbed } from '../../notify/event/renderers/utils'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_ETH_AMO_METAPOOL,
  OETH_NATIVE_STRATEGY_ADDRESSES,
  OETH_VAULT_ADDRESS,
  OETH_ZAPPER_ADDRESS,
  OGN_ADDRESS,
  OGN_GOVERNANCE_ADDRESS,
  OGN_REWARDS_SOURCE_ADDRESS,
  OGV_ADDRESS,
  OGV_OGN_MIGRATOR_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_VAULT_ADDRESS,
  WOETH_ADDRESS,
  XOGN_ADDRESS,
  addresses,
  strategies,
  tokens,
} from '../../utils/addresses'
import { oethABIs, ognABIs, ousdABIs } from '../../utils/addresses/address-abis'
import { GOVERNANCE_TIMELOCK, WOUSD } from '../../utils/addresses/ousd-analytics'
import { formatAmount } from '../../utils/formatAmount'
import { transactionLink } from '../../utils/links'
import { createBurnProcessor } from '../templates/burn'
import { createEventProcessor } from '../templates/event'
import { createExponentialStakingProcessor } from '../templates/exponential-staking'
import { createFixedRateRewardsSourceProcessor } from '../templates/fixed-rate-rewards-source'
import { createGovernanceProcessor } from '../templates/governance'
import { createOriginArmProcessor } from '../templates/origin-arm'
import { createOTokenProcessor } from '../templates/otoken'
import { createOTokenBuybackProcessor } from '../templates/otoken-buyback'
import { createOTokenVaultProcessor } from '../templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '../templates/proxy'
import { createTimelockProcessor } from '../templates/timelock'
import { createTraceProcessor } from '../templates/trace'
import { createTraceErrorProcessor } from '../templates/trace-errors'

// OTokens
createOTokenProcessor({ name: 'OETH Contract', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createOTokenProcessor({ name: 'OUSD Contract', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })

// OToken Strategies
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
createEventProcessor({
  name: 'OUSD Morpho Aave Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MorphoAaveStrategy],
      events: omit(strategyMorphoAaveAbi.events, [
        ...Object.keys(governedUpgradeabilityProxy.events),
        'Transfer',
        'Approval',
        'TokenExchange',
      ]),
    },
    {
      address: [strategies.ousd.MorphoAaveStrategy],
      events: pick(strategyMorphoAaveAbi.events, 'PTokenRemoved'),
      severity: 'high',
    },
  ],
})
createEventProcessor({
  name: 'OUSD Meta Morpho Strategy',
  chainId: 1,
  topic: 'OUSD',
  tracks: [
    {
      address: [strategies.ousd.MetaMorphoStrategy],
      events: omit(strategyMetaMorphoAbi.events, [...Object.keys(governedUpgradeabilityProxy.events)]),
    },
  ],
})

// OTokenVaults
createOTokenVaultProcessor({ name: 'OETH Vault', chainId: 1, address: [OETH_VAULT_ADDRESS], topic: 'OETH' })
createOTokenVaultProcessor({ name: 'OUSD Vault', chainId: 1, address: [OUSD_VAULT_ADDRESS], topic: 'OUSD' })

// Zapper
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

// Rewards Source
createFixedRateRewardsSourceProcessor({
  name: 'Origin Rewards',
  chainId: 1,
  address: [OGN_REWARDS_SOURCE_ADDRESS],
  topic: 'OGN',
})

// Burns
createBurnProcessor({ name: 'OGN Burn', chainId: 1, address: [OGN_ADDRESS], topic: 'OGN' })
createBurnProcessor({ name: 'OETH Burn', chainId: 1, address: [OETH_ADDRESS], topic: 'OETH' })
createBurnProcessor({ name: 'WOETH Burn', chainId: 1, address: [WOETH_ADDRESS], topic: 'OETH' })
createBurnProcessor({ name: 'OUSD Burn', chainId: 1, address: [OUSD_ADDRESS], topic: 'OUSD' })
createBurnProcessor({ name: 'WOUSD Burn', chainId: 1, address: [WOUSD], topic: 'OUSD' })

// Governance Related
createGovernanceProcessor({ name: 'Origin Governance', chainId: 1, address: [OGN_GOVERNANCE_ADDRESS], topic: 'OGN' })
createTimelockProcessor({ name: 'Origin Timelock', chainId: 1, address: [GOVERNANCE_TIMELOCK], topic: 'OGN' })
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts',
  chainId: 1,
  address: addresses.origin,
  topic: 'OGN',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Mainnet Multisig',
  chainId: 1,
  topic: 'OGN',
  tracks: [
    {
      severity: 'medium',
      events: multisigABIs.events,
      address: Object.values(addresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Buybacks
createOTokenBuybackProcessor({ name: 'OETH Buyback', chainId: 1, address: [OETH_BUYBACK], topic: 'OETH' })
createOTokenBuybackProcessor({ name: 'OUSD Buyback', chainId: 1, address: [OUSD_BUYBACK], topic: 'OUSD' })

// Staking
createExponentialStakingProcessor({ name: 'OGN Staking', chainId: 1, address: [XOGN_ADDRESS], topic: 'xOGN' })

// Error Tracing
createTraceErrorProcessor({
  name: 'OGN Error Trace',
  chainId: 1,
  address: Object.keys(ognABIs),
  abi: Object.values(ognABIs),
  topic: 'OGN',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
  excludeFilter: ({ trace, functionName }) =>
    trace.type === 'call' && trace.action.to === tokens.OGN && functionName === 'supportsInterface',
})
createTraceErrorProcessor({
  name: 'OETH Error Trace',
  chainId: 1,
  address: Object.keys(oethABIs),
  abi: Object.values(oethABIs),
  topic: 'OETH',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})
createTraceErrorProcessor({
  name: 'OUSD Error Trace',
  chainId: 1,
  address: Object.keys(ousdABIs),
  abi: Object.values(ousdABIs),
  topic: 'OUSD',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Trace OGV Migrations
createEventProcessor({
  name: 'OGV Migration',
  chainId: 1,
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

createOriginArmProcessor({
  name: 'Origin Lido ARM',
  topic: 'ARM',
  chainId: 1,
  address: addresses.arm.address,
  capManagerAddress: addresses.arm.capManager,
  zapperAddress: addresses.arm.zapper,
})
