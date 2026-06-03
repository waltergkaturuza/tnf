"use client";

import { useState } from "react";
import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

const incidentTypes = ["Corruption", "Fraud", "Misuse of Resources", "Policy Violation", "Other"];

export default function WhistleblowerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(true);
  };

  return (
    <SubpageLayout
      title="Whistleblower"
      description="Report concerns confidentially. Your reports help uphold integrity and accountability."
      narrow
    >
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-green-800">Report received</h2>
          <p className="mt-4 text-green-700">Thank you. Your report will be handled in accordance with our procedures.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-8 text-center text-slate-600">
            Citizens are encouraged to report any issues such as corruption, unethical behaviour, or concerns affecting
            the public.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                Incident Type *
              </label>
              <select id="type" name="type" required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2">
                {incidentTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                Incident Description *
              </label>
              <textarea id="description" name="description" rows={5} required className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">
                Date of Incident
              </label>
              <input id="date" name="date" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                Location of Incident
              </label>
              <input id="location" name="location" type="text" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
            </div>
            <div>
              <label htmlFor="persons" className="block text-sm font-medium text-slate-700">
                Persons Involved (if known)
              </label>
              <input id="persons" name="persons" type="text" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
            </div>
            <div>
              <label htmlFor="evidence" className="block text-sm font-medium text-slate-700">
                Supporting Evidence (Optional)
              </label>
              <input id="evidence" name="evidence" type="file" className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2" />
            </div>
            <button type="submit" className="btn-tnf-primary w-full rounded-full py-3 font-semibold">
              Submit Report
            </button>
          </form>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Reports are treated confidentially.{" "}
        <Link href="/contact" className="text-tnf-green hover:underline">
          Contact us
        </Link>{" "}
        for other inquiries.
      </p>
    </SubpageLayout>
  );
}
