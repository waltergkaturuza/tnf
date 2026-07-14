import type { CollectionConfig } from "payload";

export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: {
    singular: "Gallery item",
    plural: "Gallery",
  },
  admin: {
    useAsTitle: "caption",
    defaultColumns: ["caption", "sortOrder", "status", "updatedAt"],
    description:
      "Photos shown in TNF in Action (homepage) and Resources → Gallery. Upload an image, set a caption, publish.",
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "caption",
      type: "text",
      required: true,
      admin: {
        description: "Short title under the photo (e.g. Social dialogue in action).",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Photo for the gallery. Prefer landscape images (roughly 4:3 or 16:10).",
      },
    },
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Accessibility text. Defaults to the caption if left blank.",
      },
    },
    {
      name: "linkUrl",
      type: "text",
      admin: {
        description: "Optional link when the photo is clicked (include https://).",
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
