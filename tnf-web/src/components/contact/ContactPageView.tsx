"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { submitToPayload } from "@/lib/submit-form";

const CONTACT_CARD = "about-card p-6 lg:p-8";

function telHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.startsWith("263")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+263${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tnf-navy/10 text-tnf-navy">
      {children}
    </div>
  );
}

export function ContactPageView() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await submitToPayload({
      type: "contact",
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });
    if (result.ok) setSubmitted(true);
    else setError(result.error || "Something went wrong");
  };

  return (
    <div className="page-about">
      <div className="bg-tnf-green/90 px-5 py-3 text-center text-sm font-medium text-white sm:text-base">
        Get in touch with the TNF Secretariat — we welcome your enquiries on social dialogue,
        programmes and partnerships.
      </div>

      <section className="about-tone-ivory border-b border-slate-200/40 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-10">
          <p className="tnf-label text-sm font-semibold uppercase tracking-widest">Contact</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="about-text-justify mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            Reach the Tripartite Negotiating Forum Secretariat in Harare. For summit registration
            and programme enquiries, visit the{" "}
            <a
              href="https://summit.tnfzim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-tnf-green hover:text-tnf-green"
            >
              TNF Global Summit
            </a>{" "}
            website.
          </p>
        </div>
      </section>

      <section className="about-tone-warm py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10">
          <div className="space-y-6">
            <div className={CONTACT_CARD}>
              <h2 className="text-lg font-semibold text-tnf-navy">TNF Secretariat</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tripartite Negotiating Forum — national platform for government, business and labour.
              </p>

              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <ContactIcon>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </ContactIcon>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-0.5 block font-medium text-tnf-navy hover:text-tnf-green"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <ContactIcon>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </ContactIcon>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                    <a
                      href={telHref(siteConfig.contact.phone)}
                      className="mt-0.5 block font-medium text-tnf-navy hover:text-tnf-green"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <ContactIcon>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </ContactIcon>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</p>
                    <p className="mt-0.5 font-medium leading-relaxed text-tnf-navy">
                      East Wing Block 3 Celestial Park
                      <br />
                      Borrowdale, Harare
                      <br />
                      Zimbabwe
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <ContactIcon>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </ContactIcon>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Website</p>
                    <a
                      href={siteConfig.url}
                      className="mt-0.5 block font-medium text-tnf-green hover:text-tnf-green"
                    >
                      tnfzim.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className={CONTACT_CARD}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">
                Secretariat team
              </h3>
              <ul className="mt-4 divide-y divide-slate-100">
                {siteConfig.contact.team.map((member) => (
                  <li key={member.name} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="font-medium text-tnf-navy">{member.name}</span>
                    <a
                      href={telHref(member.phone)}
                      className="text-sm font-medium text-slate-600 hover:text-tnf-green"
                    >
                      {member.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={CONTACT_CARD}>
            <h2 className="text-lg font-semibold text-tnf-navy">Send a Message</h2>
            <p className="mt-2 text-sm text-slate-600">
              Complete the form below and we will respond as soon as possible.
            </p>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {submitted ? (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                Thank you for your message. We will respond as soon as possible.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-tnf-navy focus:border-tnf-green focus:outline-none focus:ring-1 focus:ring-tnf-green"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-tnf-navy focus:border-tnf-green focus:outline-none focus:ring-1 focus:ring-tnf-green"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-tnf-navy focus:border-tnf-green focus:outline-none focus:ring-1 focus:ring-tnf-green"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-tnf-navy focus:border-tnf-green focus:outline-none focus:ring-1 focus:ring-tnf-green"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-tnf-primary w-full rounded-full py-3 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="about-tone-sand border-t border-slate-200/40 py-12 lg:py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className={`${CONTACT_CARD} text-center`}>
              <h3 className="font-semibold text-tnf-navy">Feedback Portal</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600">
                Share your views on economic, social, or labour issues affecting Zimbabwe.
              </p>
              <Link
                href="/feedback"
                className="mt-4 inline-block text-sm font-semibold text-tnf-green hover:text-tnf-green"
              >
                Submit feedback →
              </Link>
            </div>
            <div className={`${CONTACT_CARD} text-center`}>
              <h3 className="font-semibold text-tnf-navy">Whistleblower</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600">
                Report concerns confidentially through our secure whistleblower channel.
              </p>
              <Link
                href="/whistleblower"
                className="mt-4 inline-block text-sm font-semibold text-tnf-green hover:text-tnf-green"
              >
                Report confidentially →
              </Link>
            </div>
            <div className={`${CONTACT_CARD} text-center sm:col-span-2 lg:col-span-1`}>
              <h3 className="font-semibold text-tnf-navy">TNF Global Summit 2026</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600">
                Victoria Falls · 21–25 September 2026. Register and explore the full programme.
              </p>
              <a
                href="https://summit.tnfzim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-tnf-green hover:text-tnf-green"
              >
                Visit summit site →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
