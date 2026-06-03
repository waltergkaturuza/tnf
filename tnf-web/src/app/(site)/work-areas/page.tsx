import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

export const metadata = {
  title: "Work Areas",
  description: "Explore TNF focus areas: Social Dialogue, Labour Relations, Policy Consultation, and more.",
};

export default function WorkAreasPage() {
  return (
    <SubpageLayout
      title="Work Areas"
      description="Key focus areas where TNF facilitates dialogue and drives policy outcomes."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work Areas" }]}
    >
      <div className="grid gap-8">
        {siteConfig.workAreas.map((area, i) => (
          <section
            key={area.id}
            id={area.slug}
            className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-tnf-navy text-white">
                <span className="text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-tnf-navy">{area.title}</h2>
                <p className="mt-4 text-slate-600">{area.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                  <Link
                    href={`/work-areas/${area.slug}`}
                    className="inline-flex items-center text-sm font-medium text-tnf-green hover:text-tnf-green"
                  >
                    Learn more
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/resources" className="text-sm font-medium text-slate-600 hover:text-tnf-navy">
                    Related documents
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </SubpageLayout>
  );
}
