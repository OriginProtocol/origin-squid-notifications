import { createBurnProcessor } from 'templates/burn'
import { createOTokenProcessor } from 'templates/otoken'
import { createOTokenVaultProcessor } from 'templates/otoken-vaults'
import { plumeMainnet } from 'viem/chains'

import { plumeAddresses } from '@utils/addresses/addresses-plume'

const chainId = plumeMainnet.id

// Core superOETHp Token Contract
createOTokenProcessor({
  name: 'superOETHp Contract',
  chainId,
  address: [plumeAddresses.superOETHp.address],
  topic: 'superOETHp',
})

// superOETHp Vault Contract
createOTokenVaultProcessor({
  name: 'superOETHp Vault',
  chainId,
  address: [plumeAddresses.superOETHp.vault],
  topic: 'superOETHp',
})

// Burn Events
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
