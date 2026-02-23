"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Search } from "./Search";

type NavItem = { href: string; label: string };
type NavEntry = NavItem & { children?: NavItem[] };

const linkClass = "rounded-md px-3 py-2 text-base font-bold text-slate-700 transition-colors hover:bg-tnf-navy/5 hover:text-tnf-navy whitespace-nowrap";
const dropdownClass = "block w-full rounded-md px-3 py-2 text-left text-base text-slate-700 hover:bg-tnf-navy/5 hover:text-tnf-navy whitespace-nowrap";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = siteConfig.nav as NavEntry[];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-wide flex h-20 items-center sm:h-24">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/tnf-logo.png"
            alt="TNF Tripartite Negotiating Forum"
            width={180}
            height={60}
            className="h-12 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-center md:gap-6 md:px-8 lg:gap-8 lg:px-12" aria-label="Main navigation">
          {navItems.map((item) =>
            item.children?.length ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`${linkClass} flex items-center gap-0.5`}
                >
                  {item.label}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div
                  className={`absolute left-0 top-full pt-1 ${openDropdown === item.label ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity`}
                >
                  <div className="min-w-[200px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={dropdownClass}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Search />
          <Link
            href="/contact"
            className="hidden rounded-full bg-tnf-gold px-4 py-2 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-gold/90 sm:block"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="container-wide border-t border-slate-200 bg-white py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Main navigation">
            {navItems.map((item) =>
              item.children?.length ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-slate-200 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
