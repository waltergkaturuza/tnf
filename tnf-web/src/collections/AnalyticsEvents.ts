import type { CollectionConfig } from "payload";

export const AnalyticsEvents: CollectionConfig = {
  slug: "analytics-events",
  admin: {
    useAsTitle: "path",
    defaultColumns: ["eventType", "path", "deviceType", "sessionId", "createdAt"],
    description: "Site page views and resource download events (auto-recorded).",
    hidden: true,
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "eventType",
      type: "select",
      required: true,
      options: [
        { label: "Page view", value: "page_view" },
        { label: "Resource download", value: "resource_download" },
      ],
    },
    {
      name: "path",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "resourceLabel",
      type: "text",
      admin: {
        description: "Document or file name for download events",
      },
    },
    {
      name: "deviceType",
      type: "select",
      required: true,
      defaultValue: "unknown",
      options: [
        { label: "Desktop", value: "desktop" },
        { label: "Mobile", value: "mobile" },
        { label: "Tablet", value: "tablet" },
        { label: "Unknown", value: "unknown" },
      ],
      index: true,
    },
    {
      name: "sessionId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "userAgent",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
};
