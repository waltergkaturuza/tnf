import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "tnf"."enum_form_submissions_location_scope" AS ENUM('zimbabwe', 'international');

    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "phone" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "organisation" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "age_range" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "gender" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "location_scope" "tnf"."enum_form_submissions_location_scope";
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "province" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "city_or_area" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "country" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "date_of_incident" timestamp(3) with time zone;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "preferred_contact" varchar;
    ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "anonymous" boolean DEFAULT false;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "phone";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "organisation";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "age_range";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "gender";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "location_scope";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "province";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "city_or_area";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "country";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "date_of_incident";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "preferred_contact";
    ALTER TABLE "tnf"."form_submissions" DROP COLUMN IF EXISTS "anonymous";

    DROP TYPE IF EXISTS "tnf"."enum_form_submissions_location_scope";
  `);
}
