-- Run once in Supabase SQL Editor (or psql) before first Payload migrate.
-- Creates an isolated schema so TNF tables live alongside other apps in the same database.

CREATE SCHEMA IF NOT EXISTS tnf;

-- Allow the postgres role (Supabase service) full access to the tnf schema
GRANT USAGE ON SCHEMA tnf TO postgres;
GRANT ALL ON SCHEMA tnf TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA tnf TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA tnf TO postgres;

-- Default privileges for future Payload migrations
ALTER DEFAULT PRIVILEGES IN SCHEMA tnf
  GRANT ALL ON TABLES TO postgres;

ALTER DEFAULT PRIVILEGES IN SCHEMA tnf
  GRANT ALL ON SEQUENCES TO postgres;
