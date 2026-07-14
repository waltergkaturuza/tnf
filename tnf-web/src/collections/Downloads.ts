import type { CollectionConfig } from "payload";
import { slugFromTitleField } from "../lib/admin-fields.js";

export const Downloads: CollectionConfig = {
  slug: "downloads",
  labels: {
    singular: "Download",
    plural: "Downloads",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sortOrder", "status", "updatedAt"],
    description:
      "Files shown under Resources → Other Downloads (forms, charters, reference materials). Upload a document, publish it, and it appears on the site.",
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugFromTitleField({ name: "slug" }),
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Optional short note shown under the title.",
      },
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "PDF, Word, or other downloadable file. In Media, set Folder to Resources (or Contact) as appropriate.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
