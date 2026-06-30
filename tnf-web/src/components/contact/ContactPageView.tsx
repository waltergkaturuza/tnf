"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Field } from "@/components/forms/Field";
import { CONTACT_ENQUIRY_TYPES } from "@/components/forms/location-constants";
import { formInputClass } from "@/components/forms/form-styles";
import { TnfLocationMap } from "@/components/maps/TnfLocationMap";
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const result = await submitToPayload({
      type: "contact",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: (fd.get("phone") as string) || undefined,
      organisation: (fd.get("organisation") as string) || undefined,
      category: fd.get("enquiryType") as string,
      subject: (fd.get("subject") as string) || undefined,
      message: fd.get("message") as string,
      preferredContact: (fd.get("preferredContact") as string) || undefined,
    });

    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <div className="page-about">
      <section className="page-shell-hero border-b border-emerald-800/30 py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Contact Us
          </h1>
          <p className="about-text-justify mx-auto mt-3 max-w-2xl text-sm text-emerald-50 sm:mt-4 sm:text-base">
            Reach the Tripartite Negotiating Forum Secretariat in Harare. For summit registration
            and programme enquiries, visit the{" "}
            <a
              href="https://summit.tnfzim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-inline-link"
            >
              TNF Global Summit
            </a>{" "}
            website.
          </p>
        </div>
      </section>

      <section className="about-tone-warm py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-10">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <div className={CONTACT_CARD}>
              <h2 className="text-lg font-semibold text-tnf-navy">TNF Secretariat</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tripartite Negotiating Forum, national platform for government, business and labour.
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
                    <a
                      href={siteConfig.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-medium leading-relaxed text-tnf-navy hover:text-tnf-green"
                    >
                      {siteConfig.contact.addressLines.map((line, i) => (
                        <Fragment key={line}>
                          {i > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </a>
                    <p className="mt-1 text-xs text-tnf-green">
                      <a href={siteConfig.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Get directions →
                      </a>
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

            <div className={CONTACT_CARD}>
              <TnfLocationMap compact />
            </div>
          </div>

          <div className="about-card min-w-0 overflow-hidden p-0 lg:col-span-3">
            <div className="border-b border-emerald-200/60 bg-emerald-50/90 px-6 py-5 sm:px-8">
              <h2 className="text-lg font-semibold text-tnf-navy">Send a message</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Complete the form and the Secretariat will respond as soon as possible. For structured policy
                feedback or confidential reports, use the links below.
              </p>
            </div>

            {error && (
              <div className="mx-6 mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:mx-8">
                {error}
              </div>
            )}

            {submitted ? (
              <div className="p-8 text-center sm:p-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tnf-green text-2xl text-white">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-tnf-navy">Message sent</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm text-slate-600">
                  Thank you for contacting the TNF Secretariat. We will respond to your enquiry as soon as
                  possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Your details</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="name" required>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className={formInputClass}
                      />
                    </Field>
                    <Field label="Email address" htmlFor="email" required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={formInputClass}
                      />
                    </Field>
                    <Field label="Phone number" htmlFor="phone" hint="Optional">
                      <input id="phone" name="phone" type="tel" autoComplete="tel" className={formInputClass} />
                    </Field>
                    <Field label="Organisation" htmlFor="organisation" hint="Optional, employer, union, or affiliation">
                      <input id="organisation" name="organisation" type="text" className={formInputClass} />
                    </Field>
                    <Field label="Preferred contact method" htmlFor="preferredContact" className="sm:col-span-2">
                      <select id="preferredContact" name="preferredContact" className={formInputClass} defaultValue="">
                        <option value="">No preference</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                      </select>
                    </Field>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Your enquiry</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <Field label="Enquiry type" htmlFor="enquiryType" required>
                      <select id="enquiryType" name="enquiryType" required className={formInputClass} defaultValue="">
                        <option value="" disabled>
                          Select enquiry type
                        </option>
                        {CONTACT_ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Subject" htmlFor="subject" hint="Brief summary">
                      <input id="subject" name="subject" type="text" className={formInputClass} />
                    </Field>
                    <Field label="Message" htmlFor="message" required className="sm:col-span-2">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="How can we help? Include any relevant context or reference numbers."
                        className={formInputClass}
                      />
                    </Field>
                  </div>
                </section>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 rounded border-slate-300 text-tnf-green focus:ring-tnf-green"
                    />
                    <span className="text-sm text-slate-600">
                      I consent to the TNF Secretariat processing my details to respond to this enquiry. I
                      understand this form is not for whistleblowing or emergency matters.
                    </span>
                  </label>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Fields marked <span className="text-tnf-green">*</span> are required.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-tnf-primary shrink-0 rounded-full px-10 py-3 text-sm font-semibold disabled:opacity-60 sm:min-w-[200px]"
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="about-tone-sand border-t border-slate-200/40 py-12 lg:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
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
