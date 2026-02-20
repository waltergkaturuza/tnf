import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "status"],
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
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Annual Report", value: "annual-report" },
        { label: "Strategic Plan", value: "strategic-plan" },
        { label: "Policy Paper", value: "policy-paper" },
        { label: "Press Release", value: "press-release" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "year",
      type: "text",
      admin: {
        description: "Publication year (e.g. 2024)",
      },
    },
    {
      name: "document",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "PDF or document file",
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
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
