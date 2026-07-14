import Image from "next/image";
import Link from "next/link";
import { getUpcomingEventCards } from "@/lib/home-cards";

export async function UpcomingEvents() {
  const events = await getUpcomingEventCards(3);

  return (
    <section className="bg-slate-50 py-8 sm:py-10">
      <div className="page-shell-inner">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="sm:flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-tnf-navy sm:text-3xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-base text-slate-600 sm:text-lg">
              Dialogues, workshops, and meetings across Zimbabwe.
            </p>
          </div>
          <Link
            href="/news-events#events"
            className="shrink-0 rounded-full border-2 border-tnf-navy px-5 py-2.5 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white"
          >
            View Calendar
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="mt-6 text-center text-sm text-slate-600">
            No published events yet. Add events in Admin → Events and set status to Published.
          </p>
        ) : (
          <div
            className={`mt-6 grid gap-4 ${
              events.length === 1
                ? "max-w-xl sm:grid-cols-1"
                : events.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-3"
            }`}
          >
            {events.map((event) => {
              const external =
                !!event.imageUrl &&
                (event.imageUrl.startsWith("http://") ||
                  event.imageUrl.startsWith("https://"));

              return (
                <Link
                  key={event.slug}
                  href={`/news-events#${event.slug}`}
                  className="flex gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-tnf-green/40 hover:shadow-md sm:gap-4 sm:p-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-tnf-navy sm:h-24 sm:w-24">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt=""
                        fill
                        unoptimized={external || event.imageUrl.startsWith("/api/")}
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          {event.month}
                        </span>
                        <span className="text-sm font-bold leading-tight">{event.date}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 self-center">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-tnf-green">
                      <span className="uppercase">{event.month}</span>
                      <span aria-hidden>·</span>
                      <span>{event.date}</span>
                    </div>
                    <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-tnf-navy">
                      {event.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{event.location}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
