import type { CollectionConfig } from "payload";
import { slugFromTitleField } from "../lib/admin-fields.js";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder", "status"],
    description: "Partner logos shown in the Our Partners section on the homepage.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    slugFromTitleField({
      name: "slug",
      sourceField: "name",
      required: false,
      unique: true,
    }),
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Upload a PNG, JPG, or SVG logo. Recommended transparent background.",
      },
    },
    {
      name: "lightLogo",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Enable for white or very light logos so they show on the glass partner card.",
      },
    },
    {
      name: "websiteUrl",
      type: "text",
      admin: {
        description: "Optional link when the logo is clicked (include https://).",
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
