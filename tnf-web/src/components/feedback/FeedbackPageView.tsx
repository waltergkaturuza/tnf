"use client";

import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/forms/Field";
import { AGE_RANGES, GENDER_OPTIONS, ZIM_PROVINCES } from "@/components/forms/location-constants";
import { formInputClass } from "@/components/forms/form-styles";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { submitToPayload, type FormSubmissionType } from "@/lib/submit-form";

const economicCategories = [
  "Informalisation",
  "Multicurrency",
  "Business competitiveness",
  "Value addition",
  "Inflation",
  "Public debt",
  "Resource exploitation",
  "Other",
];
const socialCategories = [
  "Education",
  "Health",
  "Social protection",
  "Gender equality",
  "Youth employment",
  "Informalisation",
  "Other",
];
const labourCategories = [
  "Price and Incomes",
  "Social Insurance",
  "Decent work",
  "Digitization",
  "Other",
];

const ISSUE_TYPES = [
  { id: "economic" as const, label: "Economic Issue" },
  { id: "social" as const, label: "Social Issue" },
  { id: "labour" as const, label: "Labour Issue" },
];

export function FeedbackPageView() {
  const [issueType, setIssueType] = useState<"economic" | "social" | "labour">("economic");
  const [locationScope, setLocationScope] = useState<"zimbabwe" | "international">("zimbabwe");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories =
    issueType === "economic"
      ? economicCategories
      : issueType === "social"
        ? socialCategories
        : labourCategories;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const attachment = fd.get("attachment");
    const attachmentMeta =
      attachment instanceof File && attachment.size > 0
        ? { fileName: attachment.name, fileSize: attachment.size, fileType: attachment.type }
        : undefined;

    const result = await submitToPayload({
      type: `feedback-${issueType}` as FormSubmissionType,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: (fd.get("subject") as string) || undefined,
      category: fd.get("category") as string,
      message: fd.get("details") as string,
      phone: (fd.get("phone") as string) || undefined,
      organisation: (fd.get("organisation") as string) || undefined,
      ageRange: (fd.get("ageRange") as string) || undefined,
      gender: (fd.get("gender") as string) || undefined,
      locationScope,
      province: locationScope === "zimbabwe" ? (fd.get("province") as string) || undefined : undefined,
      cityOrArea: (fd.get("cityOrArea") as string) || undefined,
      country: locationScope === "international" ? (fd.get("country") as string) || undefined : undefined,
      dateOfIncident: (fd.get("date") as string) || undefined,
      preferredContact: (fd.get("preferredContact") as string) || undefined,
      anonymous: fd.get("anonymous") === "on",
      metadata: attachmentMeta ? { attachment: attachmentMeta } : undefined,
    });

    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <SubpageLayout
      title="Feedback Portal"
      description="Share structured feedback on economic, social, or labour issues. Your input helps inform national social dialogue."
      wideForm
    >
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {submitted ? (
        <div className="about-card p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tnf-green text-2xl text-white">
            ✓
          </div>
          <h2 className="text-xl font-semibold text-tnf-navy">Thank you for your feedback</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Your submission has been received and will be reviewed by the TNF Secretariat. We may contact you if
            follow-up is required.
          </p>
        </div>
      ) : (
        <div id="suggestions" className="about-card scroll-mt-28 overflow-hidden p-0">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold text-tnf-navy">What would you like to report?</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ISSUE_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIssueType(t.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    issueType === t.id
                      ? "bg-tnf-green text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-tnf-green/40 hover:bg-emerald-50"
                  }`}
                >
                  Report {t.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">About you</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="name" required>
                  <input id="name" name="name" type="text" required autoComplete="name" className={formInputClass} />
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
                <Field label="Phone number" htmlFor="phone" hint="Optional, for follow-up only">
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={formInputClass} />
                </Field>
                <Field label="Organisation / affiliation" htmlFor="organisation" hint="Employer, union, NGO, etc. (optional)">
                  <input id="organisation" name="organisation" type="text" className={formInputClass} />
                </Field>
                <Field label="Age range" htmlFor="ageRange">
                  <select id="ageRange" name="ageRange" className={formInputClass} defaultValue="">
                    <option value="">Select age range</option>
                    {AGE_RANGES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Gender" htmlFor="gender">
                  <select id="gender" name="gender" className={formInputClass} defaultValue="">
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Location</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Where is this issue located?" htmlFor="location-zimbabwe" className="sm:col-span-2">
                  <div className="mt-2 flex flex-wrap gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 has-[:checked]:border-tnf-green has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="locationScopeUi"
                        checked={locationScope === "zimbabwe"}
                        onChange={() => setLocationScope("zimbabwe")}
                        className="text-tnf-green focus:ring-tnf-green"
                      />
                      <span className="text-sm font-medium text-tnf-navy">Zimbabwe</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 has-[:checked]:border-tnf-green has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="locationScopeUi"
                        checked={locationScope === "international"}
                        onChange={() => setLocationScope("international")}
                        className="text-tnf-green focus:ring-tnf-green"
                      />
                      <span className="text-sm font-medium text-tnf-navy">International</span>
                    </label>
                  </div>
                </Field>

                {locationScope === "zimbabwe" ? (
                  <>
                    <Field label="Province" htmlFor="province">
                      <select id="province" name="province" className={formInputClass} defaultValue="">
                        <option value="">Select province</option>
                        {ZIM_PROVINCES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="City / town / area" htmlFor="cityOrArea">
                      <input id="cityOrArea" name="cityOrArea" type="text" placeholder="e.g. Harare, Bulawayo" className={formInputClass} />
                    </Field>
                  </>
                ) : (
                  <Field label="Country" htmlFor="country" className="sm:col-span-2">
                    <input id="country" name="country" type="text" placeholder="Country where the issue applies" className={formInputClass} />
                  </Field>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Your report</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Category" htmlFor="category" required>
                  <select id="category" name="category" required className={formInputClass}>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Subject / short title" htmlFor="subject" hint="Brief summary of the issue">
                  <input id="subject" name="subject" type="text" className={formInputClass} />
                </Field>
                <Field label="Details" htmlFor="details" required className="sm:col-span-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    required
                    placeholder="Describe the issue, who is affected, and any outcomes you are seeking..."
                    className={formInputClass}
                  />
                </Field>
                <Field label="Date of incident" htmlFor="date">
                  <input id="date" name="date" type="date" className={formInputClass} />
                </Field>
                <Field label="Preferred contact method" htmlFor="preferredContact">
                  <select id="preferredContact" name="preferredContact" className={formInputClass} defaultValue="">
                    <option value="">No preference</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Either">Email or phone</option>
                  </select>
                </Field>
                <Field label="Supporting documents" htmlFor="attachment" hint="PDF, Word, or images (optional)" className="sm:col-span-2">
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className={`${formInputClass} file:mr-4 file:rounded-md file:border-0 file:bg-tnf-green/10 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-tnf-green`}
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
                  I confirm that the information provided is accurate to the best of my knowledge and I consent to
                  TNF processing this submission in line with its mandate and privacy practices.
                </span>
              </label>
              <label className="mt-3 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="anonymous"
                  className="mt-1 rounded border-slate-300 text-tnf-green focus:ring-tnf-green"
                />
                <span className="text-sm text-slate-600">
                  I prefer to remain anonymous where possible (we will still collect contact details for verification
                  if required).
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
                {submitting ? "Submitting…" : "Submit feedback"}
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-500">
        For urgent or confidential matters, see our{" "}
        <Link href="/whistleblower" className="font-medium text-tnf-green hover:underline">
          Whistleblower channel
        </Link>{" "}
        or <Link href="/contact" className="font-medium text-tnf-green hover:underline">contact the Secretariat</Link>.
      </p>
    </SubpageLayout>
  );
}
