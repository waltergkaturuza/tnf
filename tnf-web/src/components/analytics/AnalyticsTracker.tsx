"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "tnf_analytics_session";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function trackPageView(path: string) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "page_view", path, sessionId }),
      keepalive: true,
    });
  } catch {
    // Non-blocking analytics
  }
}

export function trackResourceDownload(path: string, resourceLabel: string) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType: "resource_download",
      path,
      sessionId,
      resourceLabel,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    void trackPageView(pathname);
  }, [pathname]);

  return null;
}
