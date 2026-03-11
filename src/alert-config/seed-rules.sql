-- Seed data for alert config DB
-- Generated from current ABI registry and notification processors
-- Generated at: 2026-03-10T21:47:27.295Z

BEGIN;

-- ─── Event Signatures (279) ─────────────────────────────────────────
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4c563c575a56d9737f009e7e9c600134eb839aea992e7e6cae26a025f8c5574d', 'AccountCapEnabled', 'AccountCapEnabled(bool)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7a745a2c63a535068f52ceca27debd5297bbad5f7f37ec53d044a59d0362445d', 'AccountingConsensusRewards', 'AccountingConsensusRewards(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbe7040030ff7b347853214bf49820c6d455fedf58f3815f85c7bc5216993682b', 'AccountingFullyWithdrawnValidator', 'AccountingFullyWithdrawnValidator(uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x80d022717ea022455c5886b8dd8a29c037570aae58aeb4d7b136d7a10ec2e431', 'AccountingManuallyFixed', 'AccountingManuallyFixed(int256,int256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x6aa7e30787b26429ced603a7aba8b19c4b5d5bcf29a3257da953c8d53bcaa3a6', 'AccountingValidatorSlashed', 'AccountingValidatorSlashed(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', 'AccountRebasingDisabled', 'AccountRebasingDisabled(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', 'AccountRebasingEnabled', 'AccountRebasingEnabled(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe9f5fe520e5763f721d470ecb21b23763a3b0b9e720070111b1b935c1107b065', 'ActiveMarketUpdated', 'ActiveMarketUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', 'AddedOwner', 'AddedOwner(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768', 'AddLiquidity', 'AddLiquidity(address,uint256[2],uint256[2],uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', 'AdminChanged', 'AdminChanged(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0538e1fc8a5bd2f2ae0c40c0a54b4208673263b92c883fe270768a5151346dfd', 'Allocated', 'Allocated(address,int256,int256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', 'Allocated', 'Allocated(address,int256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', 'AllocateThresholdUpdated', 'AllocateThresholdUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x857125196131cfcd709c738c6d1fd2701ce70f2a03785aeadae6f4b47fe73c1d', 'AnnouncedRedirection', 'AnnouncedRedirection(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f', 'AnswerUpdated', 'AnswerUpdated(int256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa8715770654f54603947addf38c689adbd7182e21673b28bcf306a957aaba215', 'ApplyNewFee', 'ApplyNewFee(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', 'Approval', 'Approval(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', 'ApproveHash', 'ApproveHash(bytes32,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7', 'ARMBufferUpdated', 'ARMBufferUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', 'AssetAllocated', 'AssetAllocated(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', 'AssetDefaultStrategyUpdated', 'AssetDefaultStrategyUpdated(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x07c31fccf51996f0f4ea01c3a55191786b3a8cd89f696db4d42adaa99b0e15f1', 'AssetDeposit', 'AssetDeposit(address,address,uint256,uint256,string)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', 'AssetRemoved', 'AssetRemoved(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', 'AssetSupported', 'AssetSupported(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4ac5df40d910feab74f02c4430568f99e711257906dd0df11643df22f2ee3cf6', 'AssetSwapped', 'AssetSwapped(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb7523e03ed4a74718427c422a01fee1138835adb5bd592240f30bd8b5e1b929a', 'BalancesSnapped', 'BalancesSnapped(bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xed2528338eefb63fd1860078b91e35106bc25e3fd528634d180f662582fe5ec1', 'BalancesVerified', 'BalancesVerified(uint64,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c', 'Burn', 'Burn(address,int24,int24,uint128,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2', 'Burn', 'Burn(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x66ac49f046ee1185a59a920bbdfe95faba2bba02afc4b64a97ac35d5d14acc47', 'BurntNativeTokens', 'BurntNativeTokens(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', 'CallExecuted', 'CallExecuted(bytes32,uint256,address,uint256,bytes)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', 'CallScheduled', 'CallScheduled(bytes32,uint256,address,uint256,bytes,bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', 'CampaignClosed', 'CampaignClosed(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', 'CampaignCreated', 'CampaignCreated(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x53c4764ec903d5e515c69c93f0b9b2916f9aa3fa54b34caeeae7bb596d7ec0f6', 'CampaignIdUpdated', 'CampaignIdUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3647dc83747c62411c2c3b832d3b044db3479bebbaeb800e7eaf100d41d2038e', 'CampaignRemoteManagerUpdated', 'CampaignRemoteManagerUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe2470238697bf7475f7230e5f3d01e088062f9610e00bcfb223e3a774949a09a', 'CancellationFeeRedeemed', 'CancellationFeeRedeemed(uint256,address,uint256,bool)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5b81b8e66a81fbba6ded220cf668cb5da777acaa83cafe789c2699cad0efd808', 'CancellationFeeUpdated', 'CancellationFeeUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', 'Cancelled', 'Cancelled(bytes32)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', 'CapitalPaused', 'CapitalPaused()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', 'CapitalUnpaused', 'CapitalUnpaused()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', 'CapManagerUpdated', 'CapManagerUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb34ee265e3d4f5ec4e8b52d59b2a9be8fceca2f274ebc080d8fba797fea9391f', 'CastVote', 'CastVote(uint256,address,bool,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', 'ChangedFallbackHandler', 'ChangedFallbackHandler(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', 'ChangedGuard', 'ChangedGuard(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x75e41bc35ff1bf14d81d1d2f649c0084a0f974f9289c803ec9898eeec4c8d0b8', 'ChangedMasterCopy', 'ChangedMasterCopy(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', 'ChangedThreshold', 'ChangedThreshold(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcd35267e7654194727477d6c78b541a553483cff7f92a055d17868d3da6e953e', 'ChangedValidatorStatus', 'ChangedValidatorStatus(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50', 'ChangeMinQuorum', 'ChangeMinQuorum(uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e', 'ChangeSupportRequired', 'ChangeSupportRequired(uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x865ca08d59f5cb456e85cd2f7ef63664ea4f73327414e9d8152c4158b0e94645', 'Claim', 'Claim(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8528f5537e4b9fc69da2fa4d455c4e03a5cc2c5a05d8815c8c06a6242f56ad57', 'ClaimBaseWithdrawals', 'ClaimBaseWithdrawals(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x70de20a533702af05c8faf1637846c4586a021bbc71b6928b089b6d555e4fbc2', 'ClaimedRewards', 'ClaimedRewards(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8e1e54871d51b13099eefa0b83d65f5f62d21e09e16029bb5cb77bf651d7d9a5', 'ClaimEtherFiWithdrawals', 'ClaimEtherFiWithdrawals(uint256[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', 'ClaimLidoWithdrawals', 'ClaimLidoWithdrawals(uint256[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9aa05b3d70a9e3e2f004f039648839560576334fb45c81f91b6db03ad9e2efc9', 'ClaimRewards', 'ClaimRewards(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f', 'ClaimRewards', 'ClaimRewards(address,address[],uint256[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0', 'Collect', 'Collect(address,address,int24,int24,uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x205860e66845f2bbc0966bfab80db9bf93fca93862ea2b9fcf6945748352b4a3', 'CollectFees', 'CollectFees(address,uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x878eb36b3f197f05821c06953d9bc8f14b332a227b1e26df06a4215bbfe5d73f', 'CommitNewFee', 'CommitNewFee(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xeb3c06937e6595fd80ec1add18a195026d5cf65f122cc3ffedbfb18a9ed80b39', 'ConfigSet', 'ConfigSet(uint32,uint24,uint32,uint24,uint16,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x49bca1ed2666922f9f1690c26a569e1299c2a715fe57647d77e81adfabbf25bf', 'CreatedValidator', 'CreatedValidator(uint256,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', 'CrossPriceUpdated', 'CrossPriceUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x29517452b3d8f353a0d81b89ef1eb2c73ce0fc391e9d8e46c2c11c068d73bbe5', 'CurvePoolBoosterPlainCreated', 'CurvePoolBoosterPlainCreated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787', 'CVXShareBpsUpdated', 'CVXShareBpsUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xac4801c32a6067ff757446524ee4e7a373797278ac3c883eac5c693b4ad72e47', 'DeactivatedValidator', 'DeactivatedValidator(uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4bd04f3440c9bf56a25f7b9e1ac75a9803bd83123a127cf9748129c938630b39', 'Decommissioned', 'Decommissioned()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f', 'DelegateChanged', 'DelegateChanged(address,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9a8f44850296624dadfd9c246d17e47171d35727a181bd090aa14bbbe00238bb', 'Delegated', 'Delegated(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724', 'DelegateVotesChanged', 'DelegateVotesChanged(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', 'Deposit', 'Deposit(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', 'Deposit', 'Deposit(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59', 'Deposit', 'Deposit(address,address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7', 'Deposit', 'Deposit(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xae0e4f727389efd70d748d667436e0264f370ae498b339b713797dbab57b12ff', 'DepositVerified', 'DepositVerified(bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', 'DisabledModule', 'DisabledModule(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', 'DripperChanged', 'DripperChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0a6387c9ea3628b88a633bb4f3b151770f70085117a15f9bf3787cda53f13d31', 'EIP712DomainChanged', 'EIP712DomainChanged()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', 'EnabledModule', 'EnabledModule(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8b0422d41caf5eb583695377e98b5041a1d241a7c80483cf182b1311c48c93b7', 'ETHDeposit', 'ETHDeposit(address,uint256,uint256,string)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xaca97428a1d7f2b7c4cee2fbe4feda457e132b404b0c9c3ff73bf7a988d889a8', 'ETHStaked', 'ETHStaked(bytes32,bytes32,bytes,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x958934bb53d6b4dc911b6173e586864efbc8076684a31f752c53d5778340b37f', 'ETHStaked', 'ETHStaked(bytes32,bytes,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab', 'ExecuteVote', 'ExecuteVote(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', 'ExecutionFailure', 'ExecutionFailure(bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', 'ExecutionFromModuleFailure', 'ExecutionFromModuleFailure(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', 'ExecutionFromModuleSuccess', 'ExecutionFromModuleSuccess(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', 'ExecutionSuccess', 'ExecutionSuccess(bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', 'FeeCollected', 'FeeCollected(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', 'FeeCollectorUpdated', 'FeeCollectorUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x112c256902bf554b6ed882d2936687aaeb4225e8cd5b51303c90ca6cf43a8602', 'Fees', 'Fees(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', 'FeeUpdated', 'FeeUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc8fcf8ee1425e7e60b8af83735e1eb516d5b9ef05bfd6eece552ebaeb7c75b48', 'FeeUpdated', 'FeeUpdated(uint16)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xce77f85e30b0e6df0d12527ddf038f900fdeda0eeda4284c52be47b05de31a97', 'FirstDepositReset', 'FirstDepositReset()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbdbdb71d7860376ba52b25a5028beea23581364a40522f6bcfb86bb1f2dca633', 'Flash', 'Flash(address,address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xafd24114486da8ebfc32f3626dada8863652e187461aa74d4bfa734891506203', 'FundsAdded', 'FundsAdded(uint256,address,uint96)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf3b5906e5672f3e524854103bcafbbdba80dbdfeca2c35e116127b1060a68318', 'FundsWithdrawn', 'FundsWithdrawn(uint256,uint256,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcb8d24e46eb3c402bf344ee60a6576cba9ef2f59ea1af3b311520704924e901a', 'FuseIntervalUpdated', 'FuseIntervalUpdated(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3d1394ba0f6fca9c1e344f10a3efe1bfca63bc591232bb0d76755690f409450c', 'GasLimitUpdated', 'GasLimitUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', 'GovernorshipTransferred', 'GovernorshipTransferred(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x064d28d3d3071c5cbc271a261c10c2f0f0d9e319390397101aa0eb23c6bad909', 'GuardianUpdated', 'GuardianUpdated(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', 'HarvesterAddressesUpdated', 'HarvesterAddressesUpdated(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xac49e518f90a358f652e4400164f05a5d8f7e35e7747279bc3a93dbf584e125a', 'IncreaseObservationCardinalityNext', 'IncreaseObservationCardinalityNext(uint16,uint16)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x98636036cb66a9c19a37435efc1e90142190214e8abeb821bdba3f2990dd4c95', 'Initialize', 'Initialize(uint160,int24)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', 'Initialized', 'Initialized(uint8)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', 'Initialized', 'Initialized(uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x056264c94f28bb06c99d13f0446eb96c67c215d8d707bce2655a98ddf1c0b71f', 'KeepersUpdated', 'KeepersUpdated(address[],address[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7ca4ac117ed3cdce75c1161d8207c440389b1a15d69d096831664657c07dafc2', 'LateQuorumVoteExtensionSet', 'LateQuorumVoteExtensionSet(uint64,uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x1530ec748a27514ffab0987654233a80256393e127bdf02d94e32ff3c7148ec6', 'LiquidityAdded', 'LiquidityAdded(uint256,uint256,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd5641199fd66ba2e0225ec23448f19db5a5524b3133b8c21c462f32d61e29603', 'LiquidityProviderCap', 'LiquidityProviderCap(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xede5d7a610050b00dde41dd385fe2d91a558dde29318267aa4e011678b58cfc5', 'LiquidityRemoved', 'LiquidityRemoved(uint256,uint256,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb5895e6e094fe35ea6fb07a0d870556bd8873cb5b013db35577ac4b8fc9ba911', 'LockupsMigrated', 'LockupsMigrated(address,uint256[],uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbc600b1f03d316c479b49930c28e328809316458d5b5dacbb7419df5f6f89647', 'MarketAdded', 'MarketAdded(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x59d7b1e52008dc342c9421dadfc773114b914a65682a4e4b53cf60a970df0d77', 'MarketRemoved', 'MarketRemoved(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x44a9f72c31db7b99a131a49de95fe2420c60e9fe9bff0a1a13d47b4af14566b4', 'MaxNodeDelegatorLimitUpdated', 'MaxNodeDelegatorLimitUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5066a7b9bf5907d8b921adeaade475273e40a7302cab0e838ef9fa2094b06b7f', 'MaxPriceDiffBpsUpdated', 'MaxPriceDiffBpsUpdated(uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9c922f6d0c990b250e9dd0a427a5c8da7f44b960f697fecb31cbbd8ba79ec8c2', 'MaxSlippageUpdated', 'MaxSlippageUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', 'MaxSupplyDiffChanged', 'MaxSupplyDiffChanged(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9', 'MerklDistributorUpdated', 'MerklDistributorUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x1bba2f1175afe384c3b2efde45f19740b744459c61a7700994196fe4d84af176', 'MinAmountToDepositUpdated', 'MinAmountToDepositUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', 'MinDelayChange', 'MinDelayChange(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375', 'MinimumBalanceSet', 'MinimumBalanceSet(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580', 'MinimumTimeSet', 'MinimumTimeSet(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde', 'Mint', 'Mint(address,address,int24,int24,uint128,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', 'Mint', 'Mint(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', 'Mint', 'Mint(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', 'NetOusdMintForStrategyThresholdChanged', 'NetOusdMintForStrategyThresholdChanged(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0109fc6f55cf40689f02fbaad7af7fe7bbac8a3d2186600afc7d3e10cac60271', 'NewRound', 'NewRound(uint256,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd402f64df01ef62b7343cb5309018377088f22dc1b81a5378ce7f2575114afe4', 'NodeDelegatorAddedInQueue', 'NodeDelegatorAddedInQueue(address[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb17adb7f863ad4dced68bd4045e81e087cb8c5b536bf2dbda6c8176e5fc593b9', 'NodeDelegatorRemovedFromQueue', 'NodeDelegatorRemovedFromQueue(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x52977ea98a2220a03ee9ba5cb003ada08d394ea10155483c95dc2dc77a7eb24b', 'NotifyReward', 'NotifyReward(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x71113ae8f52afc8062af1d0ec71513000c9a7b93eeb737ab8fb50f908445d78a', 'NumberOfPeriodsUpdated', 'NumberOfPeriodsUpdated(uint8)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54', 'OperatorChanged', 'OperatorChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743', 'OTokenBuyback', 'OTokenBuyback(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', 'OusdMetaStrategyUpdated', 'OusdMetaStrategyUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', 'OwnershipTransferred', 'OwnershipTransferred(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278', 'OwnershipTransferRequested', 'OwnershipTransferRequested(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', 'Paused', 'Paused(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x78af32efdcad432315431e9b03d27e6cd98fb79c405fdc5af7c1714d9c0f75b3', 'PayeeshipTransferred', 'PayeeshipTransferred(address,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x84f7c7c80bb8ed2279b4aab5f61cd05e6374073d38f46d7f32de8c30e9e38367', 'PayeeshipTransferRequested', 'PayeeshipTransferRequested(address,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9c687134d572ff69f3e23f40470562650574c5c7cab9f535268763b2d00da65b', 'PayloadSent', 'PayloadSent(uint256,uint40,address,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9819093176a1851202c7bcfa46845809b4e47c261866550e94ed3775d2f40698', 'PaymentWithdrawn', 'PaymentWithdrawn(address,uint256,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x322e5021ddf51920f7602154a6c845b34ef1b32704a1fa2c66927b56be280762', 'Penalty', 'Penalty(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', 'PendingGovernorshipTransfer', 'PendingGovernorshipTransfer(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0d0d42e29eda809becae4f120dfbc3799e17df829fa338f8035c724579423b89', 'PoolRebalanced', 'PoolRebalanced(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xfb25072e740f40f37c0adb21abfa08b090c754a216aa3dce33b68fab089eff91', 'PoolWethShareIntervalUpdated', 'PoolWethShareIntervalUpdated(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xfc61eef8f2b4da4ee7bfb9f335f064e2a35a3f6e8e65c3168eafe813aafe4c58', 'PowerStrategyUpdated', 'PowerStrategyUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', 'PriceProviderUpdated', 'PriceProviderUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c', 'ProposalCanceled', 'ProposalCanceled(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcc914becfa276bbc067049bf8db2d34ebbdc1bafa851e4d4936aaed376c08dbe', 'ProposalCreated', 'ProposalCreated(uint256,address,uint8,bytes32)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0', 'ProposalCreated', 'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f', 'ProposalExecuted', 'ProposalExecuted(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x541f725fb9f7c98a30cc9c0ff32fbb14358cd7159c847a3aa20a2bdc442ba511', 'ProposalExtended', 'ProposalExtended(uint256,uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2bed878481293fc7587c48352c8b09aeeca52bed666011d7f916706ec72d6d6d', 'ProposalFailed', 'ProposalFailed(uint256,uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe39e7fc9f2013b8ab01110f66610f9fb8675d3126e69b3752f0084afc72be19a', 'ProposalQueued', 'ProposalQueued(uint256,uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892', 'ProposalQueued', 'ProposalQueued(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xccb45da8d5717e6c4544694297c4ba5cf151d455c9bb0ed4fc7a38411bc05461', 'ProposalThresholdSet', 'ProposalThresholdSet(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', 'PTokenAdded', 'PTokenAdded(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', 'PTokenRemoved', 'PTokenRemoved(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997', 'QuorumNumeratorUpdated', 'QuorumNumeratorUpdated(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa2b71ec6df949300b59aab36b55e189697b750119dd349fcfa8c0f779e83c254', 'RampA', 'RampA(uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', 'RebasePaused', 'RebasePaused()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', 'RebaseThresholdUpdated', 'RebaseThresholdUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', 'RebaseUnpaused', 'RebaseUnpaused()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02', 'RecoverToVault', 'RecoverToVault(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', 'Redeem', 'Redeem(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c', 'Redeem', 'Redeem(address,address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', 'RedeemClaimed', 'RedeemClaimed(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', 'RedeemFeeUpdated', 'RedeemFeeUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', 'RedeemRequested', 'RedeemRequested(address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x172fdfaf5222519d28d2794b7617be033f46d954f9b6c3896e7d2611ff444252', 'RefundedSlashedLegacyDelegation', 'RefundedSlashedLegacyDelegation(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5bcd3d54a041466fb9b7b96cc95157490816813f67990974e3f3b24b58a5996b', 'RegisterEtherFiWithdrawalRequests', 'RegisterEtherFiWithdrawalRequests(uint256[],uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9bf4a5b30267728df68663e14adb47e559863967c419dc6030638883408bed2e', 'RegistrarChanged', 'RegistrarChanged(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x83f29c79feb71f8fba9d0fbc4ba5f0982a28b6b1e868b3fc50e6400d100bca0f', 'RegistratorChanged', 'RegistratorChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', 'RemovedOwner', 'RemovedOwner(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c', 'RemoveLiquidity', 'RemoveLiquidity(address,uint256[2],uint256[2],uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e', 'RemoveLiquidityImbalance', 'RemoveLiquidityImbalance(address,uint256[2],uint256[2],uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0', 'RemoveLiquidityOne', 'RemoveLiquidityOne(address,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x918b5bd4499a75f73bb64f14ae0254255f5421d0ecc4dd853c7bfdd7cf65e8fd', 'RepresentativeUpdated', 'RepresentativeUpdated(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9910c447d600210d0328b2c6f5374d7acc58344b9ce5d9c97f5a2a90fa611956', 'RequestBaseWithdrawal', 'RequestBaseWithdrawal(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x175bf92b330cf62d4fa2e358efef3366f13d7f24cc251f7c7a6943de8c6e7a17', 'RequestEtherFiWithdrawal', 'RequestEtherFiWithdrawal(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', 'RequestLidoWithdrawals', 'RequestLidoWithdrawals(uint256[],uint256[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x663e0f63f4fc6b01be195c4b56111fd6f14b947d6264497119b08daf77e26da5', 'RestakedRewards', 'RestakedRewards(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x619caafabdd75649b302ba8419e48cccf64f37f1983ac4727cfb38b57703ffc9', 'Reward', 'Reward(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9026b1dc1bd4688af8f4998f8cacc713a53fba753294da0efe4849a25c26023e', 'RewardCollected', 'RewardCollected(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8f283dbedfa7a1926a86469a652c5f13e8f038708d78cbeb0e1950c9e0862502', 'RewardPerVoteUpdated', 'RewardPerVoteUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x50f4ca9002119593802480c412cb5e106ae726647a31dcf8a7e7ed4e6794bf5e', 'RewardProceedsAddressChanged', 'RewardProceedsAddressChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x42e60aae8f000883c46e2f449fa76268e374ce1b962f46ca9360ab98b18f5799', 'RewardProceedsTransferred', 'RewardProceedsTransferred(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe261f91b5c3d9f16ed2268171bcd375f4aa1fe4b244cfe2e54a7d21be4735d46', 'RewardsPerSecondChanged', 'RewardsPerSecondChanged(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd', 'RewardsSourceUpdated', 'RewardsSourceUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x41ad0a33748dcbf4495041d0518e1204c1d5f0d65e7dccb51877235361e75f4a', 'RewardsTargetChange', 'RewardsTargetChange(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', 'RewardTokenAddressesUpdated', 'RewardTokenAddressesUpdated(address[],address[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', 'RewardTokenCollected', 'RewardTokenCollected(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5eb6073ba3980477f03b1ce0dccba754d48454bbd65a115dcd42db65ca1fefd2', 'RewardTokenConfigUpdated', 'RewardTokenConfigUpdated(address,uint16,uint16,uint8,address,bytes,uint256,bool)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa861903141bc68b536d5048a576afcc645630e1b18a4296ef34cbd4d1407f709', 'RewardTokenSwapped', 'RewardTokenSwapped(address,address,uint8,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', 'RoleAdminChanged', 'RoleAdminChanged(bytes32,bytes32,bytes32)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', 'RoleGranted', 'RoleGranted(bytes32,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b', 'RoleRevoked', 'RoleRevoked(bytes32,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', 'SafeModuleTransaction', 'SafeModuleTransaction(address,address,uint256,bytes,uint8)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', 'SafeMultiSigTransaction', 'SafeMultiSigTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes,bytes)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', 'SafeReceived', 'SafeReceived(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', 'SafeSetup', 'SafeSetup(address,address[],uint256,address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9', 'ScriptResult', 'ScriptResult(address,bytes,bytes,bytes)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x973d8d92bb299f4af6ce49b52a8adb85ae46b9f214c4c4fc06ac77401237b133', 'SetFeeProtocol', 'SetFeeProtocol(uint8,uint8,uint8,uint8)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4', 'SignMsg', 'SignMsg(bytes32)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x6aecca20726a17c1b81989b2fd09dfdf636bae9e564d4066ca18df62dc1f3dc2', 'SSVValidatorExitCompleted', 'SSVValidatorExitCompleted(bytes32,bytes,uint64[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8c2e15303eb94e531acc988c2a01d1193bdaaa15eda7f16dda85316ed463578d', 'SSVValidatorExitInitiated', 'SSVValidatorExitInitiated(bytes32,bytes,uint64[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x50837f89f5e75ae0a7bcc858f53ea15fa398dc007fd52cbfe4683ae9a6c2d722', 'SSVValidatorRegistered', 'SSVValidatorRegistered(bytes32,uint64[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xacd38e900350661e325d592c959664c0000a306efb2004e7dc283f44e0ea0423', 'SSVValidatorRegistered', 'SSVValidatorRegistered(bytes32,bytes,uint64[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x63d54ea43f163d6e28fc23abec67eb7c3294e7e6f0620955a73cd8d17c7367f4', 'SSVValidatorRemoved', 'SSVValidatorRemoved(bytes32,uint64[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2720efa4b2dd4f3f8a347da3cbd290a522e9432da9072c5b8e6300496fdde282', 'Stake', 'Stake(address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe765a88a37047c5d793dce22b9ceb5a0f5039d276da139b4c7d29613f341f110', 'StakeETHTallyReset', 'StakeETHTallyReset()') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe26b067424903962f951f568e52ec9a3bbe1589526ea54a4e69ca6eaae1a4c77', 'StakeETHThresholdChanged', 'StakeETHThresholdChanged(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x3329861a0008b3348767567d2405492b997abd79a088d0f2cef6b1a09a8e7ff7', 'StakingMonitorChanged', 'StakingMonitorChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394', 'StartVote', 'StartVote(uint256,address,string,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x46e22fb3709ad289f62ce63d469248536dbc78d82b84a3d7e74ad606dc201938', 'StopRampA', 'StopRampA(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', 'StrategistUpdated', 'StrategistUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', 'StrategyAddedToMintWhitelist', 'StrategyAddedToMintWhitelist(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', 'StrategyApproved', 'StrategyApproved(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', 'StrategyRemoved', 'StrategyRemoved(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', 'StrategyRemovedFromMintWhitelist', 'StrategyRemovedFromMintWhitelist(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x013ed61add17cbfcbbd95bf8543da67c89658c5477d3f3199a1a2d58ecf1913f', 'SupportedStrategyUpdate', 'SupportedStrategyUpdate(address,bool)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67', 'Swap', 'Swap(address,address,int256,int256,uint160,uint128,int24)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b', 'Swap', 'Swap(address,address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', 'SwapAllowedUndervalueChanged', 'SwapAllowedUndervalueChanged(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', 'Swapped', 'Swapped(address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', 'SwapperChanged', 'SwapperChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df', 'SwapRouterUpdated', 'SwapRouterUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', 'SwapSlippageChanged', 'SwapSlippageChanged(address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcf2aa50876cdfbb541206f89af0ee78d44a2abf8d328e37fa4917f982149848a', 'Sync', 'Sync(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401', 'TimelockChange', 'TimelockChange(address,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140', 'TokenExchange', 'TokenExchange(address,int128,uint256,int128,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9c1f21412e7678ca4f1e877049ce3e4db3d039e316e6b55b1de2aef667ae4996', 'TokenExchanged', 'TokenExchanged(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xfb475a842bad10d3800b61bd1a92e716051afba979b124b583bd99a2d1d7bfd5', 'TokensRescued', 'TokensRescued(address,uint256,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb237111e0971b3cc8dc65f6164aeb3bf03eabde0c4466dd4ce9e6973ee1a5354', 'TotalAssetsCap', 'TotalAssetsCap(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd922add93b22e9295e2ea259b37756ee2ccafa6872cccda342584d40c754c766', 'TotalRewardAmountUpdated', 'TotalRewardAmountUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235', 'TotalSupplyUpdatedHighres', 'TotalSupplyUpdatedHighres(uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', 'TraderateChanged', 'TraderateChanged(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'Transfer', 'Transfer(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x6dd5bb8ebf4cfb647c1cc0e9364ed9ecbf56202f7d3c9f058473df82664478d8', 'TreasuryFeesResolved', 'TreasuryFeesResolved(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4', 'TreasuryManagerUpdated', 'TreasuryManagerUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750', 'TrusteeAddressChanged', 'TrusteeAddressChanged(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', 'TrusteeFeeBpsChanged', 'TrusteeFeeBpsChanged(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xd3bb4e423fbea695d16b982f9f682dc5f35152e5411646a8a5a79a6b02ba8d57', 'Undelegated', 'Undelegated(address,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xab1ece054738c773b84a8a32f5f969323c50dc7e28634302f91c7b75cb838782', 'UnderlyingAssetsUpdated', 'UnderlyingAssetsUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', 'Unpaused', 'Unpaused(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x05b744e3e9358bc00ba3cc0c6606a4d6536134dba00b2d2ee4b5de169acd6427', 'Unstake', 'Unstake(address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9cf19cefd9aab739c33b95716ee3f3f921f219dc6d7aae25e1f9497b37889150', 'UpdatedLRTConfig', 'UpdatedLRTConfig(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x047575f43f09a7a093d94ec483064acfc61b7e25c0de28017da442abf99cb917', 'UpdatedSlashingRefundRatio', 'UpdatedSlashingRefundRatio(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b', 'Upgraded', 'Upgraded(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x91cb3bb75cfbd718bbfccc56b7f53d92d7048ef4ca39a3b7b7c6d4af1f791181', 'UpkeepCanceled', 'UpkeepCanceled(uint256,uint64)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xcaacad83e47cc45c280d487ec84184eee2fa3b54ebaa393bda7549f13da228f6', 'UpkeepPerformed', 'UpkeepPerformed(uint256,bool,address,uint96,bytes)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xbae366358c023f887e791d7a62f2e4316f1026bd77f6fb49501a917b3bc5d012', 'UpkeepRegistered', 'UpkeepRegistered(uint256,uint32,address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb8318df57b70f6381fb18aaf762e33efa2cc92627aae83d417f6710e1415d8d8', 'ValidatorInvalid', 'ValidatorInvalid(bytes32)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8142f1367675d1a37dc1aa31258c38b05f5348de55b799764472d94ccb4a71f4', 'ValidatorVerified', 'ValidatorVerified(bytes32,uint40)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8dd83105dbd4263d41c76e5d414905babdd3f035bd2031f6ce8895715595979c', 'ValidatorWithdraw', 'ValidatorWithdraw(bytes32,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', 'VaultBufferUpdated', 'VaultBufferUpdated(uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda4', 'VoteCast', 'VoteCast(address,uint256,uint8,uint256,string)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xe2babfbac5889a709b63bb7f598b324e08bc5a4fb9ec647fb3cbc9ec07eb8712', 'VoteCastWithParams', 'VoteCastWithParams(address,uint256,uint8,uint256,string,bytes)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf78ab0f6be87fe178c5f1b1fc0a1da52c65e7ac9a866215631dec7ffb1bd108d', 'VoteForwarded', 'VoteForwarded(uint256,address,bool,(address,uint128)[])') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4d91cd42ff82ea2004fe60a13788b0c4a8ea5cc08105cc9e21098a93547845ec', 'VotemarketUpdated', 'VotemarketUpdated(address)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x45f1db29750f423920a6edede3a80ea19ceb9de3eabc072078eb539ca348dca0', 'VotingActivated', 'VotingActivated(uint256,bytes32,uint24)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xa743f6cc30e98a5cb8e1148f36749c33167ec405cf4262bf6c7ae093d2a6c63f', 'VotingConfigUpdated', 'VotingConfigUpdated(uint8,uint24,uint24,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xc565b045403dc03c2eea82b81a0465edad9e2e7fc4d97e11421c209da93d7a93', 'VotingDelaySet', 'VotingDelaySet(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x7e3f7f0708a84de9203036abaa450dccc85ad5ff52f78c170f3edb55cf5e8828', 'VotingPeriodSet', 'VotingPeriodSet(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x5e1f23fe5aaf4ee57082b5f445e00d5a47343503b24ab1532a6c8cd15ba97008', 'VotingPortalUpdated', 'VotingPortalUpdated(address,bool)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568', 'Withdraw', 'Withdraw(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db', 'Withdraw', 'Withdraw(address,address,address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398', 'Withdrawal', 'Withdrawal(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', 'WithdrawalClaimable', 'WithdrawalClaimable(uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x8188e2b4d95f73db30690b4103c71159349bb897df928902c6330ef99e45fef3', 'WithdrawalClaimed', 'WithdrawalClaimed(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', 'WithdrawalClaimed', 'WithdrawalClaimed(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x92072c627ec1da81f8268b3cfb3c02bbbeedc12c21134faf4457469147619947', 'WithdrawalRequested', 'WithdrawalRequested(address,address,address,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', 'WithdrawalRequested', 'WithdrawalRequested(address,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x94ffd6b85c71b847775c89ef6496b93cee961bdc6ff827fd117f174f06f745ae', 'Withdrawn', 'Withdrawn(address,uint256,uint256,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x688768fc37ada60fd073f86fafc8d5aa7fe9d86750ddf224bc0366812c086fe8', 'WOETHPriceUpdated', 'WOETHPriceUpdated(uint128,uint128)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80', 'YieldDistribution', 'YieldDistribution(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6', 'Zap', 'Zap(address,address,uint256)') ON CONFLICT (topic0) DO NOTHING;
INSERT INTO event_signature (topic0, name, full_sig) VALUES ('0x4a5e9c74490922edc73617d3f521bffd83682ac8c6d5bfe58d1386853c483dff', 'Zap', 'Zap(address,uint256,uint256)') ON CONFLICT (topic0) DO NOTHING;

-- ─── Function Signatures (929) ───────────────────────────────────
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf3207723', '_deposit', '_deposit(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf817bc63', '_deprecated_rewardLiquidationThreshold', '_deprecated_rewardLiquidationThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2e655201', '_deprecated_rewardTokenAddress', '_deprecated_rewardTokenAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcc8343aa', '_syncValidator', '_syncValidator(uint256,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3eaaf86b', '_totalSupply', '_totalSupply()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9e2bf22c', '_withdraw', '_withdraw(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf446c1d0', 'A', 'A()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76a2f0f0', 'A_precise', 'A_precise()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x79ba5097', 'acceptOwnership', 'acceptOwnership()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb121e147', 'acceptPayeeship', 'acceptPayeeship(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbc43cbaf', 'accessController', 'accessController()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x475b070c', 'accountCapEnabled', 'accountCapEnabled()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x939d6237', 'accRewardPerShare', 'accRewardPerShare()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x128fced1', 'accruedRewards', 'accruedRewards(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x46a3d430', 'ACHIEVABLE_VOTING_PARTICIPATION', 'ACHIEVABLE_VOTING_PARTICIPATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf6ead0b9', 'activateVoting', 'activateVoting(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x66e3667e', 'activeDepositedValidators', 'activeDepositedValidators()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xce318c51', 'activeMarket', 'activeMarket()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0c3e4b54', 'add_liquidity(uint256[2],uint256,address)', 'add_liquidity(uint256[2],uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0b4c7e4d', 'add_liquidity(uint256[2],uint256)', 'add_liquidity(uint256[2],uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x948108f7', 'addFunds', 'addFunds(uint256,uint96)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xda40385d', 'addMarkets', 'addMarkets(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x19304ccf', 'addNodeDelegatorContractToQueue', 'addNodeDelegatorContractToQueue(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0d582f13', 'addOwnerWithThreshold', 'addOwnerWithThreshold(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3b4b661', 'addVotingPortals', 'addVotingPortals(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb9b17f9f', 'addWithdrawalQueueLiquidity', 'addWithdrawalQueueLiquidity()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf851a440', 'admin', 'admin()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe66f43f5', 'admin_action_deadline', 'admin_action_deadline()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe2e7d264', 'admin_balances', 'admin_balances(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfee3f7f9', 'admin_fee', 'admin_fee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x245a7bfc', 'aggregator', 'aggregator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xabaa9916', 'allocate', 'allocate()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4a8ff603', 'allocateThreshold', 'allocateThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdd62ed3e', 'allowance', 'allowance(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x042e586e', 'allowedWethShareEnd', 'allowedWethShareEnd()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x571fbf60', 'allowedWethShareStart', 'allowedWethShareStart()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7e7db6e1', 'allowRecoverability', 'allowRecoverability(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x46f1ca35', 'announceRedirection', 'announceRedirection(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x80afdea8', 'appId', 'appId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f12fe97', 'apply_new_fee', 'apply_new_fee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x095ea7b3', 'approve', 'approve(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7d832974', 'approvedHashes', 'approvedHashes(address,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd4d9bdcd', 'approveHash', 'approveHash(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x370419e5', 'arm', 'arm()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa4c84f25', 'armBuffer', 'armBuffer()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x38d52e0f', 'asset', 'asset()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa403e4d5', 'assetDefaultStrategies', 'assetDefaultStrategies(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa40bee50', 'assetInfo', 'assetInfo()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1083f761', 'assetToken', 'assetToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0fc3b4c4', 'assetToPToken', 'assetToPToken(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x456cb7c6', 'authorized', 'authorized()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9fa1826e', 'autoAllocateThreshold', 'autoAllocateThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x46fcff4c', 'availableFunds', 'availableFunds()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6f2ff9e0', 'balanceForCVX', 'balanceForCVX()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3551fb78', 'balanceForOGN', 'balanceForOGN()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9cc7f708', 'balanceOf', 'balanceOf(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x70a08231', 'balanceOf', 'balanceOf(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xda70696c', 'balancerPoolId', 'balancerPoolId(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4903b0d1', 'balances', 'balances(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdeaaa7cc', 'BALLOT_TYPEHASH', 'BALLOT_TYPEHASH()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcdf456e1', 'baseAsset', 'baseAsset()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7cb374bd', 'baseTokenAddress', 'baseTokenAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x82aa1c88', 'baseTokenDecimals', 'baseTokenDecimals()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcceab750', 'BEACON_CHAIN_DEPOSIT_CONTRACT', 'BEACON_CHAIN_DEPOSIT_CONTRACT()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7da9982a', 'BEACON_PROOFS', 'BEACON_PROOFS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc5700a02', 'blockTimestampLast', 'blockTimestampLast()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd5177868', 'bribeAll', 'bribeAll(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaeaf191b', 'bridgedWOETH', 'bridgedWOETH()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x89afcb44', 'burn', 'burn(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9dc29fac', 'burn', 'burn(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6f89244c', 'burn(int24,int24,uint128,address)', 'burn(int24,int24,uint128,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa34123a7', 'burn(int24,int24,uint128)', 'burn(int24,int24,uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6217f3ea', 'burnForStrategy', 'burnForStrategy(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x850a10c0', 'burnNativeTokens', 'burnNativeTokens()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x36b6d944', 'cacheDecimals', 'cacheDecimals(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x44c54707', 'cacheWETHAssetIndex', 'cacheWETHAssetIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xed8e84f3', 'calc_token_amount', 'calc_token_amount(uint256[2],bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcc2b27d7', 'calc_withdraw_one_coin', 'calc_withdraw_one_coin(uint256,int128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x67bd7ba3', 'calculateRedeemOutputs', 'calculateRedeemOutputs(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8ed5b0fc', 'campaignId', 'campaignId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x833f68c8', 'campaignRemoteManager', 'campaignRemoteManager()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x40e58ee5', 'cancel', 'cancel(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4d252f5', 'cancel', 'cancel(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3a76d92', 'CANCELLATION_FEE_COLLECTOR', 'CANCELLATION_FEE_COLLECTOR()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb08e51c0', 'CANCELLER_ROLE', 'CANCELLER_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe0a8f6f5', 'cancelProposal', 'cancelProposal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc8048022', 'cancelUpkeep', 'cancelUpkeep(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2d573501', 'canCreateNewVote', 'canCreateNewVote(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcc63604a', 'canExecute', 'canExecute(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc0774df3', 'canForward', 'canForward(address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa1658fad', 'canPerform', 'canPerform(address,bytes32,uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcdb2867b', 'canVote', 'canVote(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe6cc5432', 'capitalPaused', 'capitalPaused()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6d785a87', 'capManager', 'capManager()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x56781388', 'castVote', 'castVote(uint256,uint8)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3bccf4fd', 'castVoteBySig', 'castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7b3c71d3', 'castVoteWithReason', 'castVoteWithReason(uint256,uint8,string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5f398a14', 'castVoteWithReasonAndParams', 'castVoteWithReasonAndParams(uint256,uint8,string,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x03420181', 'castVoteWithReasonAndParamsBySig', 'castVoteWithReasonAndParamsBySig(uint256,uint8,string,bytes,uint8,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8f73dcfa', 'centralRegistry', 'centralRegistry()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7de7edef', 'changeMasterCopy', 'changeMasterCopy(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5eb24332', 'changeMinAcceptQuorumPct', 'changeMinAcceptQuorumPct(uint64)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x39a7919f', 'changeSupply', 'changeSupply(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7c1d0b87', 'changeSupportRequiredPct', 'changeSupportRequiredPct(uint64)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x694e80c3', 'changeThreshold', 'changeThreshold(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5f515226', 'checkBalance', 'checkBalance(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x12fb68e0', 'checkNSignatures', 'checkNSignatures(bytes32,bytes,bytes,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x49dcc204', 'checkpoints', 'checkpoints(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf1127ed8', 'checkpoints', 'checkpoints(address,uint32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x934f3a11', 'checkSignatures', 'checkSignatures(bytes32,bytes,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc41b813a', 'checkUpkeep', 'checkUpkeep(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe18132c4', 'CLAIM_DELAY', 'CLAIM_DELAY()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaf38d757', 'claimable', 'claimable()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4d5a9f8a', 'claimable0', 'claimable0(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa1ac4d13', 'claimable1', 'claimable1(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad3a6706', 'claimBaseWithdrawals', 'claimBaseWithdrawals(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1c8ec299', 'claimDelay', 'claimDelay()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb45e2d75', 'claimEtherFiWithdrawals', 'claimEtherFiWithdrawals(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd294f093', 'claimFees', 'claimFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5d36b190', 'claimGovernance', 'claimGovernance()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4e1d1840', 'claimLidoWithdrawals', 'claimLidoWithdrawals(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4e71e0c8', 'claimOwnership', 'claimOwnership()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe46cf747', 'claimRedeem', 'claimRedeem(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xef5cfb8c', 'claimRewards', 'claimRewards(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0962ef79', 'claimRewards', 'claimRewards(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc893dfc5', 'claimWithdrawal', 'claimWithdrawal((address,address,address,uint256,uint32,address[],uint256[]))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf8444436', 'claimWithdrawal', 'claimWithdrawal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x48e30f54', 'claimWithdrawals', 'claimWithdrawals(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3d6953d7', 'clGauge', 'clGauge()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x14c89e17', 'closeCampaign', 'closeCampaign(uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4c0339b4', 'clPool', 'clPool()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc6610657', 'coins', 'coins(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe5225381', 'collect', 'collect()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x31338374', 'collect(address,int24,int24,uint128,uint128,address)', 'collect(address,int24,int24,uint128,uint128,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f1eb3d8', 'collect(address,int24,int24,uint128,uint128)', 'collect(address,int24,int24,uint128,uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x73796297', 'collectAndRebase', 'collectAndRebase()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc8796572', 'collectFees', 'collectFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x70bb45b3', 'collectRewards', 'collectRewards()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5a063f63', 'collectRewardTokens', 'collectRewardTokens()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa48eac9d', 'commit_new_fee', 'commit_new_fee(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x799a572d', 'computePoolBoosterAddress', 'computePoolBoosterAddress(address,address,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe331db3f', 'computePoolBoosterAddress', 'computePoolBoosterAddress(uint32,address,uint32,bytes,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa928c096', 'confirmAggregator', 'confirmAggregator(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x842f5c46', 'consensusRewards', 'consensusRewards()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd46fa518', 'constsAddress', 'constsAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2c8bff31', 'CONVERSION_RATE', 'CONVERSION_RATE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x07a2d13a', 'convertToAssets', 'convertToAssets(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc6e6f592', 'convertToShares', 'convertToShares(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6e99d52f', 'COOLDOWN_PERIOD', 'COOLDOWN_PERIOD()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdd4e2ba5', 'COUNTING_MODE', 'COUNTING_MODE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbe2c64d4', 'CREATE_VOTES_ROLE', 'CREATE_VOTES_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xab34884c', 'createCampaign', 'createCampaign(uint8,uint256,address[],uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x95b63c14', 'createCurvePoolBoosterPlain', 'createCurvePoolBoosterPlain(address,address,address,uint16,address,address,bytes32,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6720bd3f', 'createPoolBoosterMerkl', 'createPoolBoosterMerkl(uint32,address,uint32,bytes,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3bec1bfc', 'createProposal', 'createProposal((uint256,uint8,address,uint40)[],address,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa5a470ad', 'createValidator', 'createValidator(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa6384c96', 'CREATEX', 'CREATEX()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf9854bfc', 'creditsBalanceOf', 'creditsBalanceOf(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe5c4fffe', 'creditsBalanceOfHighres', 'creditsBalanceOfHighres(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4956366', 'CROSS_CHAIN_CONTROLLER', 'CROSS_CHAIN_CONTROLLER()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf5488330', 'crossPrice', 'crossPrice()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1df8c717', 'currentCumulativePrices', 'currentCumulativePrices()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76671808', 'currentEpoch', 'currentEpoch()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7cacb1d6', 'currentSealedEpoch', 'currentSealedEpoch()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x218751b2', 'curvePool', 'curvePool()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe48d7fc5', 'curvePoolIndices', 'curvePoolIndices(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x923c1d61', 'cvx', 'cvx()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8d68f9ff', 'cvxLocker', 'cvxLocker()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x17cf0122', 'cvxShareBps', 'cvxShareBps()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1e702f83', 'deactivateValidator', 'deactivateValidator(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x313ce567', 'decimals', 'decimals()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa457c2d7', 'decreaseAllowance', 'decreaseAllowance(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa217fddf', 'DEFAULT_ADMIN_ROLE', 'DEFAULT_ADMIN_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x74e17388', 'DELAY_REQUEST', 'DELAY_REQUEST()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5c19a95c', 'delegate', 'delegate(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9fa6dd35', 'delegate', 'delegate(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3cda520', 'delegateBySig', 'delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x587cde1e', 'delegates', 'delegates(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x47e7ef24', 'deposit', 'deposit(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd0e30db0', 'deposit', 'deposit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x20e8c565', 'deposit', 'deposit(address,address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6e553f65', 'deposit(uint256,address)', 'deposit(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb6b55f25', 'deposit(uint256)', 'deposit(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xde5f6268', 'depositAll', 'depositAll()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3ae1766', 'depositAsset', 'depositAsset(address,uint256,uint256,string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd6e772a4', 'depositBridgedWOETH', 'depositBridgedWOETH(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd059f6ef', 'depositedWethAccountedFor', 'depositedWethAccountedFor()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb8ec6678', 'depositList', 'depositList(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4896b31a', 'depositListLength', 'depositListLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3d4dff7b', 'deposits', 'deposits(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd443e97d', 'depositSFRXETH', 'depositSFRXETH(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x22495dc8', 'depositSSV', 'depositSSV(uint64[],uint256,(uint32,uint64,uint64,bool,uint256))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7284e416', 'description', 'description()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xff311838', 'DISABLE_VOTE_CREATION', 'DISABLE_VOTE_CREATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe009cfde', 'disableModule', 'disableModule(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdc177eec', 'disableVoteCreationOnce', 'disableVoteCreationOnce()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa4f98af4', 'doAccounting', 'doAccounting()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3644e515', 'DOMAIN_SEPARATOR', 'DOMAIN_SEPARATOR()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf698da25', 'domainSeparator', 'domainSeparator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9f678cca', 'drip', 'drip()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbb7a632e', 'dripDuration', 'dripDuration()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x603ea03b', 'dripper', 'dripper()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1be05289', 'DURATION', 'DURATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3e491d47', 'earned', 'earned(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7f09217b', 'eeth', 'eeth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x84b0196e', 'eip712Domain', 'eip712Domain()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc24c7c29', 'ema_price', 'ema_price()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x868ce31a', 'ENABLE_VOTE_CREATION', 'ENABLE_VOTE_CREATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x610b5925', 'enableModule', 'enableModule(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xee0f160e', 'enableVoteCreation', 'enableVoteCreation()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdf136602', 'enableVoteCreationOnce', 'enableVoteCreationOnce()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf059e311', 'encodeSaltForCreateX', 'encodeSaltForCreateX(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe86637db', 'encodeTransactionData', 'encodeTransactionData(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3197cbb6', 'endTime', 'endTime()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x900cf0cf', 'epoch', 'epoch()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2a95958e', 'estimateAmount0', 'estimateAmount0(uint256,uint128,uint160,int24,int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x09602b29', 'estimateAmount1', 'estimateAmount1(uint256,uint128,uint160,int24,int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x92a97e1a', 'etherfiRedemptionManager', 'etherfiRedemptionManager()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa6b4d947', 'etherfiWithdrawalNFT', 'etherfiWithdrawalNFT()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf0b9510a', 'etherfiWithdrawalQueue', 'etherfiWithdrawalQueue()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9f809234', 'etherfiWithdrawalQueueAmount', 'etherfiWithdrawalQueueAmount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x56049dd9', 'etherfiWithdrawalRequests', 'etherfiWithdrawalRequests(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xddc1f59d', 'exchange(int128,int128,uint256,uint256,address)', 'exchange(int128,int128,uint256,uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3df02124', 'exchange(int128,int128,uint256,uint256)', 'exchange(int128,int128,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3ba0b9a9', 'exchangeRate', 'exchangeRate()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6a761202', 'execTransaction', 'execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x468721a7', 'execTransactionFromModule', 'execTransactionFromModule(address,uint256,bytes,uint8)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5229073f', 'execTransactionFromModuleReturnData', 'execTransactionFromModuleReturnData(address,uint256,bytes,uint8)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x134008d3', 'execute', 'execute(address,uint256,bytes,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2656227d', 'execute(address[],uint256[],bytes[],bytes32)', 'execute(address[],uint256[],bytes[],bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfe0d94c1', 'execute(uint256)', 'execute(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe38335e5', 'executeBatch', 'executeBatch(address[],uint256[],bytes[],bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0d61b519', 'executeProposal', 'executeProposal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf98a4eca', 'executeVote', 'executeVote(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x07bd0265', 'EXECUTOR_ROLE', 'EXECUTOR_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd9f00ec7', 'exitSsvValidator', 'exitSsvValidator(bytes,uint64[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2fe3e261', 'EXTENDED_BALLOT_TYPEHASH', 'EXTENDED_BALLOT_TYPEHASH()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc45a0155', 'factory', 'factory()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3bf0c9fb', 'factoryRegistry', 'factoryRegistry()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4584a419', 'FAST_GAS_FEED', 'FAST_GAS_FEED()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xddca3f43', 'fee', 'fee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdd505df6', 'FEE_ACCUMULATOR_ADDRESS', 'FEE_ACCUMULATOR_ADDRESS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xecefc705', 'FEE_BASE', 'FEE_BASE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8a5fddd8', 'FEE_SCALE', 'FEE_SCALE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc415b95c', 'feeCollector', 'feeCollector()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf3058399', 'feeGrowthGlobal0X128', 'feeGrowthGlobal0X128()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x46141319', 'feeGrowthGlobal1X128', 'feeGrowthGlobal1X128()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x263a5362', 'fees', 'fees(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x94db0595', 'feesAccrued', 'feesAccrued()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa5f5be54', 'firstDeposit', 'firstDeposit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x490e6cbc', 'flash', 'flash(address,uint256,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd948d468', 'forward', 'forward(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6f708a9d', 'frxeth', 'frxeth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb16b7d0b', 'FULL_STAKE', 'FULL_STAKE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x484be812', 'fuseIntervalEnd', 'fuseIntervalEnd()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3c864959', 'fuseIntervalStart', 'fuseIntervalStart()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb4b577ad', 'future_A', 'future_A()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x14052288', 'future_A_time', 'future_A_time()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x58680d0b', 'future_fee', 'future_fee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa6f19c84', 'gauge', 'gauge()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0d52333c', 'gaugeFactory', 'gaugeFactory()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x293833ba', 'gaugeFees', 'gaugeFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x14f05979', 'get_balances', 'get_balances()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5e0d443f', 'get_dy', 'get_dy(int128,int128,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf2388acb', 'get_p', 'get_p()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbb7b8b80', 'get_virtual_price', 'get_virtual_price()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x328dd982', 'getActions', 'getActions(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2acada4d', 'getAllAssets', 'getAllAssets()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3b28864', 'getAllStrategies', 'getAllStrategies()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc932699b', 'getAmount0Delta(uint160,uint160,int128)', 'getAmount0Delta(uint160,uint160,int128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2c32d4b6', 'getAmount0Delta(uint160,uint160,uint128,bool)', 'getAmount0Delta(uint160,uint160,uint128,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x00c11862', 'getAmount1Delta(uint160,uint160,int128)', 'getAmount1Delta(uint160,uint160,int128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x48a0c5bd', 'getAmount1Delta(uint160,uint160,uint128,bool)', 'getAmount1Delta(uint160,uint160,uint128,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf140a35a', 'getAmountOut', 'getAmountOut(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc72e160b', 'getAmountsForLiquidity', 'getAmountsForLiquidity(uint160,uint160,uint160,uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb5ab58dc', 'getAnswer', 'getAnswer(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6ec3ab67', 'getAssetConfig', 'getAssetConfig(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa0aead4d', 'getAssetCount', 'getAssetCount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x884c1056', 'getAssetCurrentLimit', 'getAssetCurrentLimit(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb2628fdf', 'getAssetDistributionData', 'getAssetDistributionData(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7e50ac3f', 'getBridgedWOETHValue', 'getBridgedWOETHValue(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2cb6864d', 'getCanceledUpkeepList', 'getCanceledUpkeepList()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9c0401c6', 'getCancellationFee', 'getCancellationFee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3408e470', 'getChainId', 'getChainId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3f909d4', 'getConfig', 'getConfig()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x30dbda18', 'getCurrentTradingTick', 'getCurrentTradingTick()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdc31e1af', 'getEpochAccumulatedOriginatedTxsFee', 'getEpochAccumulatedOriginatedTxsFee(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x61e53fcc', 'getEpochAccumulatedRewardPerToken', 'getEpochAccumulatedRewardPerToken(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdf00c922', 'getEpochAccumulatedUptime', 'getEpochAccumulatedUptime(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaa5d8292', 'getEpochAverageUptime', 'getEpochAverageUptime(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdb5ca3e5', 'getEpochEndBlock', 'getEpochEndBlock(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa198d229', 'getEpochOfflineBlocks', 'getEpochOfflineBlocks(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe261641a', 'getEpochOfflineTime', 'getEpochOfflineTime(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x58f95b80', 'getEpochReceivedStake', 'getEpochReceivedStake(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x39b80c00', 'getEpochSnapshot', 'getEpochSnapshot(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb88a37e2', 'getEpochValidatorIDs', 'getEpochValidatorIDs(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2914b9bd', 'getEVMScriptExecutor', 'getEVMScriptExecutor(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa479e508', 'getEVMScriptRegistry', 'getEVMScriptRegistry()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a93d1c3', 'getGasLimit', 'getGasLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8b3dd749', 'getInitializationBlock', 'getInitializationBlock()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xee39e7a0', 'getK', 'getK()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1e12b8a5', 'getKeeperInfo', 'getKeeperInfo(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x15a126ea', 'getKeeperList', 'getKeeperList()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbafcf68e', 'getLiquidityForAmounts', 'getLiquidityForAmounts(uint256,uint256,uint160,uint160,uint160)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x93f0c1fc', 'getMaxPaymentForGas', 'getMaxPaymentForGas(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0a1028c4', 'getMessageHash', 'getMessageHash(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb657bc9c', 'getMinBalanceForUpkeep', 'getMinBalanceForUpkeep(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf27a0c92', 'getMinDelay', 'getMinDelay()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x195d0e28', 'getMintAmount', 'getMintAmount(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb2494df3', 'getModules', 'getModules()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcc2f8452', 'getModulesPaginated', 'getModulesPaginated(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xce895a2f', 'getNodeDelegatorQueue', 'getNodeDelegatorQueue()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa0e67e2b', 'getOwners', 'getOwners()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8e539e8c', 'getPastTotalSupply', 'getPastTotalSupply(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3a46b1a8', 'getPastVotes', 'getPastVotes(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd9621f9e', 'getPendingRewards', 'getPendingRewards()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x30c83576', 'getPoolX96Price', 'getPoolX96Price()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfe07023d', 'getPopulatedTicks', 'getPopulatedTicks(address,int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x45557c1f', 'getPositionPrincipal', 'getPositionPrincipal()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0f3424bb', 'getPowerStrategy', 'getPowerStrategy()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa28d4c9c', 'getPriorBalanceIndex', 'getPriorBalanceIndex(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76f4be36', 'getPriorSupplyIndex', 'getPriorSupplyIndex(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc7f758a8', 'getProposal', 'getProposal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x98e527d3', 'getProposalsCount', 'getProposalsCount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9080936f', 'getProposalState', 'getProposalState(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe23a9a52', 'getReceipt', 'getReceipt(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x32f0a3b5', 'getRecoveryVault', 'getRecoveryVault()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x736de9ae', 'getRedirection', 'getRedirection(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x468f35ee', 'getRedirectionRequest', 'getRedirectionRequest(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4d3f7334', 'getRegistrar', 'getRegistrar()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad6036cf', 'getRepresentativeByChain', 'getRepresentativeByChain(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x21916b81', 'getRepresentedVotersByChain', 'getRepresentedVotersByChain(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0902f1ac', 'getReserves', 'getReserves()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf5f8d365', 'getReward', 'getReward(uint256,address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa16368c9', 'getRewardGrowthInside', 'getRewardGrowthInside(int24,int24,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf6ca71b0', 'getRewardTokenAddresses', 'getRewardTokenAddresses()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4f59f9b', 'getRewardTokens', 'getRewardTokens()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x248a9ca3', 'getRoleAdmin', 'getRoleAdmin(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9a6fc8f5', 'getRoundData', 'getRoundData(uint80)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5601fe01', 'getSelfStake', 'getSelfStake(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x986cfba3', 'getSqrtRatioAtTick', 'getSqrtRatioAtTick(int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcfd47663', 'getStake', 'getStake(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5624b25b', 'getStorageAt', 'getStorageAt(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x31e19cfa', 'getStrategyCount', 'getStrategyCount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x80fcc592', 'getSwapAssetReturnAmount', 'getSwapAssetReturnAmount(address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe75235b8', 'getThreshold', 'getThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f76c058', 'getTickAtSqrtRatio', 'getTickAtSqrtRatio(uint160)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb633620c', 'getTimestamp', 'getTimestamp(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd45c4435', 'getTimestamp', 'getTimestamp(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x213cae63', 'getTokensIn', 'getTokensIn()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x071bc3c9', 'getTokensOut', 'getTokensOut()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x52c4889f', 'getTotalAssetDeposits', 'getTotalAssetDeposits(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd8d11f78', 'getTransactionHash', 'getTransactionHash(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc7c3a19a', 'getUpkeep', 'getUpkeep(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfecf27c9', 'getUpkeepCount', 'getUpkeepCount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb5d89627', 'getValidator', 'getValidator(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0135b1db', 'getValidatorID', 'getValidatorID(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x854873e1', 'getValidatorPubkey', 'getValidatorPubkey(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5a55c1f0', 'getVote', 'getVote(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4b12311c', 'getVoterState', 'getVoterState(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9ab24eb0', 'getVotes', 'getVotes(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xeb9019d4', 'getVotes', 'getVotes(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9a802a6d', 'getVotesWithParams', 'getVotesWithParams(address,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1c84e321', 'getVotingConfig', 'getVotingConfig(uint8)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x38fe05be', 'getVotingPortalsCount', 'getVotingPortalsCount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1f270152', 'getWithdrawalRequest', 'getWithdrawalRequest(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbaa9c9db', 'governanceRebaseOptIn', 'governanceRebaseOptIn(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0c340a24', 'governor', 'governor()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2f2ff15d', 'grantRole', 'grantRole(bytes32,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x452a9320', 'guardian', 'guardian()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa994317f', 'harvestAndSwap(address,address)', 'harvestAndSwap(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x548f5ae5', 'harvestAndSwap(address)', 'harvestAndSwap(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x67c7066c', 'harvesterAddress', 'harvesterAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8065657f', 'hashOperation', 'hashOperation(address,uint256,bytes,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb1c5f427', 'hashOperationBatch', 'hashOperationBatch(address[],uint256[],bytes[],bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc59057e4', 'hashProposal', 'hashProposal(address[],uint256[],bytes[],bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0803fac0', 'hasInitialized', 'hasInitialized()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x91d14854', 'hasRole', 'hasRole(bytes32,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x43859632', 'hasVoted', 'hasVoted(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x63b0e66a', 'helper', 'helper()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5c60da1b', 'implementation', 'implementation()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x39509351', 'increaseAllowance', 'increaseAllowance(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x32148f67', 'increaseObservationCardinalityNext', 'increaseObservationCardinalityNext(uint16)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x32c0defd', 'index0', 'index0()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbda39cad', 'index1', 'index1()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5409491a', 'initial_A', 'initial_A()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2081066c', 'initial_A_time', 'initial_A_time()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb3809b13', 'initialize', 'initialize(address,address,address,(uint8,uint24,uint24,uint256,uint256,uint256)[],address[],uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2071d884', 'initialize', 'initialize(address,address,address,int24,address,uint160)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe4bbb5a8', 'initialize', 'initialize(address,address,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x60b5bb3f', 'initialize', 'initialize(address[],uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa87f8624', 'initialize', 'initialize(address,uint64,uint64,uint64,uint256,uint256,uint256,uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa461b3c8', 'initialize', 'initialize(string,string,address[4],uint256[4],uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x485cc955', 'initialize', 'initialize(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcf7a1d77', 'initialize', 'initialize(address,address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4d66de8', 'initialize', 'initialize(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb3ddda2a', 'initialize', 'initialize(string,string,address,uint256,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7013ef6', 'initialize', 'initialize(address,address,address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb0c5b7d8', 'initialize', 'initialize(address,uint16,address,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf542033f', 'initialize', 'initialize(string,string,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3fbfd4df', 'initialize', 'initialize(uint256,uint256,address,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa224cee7', 'initialize', 'initialize(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x56db9ef1', 'initialize', 'initialize(uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x435356d1', 'initialize', 'initialize(address[],address[],address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8129fc1c', 'initialize', 'initialize()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9688d2fc', 'initialize(address,address,address[],address[],address[])', 'initialize(address,address,address[],address[],address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2f26b1de', 'initialize(address,address[],address[],address[])', 'initialize(address,address[],address[],address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xefe61a2f', 'initializeWithRevision', 'initializeWithRevision(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcc172784', 'initiateRedirection', 'initiateRedirection(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfd64eccb', 'isForwarder', 'isForwarder()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc7af3352', 'isGovernor', 'isGovernor()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0e913a6c', 'isMigrationActive', 'isMigrationActive()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4530820a', 'isMintWhitelistedStrategy', 'isMintWhitelistedStrategy(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2d9ad53d', 'isModuleEnabled', 'isModuleEnabled(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f444d25', 'isNodeDelegator', 'isNodeDelegator(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x31d50750', 'isOperation', 'isOperation(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2ab0f529', 'isOperationDone', 'isOperationDone(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x584b153e', 'isOperationPending', 'isOperationPending(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x13bc9f20', 'isOperationReady', 'isOperationReady(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2f54bf6e', 'isOwner', 'isOwner(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xde4796ed', 'isPetrified', 'isPetrified()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4d5ce038', 'isReward', 'isReward(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3de580e', 'isSlashed', 'isSlashed(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa5820daa', 'issueTokens', 'issueTokens(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9be918e6', 'isSupportedAsset', 'isSupportedAsset(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x572b6c05', 'isTrustedForwarder', 'isTrustedForwarder(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x95ef84b9', 'isUpgraded', 'isUpgraded(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x20c13b0b', 'isValidSignature', 'isValidSignature(bytes,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfa5a4f06', 'isValidTokenIn', 'isValidTokenIn(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x784367d6', 'isValidTokenOut', 'isValidTokenOut(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5ca4d552', 'isVotingPortalApproved', 'isVotingPortalApproved(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd4aae0c4', 'kernel', 'kernel()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfde625e6', 'last_price', 'last_price()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2eb6328b', 'lastAvailableAssets', 'lastAvailableAssets()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7bbddcfc', 'lastCreateVoteTimes', 'lastCreateVoteTimes(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf25e55a5', 'lastEarn', 'lastEarn(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe7529239', 'lastFixAccountingBlockNumber', 'lastFixAccountingBlockNumber()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8a7b8cf2', 'lastObservation', 'lastObservation()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x349f7173', 'lastOraclePrice', 'lastOraclePrice()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf664a16e', 'lastRequestTimestamp', 'lastRequestTimestamp()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd0b06f5d', 'lastUpdated', 'lastUpdated()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc7be95de', 'lastValidatorID', 'lastValidatorID()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x59ff4158', 'lastVerifiedEthBalance', 'lastVerifiedEthBalance()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x32b8113e', 'lateQuorumVoteExtension', 'lateQuorumVoteExtension()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x50d25bcd', 'latestAnswer', 'latestAnswer()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x668a0f02', 'latestRound', 'latestRound()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfeaf968c', 'latestRoundData', 'latestRoundData()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8205bf6a', 'latestTimestamp', 'latestTimestamp()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x18a4619a', 'LENS', 'LENS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0569dcad', 'lidoArm', 'lidoArm()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xff3368a1', 'lidoWithdrawalQueue', 'lidoWithdrawalQueue()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x31ca1c02', 'lidoWithdrawalQueueAmount', 'lidoWithdrawalQueueAmount()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1b6b6d23', 'LINK', 'LINK()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad178361', 'LINK_ETH_FEED', 'LINK_ETH_FEED()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a686502', 'liquidity', 'liquidity()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x209b2bca', 'liquidityAsset', 'liquidityAsset()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdb371e9c', 'liquidityProviderCaps', 'liquidityProviderCaps(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x113f2ec7', 'lockAllCVX', 'lockAllCVX()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc93d0b1e', 'lockups', 'lockups(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd1a1ad81', 'lockupsCount', 'lockupsCount(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9b1344ac', 'lowerTick', 'lowerTick()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5fcbd285', 'lpToken', 'lpToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf1650a46', 'lrtConfig', 'lrtConfig()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf9985300', 'LST_NDC_INDEX', 'LST_NDC_INDEX()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1be913a5', 'ma_exp_time', 'ma_exp_time()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1ddc3b01', 'ma_last_time', 'ma_last_time()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe9a02143', 'manageNumberOfPeriods', 'manageNumberOfPeriods(uint8,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0aaef854', 'manageRewardPerVote', 'manageRewardPerVote(uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7039e002', 'manageTotalRewardAmount', 'manageTotalRewardAmount(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8d7c0e46', 'manuallyFixAccounting', 'manuallyFixAccounting(int256,int256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x090b78c5', 'MAX_CROSS_PRICE_DEVIATION', 'MAX_CROSS_PRICE_DEVIATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd6913b32', 'MAX_PRICE_STALENESS', 'MAX_PRICE_STALENESS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4c86d57', 'MAX_UNSTAKERS', 'MAX_UNSTAKERS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x714897df', 'MAX_VALIDATORS', 'MAX_VALIDATORS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x402d267d', 'maxDeposit', 'maxDeposit(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x70cf754a', 'maxLiquidityPerTick', 'maxLiquidityPerTick()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc63d75b6', 'maxMint', 'maxMint(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc14db927', 'maxNodeDelegatorLimit', 'maxNodeDelegatorLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x951ba637', 'maxPriceDiffBps', 'maxPriceDiffBps()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd905777e', 'maxRedeem', 'maxRedeem(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8c04166f', 'maxSlippage', 'maxSlippage()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76f70003', 'maxStakeDuration', 'maxStakeDuration()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8e510b52', 'maxSupplyDiff', 'maxSupplyDiff()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xce96cb77', 'maxWithdraw', 'maxWithdraw(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2fa4abea', 'merklDistributor', 'merklDistributor()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x392f37e9', 'metadata', 'metadata()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x454b0608', 'migrate(uint256)', 'migrate(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5e1da48d', 'migrate(uint256[],uint256,uint256,bool,uint256,uint256)', 'migrate(uint256[],uint256,uint256,bool,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x63092383', 'MIN_FIX_ACCOUNTING_CADENCE', 'MIN_FIX_ACCOUNTING_CADENCE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xeaf1061c', 'MIN_VOTING_DURATION', 'MIN_VOTING_DURATION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdc474b1a', 'minAcceptQuorumPct', 'minAcceptQuorumPct()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x778fbe60', 'minAmountToDeposit', 'minAmountToDeposit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc5bb8758', 'minBalance', 'minBalance()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xeb1e3b77', 'minBalanceLowerLimit', 'minBalanceLowerLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8b568327', 'minBalanceUpperLimit', 'minBalanceUpperLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x50d0ea39', 'minSharesToRedeem', 'minSharesToRedeem()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5fec5c64', 'minStakeDuration', 'minStakeDuration()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3c8a7d8d', 'mint', 'mint(address,int24,int24,uint128,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6a627842', 'mint', 'mint(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x156e29f6', 'mint', 'mint(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x40c10f19', 'mint', 'mint(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x94bf804d', 'mint', 'mint(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x37145038', 'mintAndAddOTokens', 'mintAndAddOTokens(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xab80dafb', 'mintForStrategy', 'mintForStrategy(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1aa43078', 'minTime', 'minTime()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb8795725', 'minTimeLowerLimit', 'minTimeLowerLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdf352197', 'minTimeUpperLimit', 'minTimeUpperLimit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3c624c75', 'MODIFY_QUORUM_ROLE', 'MODIFY_QUORUM_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x62de7e5a', 'MODIFY_SUPPORT_ROLE', 'MODIFY_SUPPORT_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3acb5624', 'MORPHO', 'MORPHO()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8d80ff0a', 'multiSend', 'multiSend(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x06fdde03', 'name', 'name()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa3f4df7e', 'NAME', 'NAME()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe45cc9f0', 'netOusdMintedForStrategy', 'netOusdMintedForStrategy()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7a2202f3', 'netOusdMintForStrategyThreshold', 'netOusdMintForStrategyThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf4b00513', 'newVote(bytes,string,bool,bool)', 'newVote(bytes,string,bool,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd5db2c80', 'newVote(bytes,string)', 'newVote(bytes,string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa2bc8b68', 'nextUnstakerIndex', 'nextUnstakerIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbba9282e', 'nextWithdrawalIndex', 'nextWithdrawalIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x47ccca02', 'nft', 'nft()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7a0dace2', 'nodeDelegatorQueue', 'nodeDelegatorQueue(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaffed0e0', 'nonce', 'nonce()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7ecebe00', 'nonces', 'nonces(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x609350cd', 'nonRebasingCreditsPerToken', 'nonRebasingCreditsPerToken(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe696393a', 'nonRebasingSupply', 'nonRebasingSupply()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb66503cf', 'notifyRewardAmount', 'notifyRewardAmount(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x50589793', 'numCheckpoints', 'numCheckpoints(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6fcfff45', 'numCheckpoints', 'numCheckpoints(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xebeb31db', 'observationLength', 'observationLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x252c09d7', 'observations', 'observations(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x883bdbfd', 'observe', 'observe(uint32[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xccfe2a69', 'oeth', 'oeth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6dea9b19', 'oethb', 'oethb()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7b3b6068', 'OETHb', 'OETHb()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7e489e05', 'oethCoinIndex', 'oethCoinIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x602bc098', 'ogn', 'ogn()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8a4d8f35', 'ognStaking', 'ognStaking()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x142561cf', 'ogv', 'ogv()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2b478a7f', 'ogvStaking', 'ogvStaking()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbc197c81', 'onERC1155BatchReceived', 'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf23a6e61', 'onERC1155Received', 'onERC1155Received(address,address,uint256,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x150b7a02', 'onERC721Received', 'onERC721Received(address,address,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa4c0ed36', 'onTokenTransfer', 'onTokenTransfer(address,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x570ca735', 'operator', 'operator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb1138ad1', 'optIn', 'optIn(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a32aad6', 'oToken', 'oToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x18ce56bd', 'ousdMetaStrategy', 'ousdMetaStrategy()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8da5cb5b', 'owner', 'owner()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8456cb59', 'pause', 'pause()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5c975abb', 'paused', 'paused()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfc157cb4', 'PCT_BASE', 'PCT_BASE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe30c3978', 'pendingOwner', 'pendingOwner()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6099ecb2', 'pendingRewards', 'pendingRewards(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7bbaf1ea', 'performUpkeep', 'performUpkeep(uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xebe2b12b', 'periodFinish', 'periodFinish()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe4463eb2', 'periodSize', 'periodSize()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd505accf', 'permit', 'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc1597304', 'phaseAggregators', 'phaseAggregators(uint16)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x58303b10', 'phaseId', 'phaseId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdbe55e56', 'platformAddress', 'platformAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb6eee962', 'poolBoosterFromPool', 'poolBoosterFromPool(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x17c01cb3', 'poolBoosterLength', 'poolBoosterLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x110c1a41', 'poolBoosters', 'poolBoosters(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x255d36ef', 'poolFees', 'poolFees(address,uint128,int24,int24,int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x33580959', 'poolFees', 'poolFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x791b98bc', 'positionManager', 'positionManager()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x514ea4bf', 'positions', 'positions(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7dc46f61', 'postDepositHook', 'postDepositHook(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x62af1ed6', 'PRECISION_DIVIDER', 'PRECISION_DIVIDER()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xef8b30f7', 'previewDeposit', 'previewDeposit(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb8f82b26', 'previewDeposit', 'previewDeposit(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb3d7f6b9', 'previewMint', 'previewMint(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4fd0e648', 'previewPoints', 'previewPoints(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4cdad506', 'previewRedeem', 'previewRedeem(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcbe52ae3', 'previewRedeem', 'previewRedeem(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf166e920', 'previewRewards', 'previewRewards(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe0d801dd', 'previewRewards', 'previewRewards()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x488bd7b0', 'previewWithdraw', 'previewWithdraw(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0a28a477', 'previewWithdraw', 'previewWithdraw(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaea91078', 'price', 'price(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x86fc88d3', 'price_oracle', 'price_oracle()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc33f59d3', 'PRICE_SCALE', 'PRICE_SCALE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb888879e', 'priceProvider', 'priceProvider()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5881c475', 'prices', 'prices(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3b8fe28d', 'priceUnitMint', 'priceUnitMint(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5b60f9fc', 'priceUnitRedeem', 'priceUnitRedeem(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x14b3aa0f', 'pricingInfo', 'pricingInfo()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x22635397', 'principal', 'principal(address,uint256,uint160)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb26ccf47', 'PROPOSAL_EXPIRATION_TIME', 'PROPOSAL_EXPIRATION_TIME()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc01f9e37', 'proposalDeadline', 'proposalDeadline(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xab58fb8e', 'proposalEta', 'proposalEta(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x013cf08b', 'proposals', 'proposals(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2d63f693', 'proposalSnapshot', 'proposalSnapshot(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb58131b0', 'proposalThreshold', 'proposalThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7d5e81e2', 'propose(address[],uint256[],bytes[],string)', 'propose(address[],uint256[],bytes[],string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xda95691a', 'propose(address[],uint256[],string[],bytes[],string)', 'propose(address[],uint256[],string[],bytes[],string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf8a2abd3', 'proposeAggregator', 'proposeAggregator(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe8c4be30', 'proposedAggregator', 'proposedAggregator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6001ac53', 'proposedGetRoundData', 'proposedGetRoundData(uint80)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8f6b4d91', 'proposedLatestRoundData', 'proposedLatestRoundData()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8f61f4f5', 'PROPOSER_ROLE', 'PROPOSER_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x52d1902d', 'proxiableUUID', 'proxiableUUID()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfb36025f', 'pubkeyAddressToValidatorID', 'pubkeyAddressToValidatorID(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x160cbed7', 'queue(address[],uint256[],bytes[],bytes32)', 'queue(address[],uint256[],bytes[],bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xddf0b009', 'queue(uint256)', 'queue(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x71b32bb1', 'queueProposal', 'queueProposal(uint256,uint128,uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf8ce560a', 'quorum', 'quorum(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x97c3d334', 'quorumDenominator', 'quorumDenominator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa7713a70', 'quorumNumerator', 'quorumNumerator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x24bc1a64', 'quorumVotes', 'quorumVotes()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9e8cc04b', 'quote', 'quote(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3c157e64', 'ramp_A', 'ramp_A(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7f1a327c', 'rebalance', 'rebalance(uint256,bool,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaf14052c', 'rebase', 'rebase()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf51b0fd4', 'rebaseOptIn', 'rebaseOptIn()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc2376dff', 'rebaseOptOut', 'rebaseOptOut()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x53ca9f24', 'rebasePaused', 'rebasePaused()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x456ee286', 'rebaseState', 'rebaseState(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x52d38e5d', 'rebaseThreshold', 'rebaseThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x077f22b7', 'rebasingCredits', 'rebasingCredits()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7d0d66ff', 'rebasingCreditsHighres', 'rebasingCreditsHighres()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6691cb3d', 'rebasingCreditsPerToken', 'rebasingCreditsPerToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7a46a9c5', 'rebasingCreditsPerTokenHighres', 'rebasingCreditsPerTokenHighres()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb79550be', 'recoverFunds', 'recoverFunds()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7cbc2373', 'redeem', 'redeem(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x769f8e5d', 'redeem', 'redeem(address,uint256,address,uint256,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xba087652', 'redeem', 'redeem(uint256,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7136a7a6', 'redeemAll', 'redeemAll(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9043ffc3', 'redeemCancellationFee', 'redeemCancellationFee(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x09f6442c', 'redeemFeeBps', 'redeemFeeBps()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd725e91f', 'redirect', 'redirect(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe9a505a7', 'redirectionAuthorizer', 'redirectionAuthorizer()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbb1b918d', 'registerSsvValidator', 'registerSsvValidator(bytes,uint64[],bytes,uint256,(uint32,uint64,uint64,bool,uint256))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x59b80c0a', 'registerSsvValidators', 'registerSsvValidators(bytes[],uint64[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xda5c6741', 'registerUpkeep', 'registerUpkeep(address,uint32,address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc28bc2fa', 'relay', 'relay(address,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x52d2cfdd', 'remove_liquidity_imbalance(uint256[2],uint256,address)', 'remove_liquidity_imbalance(uint256[2],uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe3103273', 'remove_liquidity_imbalance(uint256[2],uint256)', 'remove_liquidity_imbalance(uint256[2],uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x081579a5', 'remove_liquidity_one_coin(uint256,int128,uint256,address)', 'remove_liquidity_one_coin(uint256,int128,uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a4d01d2', 'remove_liquidity_one_coin(uint256,int128,uint256)', 'remove_liquidity_one_coin(uint256,int128,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3eb1719f', 'remove_liquidity(uint256,uint256[2],address)', 'remove_liquidity(uint256,uint256[2],address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5b36389c', 'remove_liquidity(uint256,uint256[2])', 'remove_liquidity(uint256,uint256[2])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe033193a', 'removeAndBurnOTokens', 'removeAndBurnOTokens(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1d572d55', 'removeManyNodeDelegatorContractsFromQueue', 'removeManyNodeDelegatorContractsFromQueue(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdb913236', 'removeMarket', 'removeMarket(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6bf8b475', 'removeNodeDelegatorContractFromQueue', 'removeNodeDelegatorContractFromQueue(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x012c6383', 'removeOnlyAssets', 'removeOnlyAssets(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf8dc5dd9', 'removeOwner', 'removeOwner(address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe24abe63', 'removePoolBooster', 'removePoolBooster(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9136616a', 'removePToken', 'removePToken(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x71a735f3', 'removeSsvValidator', 'removeSsvValidator(bytes,uint64[],(uint32,uint64,uint64,bool,uint256))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x19ebdc34', 'removeVotingPortals', 'removeVotingPortals(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x715018a6', 'renounceOwnership', 'renounceOwnership()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x36568abe', 'renounceRole', 'renounceRole(bytes32,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8831223b', 'requestBaseWithdrawal', 'requestBaseWithdrawal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad93a6aa', 'requestEtherFiWithdrawal', 'requestEtherFiWithdrawal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x674eb980', 'requestLidoWithdrawals', 'requestLidoWithdrawals(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaa2f892d', 'requestRedeem', 'requestRedeem(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x115b512f', 'requestWithdrawal', 'requestWithdrawal(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9ee679e8', 'requestWithdrawal', 'requestWithdrawal(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc4ca3a9c', 'requiredTxGas', 'requiredTxGas(address,uint256,bytes,uint8)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8cd4426d', 'rescueERC20', 'rescueERC20(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x04824e70', 'rescueETH', 'rescueETH(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4707d000', 'rescueToken', 'rescueToken(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x00992745', 'rescueVotingPortal', 'rescueVotingPortal(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x443cb4bc', 'reserve0', 'reserve0()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbf944dbc', 'reserve0CumulativeLast', 'reserve0CumulativeLast()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5a76f25e', 'reserve1', 'reserve1()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc245febc', 'reserve1CumulativeLast', 'reserve1CumulativeLast()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4c84e6f8', 'resetFirstDeposit', 'resetFirstDeposit()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xee7afe2d', 'resetStakeETHTally', 'resetStakeETHTally()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x84b863e0', 'resolveTreasuryFees', 'resolveTreasuryFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x08c36874', 'restakeRewards', 'restakeRewards(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd547741f', 'revokeRole', 'revokeRole(bytes32,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4e94c285', 'rewardConfig', 'rewardConfig()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4423bf57', 'rewardDebtPerShare', 'rewardDebtPerShare(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x57806ada', 'rewardGrowthGlobalX128', 'rewardGrowthGlobalX128()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf8b2f991', 'rewardIndexesCurrent', 'rewardIndexesCurrent()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xda88ecb4', 'rewardIndexesStored', 'rewardIndexesStored()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb76e83af', 'rewardProceedsAddress', 'rewardProceedsAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7b0a47ee', 'rewardRate', 'rewardRate()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcab64bcd', 'rewardReserve', 'rewardReserve()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf301af42', 'rewards', 'rewards(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe6886396', 'rewardsListLength', 'rewardsListLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7240d2f', 'rewardsSource', 'rewardsSource()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6f498663', 'rewardsStash', 'rewardsStash(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x82487844', 'rewardsTarget', 'rewardsTarget()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7c618c1', 'rewardToken', 'rewardToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7b2d9b2c', 'rewardTokenAddresses', 'rewardTokenAddresses(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x587c8440', 'rewardTokenConfigs', 'rewardTokenConfigs(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb056b49a', 'rollover', 'rollover()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad1728cb', 'safeApproveAllTokens', 'safeApproveAllTokens()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x13345fe1', 'sample', 'sample(address,uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x01d5062a', 'schedule', 'schedule(address,uint256,bytes,bytes32,bytes32,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8f2a0bb0', 'scheduleBatch', 'scheduleBatch(address[],uint256[],bytes[],bytes32,bytes32,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xebdf104c', 'sealEpoch', 'sealEpoch(uint256[],uint256[],uint256[],uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe08d7e66', 'sealEpochValidators', 'sealEpochValidators(uint256[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7f3e17cb', 'set_ma_exp_time', 'set_ma_exp_time(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb6f68254', 'SET_MIN_BALANCE_ROLE', 'SET_MIN_BALANCE_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc54c24b5', 'SET_MIN_TIME_ROLE', 'SET_MIN_TIME_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a0a4d9f', 'setAccountCapEnabled', 'setAccountCapEnabled(bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xab710b24', 'setActiveMarket', 'setActiveMarket(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfc0cfeee', 'setAdminImpl', 'setAdminImpl(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x01701fe9', 'setAllowedPoolWethShareInterval', 'setAllowedPoolWethShareInterval(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x95f9e9e6', 'setARMBuffer', 'setARMBuffer(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x94095c2d', 'setCampaignId', 'setCampaignId(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbcfb252c', 'setCampaignRemoteManager', 'setCampaignRemoteManager(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0e608b30', 'setCapManager', 'setCapManager(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x82105f79', 'setConfig', 'setConfig(uint32,uint24,uint32,uint24,uint16,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x92eefe9b', 'setController', 'setController(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x30486f3c', 'setCrossPrice', 'setCrossPrice(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x87f8b719', 'setCVXShareBps', 'setCVXShareBps(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0493a0fa', 'setDripDuration', 'setDripDuration(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf08a0323', 'setFallbackHandler', 'setFallbackHandler(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x69fe0e2d', 'setFee', 'setFee(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8e005553', 'setFee', 'setFee(uint16)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa42dce80', 'setFeeCollector', 'setFeeCollector(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xab12edf5', 'setFuseInterval', 'setFuseInterval(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1f7c3568', 'setGaugeAndPositionManager', 'setGaugeAndPositionManager(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa8ab09ba', 'setGenesisDelegation', 'setGenesisDelegation(address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76fed43a', 'setGenesisValidator', 'setGenesisValidator(address,uint256,bytes,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe19a9dd9', 'setGuard', 'setGuard(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc2e1e3f4', 'setHarvesterAddress', 'setHarvesterAddress(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb7fdb436', 'setKeepers', 'setKeepers(address[],address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd07f91e9', 'setLateQuorumVoteExtension', 'setLateQuorumVoteExtension(uint64)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc3d97ad1', 'setLiquidityProviderCaps', 'setLiquidityProviderCaps(address[],uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3ad12229', 'setMaxPriceDiffBps', 'setMaxPriceDiffBps(uint128)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x43f68a49', 'setMaxSlippage', 'setMaxSlippage(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdbfba959', 'setMerklDistributor', 'setMerklDistributor(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8cb20e6f', 'setMinAmountToDeposit', 'setMinAmountToDeposit(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc91d956c', 'setMinBalance', 'setMinBalance(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x93f89a80', 'setMinTime', 'setMinTime(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc47f0027', 'setName', 'setName(string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb3ab15fb', 'setOperator', 'setOperator(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x13af4035', 'setOwner', 'setOwner(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x079b1fdd', 'setPowerStrategy', 'setPowerStrategy(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x05fefda7', 'setPrices', 'setPrices(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xece40cc1', 'setProposalThreshold', 'setProposalThreshold(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0ed57b3a', 'setPTokenAddress', 'setPTokenAddress(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb0ef386c', 'setRedirectionAuthorizer', 'setRedirectionAuthorizer(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfaab9d39', 'setRegistrar', 'setRegistrar(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6e811d38', 'setRegistrator', 'setRegistrator(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb13dc20a', 'setRewardProceedsAddress', 'setRewardProceedsAddress(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdc9ec152', 'setRewardsPerSecond', 'setRewardsPerSecond(uint192)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd1c76638', 'setRewardsSource', 'setRewardsSource(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6411466f', 'setRewardsTarget', 'setRewardsTarget(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x96d538bb', 'setRewardTokenAddresses', 'setRewardTokenAddresses(address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2579153d', 'setRewardTokenConfig', 'setRewardTokenConfig(address,(uint16,uint16,address,bool,uint8,uint256),bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5205c380', 'setStakeETHThreshold', 'setStakeETHThreshold(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa3b81e73', 'setStakingMonitor', 'setStakingMonitor(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x773540b3', 'setStrategistAddr', 'setStrategistAddr(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x65f6fa94', 'setSupportedStrategy', 'setSupportedStrategy(address,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x41273657', 'setSwapRouter', 'setSwapRouter(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb84c8246', 'setSymbol', 'setSymbol(string)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfabd48ce', 'setTotalAssetsCap', 'setTotalAssetsCap(uint248)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfe47a9f2', 'setTreasuryManager', 'setTreasuryManager(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdf744321', 'setUnstakers', 'setUnstakers(address[42])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb63e800d', 'setup', 'setup(address[],uint256,address,bytes,address,address,uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x05f56809', 'setVotemarket', 'setVotemarket(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4e352319', 'setVotingConfigs', 'setVotingConfigs((uint8,uint24,uint24,uint256,uint256,uint256)[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x70b0f660', 'setVotingDelay', 'setVotingDelay(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xea0217cf', 'setVotingPeriod', 'setVotingPeriod(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa07311af', 'sfrxeth', 'sfrxeth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6c9fa59e', 'shareToken', 'shareToken()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5ae6bd37', 'signedMessages', 'signedMessages(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x85a5affe', 'signMessage', 'signMessage(bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb4faba09', 'simulateAndRevert', 'simulateAndRevert(address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbc25cf77', 'skim', 'skim(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc65ee0e1', 'slashingRefundRatio', 'slashingRefundRatio(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3850c7bd', 'slot0', 'slot0()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6874469d', 'snapBalances', 'snapBalances()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x25e2e9f3', 'snappedBalance', 'snappedBalance()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa38807f2', 'snapshotCumulativesInside', 'snapshotCumulativesInside(int24,int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1b91d0cc', 'SOLVENCY_THRESHOLD', 'SOLVENCY_THRESHOLD()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4bc9c477', 'sqrtRatioX96TickClosestToParity', 'sqrtRatioX96TickClosestToParity()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x65f1389d', 'sqrtRatioX96TickHigher', 'sqrtRatioX96TickHigher()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x153eb6d1', 'sqrtRatioX96TickLower', 'sqrtRatioX96TickLower()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x91649751', 'SSV_NETWORK', 'SSV_NETWORK()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0df1ecfd', 'SSV_TOKEN', 'SSV_TOKEN()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x22be3de1', 'stable', 'stable()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4ed6210f', 'stake', 'stake(int128,int24,int24,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5cd42a92', 'stake', 'stake(uint256,uint256,address,bool,int256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3ab04b20', 'stakedLiquidity', 'stakedLiquidity()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4583ef10', 'stakeEth', 'stakeEth((bytes,bytes,bytes32),uint64)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6ef38795', 'stakeEth', 'stakeEth((bytes,bytes,bytes32)[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xde34d713', 'stakeETHTally', 'stakeETHTally()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7b8962f7', 'stakeETHThreshold', 'stakeETHThreshold()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x093b41d0', 'stakeSubscriberAddress', 'stakeSubscriberAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x7260f826', 'stakingMonitor', 'stakingMonitor()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbe9a6555', 'start', 'start()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa86a056f', 'stashedRewardsUntilEpoch', 'stashedRewardsUntilEpoch(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8cddb015', 'stashRewards', 'stashRewards(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3e4f49e6', 'state', 'state(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x953d7ee2', 'steth', 'steth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x551a6588', 'stop_ramp_A', 'stop_ramp_A()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x570d8e1d', 'strategistAddr', 'strategistAddr()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7412baf', 'supplyCheckpoints', 'supplyCheckpoints(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9f767c88', 'supplyIndex0', 'supplyIndex0(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x205aabf1', 'supplyIndex1', 'supplyIndex1(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe8111a12', 'supplyNumCheckpoints', 'supplyNumCheckpoints()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x20761fc4', 'supportedMarkets', 'supportedMarkets(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xee3be5f5', 'supportedStrategies', 'supportedStrategies(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfad167ab', 'supportRequiredPct', 'supportRequiredPct()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xaa388af6', 'supportsAsset', 'supportsAsset(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x01ffc9a7', 'supportsInterface', 'supportsInterface(bytes4)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x032988da', 'susde', 'susde()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x128acb08', 'swap', 'swap(address,bool,int256,uint160,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x022c0d9f', 'swap', 'swap(uint256,uint256,address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2f138eea', 'swapAssetWithinDepositPool', 'swapAssetWithinDepositPool(address,address,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6c08c57e', 'swapExactTokensForTokens(address,address,uint256,uint256,address)', 'swapExactTokensForTokens(address,address,uint256,uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x38ed1739', 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)', 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdd0a6514', 'swapForCVX', 'swapForCVX(uint256,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbe50c839', 'swapForOGN', 'swapForOGN(uint256,uint256,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe318b52b', 'swapOwner', 'swapOwner(address,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc31c9c07', 'swapRouter', 'swapRouter()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7d31809', 'swapTokensForExactTokens(address,address,uint256,uint256,address)', 'swapTokensForExactTokens(address,address,uint256,uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8803dbee', 'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)', 'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x95d89b41', 'symbol', 'symbol()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfff6cae9', 'sync', 'sync()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x60a73f9b', 'syncReward', 'syncReward(uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x146ffb26', 'targetChainId', 'targetChainId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x5339c296', 'tickBitmap', 'tickBitmap(int16)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf30dba93', 'ticks', 'ticks(int24)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd0c93a7c', 'tickSpacing', 'tickSpacing()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd33219b4', 'timelock', 'timelock()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0d3cf6fc', 'TIMELOCK_ADMIN_ROLE', 'TIMELOCK_ADMIN_ROLE()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfc0c546a', 'token', 'token()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0dfe1681', 'token0', 'token0()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd21220a7', 'token1', 'token1()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x17d70f7c', 'tokenId', 'tokenId()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x92777b29', 'tokenRewardsPerEpoch', 'tokenRewardsPerEpoch(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9d63848a', 'tokens', 'tokens()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x28f73148', 'totalActiveStake', 'totalActiveStake()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x01e1d114', 'totalAssets', 'totalAssets()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x45f663dd', 'totalAssetsCap', 'totalAssetsCap()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8b0e9f3f', 'totalStake', 'totalStake()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x18160ddd', 'totalSupply', 'totalSupply()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd4c3eea0', 'totalValue', 'totalValue()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x45059a6b', 'traderate0', 'traderate0()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xcf1de5d8', 'traderate1', 'traderate1()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa9059cbb', 'transfer', 'transfer(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76564b31', 'transferAssetsToNodeDelegator', 'transferAssetsToNodeDelegator(uint256,address[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb4a92e47', 'transferAssetToNodeDelegator', 'transferAssetToNodeDelegator(uint256,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x71628056', 'transferExcessTokens', 'transferExcessTokens(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x23b872dd', 'transferFrom', 'transferFrom(address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd38bfff4', 'transferGovernance', 'transferGovernance(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf2fde38b', 'transferOwnership', 'transferOwnership(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x078dfbe7', 'transferOwnership', 'transferOwnership(address,bool,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xeb5dcd6c', 'transferPayeeship', 'transferPayeeship(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1072cbea', 'transferToken', 'transferToken(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9d4941d8', 'transferToVault', 'transferToVault(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xc5f956af', 'treasuryAddress', 'treasuryAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3cea70d9', 'treasuryManager', 'treasuryManager()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x49c1d54d', 'trusteeAddress', 'trusteeAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x207134b0', 'trusteeFeeBps', 'trusteeFeeBps()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f864df4', 'undelegate', 'undelegate(uint256,uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9c1eb3da', 'underlyingAssets', 'underlyingAssets()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdac4db4e', 'uniswapV2Path', 'uniswapV2Path(address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2dfbe831', 'uniswapV3Path', 'uniswapV3Path(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3f4ba83a', 'unpause', 'unpause()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf7b188a5', 'unPause', 'unPause()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x8d2da32e', 'unresolvedTreasuryFees', 'unresolvedTreasuryFees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2e17de78', 'unstake', 'unstake(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb64cc67b', 'unstakedFee', 'unstakedFee()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9be64959', 'unstakers', 'unstakers(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x75d7a6b4', 'updateBuybackSplits', 'updateBuybackSplits()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1aefa2d1', 'updateCancellationFee', 'updateCancellationFee(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x860c2750', 'updateConstsAddress', 'updateConstsAddress(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x64d62353', 'updateDelay', 'updateDelay(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xf687d12a', 'updateGasLimit', 'updateGasLimit(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfc525395', 'updateGuardian', 'updateGuardian(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x15864e0a', 'updateLRTConfig', 'updateLRTConfig(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x09bb0f57', 'updateMaxNodeDelegatorLimit', 'updateMaxNodeDelegatorLimit(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x06f3f9e6', 'updateQuorumNumerator', 'updateQuorumNumerator(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x133539ec', 'updateRepresentativesForChain', 'updateRepresentativesForChain((address,uint256)[])') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1b410960', 'updateRewardsGrowthGlobal', 'updateRewardsGrowthGlobal()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f7c4efb', 'updateSlashingRefundRatio', 'updateSlashingRefundRatio(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xe880a159', 'updateStakeSubscriberAddress', 'updateStakeSubscriberAddress(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa890c910', 'updateTimelock', 'updateTimelock(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x841e4561', 'updateTreasuryAddress', 'updateTreasuryAddress(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6c713833', 'updateWOETHOraclePrice', 'updateWOETHOraclePrice()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad3cb1cc', 'UPGRADE_INTERFACE_VERSION', 'UPGRADE_INTERFACE_VERSION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3659cfe6', 'upgradeTo', 'upgradeTo(address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x4f1ef286', 'upgradeToAndCall', 'upgradeToAndCall(address,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x727dd228', 'upperTick', 'upperTick()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0fd761e0', 'usde', 'usde()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x98245f1b', 'validator', 'validator(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x87bae867', 'validatorRegistrator', 'validatorRegistrator()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9da0e462', 'validatorsStates', 'validatorsStates(bytes32)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x522e4245', 'validatorWithdrawal', 'validatorWithdrawal(bytes,uint64)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xfbfa77cf', 'vault', 'vault()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x9092c31c', 'VAULT_ADDRESS', 'VAULT_ADDRESS()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x430bf08a', 'vaultAddress', 'vaultAddress()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1edfe3da', 'vaultBuffer', 'vaultBuffer()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1f850716', 've', 've()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0ef99855', 'verifiedValidators', 'verifiedValidators(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd79e4032', 'verifiedValidatorsLength', 'verifiedValidatorsLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1a1a1571', 'verifyBalances', 'verifyBalances((bytes32,bytes,bytes32[],bytes[]),(bytes32,bytes,uint32[],bytes[]))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x0d304174', 'verifyDeposit', 'verifyDeposit(bytes32,uint64,(uint64,bytes),(uint64,bytes))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6c341d1a', 'verifyValidator', 'verifyValidator(uint64,uint40,bytes32,bytes32,bytes)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x54fd4d50', 'version', 'version()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xffa1ad74', 'VERSION', 'VERSION()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xdf133bca', 'vote', 'vote(uint256,bool,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd4629800', 'votemarket', 'votemarket()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x1e526610', 'votePct', 'votePct(uint256,uint256,uint256,bool)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x46c96aac', 'voter', 'voter()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xde4f6347', 'votesLength', 'votesLength()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xbcf93dd6', 'voteTime', 'voteTime()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3932abb1', 'votingDelay', 'votingDelay()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x02a251a3', 'votingPeriod', 'votingPeriod()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x3fc8cef3', 'weth', 'weth()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xad5c4648', 'WETH', 'WETH()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x54c6d858', 'wethAssetIndex', 'wethAssetIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x625a9133', 'wethCoinIndex', 'wethCoinIndex()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xd9caed12', 'withdraw', 'withdraw(address,address,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x441a3e70', 'withdraw', 'withdraw(uint256,uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb460af94', 'withdraw', 'withdraw(uint256,address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x30c54085', 'withdraw_admin_fees', 'withdraw_admin_fees()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa758c2ab', 'WITHDRAW_ASSET', 'WITHDRAW_ASSET()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x853828b6', 'withdrawAll', 'withdrawAll()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x362bd1a3', 'withdrawalQueueMetadata', 'withdrawalQueueMetadata()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x937b2581', 'withdrawalRequests', 'withdrawalRequests(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x2579fe8a', 'withdrawBridgedWOETH', 'withdrawBridgedWOETH(uint256)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x744bfe61', 'withdrawFunds', 'withdrawFunds(uint256,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xa710b221', 'withdrawPayment', 'withdrawPayment(address,address)') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x35ce81c4', 'withdrawsClaimed', 'withdrawsClaimed()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x6ec68625', 'withdrawsQueued', 'withdrawsQueued()') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0xb6e2b520', 'withdrawSSV', 'withdrawSSV(uint64[],uint256,(uint32,uint64,uint64,bool,uint256))') ON CONFLICT (sighash) DO NOTHING;
INSERT INTO function_signature (sighash, name, full_sig) VALUES ('0x76d5de85', 'yieldToken', 'yieldToken()') ON CONFLICT (sighash) DO NOTHING;

-- Lido ARM Pendle SY (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'lido-arm-pendle-sy',
  1,
  'event'::match_type,
  ARRAY['0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184'],
  ARRAY['0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f', '0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'medium'::severity_level,
  NULL,
  'Lido ARM Pendle SY'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-1',
  1,
  'event'::match_type,
  ARRAY['0xceda2d856238aa0d12f6329de20b9115f07c366d'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-2',
  1,
  'event'::match_type,
  ARRAY['0xceda2d856238aa0d12f6329de20b9115f07c366d'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ethena ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ethena-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x000000000000000000000000ceda2d856238aa0d12f6329de20b9115f07c366d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ethena ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-1',
  1,
  'event'::match_type,
  ARRAY['0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-2',
  1,
  'event'::match_type,
  ARRAY['0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Ether.fi ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-ether-fi-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x000000000000000000000000fb0a3cf9b019bfd8827443d131b235b3e0fc58d2'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Ether.fi ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-1',
  1,
  'event'::match_type,
  ARRAY['0x85b78aca6deae198fbf201c82daf6ca21942acc6'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-2',
  1,
  'event'::match_type,
  ARRAY['0x85b78aca6deae198fbf201c82daf6ca21942acc6'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin Lido ARM (chain 1) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-lido-arm-3',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x00000000000000000000000085b78aca6deae198fbf201c82daf6ca21942acc6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin Lido ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-1-sonic',
  146,
  'event'::match_type,
  ARRAY['0x2f872623d1e1af5835b08b0e49aad2d81d649d30'],
  ARRAY['0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', '0xb8fd9afc34c38fcd13b9a3b7646482eb1fddcefb40af2c70609972816eba3208', '0xe5693914d19c789bdee50a362998c0bc8d035a835f9871da5d51152f0582c34f', '0x8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c76', '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2', '0x4721129e0e676ed6a92909bb24e853ccdd63ad72280cc2e974e38e480e0e6e54'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'high'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-2-sonic',
  146,
  'event'::match_type,
  ARRAY['0x2f872623d1e1af5835b08b0e49aad2d81d649d30'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xb7700a52345bff1ce6201d84f55fe81f2ea203b1b1bdc56a42571819aab2337a', '0x6f938e86fbdbe7829d0289b348cd9e528f2f17c705f469f4a17a0a2796e007d0', '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df', '0x36dd2c9b55f12509e3b5f4f4d765ddefc2776a28018b18da2335cf2ab93bb268', '0xc04c86cfd81036557541f9c68971ace59cbc9057ecab7d48874a6177ad117f4f', '0x3fdbeb02a84d41ebaf1c8edce1b73f1617e0d3675168dfeb8d86759c18782da4', '0xa2136948fd1e5333c2ee27c9e48848a560b693e6bbd18082623a738179ff2952', '0x8de94c5178842de5720920c14d6abd0f8367785673e0f607f37b91bda0f7700c', '0x29128dbcf994e1ddc09cdbce01c287bb3f6b0cf4dd3c98174cadbbaf67bc22d7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Origin OS ARM (chain 146) track 3
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-os-arm-3-sonic',
  146,
  'event'::match_type,
  NULL,
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000002f872623d1e1af5835b08b0e49aad2d81d649d30'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"value","op":"gte","value":"100000000000000000"}'::jsonb,
  'ARM',
  'low'::severity_level,
  NULL,
  'Origin OS ARM'
) ON CONFLICT (id) DO NOTHING;

-- Mainnet Multisig (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'mainnet-multisig',
  1,
  'event'::match_type,
  ARRAY['0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Mainnet Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Origin Governance (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-governance',
  1,
  'event'::match_type,
  ARRAY['0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec'],
  ARRAY['0x7ca4ac117ed3cdce75c1161d8207c440389b1a15d69d096831664657c07dafc2', '0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c', '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0', '0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f', '0x541f725fb9f7c98a30cc9c0ff32fbb14358cd7159c847a3aa20a2bdc442ba511', '0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892', '0xccb45da8d5717e6c4544694297c4ba5cf151d455c9bb0ed4fc7a38411bc05461', '0x0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997', '0x08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401', '0xc565b045403dc03c2eea82b81a0465edad9e2e7fc4d97e11421c209da93d7a93', '0x7e3f7f0708a84de9203036abaa450dccc85ad5ff52f78c170f3edb55cf5e8828'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Governance'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts',
  1,
  'event'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d', '0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xda0485c1e74a7ef690e99d8286c243942edaa07b', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63', '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5', '0xc1fc9e5ec3058921ea5025d703cbe31764756319', '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc', '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90', '0x5e3646a1db86993f73e6b74a57d8640b69f7e259', '0x5a4eee58744d1430876d5ca93cab5ccb763c037d', '0x79f2188ef9350a1dc11a062cca0abe90684b0197', '0x76bf500b6305dc4ea851384d3d5502f1c7a0ed44', '0x6b69b755c629590ed59618a2712d8a2957ca98fc', '0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0', '0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1', '0xe3ae7c80a1b02ccd3fb0227773553aeb14e32f26', '0x5bd9af9c2506d29b6d79cb878284a270190eaeaa', '0x26a02ec47acc2a3442b757f45e0a82b8e993ce11', '0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e', '0x9c354503c38481a7a7a51629142963f98ecc12d0', '0x0c4576ca1c365868e162554af8e385dc3e7c66d9', '0x3cdd07c16614059e66344a7b579dab4f9516c0b6', '0xfb0a3cf9b019bfd8827443d131b235b3e0fc58d2', '0xf2a18f7330141ec737eb73a0a5ea8e4d7e9be7ec', '0xe11edbd5ae4fa434af7f8d7f03da1742996e7ab2', '0x8cf42b82fffa3e7714d62a2ca223acbec1eef095', '0x85b78aca6deae198fbf201c82daf6ca21942acc6', '0xf54ebff575f699d281645c6f14fe427dffe629cf', '0x01f30b7358ba51f637d1aa05d9b4a60f76dad680', '0x29c4bb7b1ebcc53e8cbd16480b5bae52c69806d3', '0xbcae2eb1cc47f137d8b2d351b0e0ea8dda4c6184', '0xceda2d856238aa0d12f6329de20b9115f07c366d', '0x687afb5a52a15122fd5fc54a8b52cfd58346fb0c', '0x0dc20109ea012f050beda184844c1ed5ec6da33a', '0x39878253374355dbcc15c86458f084fb6f2d6de7', '0x4b91827516f79d6f6a1f292ed99671663b09169a', '0xedf495f92c2ebdee8b797e9c503aa7a3302a9c88', '0xc4444c5d9e7c1a5a0a01c5e4b11692d589dcaf22', '0xfee31c09fa5e9cdbc1f80c90b42b58640be91ddf', '0x49674fbce040d95366604d1db3392e9bdea14d48', '0x6d416e576eecbb9f897856a7c86007905274ed04', '0xe3b3b4fc77505ecfaacf6dd21619a8cc12fcc501', '0xba0e352ab5c13861c26e4e773e7a833c3a223fe6', '0x6bac785889a4127db0e0cefee88e0a9f1aaf3cc7'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts'
) ON CONFLICT (id) DO NOTHING;

-- Origin Timelock (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-timelock',
  1,
  'event'::match_type,
  ARRAY['0x35918cde7233f2dd33fa41ae3cb6ae0e42e0e69f'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  NULL,
  'Origin Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts Sonic (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts-sonic-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x7b0383b31c7662e3f6b6e9c743bc87b93c1f4498', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0x4bc73050916e6d1738286d8863f8fdcffaa879f8', '0x06f172e6852085eca886b7f9fd8f7b21db3d2c40', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21', '0x596b0401479f6dfe1caf8c12838311fee742b95c', '0xbe19cc5654e30daf04ad3b5e06213d70f4e882ee', '0x31a91336414d3b955e494e7d485a6b06b55fc8fb', '0x2f872623d1e1af5835b08b0e49aad2d81d649d30', '0x38b654d7859dab79935c9cf99267392c06d254cf'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts Sonic'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Chain SFC (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-chain-sfc-sonic',
  146,
  'event'::match_type,
  ARRAY['0xfc00face00000000000000000000000000000000'],
  ARRAY['0xcd35267e7654194727477d6c78b541a553483cff7f92a055d17868d3da6e953e', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x49bca1ed2666922f9f1690c26a569e1299c2a715fe57647d77e81adfabbf25bf', '0xac4801c32a6067ff757446524ee4e7a373797278ac3c883eac5c693b4ad72e47', '0x047575f43f09a7a093d94ec483064acfc61b7e25c0de28017da442abf99cb917'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Chain SFC'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Multisig (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-multisig-sonic',
  146,
  'event'::match_type,
  ARRAY['0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Timelock (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-timelock-sonic',
  146,
  'event'::match_type,
  ARRAY['0x31a91336414d3b955e494e7d485a6b06b55fc8fb'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Sonic Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Base Multisig (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'base-multisig-base',
  8453,
  'event'::match_type,
  ARRAY['0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  ARRAY['0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26', '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c', '0x5ac6c46c93c8d0e53714ba3b53db3e7c046da994313d7ed0d192028bc7c228b0', '0x1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2', '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93', '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276', '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440', '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23', '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375', '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8', '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e', '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf', '0xb648d3644f584ed1c2232d53c46d87e693586486ad0d1175f8656013110b714e', '0x66753cd2356569ee081232e3be8909b950e0a76c1f8460c3a5e3c2be32b11bed', '0x3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d', '0x141df868a6331af528e38c83b7aa03edc19be66e37ae67f9285bf4f8e3c6a1a8', '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Base Multisig'
) ON CONFLICT (id) DO NOTHING;

-- Base Timelock (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'base-timelock-base',
  8453,
  'event'::match_type,
  ARRAY['0xf817cb3092179083c48c014688d98b72fb61464f'],
  ARRAY['0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58', '0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca', '0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70', '0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5', '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff', '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d', '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'medium'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Base Timelock'
) ON CONFLICT (id) DO NOTHING;

-- Origin Proxy Contracts Base (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-proxy-contracts-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x3b56c09543d3068f8488ed34e6f383c3854d2bc1', '0x80c864704dd06c3693ed5179190786ee38acf835', '0xf611cc500eee7e4e4763a05fe623e2363c86d2af', '0x9cfcaf81600155e01c63e4d2993a8a81a8205829'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Governance',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Proxy Contracts Base'
) ON CONFLICT (id) DO NOTHING;

-- Curve Aragon Voting (51%) (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-aragon-voting-51',
  1,
  'event'::match_type,
  ARRAY['0xe478de485ad2fe566d49342cbd03e49ed7db3356'],
  ARRAY['0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394', '0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab', '0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e', '0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50', '0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375', '0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580', '0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9', '0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'Curve Aragon Voting (51%)'
) ON CONFLICT (id) DO NOTHING;

-- Curve Aragon Voting (60%) (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-aragon-voting-60',
  1,
  'event'::match_type,
  ARRAY['0xbcff8b0b9419b9a88c44546519b1e909cf330399'],
  ARRAY['0x0730610a5322c6584fb6f5bb760719e650c888cfd965a2beb2d598bcd425e394', '0xbf8e2b108bb7c980e08903a8a46527699d5e84905a082d56dacb4150725c8cab', '0x903b617f7f36eb047a29b89d1bf7885fdae31d250c3320fccf11d045c11b396e', '0x3172f2e9273c729c2a47cc8bf7e7f18506e3e3035126d562602bd2155bc78a50', '0xbd5318adc778260bd213cc16f3ef06cfb4f729adb9309495fed0e10abc61c375', '0xcb34d0577abe5b2f96b65ea1bb5de2209ba6309c6909438c6d50dd277ca3b580', '0x5229a5dba83a54ae8cb5b51bdd6de9474cacbe9dd332f5185f3a4f4f2e3f4ad9', '0x596caf56044b55fb8c4ca640089bbc2b63cae3e978b851f5745cbb7c5b288e02'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'Curve Aragon Voting (60%)'
) ON CONFLICT (id) DO NOTHING;

-- OETH Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-burn',
  1,
  'event'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Burn'
) ON CONFLICT (id) DO NOTHING;

-- OETH Buyback (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-buyback',
  1,
  'event'::match_type,
  ARRAY['0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2'],
  ARRAY['0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787', '0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743', '0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df', '0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Buyback'
) ON CONFLICT (id) DO NOTHING;

-- OETH Compound Staking SSV - Suicide Refund Received (chain 1) [trace]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-compound-staking-ssv-suicide-refund-received-trace',
  1,
  'trace'::match_type,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['suicide'],
  NULL,
  NULL,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Compound Staking SSV - Suicide Refund Received'
) ON CONFLICT (id) DO NOTHING;

-- OETH Compound Staking SSV Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-compound-staking-ssv-strategy',
  1,
  'event'::match_type,
  ARRAY['0xaf04828ed923216c77dc22a2fc8e077fdadaa87d'],
  ARRAY['0xb7523e03ed4a74718427c422a01fee1138835adb5bd592240f30bd8b5e1b929a', '0xed2528338eefb63fd1860078b91e35106bc25e3fd528634d180f662582fe5ec1', '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xae0e4f727389efd70d748d667436e0264f370ae498b339b713797dbab57b12ff', '0xaca97428a1d7f2b7c4cee2fbe4feda457e132b404b0c9c3ff73bf7a988d889a8', '0xce77f85e30b0e6df0d12527ddf038f900fdeda0eeda4284c52be47b05de31a97', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x83f29c79feb71f8fba9d0fbc4ba5f0982a28b6b1e868b3fc50e6400d100bca0f', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x50837f89f5e75ae0a7bcc858f53ea15fa398dc007fd52cbfe4683ae9a6c2d722', '0x63d54ea43f163d6e28fc23abec67eb7c3294e7e6f0620955a73cd8d17c7367f4', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0xb8318df57b70f6381fb18aaf762e33efa2cc92627aae83d417f6710e1415d8d8', '0x8142f1367675d1a37dc1aa31258c38b05f5348de55b799764472d94ccb4a71f4', '0x8dd83105dbd4263d41c76e5d414905babdd3f035bd2031f6ce8895715595979c', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Compound Staking SSV Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Contract (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-contract',
  1,
  'event'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Contract'
) ON CONFLICT (id) DO NOTHING;

-- OETH Curve AMO Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-curve-amo-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  ARRAY['0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768', '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c', '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0', '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e', '0xa2b71ec6df949300b59aab36b55e189697b750119dd349fcfa8c0f779e83c254', '0x46e22fb3709ad289f62ce63d469248536dbc78d82b84a3d7e74ad606dc201938', '0x878eb36b3f197f05821c06953d9bc8f14b332a227b1e26df06a4215bbfe5d73f', '0xa8715770654f54603947addf38c689adbd7182e21673b28bcf306a957aaba215'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Curve AMO Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-curve-amo-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  true,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OETH Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3', '0xdcee70654261af21c44c093c300ed3bb97b78192', '0x39254033945aa2e4809cc2977e7087bee48bd7ab', '0x0d017afa83eace9f10a8ec5b6e13941664a6785c', '0xc0f42f73b8f01849a2dd99753524d4ba14317eb3', '0xfd6c58850cacf9ccf6e8aee479bfb4df14a362d2', '0x703118c4cbcccbf2ab31913e0f8075fbbb15f563', '0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899', '0xf14bbdf064e3f67f51cd9bd646ae3716ad938fdc', '0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63', '0xaf04828ed923216c77dc22a2fc8e077fdadaa87d', '0x94b17476a93b3262d87b9a326965d1e91f9c13e7'],
  NULL,
  true,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking - Suicide Refund Received (chain 1) [trace]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-suicide-refund-received-trace',
  1,
  'trace'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['suicide'],
  NULL,
  NULL,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Native Staking - Suicide Refund Received'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  ARRAY['0x7a745a2c63a535068f52ceca27debd5297bbad5f7f37ec53d044a59d0362445d', '0xbe7040030ff7b347853214bf49820c6d455fedf58f3815f85c7bc5216993682b', '0x80d022717ea022455c5886b8dd8a29c037570aae58aeb4d7b136d7a10ec2e431', '0x6aa7e30787b26429ced603a7aba8b19c4b5d5bcf29a3257da953c8d53bcaa3a6', '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0x958934bb53d6b4dc911b6173e586864efbc8076684a31f752c53d5778340b37f', '0xcb8d24e46eb3c402bf344ee60a6576cba9ef2f59ea1af3b311520704924e901a', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x83f29c79feb71f8fba9d0fbc4ba5f0982a28b6b1e868b3fc50e6400d100bca0f', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x6aecca20726a17c1b81989b2fd09dfdf636bae9e564d4066ca18df62dc1f3dc2', '0x8c2e15303eb94e531acc988c2a01d1193bdaaa15eda7f16dda85316ed463578d', '0xacd38e900350661e325d592c959664c0000a306efb2004e7dc283f44e0ea0423', '0xe765a88a37047c5d793dce22b9ceb5a0f5039d276da139b4c7d29613f341f110', '0xe26b067424903962f951f568e52ec9a3bbe1589526ea54a4e69ca6eaae1a4c77', '0x3329861a0008b3348767567d2405492b997abd79a088d0f2cef6b1a09a8e7ff7', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Native Staking Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Native Staking Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-native-staking-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x34edb2ee25751ee67f68a45813b22811687c0238', '0x4685db8bf2df743c861d71e6cfb5347222992076', '0xe98538a0e8c2871c2482e1be8cc6bd9f8e8ffd63'],
  ARRAY['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OETH Native Staking Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OETH Vault (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-vault-1',
  1,
  'event'::match_type,
  ARRAY['0x39254033945aa2e4809cc2977e7087bee48bd7ab'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH Vault'
) ON CONFLICT (id) DO NOTHING;

-- OETH Vault (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-vault-2',
  1,
  'event'::match_type,
  ARRAY['0x39254033945aa2e4809cc2977e7087bee48bd7ab'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Vault'
) ON CONFLICT (id) DO NOTHING;

-- OETH Zapper (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-zapper',
  1,
  'event'::match_type,
  ARRAY['0xda0485c1e74a7ef690e99d8286c243942edaa07b'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'OETH Zapper'
) ON CONFLICT (id) DO NOTHING;

-- OETH/ETH Price Feed (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'oeth-eth-price-feed',
  1,
  'event'::match_type,
  ARRAY['0x703118c4cbcccbf2ab31913e0f8075fbbb15f563'],
  ARRAY['0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'high'::severity_level,
  NULL,
  'OETH/ETH Price Feed'
) ON CONFLICT (id) DO NOTHING;

-- WOETH Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'woeth-burn',
  1,
  'event'::match_type,
  ARRAY['0xdcee70654261af21c44c093c300ed3bb97b78192'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OETH',
  'low'::severity_level,
  NULL,
  'WOETH Burn'
) ON CONFLICT (id) DO NOTHING;

-- Chainlink Keeper (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'chainlink-keeper',
  1,
  'event'::match_type,
  ARRAY['0x7b3ec232b08bd7b4b3305be0c044d907b2df960b'],
  ARRAY['0xcaacad83e47cc45c280d487ec84184eee2fa3b54ebaa393bda7549f13da228f6', '0x91cb3bb75cfbd718bbfccc56b7f53d92d7048ef4ca39a3b7b7c6d4af1f791181', '0xafd24114486da8ebfc32f3626dada8863652e187461aa74d4bfa734891506203', '0xf3b5906e5672f3e524854103bcafbbdba80dbdfeca2c35e116127b1060a68318'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Chainlink Keeper'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster',
  1,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- OGN Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-burn',
  1,
  'event'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'OGN Burn'
) ON CONFLICT (id) DO NOTHING;

-- OGN Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  true,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'OGN Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OGN Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x8207c1ffc5b6804f6024322ccf34f29c3541ae26', '0x1d3fbd4d129ddd2372ea85c5fa00b2682081c9ec', '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b', '0x63898b3b6ef3d39332082178656e9862bee45c57', '0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  NULL,
  true,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'OGN Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OGV Migration (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogv-migration-1',
  1,
  'event'::match_type,
  ARRAY['0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  ARRAY['0xb5895e6e094fe35ea6fb07a0d870556bd8873cb5b013db35577ac4b8fc9ba911', '0x9c1f21412e7678ca4f1e877049ce3e4db3d039e316e6b55b1de2aef667ae4996'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'OGV Migration'
) ON CONFLICT (id) DO NOTHING;

-- OGV Migration (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogv-migration-2',
  1,
  'event'::match_type,
  ARRAY['0x95c347d6214614a780847b8aaf4f96eb84f4da6d'],
  ARRAY['0x4bd04f3440c9bf56a25f7b9e1ac75a9803bd83123a127cf9748129c938630b39'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'OGV Migration'
) ON CONFLICT (id) DO NOTHING;

-- Origin Rewards (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-rewards-1',
  1,
  'event'::match_type,
  ARRAY['0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'],
  ARRAY['0xe261f91b5c3d9f16ed2268171bcd375f4aa1fe4b244cfe2e54a7d21be4735d46', '0x41ad0a33748dcbf4495041d0518e1204c1d5f0d65e7dccb51877235361e75f4a'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  '{"email":["engineering@originprotocol.com"],"discordMentions":["<@&997340701551513762>"]}'::jsonb,
  'Origin Rewards'
) ON CONFLICT (id) DO NOTHING;

-- Origin Rewards (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'origin-rewards-2',
  1,
  'event'::match_type,
  ARRAY['0x7609c88e5880e934dd3a75bcfef44e31b1badb8b'],
  ARRAY['0x9026b1dc1bd4688af8f4998f8cacc713a53fba753294da0efe4849a25c26023e'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Origin Rewards'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Curve (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-curve',
  1,
  'event'::match_type,
  ARRAY['0x9f4308cdfa4d02c045bc8bd82864013b62d516bb', '0x8a8809d67e3193486dcf94ad023978cbceed1723'],
  ARRAY['0x29517452b3d8f353a0d81b89ef1eb2c73ce0fc391e9d8e46c2c11c068d73bbe5', '0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Curve'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Merkl (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-merkl',
  1,
  'event'::match_type,
  ARRAY['0x0fc66355b681503efee7741bd848080d809fd6db'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Merkl'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Registry (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-registry',
  1,
  'event'::match_type,
  ARRAY['0xaa8af8db4b6a827b51786334d26349eb03569731'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'Pool Booster Registry'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster-sonic',
  146,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- Curve Pool Booster (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'curve-pool-booster-base',
  8453,
  'event'::match_type,
  NULL,
  ARRAY['0xfe76983af97e70cb1d5a3f3b21250c6bd2b5b9216dd3829a1cdab060e17ab15b', '0x5e6eb33a418de5dbbc17f989f7ae362cdfbb1748c5d603137c767027a354edbc', '0x06c5efeff5c320943d265dc4e5f1af95ad523555ce0c1957e367dda5514572df'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'low'::severity_level,
  NULL,
  'Curve Pool Booster'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Factory Merkl (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-factory-merkl-base-base',
  8453,
  'event'::match_type,
  ARRAY['0x1adb902ece465ca681c66187627a622a631a0a63'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0x1a0e4b3bfcac0fa1e13f7c8b088964c6daea7147fa49e39f54db5787518fe9c9', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'medium'::severity_level,
  NULL,
  'Pool Booster Factory Merkl (Base)'
) ON CONFLICT (id) DO NOTHING;

-- Pool Booster Registry (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'pool-booster-registry-base-base',
  8453,
  'event'::match_type,
  ARRAY['0x157f0b239d7f83d153e6c95f8ad9d341694376e3'],
  ARRAY['0xc7c0c772add429241571afb3805861fb3cfa2af374534088b76cdb4325a87e9a', '0xa39cc5eb22d0f34d8beaefee8a3f17cc229c1a1d1ef87a5ad47313487b1c4f0d', '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OGN',
  'high'::severity_level,
  NULL,
  'Pool Booster Registry (Base)'
) ON CONFLICT (id) DO NOTHING;

-- OS Burn (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-burn-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Burn'
) ON CONFLICT (id) DO NOTHING;

-- OS Contract (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-contract-sonic',
  146,
  'event'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Contract'
) ON CONFLICT (id) DO NOTHING;

-- OS Vault (chain 146) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-vault-1-sonic',
  146,
  'event'::match_type,
  ARRAY['0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'OS Vault'
) ON CONFLICT (id) DO NOTHING;

-- OS Vault (chain 146) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-vault-2-sonic',
  146,
  'event'::match_type,
  ARRAY['0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Vault'
) ON CONFLICT (id) DO NOTHING;

-- OS Zapper (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'os-zapper-sonic',
  146,
  'event'::match_type,
  ARRAY['0xe25a2b256ffb3ad73678d5e80de8d2f6022fab21'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'OS Zapper'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Error Trace (chain 146) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-error-trace-trace-1-sonic',
  146,
  'trace'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  true,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'Sonic Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Sonic Error Trace (chain 146) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'sonic-error-trace-trace-2-sonic',
  146,
  'trace'::match_type,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0xb1e25689d55734fd3fffc939c4c3eb52dff8a794', '0x9f0df7799f6fdad409300080cff680f5a23df4b1', '0xa3c0eca00d2b76b4d1f170b0ab3fdea16c180186', '0xe68e0c66950a7e02335fc9f44daa05d115c4e88b', '0x5b72992e9cde8c07ce7c8217eb014ec7fd281f03', '0xaddea7933db7d83855786eb43a238111c69b00b6', '0xe8947f06351bda440e4e8ae9bf48437f25b41538'],
  NULL,
  true,
  NULL,
  'OS',
  'high'::severity_level,
  NULL,
  'Sonic Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Wrapped OS Burn (chain 146)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wrapped-os-burn-sonic',
  146,
  'event'::match_type,
  ARRAY['0x9f0df7799f6fdad409300080cff680f5a23df4b1'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OS',
  'low'::severity_level,
  NULL,
  'Wrapped OS Burn'
) ON CONFLICT (id) DO NOTHING;

-- Aave Governance (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aave-governance',
  1,
  'event'::match_type,
  ARRAY['0x9aee0b04504cef83a65ac3f0e838d0593bcb2bc7'],
  ARRAY['0xe2470238697bf7475f7230e5f3d01e088062f9610e00bcfb223e3a774949a09a', '0x5b81b8e66a81fbba6ded220cf668cb5da777acaa83cafe789c2699cad0efd808', '0x3d1394ba0f6fca9c1e344f10a3efe1bfca63bc591232bb0d76755690f409450c', '0x064d28d3d3071c5cbc271a261c10c2f0f0d9e319390397101aa0eb23c6bad909', '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', '0x9c687134d572ff69f3e23f40470562650574c5c7cab9f535268763b2d00da65b', '0xfc61eef8f2b4da4ee7bfb9f335f064e2a35a3f6e8e65c3168eafe813aafe4c58', '0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c', '0xcc914becfa276bbc067049bf8db2d34ebbdc1bafa851e4d4936aaed376c08dbe', '0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f', '0x2bed878481293fc7587c48352c8b09aeeca52bed666011d7f916706ec72d6d6d', '0xe39e7fc9f2013b8ab01110f66610f9fb8675d3126e69b3752f0084afc72be19a', '0x918b5bd4499a75f73bb64f14ae0254255f5421d0ecc4dd853c7bfdd7cf65e8fd', '0xf78ab0f6be87fe178c5f1b1fc0a1da52c65e7ac9a866215631dec7ffb1bd108d', '0x45f1db29750f423920a6edede3a80ea19ceb9de3eabc072078eb539ca348dca0', '0xa743f6cc30e98a5cb8e1148f36749c33167ec405cf4262bf6c7ae093d2a6c63f', '0x5e1f23fe5aaf4ee57082b5f445e00d5a47343503b24ab1532a6c8cd15ba97008'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'medium'::severity_level,
  NULL,
  'Aave Governance'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-burn',
  1,
  'event'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Burn'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Buyback (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-buyback',
  1,
  'event'::match_type,
  ARRAY['0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab'],
  ARRAY['0x620398066c59c2d8a15b84b15d6d280cd013e1e8da21405351a32970e959c787', '0x298e4dbf1f6f43b0e8cd13394bba43125c8c376005b44b664a9fd2eaaeb44743', '0x95561238de8d7836da6d15311c07a2546a1a712b477f44391ddd1e6e0556c6cd', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x36db479a3b4d3672bd6f5fca4484283f60b5ac70647b1ceec13ecbb1d030a2df', '0xd16d2cf254200e4dc6dc82512e9d11673e06a798c40b90cef7583729b4f7a8d4'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Buyback'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Contract (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-contract',
  1,
  'event'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Contract'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Curve AMO Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-curve-amo-strategy',
  1,
  'event'::match_type,
  ARRAY['0x26a02ec47acc2a3442b757f45e0a82b8e993ce11'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Error Trace (chain 1) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-error-trace-trace-1',
  1,
  'trace'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  true,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Error Trace (chain 1) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-error-trace-trace-2',
  1,
  'trace'::match_type,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0x2a8e1e676ec238d8a992307b495b45b3feaa5e86', '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70', '0x21fb5812d70b3396880d30e90d9e5c1202266c89', '0x80c898ae5e56f888365e235ceb8cea3eb726cb58', '0xd7b28d06365b85933c64e11e639ea0d3bc0e3bab', '0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  NULL,
  true,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Gauntlet Prime USDC Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-gauntlet-prime-usdc-strategy',
  1,
  'event'::match_type,
  ARRAY['0x2b8f37893ee713a4e9ff0ceb79f27539f20a32a1'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Gauntlet Prime USDC Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Gauntlet Prime USDT Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-gauntlet-prime-usdt-strategy',
  1,
  'event'::match_type,
  ARRAY['0xe3ae7c80a1b02ccd3fb0227773553aeb14e32f26'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Gauntlet Prime USDT Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Maker Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-maker-strategy',
  1,
  'event'::match_type,
  ARRAY['0x6b69b755c629590ed59618a2712d8a2957ca98fc'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Maker Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Meta Morpho Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-meta-morpho-strategy',
  1,
  'event'::match_type,
  ARRAY['0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Meta Morpho Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho Aave Strategy (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-aave-strategy-1',
  1,
  'event'::match_type,
  ARRAY['0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Morpho Aave Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho Aave Strategy (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-aave-strategy-2',
  1,
  'event'::match_type,
  ARRAY['0x79f2188ef9350a1dc11a062cca0abe90684b0197'],
  ARRAY['0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Morpho Aave Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Morpho V2 Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-morpho-v2-strategy',
  1,
  'event'::match_type,
  ARRAY['0x3643cafa6ef3dd7fcc2adad1cabf708075afff6e'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Morpho V2 Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Sky Savings Rate Strategy (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-sky-savings-rate-strategy',
  1,
  'event'::match_type,
  ARRAY['0x5bd9af9c2506d29b6d79cb878284a270190eaeaa'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Sky Savings Rate Strategy'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Vault (chain 1) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-vault-1',
  1,
  'event'::match_type,
  ARRAY['0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'high'::severity_level,
  NULL,
  'OUSD Vault'
) ON CONFLICT (id) DO NOTHING;

-- OUSD Vault (chain 1) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ousd-vault-2',
  1,
  'event'::match_type,
  ARRAY['0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'OUSD Vault'
) ON CONFLICT (id) DO NOTHING;

-- WOUSD Burn (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wousd-burn',
  1,
  'event'::match_type,
  ARRAY['0xd2af830e8cbdfed6cc11bab697bb25496ed6fa62'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'OUSD',
  'low'::severity_level,
  NULL,
  'WOUSD Burn'
) ON CONFLICT (id) DO NOTHING;

-- primeETH LRT Deposit Pool (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'primeeth-lrt-deposit-pool',
  1,
  'event'::match_type,
  ARRAY['0xa479582c8b64533102f6f528774c536e354b8d32'],
  ARRAY['0x07c31fccf51996f0f4ea01c3a55191786b3a8cd89f696db4d42adaa99b0e15f1', '0x4ac5df40d910feab74f02c4430568f99e711257906dd0df11643df22f2ee3cf6', '0x8b0422d41caf5eb583695377e98b5041a1d241a7c80483cf182b1311c48c93b7', '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', '0x44a9f72c31db7b99a131a49de95fe2420c60e9fe9bff0a1a13d47b4af14566b4', '0x1bba2f1175afe384c3b2efde45f19740b744459c61a7700994196fe4d84af176', '0xd402f64df01ef62b7343cb5309018377088f22dc1b81a5378ce7f2575114afe4', '0xb17adb7f863ad4dced68bd4045e81e087cb8c5b536bf2dbda6c8176e5fc593b9', '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258', '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa', '0x9cf19cefd9aab739c33b95716ee3f3f921f219dc6d7aae25e1f9497b37889150', '0x8188e2b4d95f73db30690b4103c71159349bb897df928902c6330ef99e45fef3', '0x92072c627ec1da81f8268b3cfb3c02bbbeedc12c21134faf4457469147619947'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'primeETH',
  'low'::severity_level,
  NULL,
  'primeETH LRT Deposit Pool'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome CL Pools (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-cl-pools-base',
  8453,
  'event'::match_type,
  ARRAY['0x6446021f4e396da3df4235c62537431372195d38'],
  ARRAY['0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde', '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c', '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"op":"OR","conditions":[{"field":"amount0","op":"gte","value":"100000000000000000"},{"field":"amount1","op":"gte","value":"100000000000000000"}]}'::jsonb,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Aerodrome CL Pools'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome Incentives (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-incentives-base',
  8453,
  'event'::match_type,
  ARRAY['0x685ce0e36ca4b81f13b7551c76143d962568f6dd', '0x1f6ab4aa92aa7f95b7eff5aa507119472ad1c5d3'],
  ARRAY['0x52977ea98a2220a03ee9ba5cb003ada08d394ea10155483c95dc2dc77a7eb24b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'highlight'::severity_level,
  NULL,
  'Aerodrome Incentives'
) ON CONFLICT (id) DO NOTHING;

-- Aerodrome vAMM Pools (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'aerodrome-vamm-pools-base',
  8453,
  'event'::match_type,
  ARRAY['0x8ea4c49b712217fd6e29db920e3dd48287a0d50d', '0x6fb655476fdcfb9712dd200308d941a1c6d1119e'],
  ARRAY['0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2', '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Aerodrome vAMM Pools'
) ON CONFLICT (id) DO NOTHING;

-- Bridged WOETH (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'bridged-woeth-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xd8724322f44e5c58d7a815f542036fb17dbbf839'],
  ARRAY['0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925', '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'Bridged WOETH (Base)'
) ON CONFLICT (id) DO NOTHING;

-- Super OETH Base Error Trace (chain 8453) [trace 1]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'super-oeth-base-error-trace-trace-1-base',
  8453,
  'trace'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  true,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'Super OETH Base Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- Super OETH Base Error Trace (chain 8453) [trace 2]
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'super-oeth-base-error-trace-trace-2-base',
  8453,
  'trace'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  ARRAY['call'],
  NULL,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3', '0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6', '0x98a0cbef61bd2d21435f433be4cd42b56b38cc93', '0xc72bda59e382be10bb5d71abd01ecc65aa16fd83', '0xe96eb1eda83d18cbac224233319fa5071464e1b9', '0x02f2c609950e90934ce99e58b4d7326ad0d7f8d6', '0x92a19381444a001d62ce67baff066fa1111d7202', '0x28bce2ee5775b652d92bb7c2891a89f036619703', '0x4ff1b9d9ba8558f5eafcec096318ea0d8b541971', '0xb6d85ce798660076152d6fd3a484129668839c95'],
  NULL,
  true,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'Super OETH Base Error Trace'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Aerodrome AMO (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-aerodrome-amo-base',
  8453,
  'event'::match_type,
  ARRAY['0xf611cc500eee7e4e4763a05fe623e2363c86d2af'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x1530ec748a27514ffab0987654233a80256393e127bdf02d94e32ff3c7148ec6', '0xede5d7a610050b00dde41dd385fe2d91a558dde29318267aa4e011678b58cfc5', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x0d0d42e29eda809becae4f120dfbc3799e17df829fa338f8035c724579423b89', '0xfb25072e740f40f37c0adb21abfa08b090c754a216aa3dce33b68fab089eff91', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0xab1ece054738c773b84a8a32f5f969323c50dc7e28634302f91c7b75cb838782', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Aerodrome AMO'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Bridged WOETH Strategy (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-bridged-woeth-strategy-base',
  8453,
  'event'::match_type,
  ARRAY['0x80c864704dd06c3693ed5179190786ee38acf835'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x5066a7b9bf5907d8b921adeaade475273e40a7302cab0e838ef9fa2094b06b7f', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x688768fc37ada60fd073f86fafc8d5aa7fe9d86750ddf224bc0366812c086fe8', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Bridged WOETH Strategy'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Burn (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-burn-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Burn'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Contract (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-contract-base',
  8453,
  'event'::match_type,
  ARRAY['0xdbfefd2e8460a6ee4955a68582f85708baea60a3'],
  ARRAY['0x201ace89ad3f5ab7428b91989f6a50d1998791c7b94a0fa812fd64a57687165e', '0x19a249fa2050bac8314ac10e3ad420bd9825574bf750f58810c3c7adfc7b1c6f', '0x41645eb819d3011b13f97696a8109d14bfcddfaca7d063ec0564d62a3e257235'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Contract'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Curve AMO Strategy (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-curve-amo-strategy-base',
  8453,
  'event'::match_type,
  ARRAY['0x9cfcaf81600155e01c63e4d2993a8a81a8205829'],
  ARRAY['0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62', '0xe48386b84419f4d36e0f96c10cc3510b6fb1a33795620c5098b22472bbe90796', '0x9c922f6d0c990b250e9dd0a427a5c8da7f44b960f697fecb31cbbd8ba79ec8c2', '0xef6485b84315f9b1483beffa32aae9a0596890395e3d7521f1c5fbb51790e765', '0x16b7600acff27e39a8a96056b3d533045298de927507f5c1d97e4accde60488c', '0x04c0b9649497d316554306e53678d5f5f5dbc3a06f97dec13ff4cfe98b986bbc', '0xf6c07a063ed4e63808eb8da7112d46dbcd38de2b40a73dbcc9353c5a94c72353', '0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Curve AMO Strategy'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Vault (chain 8453) track 1
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-vault-1-base',
  8453,
  'event'::match_type,
  ARRAY['0x98a0cbef61bd2d21435f433be4cd42b56b38cc93'],
  ARRAY['0x71f0e5b62f846a22e0b4d159e516e62fa9c2b8eb570be15f83e67d98a2ee51e0', '0x891ebab18da80ebeeea06b1b1cede098329c4c008906a98370c2ac7a80b571cb', '0x8cff26a5985614b3d30629cc4ab83824bf115aec971b718d8f2f99562032e972', '0xbc044409505c95b6b851433df96e1beae715c909d8e7c1d6d7ab783300d4e3b9', '0x4f1ac48525e50059cc1cc6e0e1940ece0dd653a4db4841538d6aef036be2fb7b', '0xb266add5f3044b17d27db796af992cecbe413921b4e8aaaee03c719e16b9806a', '0x1e4af5ac389e8cde1bdaa6830881b6c987c62a45cfb3b33d27d805cde3b57750'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'superOETHb Vault'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Vault (chain 8453) track 2
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-vault-2-base',
  8453,
  'event'::match_type,
  ARRAY['0x98a0cbef61bd2d21435f433be4cd42b56b38cc93'],
  ARRAY['0x2ec5fb5a3d2703edc461252d92ccd2799c3c74f01d97212b20388207fa17ae45', '0x41b99659f6ba0803f444aff29e5bf6e26dd86a3219aff92119d69710a956ba8d', '0xba58ce12801c949fa65f41c46ed108671c219baf945fa48d21026cea99ff252a', '0x37803e2125c48ee96c38ddf04e826daf335b0e1603579040fd275aba6d06b6fc', '0xaf2910d9759321733de15af1827a49830692912adeb2b3646334861f2cd2eed4', '0x95201f9c21f26877223b1ff4073936a6484c35495649e60e55730497aeb60d93', '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885', '0xc29d6fedbc6bdf267a08166c2b976fbd72aca5d6a769528616f8b9224c8f197f', '0xa12850fb726e0b2b7b3c9a9342031e1268a8148d0eb06b4bea8613204ffcd2b8', '0x39367850377ac04920a9a670f2180e7a94d83b15ad302e59875ec58fd10bd37d', '0x222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6', '0xd6c7508d6658ccee36b7b7d7fd72e5cbaeefb40c64eff24e9ae7470e846304ee', '0x869e0abd13cc3a975de7b93be3df1cb2255c802b1cead85963cc79d99f131bee', '0x47c8c96a5942f094264111c5fe7f6a4fe86efe63254a6fa7afa5fc84f07d58e8', '0x960dd94cbb79169f09a4e445d58b895df2d9bffa5b31055d0932d801724a20d1', '0x09a1db4b80c32706328728508c941a6b954f31eb5affd32f236c1fd405f8fea4', '0x0ec40967a61509853550658e51d0e4297f7cba244fe4adc8ba18b5631ac20e2f', '0xf12c00256bee2b6facb111a88a9b1cff86e79132939b44f1353212d6f7469557', '0x8d22e9d2cbe8bb65a3c4412bd8970743864512a1a0e004e8d00fb96277b78b94', '0xa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb', '0x7d7719313229e558c5a3893cad2eb86a86a049156d1d9ebd5c63a8eedefd1c03', '0x56287a45051933ea374811b3d5d165033047be5572cac676f7c28b8be4f746c7', '0x41ecb23a0e7865b25f38c268b7c3012220d822929e9edff07326e89d5bb822b5', '0xee79a0c43d3993055690b54e074b5153e8bae8d1a872b656dedb64aa8f463333', '0x2d43eb174787155132b52ddb6b346e2dca99302eac3df4466dbeff953d3c84d1', '0x38e3d972947cfef94205163d483d6287ef27eb312e20cb8e0b13a49989db232e', '0x09516ecf4a8a86e59780a9befc6dee948bc9e60a36e3be68d31ea817ee8d2c80'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Vault'
) ON CONFLICT (id) DO NOTHING;

-- superOETHb Zapper (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'superoethb-zapper-base',
  8453,
  'event'::match_type,
  ARRAY['0x3b56c09543d3068f8488ed34e6f383c3854d2bc1'],
  ARRAY['0x9d0b99c299bdb5656c0c9db6e1886c612db5c2881760ea54ab244f6338b4ebd6'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"field":"amount","op":"gte","value":"100000000000000000"}'::jsonb,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'superOETHb Zapper'
) ON CONFLICT (id) DO NOTHING;

-- wOETH Exchange Rate Oracle (Base) (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'woeth-exchange-rate-oracle-base-base',
  8453,
  'event'::match_type,
  ARRAY['0xe96eb1eda83d18cbac224233319fa5071464e1b9'],
  ARRAY['0xed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278', '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'high'::severity_level,
  NULL,
  'wOETH Exchange Rate Oracle (Base)'
) ON CONFLICT (id) DO NOTHING;

-- wsuperOETHb Burn (chain 8453)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'wsuperoethb-burn-base',
  8453,
  'event'::match_type,
  ARRAY['0x7fcd174e80f264448ebee8c88a7c4476aaf58ea6'],
  ARRAY['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  NULL,
  ARRAY['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001', '0x000000000000000000000000000000000000000000000000000000000000dead'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'superOETHb',
  'low'::severity_level,
  NULL,
  'wsuperOETHb Burn'
) ON CONFLICT (id) DO NOTHING;

-- OGN Staking (chain 1)
INSERT INTO alert_rule (id, chain_id, match_type, addresses, topic0s, topic1s, topic2s, topic3s, sighashes, trace_type, call_from, call_to, suicide_refund_address, trace_error, data_filters, topic, severity, notify_targets, display_name)
VALUES (
  'ogn-staking',
  1,
  'event'::match_type,
  ARRAY['0x63898b3b6ef3d39332082178656e9862bee45c57'],
  ARRAY['0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f', '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724', '0x2720efa4b2dd4f3f8a347da3cbd290a522e9432da9072c5b8e6300496fdde282', '0x05b744e3e9358bc00ba3cc0c6606a4d6536134dba00b2d2ee4b5de169acd6427'],
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'xOGN',
  'low'::severity_level,
  NULL,
  'OGN Staking'
) ON CONFLICT (id) DO NOTHING;

COMMIT;
