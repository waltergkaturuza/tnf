import { FeedbackPageView } from "@/components/feedback/FeedbackPageView";
import { getActiveConsultationQuestions } from "@/lib/consultation";

export const metadata = {
  title: "Feedback Portal",
  description: "Share feedback on economic, social, or labour issues affecting Zimbabwe and beyond.",
};

// Always reflect the latest active consultation question from the admin panel.
export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const questions = await getActiveConsultationQuestions();
  return <FeedbackPageView questions={questions} />;
}
