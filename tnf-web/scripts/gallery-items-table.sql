-- Run in Supabase SQL Editor if payload migrate has not been applied yet.
-- Creates Gallery CMS table + locked-documents relation column.

DO $$ BEGIN
  CREATE TYPE "tnf"."enum_gallery_items_status" AS ENUM('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "tnf"."gallery_items" (
  "id" serial PRIMARY KEY NOT NULL,
  "caption" varchar NOT NULL,
  "image_id" integer NOT NULL,
  "alt" varchar,
  "link_url" varchar,
  "sort_order" numeric DEFAULT 0,
  "status" "tnf"."enum_gallery_items_status" DEFAULT 'draft',
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "tnf"."gallery_items"
    ADD CONSTRAINT "gallery_items_image_id_media_id_fk"
    FOREIGN KEY ("image_id") REFERENCES "tnf"."media"("id")
    ON DELETE RESTRICT ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "gallery_items_status_idx"
  ON "tnf"."gallery_items" ("status");
CREATE INDEX IF NOT EXISTS "gallery_items_sort_order_idx"
  ON "tnf"."gallery_items" ("sort_order");
CREATE INDEX IF NOT EXISTS "gallery_items_image_idx"
  ON "tnf"."gallery_items" ("image_id");

ALTER TABLE "tnf"."payload_locked_documents_rels"
  ADD COLUMN IF NOT EXISTS "gallery_items_id" integer;

DO $$ BEGIN
  ALTER TABLE "tnf"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk"
    FOREIGN KEY ("gallery_items_id") REFERENCES "tnf"."gallery_items"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_items_id_idx"
  ON "tnf"."payload_locked_documents_rels" USING btree ("gallery_items_id");

-- Optional: Media folder value for gallery uploads (skip if enum type missing)
DO $$ BEGIN
  ALTER TYPE "tnf"."enum_media_folder" ADD VALUE IF NOT EXISTS 'gallery';
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
