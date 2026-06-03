-- Optional: run in Supabase SQL Editor if `npm run payload:migrate` cannot be run locally.
-- Schema: tnf (see POSTGRES_SCHEMA). Safe to re-run (IF NOT EXISTS).

CREATE TYPE "tnf"."enum_form_submissions_location_scope" AS ENUM ('zimbabwe', 'international');

ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "phone" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "organisation" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "age_range" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "gender" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "location_scope" "tnf"."enum_form_submissions_location_scope";
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "province" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "city_or_area" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "country" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "date_of_incident" timestamptz;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "preferred_contact" varchar;
ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "anonymous" boolean DEFAULT false;
