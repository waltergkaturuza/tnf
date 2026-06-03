import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

export const metadata = {
  title: "Careers",
  description: "Join TNF and contribute to social dialogue in Zimbabwe.",
};

export default function CareersPage() {
  return (
    <SubpageLayout
      title="Careers at TNF"
      description="Join our team and be part of promoting transparency, integrity, and effective social dialogue in Zimbabwe."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg text-slate-600">
          We are always looking for passionate and talented individuals who are eager to make a difference and
          contribute to our mission. At TNF, you&apos;ll find a collaborative and dynamic work environment where your
          skills and ideas are valued.
        </p>
        <p className="mt-4 text-slate-600">
          Explore our current job openings and internship opportunities to find a role that suits your expertise and
          interests. Whether you are an experienced professional or just starting your career, TNF offers opportunities
          for growth and development. We are committed to creating an inclusive workplace where every team member can
          thrive.
        </p>
        <p className="mt-4 font-semibold text-tnf-navy">
          Apply today and help us shape the future of social dialogue in Zimbabwe!
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
        <h2 className="text-xl font-semibold text-tnf-navy">Current Openings</h2>
        <p className="mt-4 text-slate-600">
          There are no open positions at the moment. Please check back later or contact us to express your interest.
        </p>
        <Link
          href="/contact"
          className="btn-tnf-primary mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
        >
          Contact Us
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </SubpageLayout>
  );
}
