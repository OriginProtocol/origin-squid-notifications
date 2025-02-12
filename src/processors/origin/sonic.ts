import { pick } from 'lodash'

import * as multisigABI from '@abi/multisig'
import * as oethZapperAbi from '@abi/oeth-zapper'
import * as sfcAbi from '@abi/sonic-sfc'
import * as timelockABI from '@abi/timelock'
import { notifyTargets } from '@notify/const'
import { renderEventDiscordEmbed } from '@notify/event/renderers/utils'
import { createBurnProcessor } from '@processors/templates/burn'
import { createEventProcessor } from '@processors/templates/event'
import { createOTokenProcessor } from '@processors/templates/otoken'
import { createOTokenVaultProcessor } from '@processors/templates/otoken-vaults'
import { createGovernedUpgradeabilityProxyProcessor } from '@processors/templates/proxy'
import { createTraceErrorProcessor } from '@processors/templates/trace-errors'
import { sonicABIs } from '@utils/addresses/address-abis'
import { sonicAddresses, sonicOrigin } from '@utils/addresses/addresses-sonic'
import { formatAmount } from '@utils/formatAmount'

const chainId = 146

// OTokens
createOTokenProcessor({
  name: 'OS Contract',
  chainId,
  address: [sonicAddresses.OS.address],
  topic: 'OS',
})

// OTokenVaults
createOTokenVaultProcessor({
  name: 'OS Vault',
  chainId,
  address: [sonicAddresses.OS.vault],
  topic: 'OS',
})

// Zapper
createEventProcessor({
  name: 'OS Zapper',
  topic: 'OS',
  chainId,
  tracks: [
    {
      address: [sonicAddresses.OS.zapper],
      events: oethZapperAbi.events,
      severity: 'low',
      renderers: {
        Zap: (params) => {
          const data = oethZapperAbi.events.Zap.decode(params.log)
          renderEventDiscordEmbed(params, {
            description: `[${data.minter}](https://basescan.org/address/${data.minter})`,
            fields: [
              {
                name: formatAmount(data.amount),
                value: 'S',
                inline: true,
              },
            ],
          })
        },
      },
    },
  ],
})

// Strategies

// Burns
createBurnProcessor({
  name: 'OS Burn',
  chainId,
  address: [sonicAddresses.OS.address],
  topic: 'OS',
})
createBurnProcessor({
  name: 'Wrapped OS Burn',
  chainId,
  address: [sonicAddresses.OS.wrapped],
  topic: 'OS',
})

// Governance
createGovernedUpgradeabilityProxyProcessor({
  name: 'Origin Proxy Contracts Sonic',
  chainId,
  address: sonicAddresses.originList,
  topic: 'Governance',
  severity: 'high',
  notifyTarget: notifyTargets.Engineering,
})

// Multisig
createEventProcessor({
  name: 'Sonic Multisig',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: multisigABI.events,
      address: Object.values(sonicAddresses.multisig),
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Timelock
createEventProcessor({
  name: 'Sonic Timelock',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'medium',
      events: timelockABI.events,
      address: [sonicOrigin.timelock],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})

// Error Tracing
createTraceErrorProcessor({
  name: 'Sonic Error Trace',
  chainId,
  address: Object.keys(sonicABIs),
  abi: Object.values(sonicABIs),
  topic: 'OS',
  severity: 'high',
})

// Sonic Chain SFC
const highPrioritySfcEvents = pick(sfcAbi.events, [
  'ChangedValidatorStatus',
  'Upgraded',
  'OwnershipTransferred',
  'CreatedValidator',
  'DeactivatedValidator',
  'UpdatedSlashingRefundRatio',
])
createEventProcessor({
  name: 'Sonic Chain SFC',
  chainId,
  topic: 'Governance',
  tracks: [
    {
      severity: 'high',
      events: highPrioritySfcEvents,
      address: [sonicAddresses.sfc],
      notifyTarget: notifyTargets.Engineering,
    },
  ],
})
