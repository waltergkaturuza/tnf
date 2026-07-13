import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."partners" ADD COLUMN IF NOT EXISTS "slug" varchar;

    UPDATE "tnf"."partners"
    SET "slug" = lower(regexp_replace(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
    WHERE "slug" IS NULL OR "slug" = '';

    CREATE UNIQUE INDEX IF NOT EXISTS "partners_slug_idx" ON "tnf"."partners" USING btree ("slug");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "tnf"."partners_slug_idx";
    ALTER TABLE "tnf"."partners" DROP COLUMN IF EXISTS "slug";
  `);
}
