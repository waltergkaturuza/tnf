-- Organized Supabase Storage paths for Media.
-- Run in Supabase SQL editor if migrate is not applied automatically.

ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "folder" varchar DEFAULT 'media';
ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "storage_category" varchar;
ALTER TABLE "tnf"."media" ADD COLUMN IF NOT EXISTS "prefix" varchar;
