import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Resource } from "@/payload-types";

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

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  RESOURCE_CATEGORY_OPTIONS.filter((o) => o.value !== "all").map((o) => [o.value, o.label]),
);

function formatFileSize(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileTypeFromMime(mime?: string | null, filename?: string | null): string {
  if (mime?.includes("pdf") || filename?.toLowerCase().endsWith(".pdf")) return "PDF";
  if (mime?.includes("word") || filename?.match(/\.docx?$/i)) return "DOC";
  if (mime?.includes("sheet") || filename?.match(/\.xlsx?$/i)) return "XLS";
  if (filename) {
    const ext = filename.split(".").pop()?.toUpperCase();
    if (ext) return ext;
  }
  return "File";
}

function getDocument(media: Resource["document"]): Media | null {
  if (!media || typeof media !== "object") return null;
  return media as Media;
}

export function mapResourceDoc(doc: Resource): ResourceListItem | null {
  const document = getDocument(doc.document);
  if (!document?.url?.trim()) return null;

  const category = doc.category as ResourceCategoryValue;

  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? undefined,
    category,
    categoryLabel: CATEGORY_LABELS[category] ?? doc.category,
    year: doc.year?.trim() || "—",
    type: fileTypeFromMime(document.mimeType, document.filename),
    size: formatFileSize(document.filesize),
    downloadUrl: document.url.trim(),
  };
}

export async function getPublishedResources(limit = 100): Promise<ResourceListItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "resources",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit,
      depth: 1,
      overrideAccess: true,
    });

    return (result.docs as Resource[])
      .map(mapResourceDoc)
      .filter((item): item is ResourceListItem => item !== null);
  } catch {
    return [];
  }
}
