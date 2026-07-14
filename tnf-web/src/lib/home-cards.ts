import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";

const HOME_CARD_LIMIT = 3;

export type HomeNewsCard = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
};

export type HomeEventCard = {
  title: string;
  slug: string;
  date: string;
  location: string;
  month: string;
};

/** Latest published posts for homepage (strictly top N). */
export async function getLatestNewsCards(
  limit = HOME_CARD_LIMIT,
): Promise<HomeNewsCard[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit,
      depth: 0,
      overrideAccess: true,
    });

    return docs.slice(0, limit).map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      date: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
    }));
  } catch {
    return [];
  }
}

/** Next upcoming published events for homepage (soonest first, top N). */
export async function getUpcomingEventCards(
  limit = HOME_CARD_LIMIT,
): Promise<HomeEventCard[]> {
  try {
    const payload = await getPayload({ config });
    const now = new Date().toISOString();
    const { docs } = await payload.find({
      collection: "events",
      where: {
        and: [
          { status: { equals: "published" } },
          { startDate: { greater_than_equal: now } },
        ],
      },
      sort: "startDate",
      limit,
      depth: 0,
      overrideAccess: true,
    });

    // If nothing upcoming, fall back to newest published events.
    const source =
      docs.length > 0
        ? docs
        : (
            await payload.find({
              collection: "events",
              where: { status: { equals: "published" } },
              sort: "-startDate",
              limit,
              depth: 0,
              overrideAccess: true,
            })
          ).docs;

    return source.slice(0, limit).map((e) => {
      const d = e.startDate ? new Date(e.startDate) : null;
      return {
        title: e.title,
        slug: e.slug,
        date: d
          ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
          : "TBA",
        location: e.location || "TBA",
        month: d
          ? d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase()
          : "TBA",
      };
    });
  } catch {
    return [];
  }
}
