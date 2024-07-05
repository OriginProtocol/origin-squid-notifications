import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AssetDeposit: event("0x07c31fccf51996f0f4ea01c3a55191786b3a8cd89f696db4d42adaa99b0e15f1", "AssetDeposit(address,address,uint256,uint256,string)", {"depositor": indexed(p.address), "asset": indexed(p.address), "depositAmount": p.uint256, "primeEthMintAmount": p.uint256, "referralId": p.string}),
    AssetSwapped: event("0x4ac5df40d910feab74f02c4430568f99e711257906dd0df11643df22f2ee3cf6", "AssetSwapped(address,address,uint256,uint256)", {"fromAsset": indexed(p.address), "toAsset": indexed(p.address), "fromAssetAmount": p.uint256, "toAssetAmount": p.uint256}),
    ETHDeposit: event("0x8b0422d41caf5eb583695377e98b5041a1d241a7c80483cf182b1311c48c93b7", "ETHDeposit(address,uint256,uint256,string)", {"depositor": indexed(p.address), "depositAmount": p.uint256, "primeEthMintAmount": p.uint256, "referralId": p.string}),
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", "Initialized(uint8)", {"version": p.uint8}),
    MaxNodeDelegatorLimitUpdated: event("0x44a9f72c31db7b99a131a49de95fe2420c60e9fe9bff0a1a13d47b4af14566b4", "MaxNodeDelegatorLimitUpdated(uint256)", {"maxNodeDelegatorLimit": p.uint256}),
    MinAmountToDepositUpdated: event("0x1bba2f1175afe384c3b2efde45f19740b744459c61a7700994196fe4d84af176", "MinAmountToDepositUpdated(uint256)", {"minAmountToDeposit": p.uint256}),
    NodeDelegatorAddedInQueue: event("0xd402f64df01ef62b7343cb5309018377088f22dc1b81a5378ce7f2575114afe4", "NodeDelegatorAddedInQueue(address[])", {"nodeDelegatorContracts": p.array(p.address)}),
    NodeDelegatorRemovedFromQueue: event("0xb17adb7f863ad4dced68bd4045e81e087cb8c5b536bf2dbda6c8176e5fc593b9", "NodeDelegatorRemovedFromQueue(address)", {"nodeDelegatorContracts": p.address}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
    UpdatedLRTConfig: event("0x9cf19cefd9aab739c33b95716ee3f3f921f219dc6d7aae25e1f9497b37889150", "UpdatedLRTConfig(address)", {"lrtConfig": indexed(p.address)}),
    WithdrawalClaimed: event("0x8188e2b4d95f73db30690b4103c71159349bb897df928902c6330ef99e45fef3", "WithdrawalClaimed(address,address,uint256)", {"withdrawer": indexed(p.address), "asset": indexed(p.address), "assets": p.uint256}),
    WithdrawalRequested: event("0x92072c627ec1da81f8268b3cfb3c02bbbeedc12c21134faf4457469147619947", "WithdrawalRequested(address,address,address,uint256,uint256,uint256)", {"withdrawer": indexed(p.address), "asset": indexed(p.address), "strategy": indexed(p.address), "primeETHAmount": p.uint256, "assetAmount": p.uint256, "sharesAmount": p.uint256}),
}

