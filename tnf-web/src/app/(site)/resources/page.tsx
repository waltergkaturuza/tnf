"use client";

import { useState } from "react";
import Link from "next/link";

const resourceCategories = [
  "All",
  "Annual Reports",
  "Strategic Plans",
  "Policy Papers",
  "Press Releases",
];

const placeholderResources = [
  { title: "TNF Annual Report 2024", category: "Annual Reports", year: "2024", type: "PDF" },
  { title: "TNF Strategic Plan 2024-2028", category: "Strategic Plans", year: "2024", type: "PDF" },
  { title: "Labour Market Policy Brief", category: "Policy Papers", year: "2024", type: "PDF" },
  { title: "Social Contract Negotiation Update", category: "Press Releases", year: "2024", type: "PDF" },
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Resources</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Reports, strategic plans, policy papers, and press releases.
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

            <div className="space-y-4">
              {placeholderResources
                .filter((r) => filter === "All" || r.category === filter)
                .map((resource) => (
                  <div
                    key={resource.title}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-semibold text-tnf-navy">{resource.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {resource.category} · {resource.year}
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="inline-flex items-center rounded-full bg-tnf-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tnf-navy-light"
                    >
                      Download
                    </Link>
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
