import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { parseDeviceType } from "@/lib/analytics/device";

type TrackBody = {
  eventType?: "page_view" | "resource_download";
  path?: string;
  resourceLabel?: string;
  sessionId?: string;
};

function sanitizePath(path: string): string | null {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("..")) return null;
  return path.slice(0, 512);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackBody;
    const eventType = body.eventType;
    const path = body.path ? sanitizePath(body.path) : null;
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : null;

    if (!eventType || !path || !sessionId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (eventType !== "page_view" && eventType !== "resource_download") {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? undefined;
    const payload = await getPayload({ config });

    await payload.create({
      collection: "analytics-events",
      data: {
        eventType,
        path,
        sessionId,
        deviceType: parseDeviceType(userAgent),
        userAgent: userAgent?.slice(0, 512),
        resourceLabel:
          eventType === "resource_download" && body.resourceLabel
            ? String(body.resourceLabel).slice(0, 256)
            : undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics/track]", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
