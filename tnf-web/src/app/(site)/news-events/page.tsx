import { NewsEventsView } from "@/components/news-events/NewsEventsView";
import { getEvents, getPosts } from "@/lib/payload";
import {
  FALLBACK_UPDATES,
  eventsToUpdates,
  postsToUpdates,
  sortUpdatesByDate,
} from "@/lib/updates";

export const metadata = {
  title: "News and Events",
  description: "Latest TNF news, announcements and upcoming events.",
};

export default async function NewsEventsPage() {
  let items = FALLBACK_UPDATES;

  try {
    const [postsRes, eventsRes] = await Promise.all([
      getPosts(20),
      getEvents(20, "published"),
    ]);

    const posts = postsRes?.docs?.length ? postsToUpdates(postsRes.docs) : [];
    const events = eventsRes?.docs?.length ? eventsToUpdates(eventsRes.docs, true) : [];
    const pastEvents = await getEvents(10, "past").then((r) =>
      r?.docs?.length ? eventsToUpdates(r.docs) : [],
    );

    const merged = [...posts, ...events, ...pastEvents];
    if (merged.length) {
      items = sortUpdatesByDate(merged);
    }
  } catch {
    items = sortUpdatesByDate(FALLBACK_UPDATES);
  }

  return <NewsEventsView items={items} />;
}
