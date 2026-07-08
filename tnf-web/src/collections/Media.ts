import type { CollectionConfig } from "payload";

import { isRunningOnVercel } from "../lib/s3-storage.js";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
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
