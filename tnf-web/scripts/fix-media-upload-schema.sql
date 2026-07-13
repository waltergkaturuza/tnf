-- TNF: fix Media upload schema gaps (run once in Supabase SQL Editor)
-- Covers: media folder columns + locked-document relation columns for partners/analytics

-- ── 1) Media storage folder fields ──────────────────────────────────────────
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

-- If "folder" already exists as varchar from an earlier attempt, convert it.
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'tnf' AND table_name = 'media' AND column_name = 'folder'
      AND data_type = 'character varying'
  ) THEN
    ALTER TABLE "tnf"."media"
      ALTER COLUMN "folder" DROP DEFAULT;
    ALTER TABLE "tnf"."media"
      ALTER COLUMN "folder" TYPE "tnf"."enum_media_folder"
      USING (
        CASE
          WHEN "folder" IN (
            'media','resources','feedback','whistleblower',
            'contact','partners','news','events'
          ) THEN "folder"::"tnf"."enum_media_folder"
          ELSE 'media'::"tnf"."enum_media_folder"
        END
      );
    ALTER TABLE "tnf"."media"
      ALTER COLUMN "folder" SET DEFAULT 'media'::"tnf"."enum_media_folder";
  END IF;
END $$;

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "folder" "tnf"."enum_media_folder" DEFAULT 'media';

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "storage_category" varchar;

ALTER TABLE "tnf"."media"
  ADD COLUMN IF NOT EXISTS "prefix" varchar;

UPDATE "tnf"."media"
SET "folder" = 'media'
WHERE "folder" IS NULL;

-- ── 2) Locked documents rels for Partners + Analytics ───────────────────────
ALTER TABLE "tnf"."payload_locked_documents_rels"
  ADD COLUMN IF NOT EXISTS "partners_id" integer;

ALTER TABLE "tnf"."payload_locked_documents_rels"
  ADD COLUMN IF NOT EXISTS "analytics_events_id" integer;

DO $$ BEGIN
  ALTER TABLE "tnf"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_partners_fk"
    FOREIGN KEY ("partners_id") REFERENCES "tnf"."partners"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "tnf"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_analytics_events_fk"
    FOREIGN KEY ("analytics_events_id") REFERENCES "tnf"."analytics_events"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partners_id_idx"
  ON "tnf"."payload_locked_documents_rels" USING btree ("partners_id");

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_analytics_events_id_idx"
  ON "tnf"."payload_locked_documents_rels" USING btree ("analytics_events_id");
