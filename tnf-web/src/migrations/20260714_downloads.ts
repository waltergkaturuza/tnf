import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "tnf"."enum_downloads_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "tnf"."downloads" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "file_id" integer NOT NULL,
      "sort_order" numeric DEFAULT 0,
      "status" "tnf"."enum_downloads_status" DEFAULT 'draft',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "downloads_slug_idx"
      ON "tnf"."downloads" ("slug");
    CREATE INDEX IF NOT EXISTS "downloads_status_idx"
      ON "tnf"."downloads" ("status");
    CREATE INDEX IF NOT EXISTS "downloads_sort_order_idx"
      ON "tnf"."downloads" ("sort_order");
    CREATE INDEX IF NOT EXISTS "downloads_file_idx"
      ON "tnf"."downloads" ("file_id");

    DO $$ BEGIN
      ALTER TABLE "tnf"."downloads"
        ADD CONSTRAINT "downloads_file_id_media_id_fk"
        FOREIGN KEY ("file_id") REFERENCES "tnf"."media"("id")
        ON DELETE RESTRICT ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "tnf"."payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "downloads_id" integer;

    DO $$ BEGIN
      ALTER TABLE "tnf"."payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk"
        FOREIGN KEY ("downloads_id") REFERENCES "tnf"."downloads"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_downloads_id_idx"
      ON "tnf"."payload_locked_documents_rels" USING btree ("downloads_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_downloads_fk";
    DROP INDEX IF EXISTS "tnf"."payload_locked_documents_rels_downloads_id_idx";
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "downloads_id";

    DROP TABLE IF EXISTS "tnf"."downloads";
    DROP TYPE IF EXISTS "tnf"."enum_downloads_status";
  `);
}
