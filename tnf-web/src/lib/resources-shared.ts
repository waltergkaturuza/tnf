export const RESOURCE_CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "annual-report", label: "Annual Reports" },
  { value: "strategic-plan", label: "Strategic Plans" },
  { value: "annual-performance-plan", label: "Annual Performance Plans" },
  { value: "tnf-reports-plans", label: "TNF Reports and Plans" },
  { value: "policy-paper", label: "Policy Papers" },
  { value: "press-release", label: "Press Releases" },
  { value: "other", label: "Other" },
] as const;

export type ResourceCategoryValue =
  | "annual-report"
  | "strategic-plan"
  | "annual-performance-plan"
  | "tnf-reports-plans"
  | "policy-paper"
  | "press-release"
  | "other";

export type ResourceListItem = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: ResourceCategoryValue;
  categoryLabel: string;
  year: string;
  type: string;
  size: string;
  downloadUrl: string;
};

export const RESOURCE_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  RESOURCE_CATEGORY_OPTIONS.filter((o) => o.value !== "all").map((o) => [o.value, o.label]),
);
