"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const resourceCategories = [
  "All",
  "Annual Reports",
  "Strategic Plans",
  "Annual Performance Plans",
  "TNF Reports and Plans",
  "Policy Papers",
  "Press Releases",
];

const placeholderResources = [
  { title: "TNF Annual Report 2024", category: "Annual Reports", year: "2024", type: "PDF", size: "2.4 MB", thumbnail: "/file.svg" },
  { title: "TNF Annual Report 2023", category: "Annual Reports", year: "2023", type: "PDF", size: "1.8 MB", thumbnail: "/file.svg" },
  { title: "TNF Strategic Plan 2024-2028", category: "Strategic Plans", year: "2024", type: "PDF", size: "1.2 MB", thumbnail: "/file.svg" },
  { title: "TNF Two-Year Strategic Plan 2024-2026", category: "Strategic Plans", year: "2024", type: "PDF", size: "890 KB", thumbnail: "/file.svg" },
  { title: "Annual Performance Plan 2024", category: "Annual Performance Plans", year: "2024", type: "PDF", size: "650 KB", thumbnail: "/file.svg" },
  { title: "TNF Reports and Plans", category: "TNF Reports and Plans", year: "2024", type: "PDF", size: "1.1 MB", thumbnail: "/file.svg" },
  { title: "Labour Market Policy Brief", category: "Policy Papers", year: "2024", type: "PDF", size: "420 KB", thumbnail: "/file.svg" },
  { title: "Social Contract Negotiation Update", category: "Press Releases", year: "2024", type: "PDF", size: "180 KB", thumbnail: "/file.svg" },
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Plans & Reports</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Annual reports, strategic plans, performance plans, policy papers, and press releases.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-64">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900">Category</h3>
                <div className="mt-3 space-y-1">
                  {resourceCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                        filter === cat ? "bg-tnf-navy text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
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
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center gap-4">
              <input
                type="search"
                placeholder="Search resources..."
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {placeholderResources
                .filter((r) => filter === "All" || r.category === filter)
                .map((resource) => (
                  <div
                    key={resource.title}
                    className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-28 w-24 shrink-0 items-center justify-center bg-slate-100">
                      <Image
                        src={resource.thumbnail}
                        alt=""
                        width={48}
                        height={48}
                        className="opacity-60"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="font-semibold text-tnf-navy line-clamp-2">{resource.title}</h3>
                        <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-500">
                          <span>{resource.category}</span>
                          <span>·</span>
                          <span>{resource.year}</span>
                          <span>·</span>
                          <span>{resource.type}</span>
                          <span>·</span>
                          <span>{resource.size}</span>
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-tnf-gold hover:text-tnf-navy"
                      >
                        Download
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Full document library coming soon. Contact us for specific reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
