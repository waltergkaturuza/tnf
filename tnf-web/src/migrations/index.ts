import * as migration_20260526_102131_initial from "./20260526_102131_initial";
import * as migration_20260603_form_submissions_feedback_fields from "./20260603_form_submissions_feedback_fields";
import * as migration_20260629_partners from "./20260629_partners";
import * as migration_20260630_analytics_events from "./20260630_analytics_events";
import * as migration_20260713_resources_categories from "./20260713_resources_categories";
import * as migration_20260713_partners_slug from "./20260713_partners_slug";
import * as migration_20260713_form_submissions_newsletter from "./20260713_form_submissions_newsletter";
import * as migration_20260713_media_storage_folders from "./20260713_media_storage_folders";
import * as migration_20260713_locked_documents_rels from "./20260713_locked_documents_rels";
import * as migration_20260714_gallery_items from "./20260714_gallery_items";

export const migrations = [
  {
    up: migration_20260526_102131_initial.up,
    down: migration_20260526_102131_initial.down,
    name: "20260526_102131_initial",
  },
  {
    up: migration_20260603_form_submissions_feedback_fields.up,
    down: migration_20260603_form_submissions_feedback_fields.down,
    name: "20260603_form_submissions_feedback_fields",
  },
  {
    up: migration_20260629_partners.up,
    down: migration_20260629_partners.down,
    name: "20260629_partners",
  },
  {
    up: migration_20260630_analytics_events.up,
    down: migration_20260630_analytics_events.down,
    name: "20260630_analytics_events",
  },
  {
    up: migration_20260713_resources_categories.up,
    down: migration_20260713_resources_categories.down,
    name: "20260713_resources_categories",
  },
  {
    up: migration_20260713_partners_slug.up,
    down: migration_20260713_partners_slug.down,
    name: "20260713_partners_slug",
  },
  {
    up: migration_20260713_form_submissions_newsletter.up,
    down: migration_20260713_form_submissions_newsletter.down,
    name: "20260713_form_submissions_newsletter",
  },
  {
    up: migration_20260713_media_storage_folders.up,
    down: migration_20260713_media_storage_folders.down,
    name: "20260713_media_storage_folders",
  },
  {
    up: migration_20260713_locked_documents_rels.up,
    down: migration_20260713_locked_documents_rels.down,
    name: "20260713_locked_documents_rels",
  },
  {
    up: migration_20260714_gallery_items.up,
    down: migration_20260714_gallery_items.down,
    name: "20260714_gallery_items",
  },
];
