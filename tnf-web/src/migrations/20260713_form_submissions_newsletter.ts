import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "tnf"."enum_form_submissions_type" ADD VALUE 'newsletter';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await db.execute(sql`
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "summary" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "summary";
  `);
}
