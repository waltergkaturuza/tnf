"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { trackResourceDownload } from "@/components/analytics/AnalyticsTracker";
import {
  RESOURCE_CATEGORY_OPTIONS,
  type ResourceListItem,
} from "@/lib/resources-shared";

type Props = {
  resources: ResourceListItem[];
};

export function ResourcesLibrary({ resources }: Props) {
  const [filter, setFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("All");
  const [query, setQuery] = useState("");

  const years = useMemo(() => {
    const set = new Set(
      resources.map((r) => r.year).filter((y) => y && y !== "—"),
    );
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [resources]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (filter !== "all" && r.category !== filter) return false;
      if (yearFilter !== "All" && r.year !== yearFilter) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        (r.description?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [resources, filter, yearFilter, query]);

  return (
    <div id="reports-plans" className="scroll-mt-28 flex flex-col gap-6 lg:flex-row">
      <aside className="lg:w-64">
        <div className="about-card sticky top-24 space-y-6 p-5 sm:p-6">
          <div>
            <h3 className="font-semibold text-slate-900">Category</h3>
            <div className="mt-3 space-y-1">
              {RESOURCE_CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFilter(cat.value)}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                    filter === cat.value
                      ? "bg-tnf-green text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Year</h3>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="mt-3 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
            >
              <option value="All">All years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="about-card p-8 text-center">
            <p className="text-sm text-slate-600">
              {resources.length === 0
                ? "No published resources yet. Documents added in the admin will appear here once published."
                : "No resources match your filters."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((resource) => (
              <div key={resource.id} className="about-card flex overflow-hidden p-0">
                <div className="flex h-28 w-24 shrink-0 items-center justify-center bg-slate-100">
                  <Image src="/file.svg" alt="" width={48} height={48} className="opacity-60" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-2 font-semibold text-tnf-navy">{resource.title}</h3>
                    <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs font-medium text-tnf-navy/70">
                      <span>{resource.categoryLabel}</span>
                      <span aria-hidden>·</span>
                      <span>{resource.year}</span>
                      <span aria-hidden>·</span>
                      <span>{resource.type}</span>
                      <span aria-hidden>·</span>
                      <span>{resource.size}</span>
                    </p>
                  </div>
                  <a
                    href={resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackResourceDownload("/resources", resource.title)}
                    className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-tnf-green hover:text-tnf-green"
                  >
                    Download
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
