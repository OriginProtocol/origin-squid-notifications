import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, DateTimeColumn as DateTimeColumn_, Index as Index_, IntColumn as IntColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_, BigIntColumn as BigIntColumn_, JSONColumn as JSONColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TraceRecord {
    constructor(props?: Partial<TraceRecord>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number

    @StringColumn_({nullable: false})
    blockHash!: string

    @Index_()
    @IntColumn_({nullable: false})
    chainId!: number

    @Index_()
    @StringColumn_({nullable: true})
    txHash!: string | undefined | null

    @IntColumn_({nullable: true})
    txIndex!: number | undefined | null

    @BooleanColumn_({nullable: true})
    txSuccess!: boolean | undefined | null

    @Index_()
    @StringColumn_({nullable: false})
    type!: string

    @Index_()
    @StringColumn_({nullable: true})
    callType!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    fromAddress!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    toAddress!: string | undefined | null

    @StringColumn_({nullable: true})
    value!: string | undefined | null

    @BigIntColumn_({nullable: true})
    gas!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    gasUsed!: bigint | undefined | null

    @StringColumn_({nullable: true})
    input!: string | undefined | null

    @StringColumn_({nullable: true})
    output!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    sighash!: string | undefined | null

    @IntColumn_({array: true, nullable: false})
    traceAddress!: (number)[]

    @IntColumn_({nullable: false})
    subtraces!: number

    @BooleanColumn_({nullable: true})
    success!: boolean | undefined | null

    @StringColumn_({nullable: true})
    error!: string | undefined | null

    @StringColumn_({nullable: true})
    revertReason!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    createdAddress!: string | undefined | null

    @StringColumn_({nullable: true})
    refundAddress!: string | undefined | null

    @JSONColumn_({nullable: true})
    decodedInput!: unknown | undefined | null

    @JSONColumn_({nullable: true})
    decodedOutput!: unknown | undefined | null
}
