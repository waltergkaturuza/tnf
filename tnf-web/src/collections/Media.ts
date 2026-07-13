import type { CollectionConfig } from "payload";

import { altFromFilenameField } from "../lib/admin-fields.js";
import {
  getMissingS3EnvVars,
  isRunningOnVercel,
  isS3StorageEnabled,
} from "../lib/s3-storage.js";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ operation, req }) => {
        // On Vercel, refuse creates/updates that include a file unless S3 is configured.
        // Otherwise Payload can save a DB row with no durable file (bucket stays empty).
        if (!isRunningOnVercel()) return;
        if (operation !== "create" && operation !== "update") return;
        if (!req.file) return;
        if (isS3StorageEnabled()) return;

        throw new Error(
          `File uploads require Supabase Storage. Missing env vars on Vercel: ${getMissingS3EnvVars().join(", ")}. See tnf-web/docs/SUPABASE.md`,
        );
      },
    ],
  },
  fields: [
    altFromFilenameField({ name: "alt" }),
    {
      name: "caption",
      type: "text",
    },
  ],
  upload: {
    // Prevent Vercel from falling back to a local `media/` folder (read-only filesystem).
    disableLocalStorage: isRunningOnVercel(),
  },
};
