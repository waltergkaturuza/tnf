/**
 * Bucket layout helpers for Supabase Storage (S3).
 *
 * Example keys:
 *   resources/annual-report/2026-07-13_tnf-annual-report.pdf
 *   feedback/informalisation/2026-07-13_evidence.jpg
 *   media/general/2026-07-13_hero.jpg
 */

export const STORAGE_FOLDERS = [
  { label: "Media library", value: "media" },
  { label: "Resources", value: "resources" },
  { label: "Feedback", value: "feedback" },
  { label: "Whistleblower", value: "whistleblower" },
  { label: "Contact", value: "contact" },
  { label: "Partners", value: "partners" },
  { label: "News / Posts", value: "news" },
  { label: "Events", value: "events" },
] as const;

export type StorageFolder = (typeof STORAGE_FOLDERS)[number]["value"];

export function slugifyStorageSegment(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "general";
}

/** Build S3 key prefix: `folder` or `folder/category`. */
export function buildStoragePrefix(
  folder: string | null | undefined,
  category?: string | null,
): string {
  const root = slugifyStorageSegment(folder || "media");
  const cat = category?.trim() ? slugifyStorageSegment(category) : "";
  return cat ? `${root}/${cat}` : root;
}

/** Prefix original filename with upload date: `2026-07-13_report.pdf`. */
export function datedStorageFilename(originalName: string, date = new Date()): string {
  const stamp = date.toISOString().slice(0, 10);
  const base = originalName.replace(/^.*[\\/]/, "").trim() || "file";
  const cleaned = base.replace(/^\d{4}-\d{2}-\d{2}[_-]*/, "");
  const safe = cleaned
    .replace(/[^\w.\-()]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const name = safe || "file";
  if (name.startsWith(`${stamp}_`) || name.startsWith(`${stamp}-`)) return name;
  return `${stamp}_${name}`;
}

export function mapFormTypeToFolder(
  type?: string | null,
): StorageFolder {
  if (!type) return "media";
  if (type.startsWith("feedback")) return "feedback";
  if (type === "whistleblower") return "whistleblower";
  if (type === "contact") return "contact";
  if (type === "newsletter") return "contact";
  return "media";
}
