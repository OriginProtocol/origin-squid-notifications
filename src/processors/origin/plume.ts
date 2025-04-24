import { omit } from 'lodash'
import { plumeMainnet } from 'viem/chains'

import * as multisigABI from '@abi/multisig'
import * as strategyBridgedWOETHABI from '@abi/strategy-bridged-woeth'
import * as timelockABI from '@abi/timelock'
import { discordIconOrName, notifyTargets } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { createBurnProcessor } from '@processors/templates/burn'
import { createEventProcessor } from '@processors/templates/event'
import { createOTokenProcessor } from '@processors/templates/otoken'
import { createOTokenVaultProcessor } from '@processors/templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '@processors/templates/proxy'
import { createTraceErrorProcessor } from '@processors/templates/trace-errors'
import { oethPlumeABIs } from '@utils/addresses/address-abis'
import { WOETH_ADDRESS } from '@utils/addresses/addresses'
import { plumeAddresses, plumeOrigin } from '@utils/addresses/addresses-plume'
import { formatAmount } from '@utils/formatAmount'

const chainId = plumeMainnet.id

// OTokens
createOTokenProcessor({
  name: 'superOETHp Contract',
  chainId,
  address: [plumeAddresses.superOETHp.address],
  topic: 'superOETHp',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'superOETHp Vault',
  chainId,
  address: [plumeAddresses.superOETHp.vault],
  topic: 'superOETHp',
})

// Strategies
createEventProcessor({
  name: 'superOETHb Bridged WOETH Strategy',
  chainId: plumeMainnet.id,
  topic: 'superOETHb',
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

// Burns
createBurnProcessor({
  name: 'superOETHp Burn',
  chainId,
  address: [plumeAddresses.superOETHp.address],
  topic: 'superOETHp',
})
createBurnProcessor({
  name: 'wsuperOETHp Burn',
  chainId,
  address: [plumeAddresses.superOETHp.wrapped],
  topic: 'superOETHp',
})

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Plume',
  chainId,
  address: plumeAddresses.originList,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Plume Multisig',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(plumeAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Timelock
createEventProcessor({
  name: 'Plume Timelock',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [plumeOrigin.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Error Tracing
createTraceErrorProcessor({
  name: 'Plume Error Trace',
  chainId,
  address: Object.keys(oethPlumeABIs),
  abi: Object.values(oethPlumeABIs),
  topic: 'superOETHp',
  severity: 'high',
})
