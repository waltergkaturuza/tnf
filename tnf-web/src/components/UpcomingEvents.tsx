import Link from "next/link";
import { getUpcomingEventCards } from "@/lib/home-cards";

export async function UpcomingEvents() {
  const events = await getUpcomingEventCards(3);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="page-shell-inner">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="sm:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Dialogues, workshops, and meetings across Zimbabwe.
            </p>
          </div>
          <Link
            href="/news-events#events"
            className="shrink-0 rounded-full border-2 border-tnf-navy px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white"
          >
            View Calendar
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-600">
            No published events yet. Add events in Admin → Events and set status to Published.
          </p>
        ) : (
          <div
            className={`mt-12 grid gap-4 ${
              events.length === 1
                ? "sm:grid-cols-1 max-w-md"
                : events.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-3"
            }`}
          >
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/news-events#${event.slug}`}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-tnf-green/40 hover:shadow-md"
              >
                <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-tnf-navy px-4 py-2 text-center text-white">
                  <span className="text-xs font-bold uppercase">{event.month}</span>
                  <span className="text-lg font-bold">{event.date}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-tnf-navy">{event.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{event.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