export const functions = {
    LST_NDC_INDEX: viewFun("0xf9985300", "LST_NDC_INDEX()", {}, p.uint256),
    WETH: viewFun("0xad5c4648", "WETH()", {}, p.address),
    WITHDRAW_ASSET: viewFun("0xa758c2ab", "WITHDRAW_ASSET()", {}, p.address),
    addNodeDelegatorContractToQueue: fun("0x19304ccf", "addNodeDelegatorContractToQueue(address[])", {"nodeDelegatorContracts": p.array(p.address)}, ),
    claimWithdrawal: fun("0xc893dfc5", "claimWithdrawal((address,address,address,uint256,uint32,address[],uint256[]))", {"withdrawal": p.struct({"staker": p.address, "delegatedTo": p.address, "withdrawer": p.address, "nonce": p.uint256, "startBlock": p.uint32, "strategies": p.array(p.address), "shares": p.array(p.uint256)})}, {"asset": p.address, "assets": p.uint256}),
    depositAsset: fun("0xc3ae1766", "depositAsset(address,uint256,uint256,string)", {"asset": p.address, "depositAmount": p.uint256, "minPrimeETH": p.uint256, "referralId": p.string}, ),
    getAssetCurrentLimit: viewFun("0x884c1056", "getAssetCurrentLimit(address)", {"asset": p.address}, p.uint256),
    getAssetDistributionData: viewFun("0xb2628fdf", "getAssetDistributionData(address)", {"asset": p.address}, {"depositPoolAssets": p.uint256, "ndcAssets": p.uint256, "eigenAssets": p.uint256}),
    getMintAmount: viewFun("0x195d0e28", "getMintAmount(address,uint256)", {"asset": p.address, "amount": p.uint256}, p.uint256),
    getNodeDelegatorQueue: viewFun("0xce895a2f", "getNodeDelegatorQueue()", {}, p.array(p.address)),
    getSwapAssetReturnAmount: viewFun("0x80fcc592", "getSwapAssetReturnAmount(address,address,uint256)", {"fromAsset": p.address, "toAsset": p.address, "fromAssetAmount": p.uint256}, p.uint256),
    getTotalAssetDeposits: viewFun("0x52c4889f", "getTotalAssetDeposits(address)", {"asset": p.address}, p.uint256),
    initialize: fun("0xc4d66de8", "initialize(address)", {"lrtConfigAddr": p.address}, ),
    isNodeDelegator: viewFun("0x4f444d25", "isNodeDelegator(address)", {"_0": p.address}, p.uint256),
    lrtConfig: viewFun("0xf1650a46", "lrtConfig()", {}, p.address),
    maxNodeDelegatorLimit: viewFun("0xc14db927", "maxNodeDelegatorLimit()", {}, p.uint256),
    minAmountToDeposit: viewFun("0x778fbe60", "minAmountToDeposit()", {}, p.uint256),
    nodeDelegatorQueue: viewFun("0x7a0dace2", "nodeDelegatorQueue(uint256)", {"_0": p.uint256}, p.address),
    optIn: fun("0xb1138ad1", "optIn(address)", {"asset": p.address}, ),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    removeManyNodeDelegatorContractsFromQueue: fun("0x1d572d55", "removeManyNodeDelegatorContractsFromQueue(address[])", {"nodeDelegatorContracts": p.array(p.address)}, ),
    removeNodeDelegatorContractFromQueue: fun("0x6bf8b475", "removeNodeDelegatorContractFromQueue(address)", {"nodeDelegatorAddress": p.address}, ),
    requestWithdrawal: fun("0x115b512f", "requestWithdrawal(address,uint256,uint256)", {"asset": p.address, "assetAmount": p.uint256, "maxPrimeETH": p.uint256}, p.uint256),
    setMinAmountToDeposit: fun("0x8cb20e6f", "setMinAmountToDeposit(uint256)", {"minAmountToDeposit_": p.uint256}, ),
    swapAssetWithinDepositPool: fun("0x2f138eea", "swapAssetWithinDepositPool(address,address,uint256,uint256)", {"fromAsset": p.address, "toAsset": p.address, "fromAssetAmount": p.uint256, "minToAssetAmount": p.uint256}, ),
    transferAssetToNodeDelegator: fun("0xb4a92e47", "transferAssetToNodeDelegator(uint256,address,uint256)", {"ndcIndex": p.uint256, "asset": p.address, "amount": p.uint256}, ),
    transferAssetsToNodeDelegator: fun("0x76564b31", "transferAssetsToNodeDelegator(uint256,address[])", {"ndcIndex": p.uint256, "assets": p.array(p.address)}, ),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    updateLRTConfig: fun("0x15864e0a", "updateLRTConfig(address)", {"lrtConfigAddr": p.address}, ),
    updateMaxNodeDelegatorLimit: fun("0x09bb0f57", "updateMaxNodeDelegatorLimit(uint256)", {"maxNodeDelegatorLimit_": p.uint256}, ),
}

export class Contract extends ContractBase {

    LST_NDC_INDEX() {
        return this.eth_call(functions.LST_NDC_INDEX, {})
    }

    WETH() {
        return this.eth_call(functions.WETH, {})
    }

    WITHDRAW_ASSET() {
        return this.eth_call(functions.WITHDRAW_ASSET, {})
    }

    getAssetCurrentLimit(asset: GetAssetCurrentLimitParams["asset"]) {
        return this.eth_call(functions.getAssetCurrentLimit, {asset})
    }

