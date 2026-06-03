"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UpdateCategory, UpdateItem } from "@/lib/updates";
import { UPDATE_CATEGORIES } from "@/lib/updates";

type FilterTab = "all" | "news" | "events";

type Props = {
  items: UpdateItem[];
};

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
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
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
    { id: "news", label: "News" },
    { id: "events", label: "Upcoming Events" },
  ];

  return (
    <div className="bg-[#0f1f33] text-white">
      {/* Announcement strip */}
      <div className="bg-emerald-600 px-[10mm] py-3 text-center text-sm font-medium text-white sm:text-base">
        Latest TNF news, announcements and upcoming events.
      </div>

      <div className="container-wide py-10 lg:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Updates &amp; Events
        </h1>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-tnf-gold text-tnf-navy"
                  : "border border-white/25 bg-white/5 text-slate-200 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="min-w-0 space-y-8">
            {featured ? (
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="relative">
                  <FeaturedImage item={featured} />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-tnf-gold px-2.5 py-1 text-xs font-bold uppercase text-tnf-navy">
                      {featured.category}
                    </span>
                    <span className="rounded-md bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase text-white backdrop-blur-sm">
                      {featured.type === "event" ? "Event" : "Article"}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                    <time dateTime={featured.dateISO}>{featured.dateDisplay}</time>
                    {featured.location && (
                      <>
                        <span className="text-slate-500">·</span>
                        <span className="font-medium text-tnf-gold">{featured.location}</span>
                      </>
                    )}
                    <span className="text-slate-500">·</span>
                    <span>{featured.category}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-tnf-gold sm:text-3xl">{featured.title}</h2>
                  <p className="mt-4 line-clamp-4 text-slate-300 leading-relaxed">{featured.excerpt}</p>
                  <Link
                    href={`/news-events#${featured.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-tnf-gold hover:text-tnf-gold-light"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ) : (
              <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
                No updates match your filters. Try another category or search term.
              </p>
            )}

            {rest.length > 0 && (
              <div className="space-y-6">
                {rest.map((item) => (
                  <article
                    key={item.id}
                    id={item.slug}
                    className="scroll-mt-28 rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <span className="text-tnf-gold">{item.category}</span>
                      <span>·</span>
                      <time dateTime={item.dateISO}>{item.dateDisplay}</time>
                      {item.location && (
                        <>
                          <span>·</span>
                          <span className="normal-case text-tnf-gold">{item.location}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">{item.excerpt}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
                <svg className="h-4 w-4 text-tnf-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </h3>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search updates"
                className="mt-3 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-tnf-gold"
                aria-label="Search updates"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Recent posts</h3>
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
                      <p className="text-sm font-medium text-white group-hover:text-tnf-gold line-clamp-2">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {post.category} · {post.dateDisplay}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Categories</h3>
              <ul className="mt-4 space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === "All"
                        ? "bg-white/10 font-semibold text-tnf-gold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
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
                          ? "bg-white/10 font-semibold text-tnf-gold"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
              <p className="mt-2 text-sm text-slate-400">
                Subscribe for TNF updates, event announcements and more.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block w-full rounded-lg bg-tnf-gold py-2.5 text-center text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-gold-light"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
