"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Search } from "./Search";

type NavItem = { href: string; label: string };
type NavEntry = NavItem & { children?: NavItem[] };

const linkClass =
  "rounded-md px-2 py-1.5 text-sm font-bold text-slate-700 transition-colors hover:bg-tnf-navy/5 hover:text-tnf-navy xl:px-2.5 xl:text-[0.9375rem]";
const dropdownClass =
  "block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-tnf-navy/5 hover:text-tnf-navy";

const mobileBoxClass =
  "flex w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3.5 text-center transition-colors hover:border-slate-300";
const mobileLinkClass = `${mobileBoxClass} text-xs font-bold uppercase tracking-[0.12em] text-slate-800 hover:text-tnf-navy sm:text-sm`;
const mobileAccordionClass = `${mobileBoxClass} gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-800 sm:text-sm`;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = siteConfig.nav as NavEntry[];
  const mobileNavItems = navItems.filter((item) => item.href !== "/contact");

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full overflow-visible border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="container-wide flex min-w-0 items-center gap-2 py-3 sm:gap-3 sm:py-4">
        <Link href="/" className="flex min-w-0 shrink items-center">
          <Image
            src="/tnf-logo.png"
            alt="TNF Tripartite Negotiating Forum"
            width={180}
            height={60}
            className="h-9 w-auto max-w-[min(180px,55vw)] object-contain sm:h-11 xl:h-14"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-visible px-1 xl:flex xl:gap-1 xl:px-2"
          aria-label="Main navigation"
        >
          {navItems.map((item) =>
            item.children?.length ? (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-stretch">
                  <Link href={item.href} className={`${linkClass} flex items-center gap-0.5`}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    aria-label={`${item.label} menu`}
                    onClick={() =>
                      setOpenDropdown((current) => (current === item.label ? null : item.label))
                    }
                    className={`${linkClass} flex items-center px-1`}
                  >
                    <Chevron open={openDropdown === item.label} />
                  </button>
                </div>
                <div
                  className={`absolute left-0 top-full z-[60] pt-1 transition-opacity duration-150 ${
                    openDropdown === item.label
                      ? "pointer-events-auto visible opacity-100"
                      : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                  }`}
                >
                  <div className="min-w-[220px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        className={dropdownClass}
                        onClick={() => setOpenDropdown(null)}
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
            ),
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Search />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer — slides in from the right with blurred backdrop */}
      <div
        className={`fixed inset-0 z-[100] xl:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobile}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[42vw] min-w-[10.5rem] max-w-[13.5rem] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-[15rem] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMobile}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-2.5 overflow-y-auto px-4 py-5" aria-label="Main navigation">
            {mobileNavItems.map((item) =>
              item.children?.length ? (
                <div key={item.label} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className={mobileAccordionClass}
                    aria-expanded={mobileExpanded === item.label}
                  >
                    <span>{item.label}</span>
                    <Chevron open={mobileExpanded === item.label} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="space-y-1.5 pl-1">
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="block rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center text-xs font-semibold text-tnf-green hover:bg-white"
                      >
                        All {item.label}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          onClick={closeMobile}
                          className="block rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center text-xs text-slate-600 hover:bg-white hover:text-tnf-navy"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} onClick={closeMobile} className={mobileLinkClass}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="shrink-0 border-t border-slate-200 p-4">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="btn-tnf-primary block w-full rounded-full py-3 text-center text-xs font-semibold uppercase tracking-wide shadow-md sm:text-sm"
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