    getAssetDistributionData(asset: GetAssetDistributionDataParams["asset"]) {
        return this.eth_call(functions.getAssetDistributionData, {asset})
    }

    getMintAmount(asset: GetMintAmountParams["asset"], amount: GetMintAmountParams["amount"]) {
        return this.eth_call(functions.getMintAmount, {asset, amount})
    }

    getNodeDelegatorQueue() {
        return this.eth_call(functions.getNodeDelegatorQueue, {})
    }

    getSwapAssetReturnAmount(fromAsset: GetSwapAssetReturnAmountParams["fromAsset"], toAsset: GetSwapAssetReturnAmountParams["toAsset"], fromAssetAmount: GetSwapAssetReturnAmountParams["fromAssetAmount"]) {
        return this.eth_call(functions.getSwapAssetReturnAmount, {fromAsset, toAsset, fromAssetAmount})
    }

    getTotalAssetDeposits(asset: GetTotalAssetDepositsParams["asset"]) {
        return this.eth_call(functions.getTotalAssetDeposits, {asset})
    }

    isNodeDelegator(_0: IsNodeDelegatorParams["_0"]) {
        return this.eth_call(functions.isNodeDelegator, {_0})
    }

    lrtConfig() {
        return this.eth_call(functions.lrtConfig, {})
    }

    maxNodeDelegatorLimit() {
        return this.eth_call(functions.maxNodeDelegatorLimit, {})
    }

    minAmountToDeposit() {
        return this.eth_call(functions.minAmountToDeposit, {})
    }

    nodeDelegatorQueue(_0: NodeDelegatorQueueParams["_0"]) {
        return this.eth_call(functions.nodeDelegatorQueue, {_0})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }
}

/// Event types
export type AssetDepositEventArgs = EParams<typeof events.AssetDeposit>
export type AssetSwappedEventArgs = EParams<typeof events.AssetSwapped>
export type ETHDepositEventArgs = EParams<typeof events.ETHDeposit>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type MaxNodeDelegatorLimitUpdatedEventArgs = EParams<typeof events.MaxNodeDelegatorLimitUpdated>
export type MinAmountToDepositUpdatedEventArgs = EParams<typeof events.MinAmountToDepositUpdated>
export type NodeDelegatorAddedInQueueEventArgs = EParams<typeof events.NodeDelegatorAddedInQueue>
export type NodeDelegatorRemovedFromQueueEventArgs = EParams<typeof events.NodeDelegatorRemovedFromQueue>
export type PausedEventArgs = EParams<typeof events.Paused>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type UpdatedLRTConfigEventArgs = EParams<typeof events.UpdatedLRTConfig>
export type WithdrawalClaimedEventArgs = EParams<typeof events.WithdrawalClaimed>
export type WithdrawalRequestedEventArgs = EParams<typeof events.WithdrawalRequested>

/// Function types
export type LST_NDC_INDEXParams = FunctionArguments<typeof functions.LST_NDC_INDEX>
export type LST_NDC_INDEXReturn = FunctionReturn<typeof functions.LST_NDC_INDEX>

export type WETHParams = FunctionArguments<typeof functions.WETH>
export type WETHReturn = FunctionReturn<typeof functions.WETH>

export type WITHDRAW_ASSETParams = FunctionArguments<typeof functions.WITHDRAW_ASSET>
export type WITHDRAW_ASSETReturn = FunctionReturn<typeof functions.WITHDRAW_ASSET>

export type AddNodeDelegatorContractToQueueParams = FunctionArguments<typeof functions.addNodeDelegatorContractToQueue>
export type AddNodeDelegatorContractToQueueReturn = FunctionReturn<typeof functions.addNodeDelegatorContractToQueue>

export type ClaimWithdrawalParams = FunctionArguments<typeof functions.claimWithdrawal>
export type ClaimWithdrawalReturn = FunctionReturn<typeof functions.claimWithdrawal>

export type DepositAssetParams = FunctionArguments<typeof functions.depositAsset>
export type DepositAssetReturn = FunctionReturn<typeof functions.depositAsset>

export type GetAssetCurrentLimitParams = FunctionArguments<typeof functions.getAssetCurrentLimit>
export type GetAssetCurrentLimitReturn = FunctionReturn<typeof functions.getAssetCurrentLimit>

export type GetAssetDistributionDataParams = FunctionArguments<typeof functions.getAssetDistributionData>
export type GetAssetDistributionDataReturn = FunctionReturn<typeof functions.getAssetDistributionData>

