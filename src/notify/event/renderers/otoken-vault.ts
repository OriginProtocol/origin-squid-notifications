import { sonicAddresses } from '@utils/addresses/addresses-sonic'
import { meetsLimit } from '@utils/limits'

import * as vaultAbi from '../../../abi/otoken-vault'
import { OETH_VAULT_ADDRESS, OUSD_VAULT_ADDRESS } from '../../../utils/addresses'
import { baseAddresses } from '../../../utils/addresses/addresses-base'
import { formatAmount } from '../../../utils/formatAmount'
import { addressLink, transactionLink } from '../../../utils/links'
import { Topic } from '../../const'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed } from './utils'

const vaults: Record<string, { emoji: string; topic: Topic }> = {
  [OETH_VAULT_ADDRESS]: { emoji: '<:origin_ether_oeth:1091365232770814033>', topic: 'OETH' },
  [OUSD_VAULT_ADDRESS]: { emoji: '<:origin_dollar_ousd:1052865068511014973>', topic: 'OUSD' },
  [baseAddresses.superOETHb.vault]: { emoji: '<:super_oeth:1273652568014454914>', topic: 'superOETHb' },
  [sonicAddresses.OS.vault]: { emoji: '<:origin_sonic_os:1326419890302750730>', topic: 'OS' },
}

registerEventRenderer(vaultAbi.events.Mint.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.Mint.decode(log)
  if ((await meetsLimit('otoken', 'mint', baseAddresses.superOETHb.address, data._value)) === false) return
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Minted`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: ${addressLink(params.ctx, data._addr)}`,
    fields: [
      {
        name: formatAmount(data._value),
        value: `${vault.emoji} Mint`,
      },
    ],
  })
})

registerEventRenderer(vaultAbi.events.YieldDistribution.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.YieldDistribution.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} YieldDistribution`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: ${addressLink(params.ctx, data._to)}`,
    fields: [
      {
        name: formatAmount(data._yield),
        value: `Yield`,
        inline: true,
      },
      {
        name: formatAmount(data._fee),
        value: `Fee`,
        inline: true,
      },
    ],
  })
})

registerEventRenderer(vaultAbi.events.Redeem.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.Redeem.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Redeem`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: ${addressLink(params.ctx, data._addr)}`,
    fields: [
      {
        name: formatAmount(data._value),
        value: `${vault.emoji} Redeem`,
      },
    ],
  })
})

registerEventRenderer(vaultAbi.events.WithdrawalRequested.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.WithdrawalRequested.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Withdrawal Requested`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: ${addressLink(params.ctx, data._withdrawer)}`,
    fields: [
      {
        name: formatAmount(data._amount),
        value: `${vault.emoji} Requested`,
      },
    ],
  })
})

registerEventRenderer(vaultAbi.events.WithdrawalClaimed.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.WithdrawalClaimed.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Withdrawal Claimed`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: ${addressLink(params.ctx, data._withdrawer)}`,
    fields: [
      {
        name: formatAmount(data._amount),
        value: `${vault.emoji} Claimed`,
      },
    ],
  })
})

registerEventRenderer(vaultAbi.events.WithdrawalClaimable.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.WithdrawalClaimable.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Withdrawal Claimable`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    fields: [
      {
        name: formatAmount(data._newClaimable),
        value: `${vault.emoji} Claimable`,
      },
    ],
  })
})
