"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { search } from "@/lib/search-index";

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof search>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
        aria-label="Search site (Ctrl+K)"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded bg-slate-100 px-1.5 py-0.5 text-xs sm:inline">⌘K</kbd>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="fixed left-1/2 top-24 z-50 w-full max-w-xl -translate-x-1/2 px-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-200 px-4">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages..."
                  className="flex-1 py-3 outline-none"
                  autoComplete="off"
                  aria-label="Search"
                />
                <kbd className="rounded bg-slate-100 px-2 py-1 text-xs">Esc</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {query.trim() === "" ? (
                  <p className="px-4 py-6 text-center text-sm text-slate-500">
                    Type to search pages, work areas, reports, and more.
                  </p>
                ) : results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-slate-500">
                    No results for &quot;{query}&quot;
                  </p>
                ) : (
                  <ul>
                    {results.slice(0, 10).map((item) => (
                      <li key={item.href}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item.href)}
                          className="flex w-full flex-col gap-0.5 px-4 py-3 text-left hover:bg-slate-50"
                        >
                          <span className="font-medium text-tnf-navy">{item.title}</span>
                          {item.description && (
                            <span className="text-xs text-slate-500">{item.description}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
