import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "tnf"."enum_vacancies_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "tnf"."vacancies" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "reporting_to" varchar,
      "intro" varchar,
      "responsibilities" varchar,
      "qualifications" varchar,
      "skills" varchar,
      "application_procedure" varchar,
      "delivery_address" varchar DEFAULT 'The Executive Director
Tripartite Negotiating Forum
Block 3, Third Floor, Celestial Park
Borrowdale, Harare.',
      "application_email" varchar,
      "notice" varchar DEFAULT 'Only shortlisted candidates will be contacted.',
      "advert_file_id" integer,
      "closing_date" timestamp(3) with time zone NOT NULL,
      "status" "tnf"."enum_vacancies_status" DEFAULT 'draft',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "vacancies_slug_idx"
      ON "tnf"."vacancies" ("slug");
    CREATE INDEX IF NOT EXISTS "vacancies_advert_file_idx"
      ON "tnf"."vacancies" ("advert_file_id");
    CREATE INDEX IF NOT EXISTS "vacancies_updated_at_idx"
      ON "tnf"."vacancies" ("updated_at");
    CREATE INDEX IF NOT EXISTS "vacancies_created_at_idx"
      ON "tnf"."vacancies" ("created_at");

    DO $$ BEGIN
      ALTER TABLE "tnf"."vacancies"
        ADD CONSTRAINT "vacancies_advert_file_id_media_id_fk"
        FOREIGN KEY ("advert_file_id") REFERENCES "tnf"."media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "tnf"."payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "vacancies_id" integer;

    DO $$ BEGIN
      ALTER TABLE "tnf"."payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk"
        FOREIGN KEY ("vacancies_id") REFERENCES "tnf"."vacancies"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_vacancies_id_idx"
      ON "tnf"."payload_locked_documents_rels" USING btree ("vacancies_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_vacancies_fk";
    DROP INDEX IF EXISTS "tnf"."payload_locked_documents_rels_vacancies_id_idx";
    ALTER TABLE "tnf"."payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "vacancies_id";

    DROP TABLE IF EXISTS "tnf"."vacancies";
    DROP TYPE IF EXISTS "tnf"."enum_vacancies_status";
  `);
}
