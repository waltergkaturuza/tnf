import { CareersView } from "@/components/careers/CareersView";
import { getOpenVacancies } from "@/lib/vacancies";

export const metadata = {
  title: "Careers",
  description: "Join TNF and contribute to social dialogue in Zimbabwe.",
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const vacancies = await getOpenVacancies();
  return <CareersView vacancies={vacancies} />;
}
