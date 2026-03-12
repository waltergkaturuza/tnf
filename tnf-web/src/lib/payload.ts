/**
 * Payload API client for server-side data fetching
 * Use with Next.js Server Components
 */

// Take only the first URL if multiple are provided (Vercel sometimes shows comma-separated)
const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
const PAYLOAD_API_URL = rawUrl.split(",")[0].trim().replace(/\/$/, "");

// Never fetch during Next.js build phase — the app isn't running yet
function isBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

async function payloadFetch(url: string) {
  if (isBuildPhase()) return null;
  if (!PAYLOAD_API_URL || PAYLOAD_API_URL.includes("localhost")) return null;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000), // 4-second hard timeout
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getPosts(limit = 10) {
  const data = await payloadFetch(
    `${PAYLOAD_API_URL}/api/posts?limit=${limit}&where[status][equals]=published`
  );
  return data ?? { docs: [] };
}

export async function getPostBySlug(slug: string) {
  const data = await payloadFetch(
    `${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}&where[status][equals]=published`
  );
  return data?.docs?.[0] ?? null;
}

export async function getEvents(limit = 10, status = "published") {
  const data = await payloadFetch(
    `${PAYLOAD_API_URL}/api/events?limit=${limit}&where[status][equals]=${status}&sort=-startDate`
  );
  return data ?? { docs: [] };
}

export async function getResources(limit = 20, category?: string) {
  let url = `${PAYLOAD_API_URL}/api/resources?limit=${limit}&where[status][equals]=published&sort=-publishedAt`;
  if (category && category !== "All") {
    url += `&where[category][equals]=${category}`;
  }
  const data = await payloadFetch(url);
  return data ?? { docs: [] };
}
