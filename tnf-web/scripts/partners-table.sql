-- Run in Supabase SQL Editor if payload migrate has not been applied yet.
CREATE TYPE "tnf"."enum_partners_status" AS ENUM('draft', 'published');

CREATE TABLE IF NOT EXISTS "tnf"."partners" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "logo_id" integer NOT NULL,
  "website_url" varchar,
  "sort_order" numeric DEFAULT 0,
  "status" "tnf"."enum_partners_status" DEFAULT 'draft',
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "tnf"."partners"
  ADD CONSTRAINT "partners_logo_id_media_id_fk"
  FOREIGN KEY ("logo_id") REFERENCES "tnf"."media"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
