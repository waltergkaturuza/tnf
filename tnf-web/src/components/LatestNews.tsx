import Link from "next/link";
import { getLatestNewsCards } from "@/lib/home-cards";

export async function LatestNews() {
  const items = await getLatestNewsCards(3);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell-inner">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="sm:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">Latest News</h2>
            <p className="mt-4 text-lg text-slate-600">Insights and updates from the TNF.</p>
          </div>
          <Link
            href="/news-events#news"
            className="shrink-0 rounded-full border-2 border-tnf-navy px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white"
          >
            View All
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-600">
            No published news yet. Add posts in Admin → Posts and set status to Published.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.slug}>
                <Link href={`/news-events#${item.slug}`} className="group block">
                  <div className="h-full rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-all group-hover:border-tnf-green/50 group-hover:bg-white group-hover:shadow-md">
                    {item.date && (
                      <time className="text-sm font-medium text-tnf-green">{item.date}</time>
                    )}
                    <h3 className="mt-2 font-semibold text-tnf-navy group-hover:text-tnf-navy-light">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.excerpt}</p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