export type GetMintAmountParams = FunctionArguments<typeof functions.getMintAmount>
export type GetMintAmountReturn = FunctionReturn<typeof functions.getMintAmount>

export type GetNodeDelegatorQueueParams = FunctionArguments<typeof functions.getNodeDelegatorQueue>
export type GetNodeDelegatorQueueReturn = FunctionReturn<typeof functions.getNodeDelegatorQueue>

export type GetSwapAssetReturnAmountParams = FunctionArguments<typeof functions.getSwapAssetReturnAmount>
export type GetSwapAssetReturnAmountReturn = FunctionReturn<typeof functions.getSwapAssetReturnAmount>

export type GetTotalAssetDepositsParams = FunctionArguments<typeof functions.getTotalAssetDeposits>
export type GetTotalAssetDepositsReturn = FunctionReturn<typeof functions.getTotalAssetDeposits>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsNodeDelegatorParams = FunctionArguments<typeof functions.isNodeDelegator>
export type IsNodeDelegatorReturn = FunctionReturn<typeof functions.isNodeDelegator>

export type LrtConfigParams = FunctionArguments<typeof functions.lrtConfig>
export type LrtConfigReturn = FunctionReturn<typeof functions.lrtConfig>

export type MaxNodeDelegatorLimitParams = FunctionArguments<typeof functions.maxNodeDelegatorLimit>
export type MaxNodeDelegatorLimitReturn = FunctionReturn<typeof functions.maxNodeDelegatorLimit>

export type MinAmountToDepositParams = FunctionArguments<typeof functions.minAmountToDeposit>
export type MinAmountToDepositReturn = FunctionReturn<typeof functions.minAmountToDeposit>

export type NodeDelegatorQueueParams = FunctionArguments<typeof functions.nodeDelegatorQueue>
export type NodeDelegatorQueueReturn = FunctionReturn<typeof functions.nodeDelegatorQueue>

export type OptInParams = FunctionArguments<typeof functions.optIn>
export type OptInReturn = FunctionReturn<typeof functions.optIn>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type RemoveManyNodeDelegatorContractsFromQueueParams = FunctionArguments<typeof functions.removeManyNodeDelegatorContractsFromQueue>
export type RemoveManyNodeDelegatorContractsFromQueueReturn = FunctionReturn<typeof functions.removeManyNodeDelegatorContractsFromQueue>

export type RemoveNodeDelegatorContractFromQueueParams = FunctionArguments<typeof functions.removeNodeDelegatorContractFromQueue>
export type RemoveNodeDelegatorContractFromQueueReturn = FunctionReturn<typeof functions.removeNodeDelegatorContractFromQueue>

export type RequestWithdrawalParams = FunctionArguments<typeof functions.requestWithdrawal>
export type RequestWithdrawalReturn = FunctionReturn<typeof functions.requestWithdrawal>

export type SetMinAmountToDepositParams = FunctionArguments<typeof functions.setMinAmountToDeposit>
export type SetMinAmountToDepositReturn = FunctionReturn<typeof functions.setMinAmountToDeposit>

export type SwapAssetWithinDepositPoolParams = FunctionArguments<typeof functions.swapAssetWithinDepositPool>
export type SwapAssetWithinDepositPoolReturn = FunctionReturn<typeof functions.swapAssetWithinDepositPool>

export type TransferAssetToNodeDelegatorParams = FunctionArguments<typeof functions.transferAssetToNodeDelegator>
export type TransferAssetToNodeDelegatorReturn = FunctionReturn<typeof functions.transferAssetToNodeDelegator>

export type TransferAssetsToNodeDelegatorParams = FunctionArguments<typeof functions.transferAssetsToNodeDelegator>
export type TransferAssetsToNodeDelegatorReturn = FunctionReturn<typeof functions.transferAssetsToNodeDelegator>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type UpdateLRTConfigParams = FunctionArguments<typeof functions.updateLRTConfig>
export type UpdateLRTConfigReturn = FunctionReturn<typeof functions.updateLRTConfig>

export type UpdateMaxNodeDelegatorLimitParams = FunctionArguments<typeof functions.updateMaxNodeDelegatorLimit>
export type UpdateMaxNodeDelegatorLimitReturn = FunctionReturn<typeof functions.updateMaxNodeDelegatorLimit>

