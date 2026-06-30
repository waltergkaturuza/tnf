import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";
import { buildAnalyticsSummary } from "@/lib/analytics/aggregate";

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = Math.min(90, Math.max(1, Number(searchParams.get("days") ?? 14) || 14));
    const downloadDays = Math.min(365, Math.max(1, Number(searchParams.get("downloadDays") ?? 90) || 90));

    const summary = await buildAnalyticsSummary(payload, days, downloadDays);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[analytics/summary]", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
