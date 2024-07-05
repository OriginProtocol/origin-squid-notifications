module.exports = class Data1720197526637 {
    name = 'Data1720197526637'

    async up(db) {
        await db.query(`CREATE TABLE "notification" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "message" text NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_11dc844140ebbb7a2f36777e0a" ON "notification" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_5d87e7dd0668d4e2c59a82a3d6" ON "notification" ("block_number") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "notification"`)
        await db.query(`DROP INDEX "public"."IDX_11dc844140ebbb7a2f36777e0a"`)
        await db.query(`DROP INDEX "public"."IDX_5d87e7dd0668d4e2c59a82a3d6"`)
    }
}
