import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import type { ConsultationQuestion } from "@/payload-types";
import type {
  ActiveConsultationQuestion,
  ActiveConsultationQuestions,
  FeedbackIssueType,
} from "@/lib/consultation-shared";

const FORM_TO_ISSUE: Record<string, FeedbackIssueType> = {
  "feedback-economic": "economic",
  "feedback-social": "social",
  "feedback-labour": "labour",
};

function isStillOpen(closingDate?: string | null): boolean {
  if (!closingDate) return true;
  const closes = new Date(closingDate);
  if (Number.isNaN(closes.getTime())) return true;
  // Inclusive: keep showing through the closing day.
  closes.setHours(23, 59, 59, 999);
  return closes.getTime() >= Date.now();
}

function toActiveQuestion(doc: ConsultationQuestion): ActiveConsultationQuestion {
  return {
    id: String(doc.id),
    intro: doc.intro?.trim() || undefined,
    question: doc.question.trim(),
    closingDateDisplay: doc.closingDate
      ? new Date(doc.closingDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : undefined,
  };
}

/**
 * Newest Active (and not yet closed) question per feedback form.
 * A question with form = "all" applies to any form without its own question.
 */
export async function getActiveConsultationQuestions(): Promise<ActiveConsultationQuestions> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "consultation-questions",
      where: { status: { equals: "active" } },
      sort: "-updatedAt",
      limit: 20,
      depth: 0,
      overrideAccess: true,
    });

    const open = docs.filter((d) => isStillOpen(d.closingDate));
    const result: ActiveConsultationQuestions = {};

    for (const doc of open) {
      const issue = FORM_TO_ISSUE[doc.form ?? ""];
      if (issue && !result[issue]) {
        result[issue] = toActiveQuestion(doc);
      }
    }

    const fallback = open.find((d) => d.form === "all");
    if (fallback) {
      for (const issue of ["economic", "social", "labour"] as const) {
        if (!result[issue]) result[issue] = toActiveQuestion(fallback);
      }
    }

    return result;
  } catch {
    return {};
  }
}
