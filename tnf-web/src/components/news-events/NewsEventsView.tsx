"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UpdateCategory, UpdateItem } from "@/lib/updates";
import { UPDATE_CATEGORIES } from "@/lib/updates";

type FilterTab = "all" | "news" | "events";

type Props = {
  items: UpdateItem[];
};

const UPDATES_CARD = "updates-card p-5 sm:p-6";

function matchesSearch(item: UpdateItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    item.title.toLowerCase().includes(q) ||
    item.excerpt.toLowerCase().includes(q) ||
    (item.location?.toLowerCase().includes(q) ?? false)
  );
}

function FeaturedImage({ item }: { item: UpdateItem }) {
  if (item.imageUrl) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          unoptimized={item.imageUrl.startsWith("http://localhost")}
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-tnf-navy-light to-tnf-navy">
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <span className="text-6xl font-serif text-white">TNF</span>
      </div>
    </div>
  );
}

export function NewsEventsView({ items }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeCategory, setActiveCategory] = useState<UpdateCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeTab === "news" && item.type !== "news") return false;
      if (activeTab === "events" && item.type !== "event") return false;
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      return matchesSearch(item, searchQuery);
    });
  }, [items, activeTab, activeCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const recentPosts = items.slice(0, 5);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "news", label: "Current News" },
    { id: "events", label: "Upcoming Events" },
  ];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "news") setActiveTab("news");
    else if (hash === "events") setActiveTab("events");
  }, []);

  return (
    <div className="page-updates">
      {/* Header + filters */}
      <div className="page-shell-hero border-b border-emerald-800/30 py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
          <h1 className="text-center text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            News and Events
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-white text-tnf-green shadow-md"
                    : "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content on pearl */}
      <div className="updates-tone-pearl py-10 lg:py-14">
        <span id="news" className="block scroll-mt-28" aria-hidden />
        <span id="events" className="block scroll-mt-28" aria-hidden />
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:gap-12 lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <div className="min-w-0 space-y-8">
            {featured ? (
              <article className={`${UPDATES_CARD} min-w-0 overflow-hidden p-0`}>
                <div className="relative">
                  <FeaturedImage item={featured} />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-tnf-green px-2.5 py-1 text-xs font-bold uppercase text-white">
                      {featured.category}
                    </span>
                    <span className="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase text-tnf-navy shadow-sm">
                      {featured.type === "event" ? "Event" : "Article"}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 p-4 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <time dateTime={featured.dateISO}>{featured.dateDisplay}</time>
                    {featured.location && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-tnf-green">{featured.location}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{featured.category}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-snug text-tnf-navy sm:text-2xl lg:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="about-text-justify mt-4 line-clamp-4 leading-relaxed text-slate-600">
                    {featured.excerpt}
                  </p>
                  <Link
                    href={`/news-events#${featured.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-tnf-green hover:text-tnf-green"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ) : (
              <p className={`${UPDATES_CARD} text-center text-slate-500`}>
                No updates match your filters. Try another category or search term.
              </p>
            )}

            {rest.length > 0 && (
              <div className="space-y-5">
                {rest.map((item) => (
                  <article
                    key={item.id}
                    id={item.slug}
                    className={`${UPDATES_CARD} min-w-0 scroll-mt-28`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      <span className="text-tnf-green">{item.category}</span>
                      <span>·</span>
                      <time dateTime={item.dateISO}>{item.dateDisplay}</time>
                      {item.location && (
                        <>
                          <span>·</span>
                          <span className="normal-case text-tnf-green">{item.location}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-tnf-navy sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="about-text-justify mt-2 line-clamp-2 text-sm text-slate-600">
                      {item.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className={UPDATES_CARD}>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-tnf-navy">
                <svg className="h-4 w-4 text-tnf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </h3>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search updates"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-[#f9f8f6] px-4 py-2.5 text-sm text-tnf-navy placeholder-slate-400 outline-none focus:border-tnf-green focus:ring-1 focus:ring-tnf-green/30"
                aria-label="Search updates"
              />
            </div>

            <div className={UPDATES_CARD}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">Recent posts</h3>
              <ul className="mt-4 space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/news-events#${post.slug}`}
                      className="group block"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                        setActiveTab("all");
                      }}
                    >
                      <p className="line-clamp-2 text-sm font-medium text-tnf-navy group-hover:text-tnf-green">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {post.category} · {post.dateDisplay}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${UPDATES_CARD} bg-[#f9f8f6]`}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">Categories</h3>
              <ul className="mt-4 space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === "All"
                        ? "bg-tnf-green/15 font-semibold text-tnf-navy"
                        : "text-slate-600 hover:bg-white hover:text-tnf-navy"
                    }`}
                  >
                    All
                  </button>
                </li>
                {UPDATE_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-tnf-green/15 font-semibold text-tnf-navy"
                          : "text-slate-600 hover:bg-white hover:text-tnf-navy"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={UPDATES_CARD}>
              <h3 className="text-sm font-semibold text-tnf-navy">Stay Updated</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600">
                Subscribe for TNF updates, event announcements and more.
              </p>
              <Link
                href="/contact"
                className="btn-tnf-primary mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all hover:shadow-md"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom strip — mist tone */}
      <div className="updates-tone-mist h-8 border-t border-slate-200/40" aria-hidden />
    </div>
  );
}
