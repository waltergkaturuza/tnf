/** Client-safe types for consultation questions shown on the Feedback Portal. */

export type FeedbackIssueType = "economic" | "social" | "labour";

export type ActiveConsultationQuestion = {
  id: string;
  /** Optional heading, e.g. "TNF Digital Policy Dialogue — Public Consultation on the Labour Act". */
  intro?: string;
  question: string;
  /** Display-ready closing date, e.g. "31 August 2026". */
  closingDateDisplay?: string;
};

export type ActiveConsultationQuestions = Partial<
  Record<FeedbackIssueType, ActiveConsultationQuestion>
>;
