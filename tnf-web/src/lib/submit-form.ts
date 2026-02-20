/**
 * Submit form data to Payload form-submissions collection
 */

export type FormSubmissionType =
  | "contact"
  | "feedback-economic"
  | "feedback-social"
  | "feedback-labour"
  | "whistleblower";

export async function submitToPayload(data: {
  type: FormSubmissionType;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  category?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/form-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: (err as { message?: string })?.message || "Submission failed" };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
