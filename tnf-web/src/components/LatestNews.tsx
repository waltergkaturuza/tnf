import Link from "next/link";
import { getPosts } from "@/lib/payload";

const FALLBACK_NEWS = [
  { title: "Zimbabwe Advances Social Justice and Just Transition Agenda", slug: "zimbabwe-advances-social-justice", excerpt: "TNF continues to drive the national dialogue.", date: "2024" },
  { title: "Technology Should Empower, Not Endanger: TNF Call to Action", slug: "technology-empower-not-endanger", excerpt: "Tripartite partners unite on ending online violence.", date: "2024" },
  { title: "Hon E. Moyo Officially Opens TNF Strategic Retreat", slug: "hon-moyo-opens-tnf-retreat", excerpt: "Minister opens strategic retreat in Victoria Falls.", date: "2024" },
];

export async function LatestNews() {
  let items = FALLBACK_NEWS;
  try {
    const { docs } = await getPosts(3);
    if (docs?.length) {
      items = docs.map((p: { title: string; slug: string; excerpt?: string; publishedAt?: string }) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        date: p.publishedAt ? new Date(p.publishedAt).getFullYear().toString() : "",
      }));
    }
  } catch {
    // Use fallback
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">Latest News</h2>
            <p className="mt-4 text-lg text-slate-600">Insights and updates from the TNF.</p>
          </div>
          <Link href="/news-events" className="rounded-full border-2 border-tnf-navy px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-navy hover:text-white">
            View All
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.slug}>
              <Link href={`/news-events#${item.slug}`} className="block group">
                <div className="h-full rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-all group-hover:border-tnf-gold/50 group-hover:bg-white group-hover:shadow-md">
                  <time className="text-sm font-medium text-tnf-gold">{item.date}</time>
                  <h3 className="mt-2 font-semibold text-tnf-navy group-hover:text-tnf-navy-light">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
