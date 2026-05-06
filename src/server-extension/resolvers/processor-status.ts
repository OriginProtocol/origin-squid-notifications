import { Field, Int, ObjectType, Query, Resolver } from 'type-graphql'

import { getSquidDbPool } from '../../test-render/db'

// Schemas match the `stateSchema` values in src/main.ts, src/main-base.ts,
// src/main-sonic.ts, src/main-hyperliquid.ts. Chain IDs match the `chainId`
// passed to `run()` in those files.
const PROCESSORS: Array<{ schema: string; chainId: number }> = [
  { schema: 'mainnet', chainId: 1 },
  { schema: 'base', chainId: 8453 },
  { schema: 'sonic', chainId: 146 },
  { schema: 'hyperliquid', chainId: 999 },
]

@ObjectType()
class ProcessorStatus {
  @Field()
  schema!: string

  @Field(() => Int)
  chainId!: number

  // Latest indexed head (max of finalized status.height and hot_block.height).
  // -1 indicates no blocks have been processed yet.
  @Field(() => Int)
  height!: number

  // Finalized head from `${schema}.status.height`.
  @Field(() => Int)
  finalizedHeight!: number

  // True if both the status table and any expected hot_block rows are present.
  @Field()
  ready!: boolean

  @Field({ nullable: true })
  error?: string
}

@Resolver()
export class ProcessorStatusResolver {
  @Query(() => [ProcessorStatus])
  async processorStatus(): Promise<ProcessorStatus[]> {
    const pool = getSquidDbPool()
    return Promise.all(
      PROCESSORS.map(async ({ schema, chainId }) => {
        try {
          const statusResult = await pool.query<{ height: number }>(
            `SELECT height FROM "${schema}"."status" WHERE id = 0`,
          )
          if (statusResult.rowCount === 0) {
            return {
              schema,
              chainId,
              height: -1,
              finalizedHeight: -1,
              ready: false,
              error: 'status row missing',
            }
          }
          const finalizedHeight = Number(statusResult.rows[0].height)
          const hotResult = await pool.query<{ height: number | null }>(
            `SELECT MAX(height) AS height FROM "${schema}"."hot_block"`,
          )
          const hotHeight =
            hotResult.rows[0]?.height != null
              ? Number(hotResult.rows[0].height)
              : -1
          const height = Math.max(finalizedHeight, hotHeight)
          return {
            schema,
            chainId,
            height,
            finalizedHeight,
            ready: true,
          }
        } catch (err) {
          return {
            schema,
            chainId,
            height: -1,
            finalizedHeight: -1,
            ready: false,
            error: err instanceof Error ? err.message : 'unknown error',
          }
        }
      }),
    )
  }
}
