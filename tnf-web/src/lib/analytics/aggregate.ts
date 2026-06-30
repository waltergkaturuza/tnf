import type { Payload } from "payload";

export type AnalyticsSummary = {
  days: number;
  downloadDays: number;
  totals: {
    pageViews: number;
    uniqueVisitors: number;
    viewsToday: number;
    resourceDownloads: number;
  };
  pageViewsByDay: { date: string; total: number; unique: number }[];
  topPages: { path: string; label: string; count: number }[];
  topResources: { label: string; count: number }[];
  devices: { device: string; count: number; percent: number }[];
};

const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/about/history": "History",
  "/about/team": "Our Team",
  "/about/faqs": "FAQs",
  "/departments": "Departments",
  "/resources": "Resources",
  "/news-events": "News & Events",
  "/careers": "Careers",
  "/contact": "Contact",
  "/feedback": "Feedback",
  "/whistleblower": "Whistleblower",
};

function pathLabel(path: string): string {
  if (PATH_LABELS[path]) return PATH_LABELS[path];
  if (path.startsWith("/work-areas/")) return `Work area: ${path.split("/").pop()?.replace(/-/g, " ") ?? path}`;
  return path;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function buildAnalyticsSummary(
  payload: Payload,
  days = 14,
  downloadDays = 90,
): Promise<AnalyticsSummary> {
  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setDate(windowStart.getDate() - (days - 1));
  windowStart.setHours(0, 0, 0, 0);

  const downloadStart = new Date(now);
  downloadStart.setDate(downloadStart.getDate() - (downloadDays - 1));
  downloadStart.setHours(0, 0, 0, 0);

  const todayStart = startOfDay(now);

  const { docs: pageViewDocs } = await payload.find({
    collection: "analytics-events",
    where: {
      and: [
        { eventType: { equals: "page_view" } },
        { createdAt: { greater_than_equal: windowStart.toISOString() } },
      ],
    },
    limit: 10000,
    pagination: false,
    sort: "createdAt",
  });

  const allPageViewsResult = await payload.find({
    collection: "analytics-events",
    where: { eventType: { equals: "page_view" } },
    limit: 1,
    pagination: true,
  });

  const { docs: downloadDocs } = await payload.find({
    collection: "analytics-events",
    where: {
      and: [
        { eventType: { equals: "resource_download" } },
        { createdAt: { greater_than_equal: downloadStart.toISOString() } },
      ],
    },
    limit: 5000,
    pagination: false,
    sort: "-createdAt",
  });

  const sessions = new Set<string>();
  const sessionsByDay = new Map<string, Set<string>>();
  const viewsByDay = new Map<string, number>();
  const pathCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  let viewsToday = 0;

  for (let i = 0; i < days; i++) {
    const d = new Date(windowStart);
    d.setDate(d.getDate() + i);
    viewsByDay.set(formatDayKey(d), 0);
    sessionsByDay.set(formatDayKey(d), new Set());
  }

  for (const doc of pageViewDocs) {
    const created = new Date(doc.createdAt);
    const dayKey = formatDayKey(created);
    sessions.add(doc.sessionId);
    pathCounts.set(doc.path, (pathCounts.get(doc.path) ?? 0) + 1);
    deviceCounts.set(doc.deviceType, (deviceCounts.get(doc.deviceType) ?? 0) + 1);

    if (viewsByDay.has(dayKey)) {
      viewsByDay.set(dayKey, (viewsByDay.get(dayKey) ?? 0) + 1);
      sessionsByDay.get(dayKey)?.add(doc.sessionId);
    }

    if (created >= todayStart) viewsToday += 1;
  }

  const pageViewsByDay = Array.from(viewsByDay.entries()).map(([date, total]) => ({
    date,
    total,
    unique: sessionsByDay.get(date)?.size ?? 0,
  }));

  const topPages = Array.from(pathCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, label: pathLabel(path), count }));

  const resourceCounts = new Map<string, number>();
  for (const doc of downloadDocs) {
    const label = doc.resourceLabel || doc.path || "Unknown";
    resourceCounts.set(label, (resourceCounts.get(label) ?? 0) + 1);
  }

  const topResources = Array.from(resourceCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ label, count }));

  const deviceTotal = Array.from(deviceCounts.values()).reduce((a, b) => a + b, 0) || 1;
  const devices = ["desktop", "mobile", "tablet", "unknown"]
    .map((device) => {
      const count = deviceCounts.get(device) ?? 0;
      return {
        device: device.charAt(0).toUpperCase() + device.slice(1),
        count,
        percent: Math.round((count / deviceTotal) * 100),
      };
    })
    .filter((d) => d.count > 0);

  return {
    days,
    downloadDays,
    totals: {
      pageViews: allPageViewsResult.totalDocs ?? pageViewDocs.length,
      uniqueVisitors: sessions.size,
      viewsToday,
      resourceDownloads: downloadDocs.length,
    },
    pageViewsByDay,
    topPages,
    topResources,
    devices,
  };
}
