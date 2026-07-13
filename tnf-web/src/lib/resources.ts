import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Resource } from "@/payload-types";
import {
  RESOURCE_CATEGORY_LABELS,
  type ResourceCategoryValue,
  type ResourceListItem,
} from "@/lib/resources-shared";

export type { ResourceCategoryValue, ResourceListItem };
export { RESOURCE_CATEGORY_OPTIONS } from "@/lib/resources-shared";

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
    categoryLabel: RESOURCE_CATEGORY_LABELS[category] ?? doc.category,
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
