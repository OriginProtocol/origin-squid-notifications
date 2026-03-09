import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class NotificationLog {
    constructor(props?: Partial<NotificationLog>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    recordId!: string

    @Index_()
    @StringColumn_({nullable: false})
    recordType!: string

    @Index_()
    @StringColumn_({nullable: true})
    processor!: string | undefined | null

    @Index_()
    @DateTimeColumn_({nullable: false})
    notifiedAt!: Date

    @Index_()
    @IntColumn_({nullable: false})
    chainId!: number

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number
}
