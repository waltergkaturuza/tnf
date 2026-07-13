-- Newsletter type + summary label for Form Submissions
-- Run in Supabase SQL Editor if not using payload:migrate

DO $$ BEGIN
  ALTER TYPE "tnf"."enum_form_submissions_type" ADD VALUE 'newsletter';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "tnf"."form_submissions" ADD COLUMN IF NOT EXISTS "summary" varchar;
