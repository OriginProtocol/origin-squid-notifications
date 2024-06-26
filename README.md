# Origin Subsquid - Notifications

This squid is strictly for creating notifications which will feed into Discord or wherever else we need.

- [ ] There is *almost* no database. 😨
- [ ] There is no api. 😰

---

- [x] There is only processing. 🫢

> [!NOTE]
> Alerts which are based on metric thresholds should likely be created in Grafana using data from `origin-squid`.
>
> Ideal notifications for this project:
> - Governance Proposal Activity
> - Mints & Burns
> - Buyback swaps
> - Strategist updates
> - Strategy deposits/withdrawals
> - Events
> - Trace activity

### [How to contribute](CONTRIBUTE.md)

<img alt="neo-ai.png" height="300" src="neo-ai.png" width="300"/>

## Origin DeFi Bot Replacement

- [ ] aave_lpc_supply_rates
- [ ] aave_lpc_total_liquidity
- [ ] aave_proto_governance
- [ ] assetblock_holdings
- [x] buyback_swap
    - (legacy contracts skipped)
- [x] compound_governoralpha_proposals
- [x] compound_governorbravo_implementation
- [x] compound_governorbravo_proposals
- [x] compound_governorbravo_votingparams
- [x] compound_timelock_admin
- [x] compound_timelock_delay
- [x] compound_timelock_transactions
- [ ] ctoken_supplyrates
- [ ] ctoken_totalborrows
- [ ] ctoken_totalsupply
- [ ] curve_aragon_vote
- [ ] curve_aragon_vote_params
- [ ] failed_transactions
- [ ] feevault_balancechange
- [ ] feevault_newcontroller
- [ ] feevault_paused
- [ ] feevault_rewardssent
- [ ] governable_transfer
- [ ] governor_proposals
- [ ] keeper_upkeep
- [ ] noop
- [ ] oracle_outliers
- [ ] ousd_burns
- [x] ousd_governance_proposals
- [x] ousd_governance_settings
- [x] ousd_governance_votingparams
- [ ] ousd_oeth_totalsupply
- [ ] ousd_outliers
- [ ] ousd_timelock_delay
- [ ] ousd_timelock_roles
- [ ] ousd_timelock_transactions
- [ ] proxy_upgraded
- [ ] series_seasons
- [ ] staking_paused
- [ ] staking_rates
- [ ] staking_stake
- [ ] story_stake
- [ ] strategist_updated
- [ ] strategy_deposit
- [ ] strategy_harvester_updated
- [ ] strategy_ptokens
- [ ] strategy_reward_tokens_updated
- [ ] strategy_rewards
- [ ] strategy_slippage_updated
- [ ] timelock_admin
- [ ] timelock_delay
- [ ] uniswap_updated
- [ ] vault_buffer
- [ ] vault_capital
- [ ] vault_fees
- [ ] vault_mint_redeem
- [ ] vault_newasset
- [ ] vault_oracle
- [ ] vault_oracle_changed
- [ ] vault_rebase_pause
- [ ] vault_strategies
- [ ] vault_supplydiff
- [ ] vault_thresholds
- [ ] vault_trustee