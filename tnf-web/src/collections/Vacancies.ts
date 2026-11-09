import type { CollectionConfig } from "payload";
import { slugFromTitleField } from "../lib/admin-fields.js";

const ONE_PER_LINE = "One item per line — each line becomes a bullet point.";

export const Vacancies: CollectionConfig = {
  slug: "vacancies",
  labels: {
    singular: "Vacancy",
    plural: "Vacancies",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "closingDate", "status", "updatedAt"],
    description:
      "Job adverts shown on Careers → Vacancies. Published vacancies are hidden automatically after the closing date.",
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
      admin: {
        description: "Position title, e.g. Labour Cluster Officer.",
      },
    },
    slugFromTitleField({ name: "slug" }),
    {
      name: "reportingTo",
      type: "text",
      admin: {
        description: "e.g. Labour and Economic Cluster Coordinator.",
      },
    },
    {
      name: "intro",
      type: "textarea",
      admin: {
        description: "Opening paragraph inviting applications.",
      },
    },
    {
      name: "responsibilities",
      label: "Key responsibilities",
      type: "textarea",
      admin: { description: ONE_PER_LINE },
    },
    {
      name: "qualifications",
      label: "Qualifications and experience",
      type: "textarea",
      admin: { description: ONE_PER_LINE },
    },
    {
      name: "skills",
      label: "Skills and competencies",
      type: "textarea",
      admin: { description: ONE_PER_LINE },
    },
    {
      name: "applicationProcedure",
      type: "textarea",
      admin: {
        description: "Documents and details applicants must submit.",
      },
    },
    {
      name: "deliveryAddress",
      label: "Hand delivery address",
      type: "textarea",
      defaultValue:
        "The Executive Director\nTripartite Negotiating Forum\nBlock 3, Third Floor, Celestial Park\nBorrowdale, Harare.",
      admin: {
        description: "Leave blank if applications are email-only.",
      },
    },
    {
      name: "applicationEmail",
      type: "email",
    },
    {
      name: "notice",
      type: "text",
      defaultValue: "Only shortlisted candidates will be contacted.",
    },
    {
      name: "advertFile",
      label: "Advert PDF",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional copy of the full advert for download. In Media, set Folder to Resources.",
      },
    },
    {
      name: "closingDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMMM yyyy",
        },
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
