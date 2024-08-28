import * as vaultAbi from '../../../abi/otoken-vault'
import { OETH_VAULT_ADDRESS, OUSD_VAULT_ADDRESS } from '../../../utils/addresses'
import { baseAddresses } from '../../../utils/addresses/addresses-base'
import { getAddressesPyName } from '../../../utils/addresses/names'
import { formatAmount } from '../../../utils/formatAmount'
import { transactionLink } from '../../../utils/links'
import { Topic } from '../../const'
import { notifyDiscord } from '../../discord'
import { registerEventRenderer } from '../event'
import { defaultEventRenderer } from './default'
import { renderDiscordEmbed } from './utils'

const vaults: Record<string, { emoji: string; topic: Topic }> = {
  [OETH_VAULT_ADDRESS]: { emoji: '<:origin_ether_oeth:1091365232770814033>', topic: 'OETH' },
  [OUSD_VAULT_ADDRESS]: { emoji: '<:origin_dollar_ousd:1052865068511014973>', topic: 'OUSD' },
  [baseAddresses.superOETHb.vault]: { emoji: '<:super_oeth:1273652568014454914>', topic: 'superOETHb' },
}

registerEventRenderer(vaultAbi.events.Mint.topic, async (params) => {
  const { log } = params
  const vault = vaults[log.address]
  if (!vault) {
    params.ctx.log.warn({ address: params.log.address }, 'Unsupported Vault')
    return defaultEventRenderer(params)
  }

  const data = vaultAbi.events.Mint.decode(log)
  renderDiscordEmbed({
    sortId: `${log.block.height}:${log.transactionIndex}:${log.logIndex}`,
    topic: params.topic,
    severity: params.severity,
    title: `${vault.topic} Minted`,
    titleUrl: transactionLink(log.transactionHash, params.ctx.chain),
    description: `Wallet: [${getAddressesPyName(data._addr) ?? data._addr}](https://etherscan.io/address/${
      data._addr
    })`,
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
    description: `Wallet: [${getAddressesPyName(data._to) ?? data._to}](https://etherscan.io/address/${data._to})`,
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
    description: `Wallet: [${getAddressesPyName(data._addr) ?? data._addr}](https://etherscan.io/address/${
      data._addr
    })`,
    fields: [
      {
        name: formatAmount(data._value),
        value: `${vault.emoji} Redeem`,
      },
    ],
  })
})
