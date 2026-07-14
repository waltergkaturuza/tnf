export type UpdateCategory = "News" | "Events";

export type UpdateItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  dateDisplay: string;
  location?: string;
  category: UpdateCategory;
  type: "news" | "event";
  imageUrl?: string | null;
  /** Event registration / external CTA (from Events.registrationUrl). */
  registrationUrl?: string | null;
};

export const UPDATE_CATEGORIES: UpdateCategory[] = ["News", "Events"];

/** Ensure absolute http(s) links for external registration URLs. */
export function normalizeExternalUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^\/\//.test(trimmed)) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as { url?: string };
  return m.url ?? null;
}

export const FALLBACK_UPDATES: UpdateItem[] = [
  {
    id: "event-job-summit-2026",
    slug: "zimbabwe-national-job-skills-summit-2026",
    title: "Zimbabwe National Job and Skills Summit 2026",
    excerpt:
      "A high-level, multi-stakeholder platform to consolidate national efforts, foster structured social dialogue, and generate actionable commitments for employment creation, skills development, and formalisation.",
    dateISO: "2026-05-19",
    dateDisplay: "Tue, May 19, 2026",
    location: "Bulawayo",
    category: "Events",
    type: "event",
    imageUrl: null,
  },
  {
    id: "news-social-justice",
    slug: "zimbabwe-advances-social-justice",
    title: "Zimbabwe Advances Social Justice and Just Transition Agenda",
    excerpt:
      "TNF continues to drive the national dialogue on social justice and just transition.",
    dateISO: "2024-06-01",
    dateDisplay: "2024",
    category: "News",
    type: "news",
    imageUrl: null,
  },
  {
    id: "news-technology",
    slug: "technology-empower-not-endanger",
    title: "Technology Should Empower, Not Endanger: TNF Call to Action",
    excerpt:
      "Tripartite partners unite on ending online violence against women and girls.",
    dateISO: "2024-05-15",
    dateDisplay: "2024",
    category: "News",
    type: "news",
    imageUrl: null,
  },
  {
    id: "news-moyo-retreat",
    slug: "hon-moyo-opens-tnf-retreat",
    title: "Hon E. Moyo Officially Opens TNF Strategic Retreat in Victoria Falls",
    excerpt: "Minister opens strategic retreat to advance social dialogue priorities.",
    dateISO: "2024-04-10",
    dateDisplay: "2024",
    location: "Victoria Falls",
    category: "News",
    type: "news",
    imageUrl: null,
  },
  {
    id: "event-corruption",
    slug: "corruption-dialogue-symposium",
    title: "Corruption Dialogue Symposium",
    excerpt: "National dialogue on corruption and governance reform.",
    dateISO: "2024-07-12",
    dateDisplay: "Jul 12, 2024",
    location: "Jameson Hotel, Harare",
    category: "Events",
    type: "event",
    imageUrl: null,
  },
  {
    id: "event-technical-workshop",
    slug: "tnf-technical-committee-workshop",
    title: "TNF Technical Committee Workshop",
    excerpt: "Technical committee workshop on tripartite coordination.",
    dateISO: "2024-07-21",
    dateDisplay: "Jul 21–25, 2024",
    location: "Leopard Rock Hotel, Vumba",
    category: "Events",
    type: "event",
    imageUrl: null,
  },
];

export function sortUpdatesByDate(items: UpdateItem[]): UpdateItem[] {
  return [...items].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
  );
}

export function postsToUpdates(
  docs: Array<{
    id?: string | number;
    title: string;
    slug: string;
    excerpt?: string | null;
    publishedAt?: string | null;
    featuredImage?: unknown;
  }>,
): UpdateItem[] {
  return docs.map((p) => ({
    id: String(p.id ?? p.slug),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    dateISO: p.publishedAt || new Date().toISOString(),
    dateDisplay: p.publishedAt ? formatDate(p.publishedAt) : "",
    category: "News" as const,
    type: "news" as const,
    imageUrl: getMediaUrl(p.featuredImage),
  }));
}

export function eventsToUpdates(
  docs: Array<{
    id?: string | number;
    title: string;
    slug: string;
    description?: string | null;
    startDate?: string | null;
    location?: string | null;
    featuredImage?: unknown;
    status?: string | null;
    registrationUrl?: string | null;
  }>,
  upcomingOnly = false,
): UpdateItem[] {
  return docs
    .filter((e) => !upcomingOnly || e.status === "published")
    .map((e) => ({
      id: String(e.id ?? e.slug),
      slug: e.slug,
      title: e.title,
      excerpt: e.description || "",
      dateISO: e.startDate || new Date().toISOString(),
      dateDisplay: e.startDate ? formatDate(e.startDate) : "TBA",
      location: e.location ?? undefined,
      category: "Events" as const,
      type: "event" as const,
      imageUrl: getMediaUrl(e.featuredImage),
      registrationUrl: normalizeExternalUrl(e.registrationUrl),
    }));
}
