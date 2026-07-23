import type { CollectionConfig } from "payload";

export const ConsultationQuestions: CollectionConfig = {
  slug: "consultation-questions",
  labels: {
    singular: "Consultation question",
    plural: "Consultation questions",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "form", "status", "closingDate", "updatedAt"],
    description:
      "Questions shown on the public Feedback Portal (e.g. for Digital Policy Dialogues posted on Facebook). Set status to Active and pick which feedback form shows the question. The newest Active question per form is displayed; responses are saved in Form Submissions with the question attached.",
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
        description:
          "Internal label, e.g. Labour Act review — week 1. Not shown to the public.",
      },
    },
    {
      name: "intro",
      type: "text",
      admin: {
        description:
          "Heading shown above the question, e.g. TNF Digital Policy Dialogue — Public Consultation on the Labour Act. Optional.",
      },
    },
    {
      name: "question",
      type: "textarea",
      required: true,
      admin: {
        description:
          "The question the public answers, e.g. If you could recommend one amendment to Zimbabwe's Labour Act, what would it be and why?",
      },
    },
    {
      name: "form",
      type: "select",
      required: true,
      defaultValue: "all",
      options: [
        { label: "All feedback forms", value: "all" },
        { label: "Feedback (Economic)", value: "feedback-economic" },
        { label: "Feedback (Social)", value: "feedback-social" },
        { label: "Feedback (Labour)", value: "feedback-labour" },
      ],
      admin: {
        description: "Which feedback form shows this question.",
      },
    },
    {
      name: "closingDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
        description:
          "Shown as “Consultation closes: …”. The question stops appearing after this date. Optional.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Active", value: "active" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
        description: "Only Active questions appear on the website.",
      },
    },
  ],
};
