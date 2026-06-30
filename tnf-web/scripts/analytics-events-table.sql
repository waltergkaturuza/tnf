-- Analytics events table (run in Supabase if not using payload:migrate)
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

CREATE INDEX IF NOT EXISTS "analytics_events_created_at_idx" ON "tnf"."analytics_events" ("created_at");
