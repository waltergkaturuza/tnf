import * as migration_20260526_102131_initial from "./20260526_102131_initial";
import * as migration_20260603_form_submissions_feedback_fields from "./20260603_form_submissions_feedback_fields";
import * as migration_20260629_partners from "./20260629_partners";

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
];
