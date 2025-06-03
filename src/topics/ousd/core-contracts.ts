import { createBurnProcessor } from 'templates/burn'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenBuybackProcessor } from 'templates/otoken-buyback'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'

import { OUSD_ADDRESS, OUSD_BUYBACK, OUSD_VAULT_ADDRESS } from '@utils/addresses'
import { WOUSD } from '@utils/addresses/ousd-analytics'

// Core OUSD Token Contract
createOTokenProcessor({
  name: 'OUSD Contract',
  chainId: 1,
  address: [OUSD_ADDRESS],
  topic: 'OUSD',
})

// OUSD Vault Contract
createOTokenVaultProcessor({
  name: 'OUSD Vault',
  chainId: 1,
  address: [OUSD_VAULT_ADDRESS],
  topic: 'OUSD',
})

// OUSD Buyback Contract
createOTokenBuybackProcessor({
  name: 'OUSD Buyback',
  chainId: 1,
  address: [OUSD_BUYBACK],
  topic: 'OUSD',
})

// Burn Events
createBurnProcessor({
  name: 'OUSD Burn',
  chainId: 1,
  address: [OUSD_ADDRESS],
  topic: 'OUSD',
})

createBurnProcessor({
  name: 'WOUSD Burn',
  chainId: 1,
  address: [WOUSD],
  topic: 'OUSD',
})
