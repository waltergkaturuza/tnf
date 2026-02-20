import Link from "next/link";
import { getEvents } from "@/lib/payload";

const FALLBACK_EVENTS = [
  { title: "TNF Technical Committee Workshop", date: "TBA", location: "Harare", month: "TBA" },
  { title: "Annual TNF Retreat", date: "TBA", location: "TBA", month: "TBA" },
  { title: "Monetary Policy Dialogue Symposium", date: "TBA", location: "Harare", month: "TBA" },
];

export async function UpcomingEvents() {
  let events = FALLBACK_EVENTS;
  try {
    const { docs } = await getEvents(3, "published");
    if (docs?.length) {
      events = docs.map((e: { title: string; startDate?: string; location?: string }) => {
        const d = e.startDate ? new Date(e.startDate) : null;
        return {
          title: e.title,
          date: d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "TBA",
          location: e.location || "TBA",
          month: d ? d.toLocaleDateString("en-GB", { month: "short" }) : "TBA",
        };
      });
    }
  } catch {
    // Use fallback
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">Upcoming Events</h2>
            <p className="mt-4 text-lg text-slate-600">Dialogues, workshops, and meetings across Zimbabwe.</p>
          </div>
          <Link href="/news-events#events" className="rounded-full border-2 border-tnf-navy px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white">
            View Calendar
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {events.map((event) => (
            <div key={event.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-tnf-navy px-4 py-2 text-center text-white">
                <span className="text-xs font-bold uppercase">{event.month}</span>
                <span className="text-lg font-bold">{event.date}</span>
              </div>
              <div>
                <h3 className="font-semibold text-tnf-navy">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
