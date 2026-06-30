import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "tnf"."enum_analytics_events_event_type" AS ENUM('page_view', 'resource_download');
    CREATE TYPE "tnf"."enum_analytics_events_device_type" AS ENUM('desktop', 'mobile', 'tablet', 'unknown');

    CREATE TABLE IF NOT EXISTS "tnf"."analytics_events" (
      "id" serial PRIMARY KEY NOT NULL,
      "event_type" "tnf"."enum_analytics_events_event_type" NOT NULL,
      "path" varchar NOT NULL,
      "resource_label" varchar,
      "device_type" "tnf"."enum_analytics_events_device_type" DEFAULT 'unknown' NOT NULL,
      "session_id" varchar NOT NULL,
      "user_agent" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "analytics_events_event_type_idx" ON "tnf"."analytics_events" ("event_type");
    CREATE INDEX IF NOT EXISTS "analytics_events_path_idx" ON "tnf"."analytics_events" ("path");
    CREATE INDEX IF NOT EXISTS "analytics_events_device_type_idx" ON "tnf"."analytics_events" ("device_type");
    CREATE INDEX IF NOT EXISTS "analytics_events_session_id_idx" ON "tnf"."analytics_events" ("session_id");
    CREATE INDEX IF NOT EXISTS "analytics_events_created_at_idx" ON "tnf"."analytics_events" ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "tnf"."analytics_events";
    DROP TYPE IF EXISTS "tnf"."enum_analytics_events_device_type";
    DROP TYPE IF EXISTS "tnf"."enum_analytics_events_event_type";
  `);
}
