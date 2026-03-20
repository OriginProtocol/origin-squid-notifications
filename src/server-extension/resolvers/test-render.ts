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
}

@Resolver()
export class TestRenderResolver {
  @Query(() => TestRenderResult)
  async testRenderer(
    @Arg('rendererId') rendererId: string,
    @Arg('token') token: string,
    @Arg('data', { nullable: true }) data?: string,
  ): Promise<TestRenderResult> {
    const expected = process.env.SQUID_TEST_RENDER_TOKEN
    if (!expected || token !== expected) {
      throw new Error('Unauthorized')
    }

    let parsedData: Record<string, unknown> | undefined
    if (data) {
      try {
        parsedData = JSON.parse(data)
      } catch {
        throw new Error('Invalid JSON in data argument')
      }
    }

    const { sendRendererTestAlert } = await import('../../test-render/service')
    const result = await sendRendererTestAlert(rendererId, parsedData)
    return {
      ok: true,
      rendererId: result.rendererId,
      matchType: result.matchType,
      recordId: result.recordId,
      txHash: result.txHash ?? undefined,
    }
  }
}
