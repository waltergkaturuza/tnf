-- Required for Media uploads with organized Storage folders.
-- Run this in Supabase → SQL Editor, then retry uploading a Resource document.

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

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "folder" "tnf"."enum_media_folder" DEFAULT 'media';

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "storage_category" varchar;

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "prefix" varchar;

-- Backfill existing rows
UPDATE "tnf"."media"
SET "folder" = 'media'
WHERE "folder" IS NULL;
