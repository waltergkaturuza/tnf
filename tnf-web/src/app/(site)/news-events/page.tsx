"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const newsItems = [
  {
    title: "Zimbabwe Advances Social Justice and Just Transition Agenda",
    slug: "zimbabwe-advances-social-justice",
    date: "2024",
    excerpt: "TNF continues to drive the national dialogue on social justice and just transition.",
  },
  {
    title: "Technology Should Empower, Not Endanger: TNF Call to Action on Ending Online Violence Against Women and Girls",
    slug: "technology-empower-not-endanger",
    date: "2024",
    excerpt: "Tripartite partners unite on ending online violence against women and girls.",
  },
  {
    title: "Hon E. Moyo Officially Opens TNF Strategic Retreat in Victoria Falls",
    slug: "hon-moyo-opens-tnf-retreat",
    date: "2024",
    excerpt: "Minister opens strategic retreat to advance social dialogue priorities.",
  },
];

const pastEvents = [
  { title: "Corruption Dialogue Symposium", date: "Jul 12, 2024", location: "Jameson Hotel, Harare" },
  { title: "TNF Technical Committee Workshop", date: "Jul 21-25, 2024", location: "Leopard Rock Hotel, Vumba" },
  { title: "High Level Political Forum on Sustainable Development", date: "Jul 2024", location: "New York" },
  { title: "International Labour Conference Geneva", date: "Jun 2024", location: "Geneva" },
  { title: "TNF Retreat", date: "Jan 14-19, 2024", location: "Victoria Falls" },
  { title: "AICESIS General Assembly & China Economic & Social Forum", date: "Nov 2024", location: "Shanghai, China" },
];

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News & Events" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">News & Events</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Insights, updates, and upcoming TNF activities.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="border-b border-slate-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("news")}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === "news"
                  ? "border-tnf-gold text-tnf-navy"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === "events"
                  ? "border-tnf-gold text-tnf-navy"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Events
            </button>
          </nav>
        </div>

        {activeTab === "news" && (
          <div className="mt-12 space-y-8" id="news">
            {newsItems.map((item) => (
              <article key={item.slug} className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <time className="text-sm font-medium text-tnf-gold">{item.date}</time>
                <h2 className="mt-2 text-2xl font-bold text-tnf-navy">{item.title}</h2>
                <p className="mt-4 text-slate-600">{item.excerpt}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="mt-12" id="events">
            <h2 className="text-xl font-semibold text-tnf-navy">Past Events</h2>
            <p className="mt-2 text-slate-600">Archive of TNF events and dialogues.</p>
            <div className="mt-8 space-y-4">
              {pastEvents.map((event) => (
                <div
                  key={event.title}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center"
                >
                  <div className="flex shrink-0 flex-col items-center rounded-lg bg-tnf-navy px-6 py-3 text-white">
                    <span className="text-xs font-bold uppercase">Past</span>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-tnf-navy">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">
              2025 events will be posted here. Contact us for inquiries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
