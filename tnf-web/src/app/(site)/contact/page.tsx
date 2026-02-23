"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { submitToPayload } from "@/lib/submit-form";

export default function ContactPage() {
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
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Get in touch with the TNF Secretariat.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-tnf-navy">Contact Information</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tnf-navy/10 text-tnf-navy">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Phone</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-medium text-tnf-navy hover:underline">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tnf-navy/10 text-tnf-navy">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-tnf-navy hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tnf-navy/10 text-tnf-navy">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Address</p>
                  <p className="font-medium text-tnf-navy">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-slate-900">Engage with TNF</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="/feedback" className="text-tnf-gold hover:underline">Feedback Portal</a> — Share your views on economic, social, or labour issues
                </li>
                <li>
                  <a href="/whistleblower" className="text-tnf-gold hover:underline">Whistleblower</a> — Report concerns confidentially
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-tnf-navy">Send a Message</h2>
              {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
              {submitted ? (
                <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-800">
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
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2"
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
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2"
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
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2"
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
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-tnf-navy py-3 font-semibold text-white transition-colors hover:bg-tnf-navy-light"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
