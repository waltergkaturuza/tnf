"use client";

import { useState } from "react";
import Link from "next/link";
import { submitToPayload } from "@/lib/submit-form";

const economicCategories = ["Informalisation", "Multicurrency", "Business competitiveness", "Value addition", "Inflation", "Public debt", "Resource exploitation", "Other"];
const socialCategories = ["Education", "Health", "Social protection", "Gender equality", "Youth employment", "Informalisation", "Other"];
const labourCategories = ["Price and Incomes", "Social Insurance", "Decent work", "Digitization", "Other"];

export default function FeedbackPage() {
  const [type, setType] = useState<"economic" | "social" | "labour">("economic");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = type === "economic" ? economicCategories : type === "social" ? socialCategories : labourCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Feedback Portal</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Share your feedback on economic, social, or labour issues affecting Zimbabwe.
          </p>
        </div>
      </div>

      <div className="container-wide mx-auto max-w-xl py-16">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {submitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-green-800">Thank you for your feedback</h2>
            <p className="mt-4 text-green-700">Your submission has been received and will be reviewed.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex gap-2">
              {(["economic", "social", "labour"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    type === t ? "bg-tnf-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Report {t} Issue
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Your Name *</label>
                <input id="name" name="name" type="text" required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Your Email *</label>
                <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category *</label>
                <select id="category" name="category" required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-slate-700">Details *</label>
                <textarea id="details" name="details" rows={5} required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date of Incident</label>
                <input id="date" name="date" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
              </div>
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-slate-700">Attachments (Optional)</label>
                <input id="attachment" name="attachment" type="file" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
              </div>
              <button type="submit" className="w-full rounded-full bg-tnf-navy py-3 font-semibold text-white transition-colors hover:bg-tnf-navy-light">
                Submit Feedback
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/contact" className="text-tnf-gold hover:underline">Contact us</Link> for urgent inquiries.
        </p>
      </div>
    </div>
  );
}
