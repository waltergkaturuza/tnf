import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import type { Download as DownloadDoc, Media } from "@/payload-types";

export type DownloadItem = {
  id: string;
  title: string;
  description?: string;
  type: string;
  size: string;
  downloadUrl: string;
};

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

function getFile(media: DownloadDoc["file"]): Media | null {
  if (!media || typeof media !== "object") return null;
  return media as Media;
}

export function payloadDownloadsToItems(docs: DownloadDoc[]): DownloadItem[] {
  const items: DownloadItem[] = [];

  for (const doc of docs) {
    const file = getFile(doc.file);
    if (!file?.url?.trim()) continue;

    items.push({
      id: String(doc.id),
      title: doc.title,
      description: doc.description?.trim() || undefined,
      type: fileTypeFromMime(file.mimeType, file.filename),
      size: formatFileSize(file.filesize),
      downloadUrl: file.url.trim(),
    });
  }

  return items;
}

export async function getPublishedDownloads(limit = 48): Promise<DownloadItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "downloads",
      where: { status: { equals: "published" } },
      sort: "sortOrder",
      limit,
      depth: 1,
      overrideAccess: true,
    });
    return payloadDownloadsToItems(result.docs);
  } catch {
    return [];
  }
}
