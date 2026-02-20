import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function WorkAreaCards() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            Work Areas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Explore the key focus areas where TNF facilitates dialogue and drives policy outcomes.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.workAreas.map((area, i) => (
            <div
              key={area.id}
            >
              <Link href={`/work-areas#${area.slug}`}>
                <div className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-tnf-gold/50 hover:shadow-lg">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tnf-navy/10 text-tnf-navy">
                    <span className="text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-semibold text-tnf-navy group-hover:text-tnf-navy-light">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{area.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-tnf-gold">
                    Learn more
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/work-areas"
            className="inline-flex items-center rounded-full border-2 border-tnf-navy px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white"
          >
            View All Work Areas
          </Link>
        </div>
      </div>
    </section>
  );
}
