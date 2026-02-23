import Link from "next/link";

export const metadata = {
  title: "Careers",
  description: "Join TNF and contribute to social dialogue in Zimbabwe.",
};

export default function CareersPage() {
  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Careers at TNF</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Join our team and be part of promoting transparency, integrity, and effective social dialogue in Zimbabwe.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="max-w-3xl">
          <p className="text-lg text-slate-600">
            We are always looking for passionate and talented individuals who are eager to make a
            difference and contribute to our mission. At TNF, you&apos;ll find a collaborative and
            dynamic work environment where your skills and ideas are valued.
          </p>
          <p className="mt-4 text-slate-600">
            Explore our current job openings and internship opportunities to find a role that suits
            your expertise and interests. Whether you are an experienced professional or just
            starting your career, TNF offers opportunities for growth and development. We are
            committed to creating an inclusive workplace where every team member can thrive.
          </p>
          <p className="mt-4 font-semibold text-tnf-navy">
            Apply today and help us shape the future of social dialogue in Zimbabwe!
          </p>
        </div>

        <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
          <h2 className="text-xl font-semibold text-tnf-navy">Current Openings</h2>
          <p className="mt-4 text-slate-600">
            There are no open positions at the moment. Please check back later or contact us to
            express your interest.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-tnf-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-tnf-navy-light"
          >
            Contact Us
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
