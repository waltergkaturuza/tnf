-- Add partners.slug (run in Supabase if not using payload:migrate)
ALTER TABLE "tnf"."partners" ADD COLUMN IF NOT EXISTS "slug" varchar;

UPDATE "tnf"."partners"
SET "slug" = lower(regexp_replace(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
WHERE "slug" IS NULL OR "slug" = '';

CREATE UNIQUE INDEX IF NOT EXISTS "partners_slug_idx" ON "tnf"."partners" USING btree ("slug");
