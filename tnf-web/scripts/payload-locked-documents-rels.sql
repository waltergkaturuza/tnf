-- Fix Payload document locks after Partners + Analytics collections were added.
-- Run in Supabase → SQL Editor, then retry the Media / Resource upload.

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
