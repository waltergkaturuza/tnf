import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "tnf"."enum_resources_category" ADD VALUE 'annual-performance-plan';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "tnf"."enum_resources_category" ADD VALUE 'tnf-reports-plans';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Postgres cannot easily remove enum values; leave as no-op.
}
