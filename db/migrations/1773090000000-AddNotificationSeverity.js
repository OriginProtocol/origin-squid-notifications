module.exports = class AddNotificationSeverity1773090000000 {
    name = 'AddNotificationSeverity1773090000000'

    async up(db) {
        await db.query(`ALTER TABLE "notification_log" ADD "severity" text`)
        await db.query(`ALTER TABLE "notification_log" ADD "topic" text`)
        await db.query(`ALTER TABLE "notification_log" ADD "rule_id" text`)
        await db.query(`CREATE INDEX "IDX_notification_log_severity" ON "notification_log" ("severity") `)
        await db.query(`CREATE INDEX "IDX_notification_log_topic" ON "notification_log" ("topic") `)
        await db.query(`CREATE INDEX "IDX_notification_log_rule_id" ON "notification_log" ("rule_id") `)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_notification_log_rule_id"`)
        await db.query(`DROP INDEX "public"."IDX_notification_log_topic"`)
        await db.query(`DROP INDEX "public"."IDX_notification_log_severity"`)
        await db.query(`ALTER TABLE "notification_log" DROP COLUMN "rule_id"`)
        await db.query(`ALTER TABLE "notification_log" DROP COLUMN "topic"`)
        await db.query(`ALTER TABLE "notification_log" DROP COLUMN "severity"`)
    }
}
