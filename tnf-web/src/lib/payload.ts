/**
 * Payload API client for server-side data fetching
 * Use with Next.js Server Components
 */

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export async function getPosts(limit = 10) {
  const res = await fetch(`${PAYLOAD_API_URL}/api/posts?limit=${limit}&where[status][equals]=published`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return { docs: [] };
  return res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}&where[status][equals]=published`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

export async function getEvents(limit = 10, status = "published") {
  const res = await fetch(
    `${PAYLOAD_API_URL}/api/events?limit=${limit}&where[status][equals]=${status}&sort=-startDate`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return { docs: [] };
  return res.json();
}

export async function getResources(limit = 20, category?: string) {
  let url = `${PAYLOAD_API_URL}/api/resources?limit=${limit}&where[status][equals]=published&sort=-publishedAt`;
  if (category && category !== "All") {
    url += `&where[category][equals]=${category}`;
  }
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return { docs: [] };
  return res.json();
}
