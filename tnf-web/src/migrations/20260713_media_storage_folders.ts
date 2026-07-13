import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "tnf"."enum_media_folder" AS ENUM (
        'media',
        'resources',
        'feedback',
        'whistleblower',
        'contact',
        'partners',
        'news',
        'events'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await db.execute(sql`
    ALTER TABLE "tnf"."media"
      ADD COLUMN IF NOT EXISTS "folder" "tnf"."enum_media_folder" DEFAULT 'media';
  `);

  await db.execute(sql`
    ALTER TABLE "tnf"."media"
      ADD COLUMN IF NOT EXISTS "storage_category" varchar;
  `);

  await db.execute(sql`
    ALTER TABLE "tnf"."media"
      ADD COLUMN IF NOT EXISTS "prefix" varchar;
  `);

  await db.execute(sql`
    UPDATE "tnf"."media" SET "folder" = 'media' WHERE "folder" IS NULL;
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
  await db.execute(sql`
    DROP TYPE IF EXISTS "tnf"."enum_media_folder";
  `);
}
