/** URL-safe slug from a title or label. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/** Human-readable alt text from an uploaded filename. */
export function altFromFilename(filename: string): string {
  const base = filename.replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "");
  const spaced = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!spaced) return filename;
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}
