-- Run in Supabase SQL Editor if payload migrate has not been applied yet.
-- Creates the Consultation Questions table (admin-managed questions for the
-- public Feedback Portal) and adds a question column to form submissions.

DO $$ BEGIN
  CREATE TYPE "tnf"."enum_consultation_questions_form" AS ENUM(
    'all', 'feedback-economic', 'feedback-social', 'feedback-labour'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "tnf"."enum_consultation_questions_status" AS ENUM(
    'draft', 'active', 'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "tnf"."consultation_questions" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar NOT NULL,
  "intro" varchar,
  "question" varchar NOT NULL,
  "form" "tnf"."enum_consultation_questions_form" DEFAULT 'all' NOT NULL,
  "closing_date" timestamp(3) with time zone,
  "status" "tnf"."enum_consultation_questions_status" DEFAULT 'draft' NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "consultation_questions_status_idx"
  ON "tnf"."consultation_questions" ("status");
CREATE INDEX IF NOT EXISTS "consultation_questions_form_idx"
  ON "tnf"."consultation_questions" ("form");

-- Record which question a feedback submission answered
ALTER TABLE "tnf"."form_submissions"
  ADD COLUMN IF NOT EXISTS "question" varchar;

ALTER TABLE "tnf"."payload_locked_documents_rels"
  ADD COLUMN IF NOT EXISTS "consultation_questions_id" integer;

DO $$ BEGIN
  ALTER TABLE "tnf"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_consultation_questions_fk"
    FOREIGN KEY ("consultation_questions_id") REFERENCES "tnf"."consultation_questions"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_consultation_questions_id_idx"
  ON "tnf"."payload_locked_documents_rels" USING btree ("consultation_questions_id");
