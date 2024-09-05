import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    estimateAmount0: viewFun("0x2a95958e", "estimateAmount0(uint256,uint128,uint160,int24,int24)", {"amount1": p.uint256, "liquidity": p.uint128, "sqrtRatioX96": p.uint160, "tickLow": p.int24, "tickHigh": p.int24}, p.uint256),
    estimateAmount1: viewFun("0x09602b29", "estimateAmount1(uint256,uint128,uint160,int24,int24)", {"amount0": p.uint256, "liquidity": p.uint128, "sqrtRatioX96": p.uint160, "tickLow": p.int24, "tickHigh": p.int24}, p.uint256),
    fees: viewFun("0x263a5362", "fees(address,uint256)", {"positionManager": p.address, "tokenId": p.uint256}, {"amount0": p.uint256, "amount1": p.uint256}),
    'getAmount0Delta(uint160,uint160,uint128,bool)': viewFun("0x2c32d4b6", "getAmount0Delta(uint160,uint160,uint128,bool)", {"sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160, "liquidity": p.uint128, "roundUp": p.bool}, p.uint256),
    'getAmount0Delta(uint160,uint160,int128)': viewFun("0xc932699b", "getAmount0Delta(uint160,uint160,int128)", {"sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160, "liquidity": p.int128}, p.int256),
    'getAmount1Delta(uint160,uint160,int128)': viewFun("0x00c11862", "getAmount1Delta(uint160,uint160,int128)", {"sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160, "liquidity": p.int128}, p.int256),
    'getAmount1Delta(uint160,uint160,uint128,bool)': viewFun("0x48a0c5bd", "getAmount1Delta(uint160,uint160,uint128,bool)", {"sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160, "liquidity": p.uint128, "roundUp": p.bool}, p.uint256),
    getAmountsForLiquidity: viewFun("0xc72e160b", "getAmountsForLiquidity(uint160,uint160,uint160,uint128)", {"sqrtRatioX96": p.uint160, "sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160, "liquidity": p.uint128}, {"amount0": p.uint256, "amount1": p.uint256}),
    getLiquidityForAmounts: viewFun("0xbafcf68e", "getLiquidityForAmounts(uint256,uint256,uint160,uint160,uint160)", {"amount0": p.uint256, "amount1": p.uint256, "sqrtRatioX96": p.uint160, "sqrtRatioAX96": p.uint160, "sqrtRatioBX96": p.uint160}, p.uint256),
    getPopulatedTicks: viewFun("0xfe07023d", "getPopulatedTicks(address,int24)", {"pool": p.address, "startTick": p.int24}, p.array(p.struct({"tick": p.int24, "sqrtRatioX96": p.uint160, "liquidityNet": p.int128, "liquidityGross": p.uint128}))),
    getSqrtRatioAtTick: viewFun("0x986cfba3", "getSqrtRatioAtTick(int24)", {"tick": p.int24}, p.uint160),
    getTickAtSqrtRatio: viewFun("0x4f76c058", "getTickAtSqrtRatio(uint160)", {"sqrtPriceX96": p.uint160}, p.int24),
    poolFees: viewFun("0x255d36ef", "poolFees(address,uint128,int24,int24,int24)", {"pool": p.address, "liquidity": p.uint128, "tickCurrent": p.int24, "tickLower": p.int24, "tickUpper": p.int24}, {"amount0": p.uint256, "amount1": p.uint256}),
    principal: viewFun("0x22635397", "principal(address,uint256,uint160)", {"positionManager": p.address, "tokenId": p.uint256, "sqrtRatioX96": p.uint160}, {"amount0": p.uint256, "amount1": p.uint256}),
}

export class Contract extends ContractBase {

    estimateAmount0(amount1: EstimateAmount0Params["amount1"], liquidity: EstimateAmount0Params["liquidity"], sqrtRatioX96: EstimateAmount0Params["sqrtRatioX96"], tickLow: EstimateAmount0Params["tickLow"], tickHigh: EstimateAmount0Params["tickHigh"]) {
        return this.eth_call(functions.estimateAmount0, {amount1, liquidity, sqrtRatioX96, tickLow, tickHigh})
    }

    estimateAmount1(amount0: EstimateAmount1Params["amount0"], liquidity: EstimateAmount1Params["liquidity"], sqrtRatioX96: EstimateAmount1Params["sqrtRatioX96"], tickLow: EstimateAmount1Params["tickLow"], tickHigh: EstimateAmount1Params["tickHigh"]) {
        return this.eth_call(functions.estimateAmount1, {amount0, liquidity, sqrtRatioX96, tickLow, tickHigh})
    }

    fees(positionManager: FeesParams["positionManager"], tokenId: FeesParams["tokenId"]) {
        return this.eth_call(functions.fees, {positionManager, tokenId})
    }

    'getAmount0Delta(uint160,uint160,uint128,bool)'(sqrtRatioAX96: GetAmount0DeltaParams_0["sqrtRatioAX96"], sqrtRatioBX96: GetAmount0DeltaParams_0["sqrtRatioBX96"], liquidity: GetAmount0DeltaParams_0["liquidity"], roundUp: GetAmount0DeltaParams_0["roundUp"]) {
        return this.eth_call(functions['getAmount0Delta(uint160,uint160,uint128,bool)'], {sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp})
    }

    'getAmount0Delta(uint160,uint160,int128)'(sqrtRatioAX96: GetAmount0DeltaParams_1["sqrtRatioAX96"], sqrtRatioBX96: GetAmount0DeltaParams_1["sqrtRatioBX96"], liquidity: GetAmount0DeltaParams_1["liquidity"]) {
        return this.eth_call(functions['getAmount0Delta(uint160,uint160,int128)'], {sqrtRatioAX96, sqrtRatioBX96, liquidity})
    }

    'getAmount1Delta(uint160,uint160,int128)'(sqrtRatioAX96: GetAmount1DeltaParams_0["sqrtRatioAX96"], sqrtRatioBX96: GetAmount1DeltaParams_0["sqrtRatioBX96"], liquidity: GetAmount1DeltaParams_0["liquidity"]) {
        return this.eth_call(functions['getAmount1Delta(uint160,uint160,int128)'], {sqrtRatioAX96, sqrtRatioBX96, liquidity})
    }

    'getAmount1Delta(uint160,uint160,uint128,bool)'(sqrtRatioAX96: GetAmount1DeltaParams_1["sqrtRatioAX96"], sqrtRatioBX96: GetAmount1DeltaParams_1["sqrtRatioBX96"], liquidity: GetAmount1DeltaParams_1["liquidity"], roundUp: GetAmount1DeltaParams_1["roundUp"]) {
        return this.eth_call(functions['getAmount1Delta(uint160,uint160,uint128,bool)'], {sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp})
    }

    getAmountsForLiquidity(sqrtRatioX96: GetAmountsForLiquidityParams["sqrtRatioX96"], sqrtRatioAX96: GetAmountsForLiquidityParams["sqrtRatioAX96"], sqrtRatioBX96: GetAmountsForLiquidityParams["sqrtRatioBX96"], liquidity: GetAmountsForLiquidityParams["liquidity"]) {
        return this.eth_call(functions.getAmountsForLiquidity, {sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96, liquidity})
    }

    getLiquidityForAmounts(amount0: GetLiquidityForAmountsParams["amount0"], amount1: GetLiquidityForAmountsParams["amount1"], sqrtRatioX96: GetLiquidityForAmountsParams["sqrtRatioX96"], sqrtRatioAX96: GetLiquidityForAmountsParams["sqrtRatioAX96"], sqrtRatioBX96: GetLiquidityForAmountsParams["sqrtRatioBX96"]) {
        return this.eth_call(functions.getLiquidityForAmounts, {amount0, amount1, sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96})
    }

    getPopulatedTicks(pool: GetPopulatedTicksParams["pool"], startTick: GetPopulatedTicksParams["startTick"]) {
        return this.eth_call(functions.getPopulatedTicks, {pool, startTick})
    }

    getSqrtRatioAtTick(tick: GetSqrtRatioAtTickParams["tick"]) {
        return this.eth_call(functions.getSqrtRatioAtTick, {tick})
    }

    getTickAtSqrtRatio(sqrtPriceX96: GetTickAtSqrtRatioParams["sqrtPriceX96"]) {
        return this.eth_call(functions.getTickAtSqrtRatio, {sqrtPriceX96})
    }

    poolFees(pool: PoolFeesParams["pool"], liquidity: PoolFeesParams["liquidity"], tickCurrent: PoolFeesParams["tickCurrent"], tickLower: PoolFeesParams["tickLower"], tickUpper: PoolFeesParams["tickUpper"]) {
        return this.eth_call(functions.poolFees, {pool, liquidity, tickCurrent, tickLower, tickUpper})
    }

    principal(positionManager: PrincipalParams["positionManager"], tokenId: PrincipalParams["tokenId"], sqrtRatioX96: PrincipalParams["sqrtRatioX96"]) {
        return this.eth_call(functions.principal, {positionManager, tokenId, sqrtRatioX96})
    }
}

/// Function types
export type EstimateAmount0Params = FunctionArguments<typeof functions.estimateAmount0>
export type EstimateAmount0Return = FunctionReturn<typeof functions.estimateAmount0>

export type EstimateAmount1Params = FunctionArguments<typeof functions.estimateAmount1>
export type EstimateAmount1Return = FunctionReturn<typeof functions.estimateAmount1>

export type FeesParams = FunctionArguments<typeof functions.fees>
export type FeesReturn = FunctionReturn<typeof functions.fees>

export type GetAmount0DeltaParams_0 = FunctionArguments<typeof functions['getAmount0Delta(uint160,uint160,uint128,bool)']>
export type GetAmount0DeltaReturn_0 = FunctionReturn<typeof functions['getAmount0Delta(uint160,uint160,uint128,bool)']>

export type GetAmount0DeltaParams_1 = FunctionArguments<typeof functions['getAmount0Delta(uint160,uint160,int128)']>
export type GetAmount0DeltaReturn_1 = FunctionReturn<typeof functions['getAmount0Delta(uint160,uint160,int128)']>

export type GetAmount1DeltaParams_0 = FunctionArguments<typeof functions['getAmount1Delta(uint160,uint160,int128)']>
export type GetAmount1DeltaReturn_0 = FunctionReturn<typeof functions['getAmount1Delta(uint160,uint160,int128)']>

export type GetAmount1DeltaParams_1 = FunctionArguments<typeof functions['getAmount1Delta(uint160,uint160,uint128,bool)']>
export type GetAmount1DeltaReturn_1 = FunctionReturn<typeof functions['getAmount1Delta(uint160,uint160,uint128,bool)']>

export type GetAmountsForLiquidityParams = FunctionArguments<typeof functions.getAmountsForLiquidity>
export type GetAmountsForLiquidityReturn = FunctionReturn<typeof functions.getAmountsForLiquidity>

export type GetLiquidityForAmountsParams = FunctionArguments<typeof functions.getLiquidityForAmounts>
export type GetLiquidityForAmountsReturn = FunctionReturn<typeof functions.getLiquidityForAmounts>

export type GetPopulatedTicksParams = FunctionArguments<typeof functions.getPopulatedTicks>
export type GetPopulatedTicksReturn = FunctionReturn<typeof functions.getPopulatedTicks>

export type GetSqrtRatioAtTickParams = FunctionArguments<typeof functions.getSqrtRatioAtTick>
export type GetSqrtRatioAtTickReturn = FunctionReturn<typeof functions.getSqrtRatioAtTick>

export type GetTickAtSqrtRatioParams = FunctionArguments<typeof functions.getTickAtSqrtRatio>
export type GetTickAtSqrtRatioReturn = FunctionReturn<typeof functions.getTickAtSqrtRatio>

export type PoolFeesParams = FunctionArguments<typeof functions.poolFees>
export type PoolFeesReturn = FunctionReturn<typeof functions.poolFees>

export type PrincipalParams = FunctionArguments<typeof functions.principal>
export type PrincipalReturn = FunctionReturn<typeof functions.principal>

