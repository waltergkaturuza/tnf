import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "partners_id" integer;

    ALTER TABLE "tnf"."payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "analytics_events_id" integer;

    DO $$ BEGIN
      ALTER TABLE "tnf"."payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_partners_fk"
        FOREIGN KEY ("partners_id") REFERENCES "tnf"."partners"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "tnf"."payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_analytics_events_fk"
        FOREIGN KEY ("analytics_events_id") REFERENCES "tnf"."analytics_events"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partners_id_idx"
      ON "tnf"."payload_locked_documents_rels" USING btree ("partners_id");

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_analytics_events_id_idx"
      ON "tnf"."payload_locked_documents_rels" USING btree ("analytics_events_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_partners_fk";
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_analytics_events_fk";
    DROP INDEX IF EXISTS "tnf"."payload_locked_documents_rels_partners_id_idx";
    DROP INDEX IF EXISTS "tnf"."payload_locked_documents_rels_analytics_events_id_idx";
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "partners_id";
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "analytics_events_id";
  `);
}
