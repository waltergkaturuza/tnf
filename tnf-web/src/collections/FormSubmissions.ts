import type { CollectionConfig } from "payload";
import { APIError } from "payload";

const FEEDBACK_TYPES = ["feedback-economic", "feedback-social", "feedback-labour"] as const;

function isFeedbackType(type: unknown): boolean {
  return typeof type === "string" && (FEEDBACK_TYPES as readonly string[]).includes(type);
}

function isWhistleblowerType(type: unknown): boolean {
  return type === "whistleblower";
}

function isContactType(type: unknown): boolean {
  return type === "contact";
}

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "type",
      "name",
      "email",
      "category",
      "locationScope",
      "createdAt",
    ],
    description: "Contact, feedback, and whistleblower submissions",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || !isContactType(data.type)) return data;

        if (!data.name || String(data.name).trim().length < 2) {
          throw new APIError("Full name is required.", 400);
        }
        if (!data.email || !String(data.email).includes("@")) {
          throw new APIError("A valid email address is required.", 400);
        }
        if (!data.category || !String(data.category).trim()) {
          throw new APIError("Please select an enquiry type.", 400);
        }
        if (!data.message || String(data.message).trim().length < 10) {
          throw new APIError("Please provide at least 10 characters in your message.", 400);
        }

        return data;
      },
      ({ data }) => {
        if (!data || !isFeedbackType(data.type)) return data;

        if (!data.name || String(data.name).trim().length < 2) {
          throw new APIError("Full name is required.", 400);
        }
        if (!data.email || !String(data.email).includes("@")) {
          throw new APIError("A valid email address is required.", 400);
        }
        if (!data.category || !String(data.category).trim()) {
          throw new APIError("Category is required.", 400);
        }
        if (!data.message || String(data.message).trim().length < 10) {
          throw new APIError("Please provide at least 10 characters in the details field.", 400);
        }
        if (data.locationScope === "zimbabwe" && !data.province && !data.cityOrArea) {
          throw new APIError("Please provide a province or city/area for Zimbabwe.", 400);
        }
        if (data.locationScope === "international" && !data.country) {
          throw new APIError("Country is required for international reports.", 400);
        }

        return data;
      },
      ({ data }) => {
        if (!data || !isWhistleblowerType(data.type)) return data;

        const anonymous = Boolean(data.anonymous);

        if (!anonymous) {
          if (!data.name || String(data.name).trim().length < 2) {
            throw new APIError("Full name is required unless submitting anonymously.", 400);
          }
          if (!data.email || !String(data.email).includes("@")) {
            throw new APIError("A valid email is required unless submitting anonymously.", 400);
          }
        }

        if (!data.category || !String(data.category).trim()) {
          throw new APIError("Incident type is required.", 400);
        }
        if (!data.message || String(data.message).trim().length < 20) {
          throw new APIError("Please provide at least 20 characters describing the incident.", 400);
        }
        if (data.locationScope === "zimbabwe" && !data.province && !data.cityOrArea) {
          throw new APIError("Please provide a province or city/area for Zimbabwe.", 400);
        }
        if (data.locationScope === "international" && !data.country) {
          throw new APIError("Country is required for international incidents.", 400);
        }

        return data;
      },
    ],
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
      name: "phone",
      type: "text",
      admin: {
        description: "Optional contact number",
      },
    },
    {
      name: "organisation",
      type: "text",
    },
    {
      name: "subject",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
      admin: {
        description: "Main message / report details",
      },
    },
    {
      name: "category",
      type: "text",
      admin: {
        description: "Issue category (feedback forms)",
      },
    },
    {
      name: "ageRange",
      type: "text",
      admin: {
        description: "Reporter age range",
      },
    },
    {
      name: "gender",
      type: "text",
    },
    {
      name: "locationScope",
      type: "select",
      options: [
        { label: "Zimbabwe", value: "zimbabwe" },
        { label: "International", value: "international" },
      ],
    },
    {
      name: "province",
      type: "text",
    },
    {
      name: "cityOrArea",
      type: "text",
    },
    {
      name: "country",
      type: "text",
    },
    {
      name: "dateOfIncident",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "preferredContact",
      type: "text",
    },
    {
      name: "anonymous",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "metadata",
      type: "json",
      admin: {
        description: "Extra data (e.g. attachment filename, user agent)",
      },
    },
  ],
};
