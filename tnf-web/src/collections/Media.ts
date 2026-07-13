import type { CollectionConfig } from "payload";

import { altFromFilenameField } from "../lib/admin-fields.js";
import {
  getMissingS3EnvVars,
  isRunningOnVercel,
  isS3StorageEnabled,
} from "../lib/s3-storage.js";
import {
  STORAGE_FOLDERS,
  buildStoragePrefix,
  datedStorageFilename,
} from "../lib/storage-paths.js";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "folder", "storageCategory", "updatedAt"],
    description:
      "Files are stored in the bucket as folder/category/YYYY-MM-DD_filename. Pick Folder (and Category for Resources / forms) before uploading.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        if (operation !== "create" && operation !== "update") return;
        if (!req.file?.name) return;
        req.file.name = datedStorageFilename(req.file.name);
      },
    ],
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
      ({ data }) => {
        if (!data) return data;
        if (!data.folder) data.folder = "media";
        data.prefix = buildStoragePrefix(
          String(data.folder),
          typeof data.storageCategory === "string" ? data.storageCategory : null,
        );
        return data;
      },
    ],
    beforeChange: [
      ({ data, req }) => {
        if (!data) return data;
        if (!data.folder) data.folder = "media";
        data.prefix = buildStoragePrefix(
          String(data.folder),
          typeof data.storageCategory === "string" ? data.storageCategory : null,
        );
        // Only rewrite filename when a new file is being uploaded.
        if (req.file?.name) {
          data.filename = datedStorageFilename(req.file.name);
        }
        return data;
      },
    ],
    // Cloud storage uploads in afterChange using `doc.prefix`. Recompute here so the
    // S3 key always includes folder/category even if the hidden prefix field was blank.
    afterChange: [
      ({ doc }) => {
        if (!doc) return doc;
        const folder =
          typeof doc.folder === "string" && doc.folder ? doc.folder : "media";
        const category =
          typeof doc.storageCategory === "string" ? doc.storageCategory : null;
        const prefix = buildStoragePrefix(folder, category);
        if (doc.prefix === prefix) return doc;
        return { ...doc, prefix };
      },
    ],
  },
  fields: [
    {
      name: "folder",
      type: "select",
      required: true,
      defaultValue: "media",
      options: [...STORAGE_FOLDERS],
      admin: {
        description: "Top-level bucket folder (resources, media, feedback, …).",
      },
    },
    {
      name: "storageCategory",
      type: "text",
      admin: {
        description:
          "Subfolder under the chosen folder (e.g. annual-report, Informalisation). Leave blank for a general folder.",
      },
    },
    // Writable prefix so folder paths survive into the S3 upload hook (plugin marks its copy read-only).
    {
      name: "prefix",
      type: "text",
      admin: {
        hidden: true,
        readOnly: false,
      },
    },
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
