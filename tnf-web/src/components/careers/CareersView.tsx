"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { VacancyItem } from "@/lib/vacancies";

type FilterTab = "all" | "vacancies" | "achievements";

type Props = {
  vacancies: VacancyItem[];
};

const UPDATES_CARD = "updates-card p-6 sm:p-7";

const WHY_TNF = [
  "Contribute to national social dialogue and policy",
  "Collaborative, inclusive work environment",
  "Growth and professional development",
  "Work alongside Government, business and labour",
];

const QUICK_LINKS = [
  { href: "/about/team", label: "Meet our team" },
  { href: "/news-events", label: "News and events" },
  { href: "/about", label: "About TNF" },
  { href: "/contact", label: "Contact us" },
];

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vacancies", label: "Vacancies" },
  { id: "achievements", label: "Employees' Achievements" },
];

function AdvertSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wide text-tnf-navy">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tnf-green" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VacancyCard({
  vacancy,
  expanded,
  onToggleExpand,
}: {
  vacancy: VacancyItem;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const hasHowToApply = vacancy.deliveryAddress.length > 0 || Boolean(vacancy.applicationEmail);
  const mailto = vacancy.applicationEmail
    ? `mailto:${vacancy.applicationEmail}?subject=${encodeURIComponent(`Application: ${vacancy.title}`)}`
    : null;

  return (
    <article id={vacancy.slug} className={`${UPDATES_CARD} min-w-0 scroll-mt-28`}>
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-tnf-navy/70">
        <span className="text-tnf-green">Vacancy</span>
        <span>·</span>
        <span className="normal-case">
          Closing date <time dateTime={vacancy.closingDateISO}>{vacancy.closingDateDisplay}</time>
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold leading-snug text-tnf-navy sm:text-xl">{vacancy.title}</h3>
      {vacancy.reportingTo && (
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold text-tnf-navy">Reporting to:</span> {vacancy.reportingTo}
        </p>
      )}
      {vacancy.intro && (
        <p className={`about-text-justify mt-3 text-sm text-slate-600 ${expanded ? "" : "line-clamp-2"}`}>
          {vacancy.intro}
        </p>
      )}

      {expanded && (
        <div className="mt-6 space-y-6 border-t border-slate-200/70 pt-6">
          <AdvertSection title="Key responsibilities" items={vacancy.responsibilities} />
          <AdvertSection title="Qualifications and experience" items={vacancy.qualifications} />
          <AdvertSection title="Skills and competencies" items={vacancy.skills} />

          {vacancy.applicationProcedure && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-tnf-navy">Application procedure</h4>
              <p className="about-text-justify mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {vacancy.applicationProcedure}
              </p>
            </div>
          )}

          {hasHowToApply && (
            <div className="grid gap-4 sm:grid-cols-2">
              {vacancy.deliveryAddress.length > 0 && (
                <div className="rounded-xl border border-white/60 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-tnf-green">Hand deliver to</p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-tnf-navy">
                    {vacancy.deliveryAddress.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              )}
              {vacancy.applicationEmail && mailto && (
                <div className="rounded-xl border border-white/60 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-tnf-green">
                    {vacancy.deliveryAddress.length > 0 ? "Or email to" : "Email to"}
                  </p>
                  <a href={mailto} className="mt-2 block break-all text-sm font-semibold text-tnf-navy hover:text-tnf-green">
                    {vacancy.applicationEmail}
                  </a>
                </div>
              )}
            </div>
          )}

          <p className="rounded-lg bg-tnf-green/10 px-4 py-3 text-sm font-semibold text-tnf-navy">
            Closing date: <time dateTime={vacancy.closingDateISO}>{vacancy.closingDateDisplay}</time>
          </p>
          {vacancy.notice && <p className="text-sm italic text-slate-500">{vacancy.notice}</p>}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {mailto && (
          <a
            href={mailto}
            className="inline-flex items-center rounded-lg bg-tnf-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tnf-green/90"
          >
            Apply by email →
          </a>
        )}
        {vacancy.advertUrl && (
          <a
            href={vacancy.advertUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-tnf-green/40 bg-white/70 px-4 py-2.5 text-sm font-semibold text-tnf-green transition-colors hover:bg-white"
          >
            Download advert (PDF)
          </a>
        )}
        <button
          type="button"
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1 text-sm font-semibold text-tnf-green hover:underline"
        >
          {expanded ? "Show less" : "View full advert →"}
        </button>
      </div>
    </article>
  );
}

export function CareersView({ vacancies }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    vacancies.length === 1 ? vacancies[0].slug : null,
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      let target: string | null = null;
      if (hash === "vacancies" || hash === "achievements") {
        setActiveTab(hash);
        target = hash;
      } else if (vacancies.some((v) => v.slug === hash)) {
        setActiveTab("vacancies");
        setExpandedSlug(hash);
        target = hash;
      }
      if (!target) return;
      const id = target;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [vacancies]);

  const showIntro = activeTab === "all";
  const showVacancies = activeTab === "all" || activeTab === "vacancies";
  const showAchievements = activeTab === "all" || activeTab === "achievements";

  return (
    <div className="page-updates">
      {/* Header + filters */}
      <div className="page-shell-hero border-b border-emerald-800/30 py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <h1 className="text-center text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Careers at TNF
          </h1>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
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
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,380px)] xl:gap-12 xl:px-12">
          <div className="min-w-0 space-y-8">
            {showIntro && (
              <article className={`${UPDATES_CARD} min-w-0 overflow-hidden p-0`}>
                <div className="relative">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src="/TNF in Action/TNF annual retreat.jpg"
                      alt="TNF members in a consultation meeting"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-tnf-green px-2.5 py-1 text-xs font-bold uppercase text-white">
                      Careers
                    </span>
                    <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold uppercase text-tnf-navy shadow-sm">
                      Join our team
                    </span>
                  </div>
                </div>
                <div className="min-w-0 p-5 sm:p-8 lg:p-10">
                  <h2 className="text-xl font-bold leading-snug text-tnf-navy sm:text-2xl lg:text-3xl">
                    Be part of promoting transparency, integrity and effective social dialogue in Zimbabwe
                  </h2>
                  <p className="about-text-justify mt-4 leading-relaxed text-slate-600">
                    We are always looking for passionate and talented individuals who are eager to make a difference
                    and contribute to our mission. At TNF, you&apos;ll find a collaborative and dynamic work
                    environment where your skills and ideas are valued.
                  </p>
                  <p className="about-text-justify mt-4 leading-relaxed text-slate-600">
                    Explore our current job openings and internship opportunities to find a role that suits your
                    expertise and interests. Whether you are an experienced professional or just starting your career,
                    TNF offers opportunities for growth and development. We are committed to creating an inclusive
                    workplace where every team member can thrive.
                  </p>
                  <p className="mt-4 font-semibold text-tnf-navy">
                    Apply today and help us shape the future of social dialogue in Zimbabwe!
                  </p>
                </div>
              </article>
            )}

            {showVacancies && (
              <section id="vacancies" className="scroll-mt-28 space-y-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">Vacancies</h2>
                {vacancies.length === 0 ? (
                  <div className={`${UPDATES_CARD} min-w-0`}>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-tnf-navy/70">
                      <span className="text-tnf-green">Vacancies</span>
                      <span>·</span>
                      <span>No open positions</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-tnf-navy sm:text-xl">
                      There are no open positions at the moment
                    </h3>
                    <p className="about-text-justify mt-2 text-sm text-slate-600">
                      Please check back later or contact us to express your interest in future opportunities at TNF.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center rounded-lg bg-tnf-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tnf-green/90"
                      >
                        Express interest →
                      </Link>
                    </div>
                  </div>
                ) : (
                  vacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      expanded={expandedSlug === vacancy.slug}
                      onToggleExpand={() =>
                        setExpandedSlug((prev) => (prev === vacancy.slug ? null : vacancy.slug))
                      }
                    />
                  ))
                )}
              </section>
            )}

            {showAchievements && (
              <section id="achievements" className="scroll-mt-28 space-y-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">
                  Employees&apos; Achievements
                </h2>
                <div className={`${UPDATES_CARD} min-w-0`}>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-tnf-navy/70">
                    <span className="text-tnf-green">Our people</span>
                    <span>·</span>
                    <span>Coming soon</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-tnf-navy sm:text-xl">
                    Celebrating our staff
                  </h3>
                  <p className="about-text-justify mt-2 text-sm text-slate-600">
                    Stories celebrating TNF staff contributions to social dialogue and national development will be
                    shared here.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="/about/team"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-tnf-green hover:underline"
                    >
                      Meet our team →
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className={UPDATES_CARD}>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-tnf-navy">
                <svg className="h-4 w-4 text-tnf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Open positions
              </h3>
              <p className="mt-3 text-3xl font-bold text-tnf-navy">{vacancies.length}</p>
              {vacancies.length === 0 ? (
                <p className="mt-1 text-sm text-slate-600">No roles are currently advertised.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {vacancies.map((vacancy) => (
                    <li key={vacancy.id}>
                      <a
                        href={`#${vacancy.slug}`}
                        className="group block"
                        onClick={() => {
                          setActiveTab("vacancies");
                          setExpandedSlug(vacancy.slug);
                        }}
                      >
                        <p className="line-clamp-2 text-sm font-medium text-tnf-navy group-hover:text-tnf-green">
                          {vacancy.title}
                        </p>
                        <p className="mt-1 text-xs font-medium text-tnf-navy/70">
                          Closes {vacancy.closingDateDisplay}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={UPDATES_CARD}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">Why work at TNF</h3>
              <ul className="mt-4 space-y-3">
                {WHY_TNF.map((reason) => (
                  <li key={reason} className="flex gap-2 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-tnf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={UPDATES_CARD}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-navy">Quick links</h3>
              <ul className="mt-4 space-y-1">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-white/50 hover:text-tnf-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={UPDATES_CARD}>
              <h3 className="text-sm font-semibold text-tnf-navy">Interested in joining TNF?</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600">
                Get in touch to express your interest and we&apos;ll keep you in mind for future opportunities.
              </p>
              <Link
                href="/contact"
                className="btn-tnf-primary mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all hover:shadow-md"
              >
                Contact Us
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
