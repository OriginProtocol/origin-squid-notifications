import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, DateTimeColumn as DateTimeColumn_, Index as Index_, IntColumn as IntColumn_, StringColumn as StringColumn_, JSONColumn as JSONColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class EventRecord {
    constructor(props?: Partial<EventRecord>) {
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
    @StringColumn_({nullable: false})
    contractAddress!: string

    @Index_()
    @StringColumn_({nullable: false})
    topic0!: string

    @Index_()
    @StringColumn_({nullable: true})
    topic1!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    topic2!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    topic3!: string | undefined | null

    @StringColumn_({nullable: true})
    data!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: false})
    txHash!: string

    @Index_()
    @StringColumn_({nullable: false})
    txFrom!: string

    @Index_()
    @StringColumn_({nullable: true})
    txTo!: string | undefined | null

    @IntColumn_({nullable: false})
    txIndex!: number

    @IntColumn_({nullable: false})
    logIndex!: number

    @JSONColumn_({nullable: true})
    decodedData!: unknown | undefined | null
}
