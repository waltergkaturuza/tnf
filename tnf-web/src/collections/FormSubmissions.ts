import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "type",
    defaultColumns: ["type", "name", "email", "createdAt"],
    description: "Contact, feedback, and whistleblower submissions",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Contact", value: "contact" },
        { label: "Feedback (Economic)", value: "feedback-economic" },
        { label: "Feedback (Social)", value: "feedback-social" },
        { label: "Feedback (Labour)", value: "feedback-labour" },
        { label: "Whistleblower", value: "whistleblower" },
      ],
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "subject",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "category",
      type: "text",
      admin: {
        description: "Form-specific category (e.g. issue type)",
      },
    },
    {
      name: "metadata",
      type: "json",
      admin: {
        description: "Additional form data (attachments refs, etc.)",
      },
    },
  ],
};
