import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "tnf"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "tnf"."enum_events_status" AS ENUM('draft', 'published', 'past');
  CREATE TYPE "tnf"."enum_resources_category" AS ENUM('annual-report', 'strategic-plan', 'policy-paper', 'press-release', 'other');
  CREATE TYPE "tnf"."enum_resources_status" AS ENUM('draft', 'published');
  CREATE TYPE "tnf"."enum_form_submissions_type" AS ENUM('contact', 'feedback-economic', 'feedback-social', 'feedback-labour', 'whistleblower');
  CREATE TABLE "tnf"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "tnf"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "tnf"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "tnf"."posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"status" "tnf"."enum_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"registration_url" varchar,
  	"featured_image_id" integer,
  	"status" "tnf"."enum_events_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"category" "tnf"."enum_resources_category" NOT NULL,
  	"year" varchar,
  	"document_id" integer NOT NULL,
  	"status" "tnf"."enum_resources_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "tnf"."enum_form_submissions_type" NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"subject" varchar,
  	"message" varchar,
  	"category" varchar,
  	"metadata" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "tnf"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"posts_id" integer,
  	"events_id" integer,
  	"resources_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "tnf"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tnf"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "tnf"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "tnf"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "tnf"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "tnf"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tnf"."events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "tnf"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tnf"."resources" ADD CONSTRAINT "resources_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "tnf"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "tnf"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "tnf"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "tnf"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "tnf"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "tnf"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "tnf"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "tnf"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "tnf"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tnf"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "tnf"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "tnf"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "tnf"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "tnf"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "tnf"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "tnf"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "tnf"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "tnf"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "tnf"."media" USING btree ("filename");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "tnf"."posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "tnf"."posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "tnf"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "tnf"."posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_slug_idx" ON "tnf"."events" USING btree ("slug");
  CREATE INDEX "events_featured_image_idx" ON "tnf"."events" USING btree ("featured_image_id");
  CREATE INDEX "events_updated_at_idx" ON "tnf"."events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "tnf"."events" USING btree ("created_at");
  CREATE UNIQUE INDEX "resources_slug_idx" ON "tnf"."resources" USING btree ("slug");
  CREATE INDEX "resources_document_idx" ON "tnf"."resources" USING btree ("document_id");
  CREATE INDEX "resources_updated_at_idx" ON "tnf"."resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "tnf"."resources" USING btree ("created_at");
  CREATE INDEX "form_submissions_updated_at_idx" ON "tnf"."form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "tnf"."form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "tnf"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "tnf"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "tnf"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "tnf"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "tnf"."payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "tnf"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "tnf"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "tnf"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "tnf"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "tnf"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "tnf"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "tnf"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "tnf"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "tnf"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tnf"."users_sessions" CASCADE;
  DROP TABLE "tnf"."users" CASCADE;
  DROP TABLE "tnf"."media" CASCADE;
  DROP TABLE "tnf"."posts" CASCADE;
  DROP TABLE "tnf"."events" CASCADE;
  DROP TABLE "tnf"."resources" CASCADE;
  DROP TABLE "tnf"."form_submissions" CASCADE;
  DROP TABLE "tnf"."payload_kv" CASCADE;
  DROP TABLE "tnf"."payload_locked_documents" CASCADE;
  DROP TABLE "tnf"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "tnf"."payload_preferences" CASCADE;
  DROP TABLE "tnf"."payload_preferences_rels" CASCADE;
  DROP TABLE "tnf"."payload_migrations" CASCADE;
  DROP TYPE "tnf"."enum_posts_status";
  DROP TYPE "tnf"."enum_events_status";
  DROP TYPE "tnf"."enum_resources_category";
  DROP TYPE "tnf"."enum_resources_status";
  DROP TYPE "tnf"."enum_form_submissions_type";`)
}
