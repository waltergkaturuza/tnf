import { getPayload } from "payload";
import config from "@payload-config";
import {
  eventsToUpdates,
  postsToUpdates,
  sortUpdatesByDate,
  type UpdateItem,
} from "@/lib/updates";

/** Load published news + events via Payload Local API (works on Vercel). */
export async function getPublishedUpdates(limit = 40): Promise<UpdateItem[]> {
  try {
    const payload = await getPayload({ config });

    const [postsResult, publishedEvents, pastEvents] = await Promise.all([
      payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit,
        depth: 1,
        overrideAccess: true,
      }),
      payload.find({
        collection: "events",
        where: { status: { equals: "published" } },
        sort: "-startDate",
        limit,
        depth: 1,
        overrideAccess: true,
      }),
      payload.find({
        collection: "events",
        where: { status: { equals: "past" } },
        sort: "-startDate",
        limit: Math.min(limit, 20),
        depth: 1,
        overrideAccess: true,
      }),
    ]);

    const posts = postsToUpdates(postsResult.docs);
    const events = eventsToUpdates(publishedEvents.docs);
    const past = eventsToUpdates(pastEvents.docs);

    return sortUpdatesByDate([...posts, ...events, ...past]);
  } catch {
    return [];
  }
}
