import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_} from "@subsquid/typeorm-store"

@Entity_()
export class AbiData {
    constructor(props?: Partial<AbiData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    type!: string

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: true})
    signature!: string | undefined | null
}
