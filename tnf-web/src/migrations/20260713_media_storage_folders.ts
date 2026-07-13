import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "folder" varchar DEFAULT 'media';
  `);
  await db.execute(sql`
    ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "storage_category" varchar;
  `);
  await db.execute(sql`
    ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "prefix" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."media" DROP COLUMN IF EXISTS "folder";
  `);
  await db.execute(sql`
    ALTER TABLE "tnf"."media" DROP COLUMN IF EXISTS "storage_category";
  `);
  await db.execute(sql`
    ALTER TABLE "tnf"."media" DROP COLUMN IF EXISTS "prefix";
  `);
}
