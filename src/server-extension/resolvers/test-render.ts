import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
class TestRenderResult {
  @Field()
  ok!: boolean

  @Field()
  rendererId!: string

  @Field()
  matchType!: string

  @Field()
  recordId!: string

  @Field({ nullable: true })
  txHash?: string

  @Field({ nullable: true })
  data?: string
}

@Resolver()
export class TestRenderResolver {
  @Query(() => TestRenderResult)
  async testRenderer(
    @Arg('rendererId') rendererId: string,
    @Arg('token') token: string,
    @Arg('data', { nullable: true }) data?: string,
    @Arg('title', { nullable: true }) title?: string,
    @Arg('description', { nullable: true }) description?: string,
  ): Promise<TestRenderResult> {
    const expected = process.env.SQUID_TEST_RENDER_TOKEN
    if (!expected || token !== expected) {
      throw new Error('Unauthorized')
    }

    let parsedData: Record<string, unknown> | undefined
    if (data) {
      try {
        parsedData = JSON.parse(data, (_key, value) => {
          if (typeof value === 'string' && /^-?\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1))
          }
          return value
        })
      } catch {
        throw new Error('Invalid JSON in data argument')
      }
    }

    const { sendRendererTestAlert } = await import('../../test-render/service')
    const result = await sendRendererTestAlert(rendererId, {
      data: parsedData,
      title: title ?? undefined,
      description: description ?? undefined,
    })
    return {
      ok: true,
      rendererId: result.rendererId,
      matchType: result.matchType,
      recordId: result.recordId,
      txHash: result.txHash ?? undefined,
      data: result.data
        ? JSON.stringify(
            result.data,
            (_key, item) => (typeof item === 'bigint' ? `${item.toString()}n` : item),
            2,
          )
        : undefined,
    }
  }
}
