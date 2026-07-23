"use client";

import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/forms/Field";
import {
  AGE_RANGES,
  GENDER_OPTIONS,
  INCIDENT_TYPES,
  URGENCY_LEVELS,
  ZIM_PROVINCES,
} from "@/components/forms/location-constants";
import { formInputClass } from "@/components/forms/form-styles";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { submitToPayload, uploadFormAttachment } from "@/lib/submit-form";

export function WhistleblowerPageView() {
  const [locationScope, setLocationScope] = useState<"zimbabwe" | "international">("zimbabwe");
  const [reportAnonymous, setReportAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const evidence = fd.get("evidence");
    let evidenceMeta:
      | {
          fileName: string;
          fileSize: number;
          fileType: string;
          mediaId?: number | string;
          url?: string | null;
        }
      | undefined;

    if (evidence instanceof File && evidence.size > 0) {
      const incidentType = String(fd.get("incidentType") || "").trim();
      const uploaded = await uploadFormAttachment(evidence, {
        formType: "whistleblower",
        folder: "whistleblower",
        category: incidentType || "general",
      });
      if (!uploaded.ok) {
        setSubmitting(false);
        setError(uploaded.error);
        return;
      }
      evidenceMeta = {
        fileName: uploaded.file.filename || evidence.name,
        fileSize: uploaded.file.filesize || evidence.size,
        fileType: uploaded.file.mimeType || evidence.type,
        mediaId: uploaded.file.id,
        url: uploaded.file.url,
      };
    }

    const result = await submitToPayload({
      type: "whistleblower",
      name: reportAnonymous ? undefined : (fd.get("name") as string) || undefined,
      email: reportAnonymous ? undefined : (fd.get("email") as string) || undefined,
      phone: reportAnonymous ? undefined : (fd.get("phone") as string) || undefined,
      subject: (fd.get("subject") as string) || undefined,
      category: fd.get("incidentType") as string,
      message: fd.get("description") as string,
      ageRange: (fd.get("ageRange") as string) || undefined,
      gender: (fd.get("gender") as string) || undefined,
      locationScope,
      province: locationScope === "zimbabwe" ? (fd.get("province") as string) || undefined : undefined,
      cityOrArea: (fd.get("cityOrArea") as string) || undefined,
      country: locationScope === "international" ? (fd.get("country") as string) || undefined : undefined,
      dateOfIncident: (fd.get("date") as string) || undefined,
      preferredContact: reportAnonymous ? undefined : (fd.get("preferredContact") as string) || undefined,
      anonymous: reportAnonymous,
      organisation: (fd.get("organisation") as string) || undefined,
      metadata: {
        personsInvolved: (fd.get("persons") as string) || undefined,
        urgency: (fd.get("urgency") as string) || undefined,
        workplace: (fd.get("workplace") as string) || undefined,
        ...(evidenceMeta ? { evidence: evidenceMeta } : {}),
      },
    });

    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <SubpageLayout
      title="Whistleblower"
      description="Report concerns confidentially. Your reports help uphold integrity, accountability, and public trust."
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
          <h2 className="text-xl font-semibold text-tnf-navy">Report received</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Thank you. Your report will be handled confidentially in accordance with TNF procedures. If you provided
            contact details, we may reach out only if necessary.
          </p>
        </div>
      ) : (
        <div className="about-card overflow-hidden p-0">
          <div className="border-b border-amber-200/60 bg-amber-50/90 px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold text-amber-900">Confidential reporting</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950/80">
              Reports are treated seriously and in confidence. You may submit anonymously. Do not include information
              that puts anyone at immediate risk. Contact emergency services if needed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Your details</h2>
              <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={reportAnonymous}
                    onChange={(e) => setReportAnonymous(e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-tnf-green focus:ring-tnf-green"
                  />
                  <span className="text-sm text-slate-700">
                    <span className="font-semibold text-tnf-navy">Submit anonymously</span>. We will not require or
                    collect your name, email, or phone number.
                  </span>
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="name" required={!reportAnonymous}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!reportAnonymous}
                    disabled={reportAnonymous}
                    autoComplete="name"
                    className={`${formInputClass} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </Field>
                <Field label="Email address" htmlFor="email" required={!reportAnonymous}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={!reportAnonymous}
                    disabled={reportAnonymous}
                    autoComplete="email"
                    className={`${formInputClass} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </Field>
                <Field label="Phone number" htmlFor="phone" hint="Optional, confidential follow-up only">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    disabled={reportAnonymous}
                    autoComplete="tel"
                    className={`${formInputClass} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </Field>
                {!reportAnonymous && (
                  <Field label="Preferred contact method" htmlFor="preferredContact">
                    <select id="preferredContact" name="preferredContact" className={formInputClass} defaultValue="">
                      <option value="">No preference</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Do not contact me">Do not contact me</option>
                    </select>
                  </Field>
                )}
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
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Location of incident</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Where did this occur?" htmlFor="location-zimbabwe" className="sm:col-span-2">
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
                      <input id="cityOrArea" name="cityOrArea" type="text" className={formInputClass} />
                    </Field>
                  </>
                ) : (
                  <Field label="Country" htmlFor="country" className="sm:col-span-2">
                    <input id="country" name="country" type="text" className={formInputClass} />
                  </Field>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-tnf-green">Incident details</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Incident type" htmlFor="incidentType" required>
                  <select id="incidentType" name="incidentType" required className={formInputClass}>
                    {INCIDENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Urgency" htmlFor="urgency">
                  <select id="urgency" name="urgency" className={formInputClass} defaultValue="">
                    <option value="">Select urgency</option>
                    {URGENCY_LEVELS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Organisation / workplace involved" htmlFor="workplace" className="sm:col-span-2">
                  <input
                    id="workplace"
                    name="workplace"
                    type="text"
                    placeholder="e.g. ministry, department, company, or programme"
                    className={formInputClass}
                  />
                </Field>
                <Field label="Short title" htmlFor="subject" hint="Brief summary of the concern">
                  <input id="subject" name="subject" type="text" className={formInputClass} />
                </Field>
                <Field label="Date of incident" htmlFor="date">
                  <input id="date" name="date" type="date" className={formInputClass} />
                </Field>
                <Field label="Incident description" htmlFor="description" required className="sm:col-span-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    placeholder="What happened? Include dates, locations, and any relevant context. Avoid including unnecessary personal data about others."
                    className={formInputClass}
                  />
                </Field>
                <Field label="Persons involved (if known)" htmlFor="persons" className="sm:col-span-2">
                  <input
                    id="persons"
                    name="persons"
                    type="text"
                    placeholder="Names, roles, or descriptions, only if known"
                    className={formInputClass}
                  />
                </Field>
                <Field
                  label="Supporting evidence"
                  htmlFor="evidence"
                  hint="PDF, Word, or images up to 4.5 MB (optional)"
                  className="sm:col-span-2"
                >
                  <input
                    id="evidence"
                    name="evidence"
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
                  I confirm that the information provided is accurate to the best of my knowledge. I understand this
                  channel is for reporting concerns to TNF and not for emergency response.
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
                {submitting ? "Submitting…" : "Submit report"}
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-500">
        For general enquiries use our{" "}
        <Link href="/feedback" className="font-medium text-tnf-green hover:underline">
          Feedback Portal
        </Link>{" "}
        or <Link href="/contact" className="font-medium text-tnf-green hover:underline">contact the Secretariat</Link>.
      </p>
    </SubpageLayout>
  );
}
