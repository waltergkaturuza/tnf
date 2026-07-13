/**
 * Submit form data to Payload form-submissions collection (POST /api/form-submissions)
 */

export type FormSubmissionType =
  | "contact"
  | "feedback-economic"
  | "feedback-social"
  | "feedback-labour"
  | "whistleblower"
  | "newsletter";

export type LocationScope = "zimbabwe" | "international";

export type FormSubmissionPayload = {
  type: FormSubmissionType;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  category?: string;
  phone?: string;
  organisation?: string;
  ageRange?: string;
  gender?: string;
  locationScope?: LocationScope;
  province?: string;
  cityOrArea?: string;
  country?: string;
  dateOfIncident?: string;
  preferredContact?: string;
  anonymous?: boolean;
  metadata?: Record<string, unknown>;
};

export async function submitToPayload(
  data: FormSubmissionPayload,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const body: Record<string, unknown> = {
      type: data.type,
      name: data.name?.trim() || undefined,
      email: data.email?.trim() || undefined,
      subject: data.subject?.trim() || undefined,
      message: data.message?.trim() || undefined,
      category: data.category?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
      organisation: data.organisation?.trim() || undefined,
      ageRange: data.ageRange || undefined,
      gender: data.gender || undefined,
      locationScope: data.locationScope || undefined,
      province: data.province?.trim() || undefined,
      cityOrArea: data.cityOrArea?.trim() || undefined,
      country: data.country?.trim() || undefined,
      dateOfIncident: data.dateOfIncident || undefined,
      preferredContact: data.preferredContact || undefined,
      anonymous: data.anonymous ?? false,
      metadata: data.metadata,
    };

    const res = await fetch("/api/form-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const message =
        (err as { errors?: { message?: string }[] })?.errors?.[0]?.message ||
        (err as { message?: string })?.message ||
        (err as { error?: string })?.error ||
        "Submission failed";
      return { ok: false, error: message };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
