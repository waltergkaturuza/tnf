import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import type { GalleryItem as GalleryItemDoc, Media } from "@/payload-types";
import { siteConfig } from "@/lib/site-config";
import { normalizeExternalUrl } from "@/lib/updates";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  href?: string;
};

function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as { url?: string | null };
  return m.url?.trim() || null;
}

export function getFallbackGalleryItems(): GalleryPhoto[] {
  return (siteConfig.galleryImages ?? []).map((img, index) => ({
    id: `fallback-${index}`,
    src: img.src,
    alt: img.alt || img.caption || "TNF gallery",
    caption: img.caption || img.alt || "Gallery",
  }));
}

export function payloadGalleryToItems(docs: GalleryItemDoc[]): GalleryPhoto[] {
  const items: GalleryPhoto[] = [];

  for (const doc of docs) {
    const image = typeof doc.image === "object" ? (doc.image as Media) : null;
    const src = getMediaUrl(image);
    if (!src) continue;
    const caption = doc.caption?.trim() || "Gallery";
    items.push({
      id: String(doc.id ?? caption),
      src,
      alt: doc.alt?.trim() || caption,
      caption,
      href: normalizeExternalUrl(doc.linkUrl) ?? undefined,
    });
  }

  return items;
}

/** Published gallery photos from Payload; falls back to site-config static entries. */
export async function getPublishedGalleryItems(limit = 48): Promise<GalleryPhoto[]> {
  const fallback = getFallbackGalleryItems();

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "gallery-items",
      where: { status: { equals: "published" } },
      sort: "sortOrder",
      limit,
      depth: 1,
      overrideAccess: true,
    });

    const fromCms = payloadGalleryToItems(result.docs);
    return fromCms.length > 0 ? fromCms : fallback;
  } catch {
    return fallback;
  }
}
