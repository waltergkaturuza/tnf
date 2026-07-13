import { NewsEventsView } from "@/components/news-events/NewsEventsView";
import { getPublishedUpdates } from "@/lib/news-events";

export const metadata = {
  title: "News and Events",
  description: "Latest TNF news, announcements and upcoming events.",
};

export const dynamic = "force-dynamic";

export default async function NewsEventsPage() {
  const items = await getPublishedUpdates();
  return <NewsEventsView items={items} />;
}
