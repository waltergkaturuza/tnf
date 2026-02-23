import Link from "next/link";

export const metadata = {
  title: "Departments",
  description: "TNF departments and units supporting social dialogue in Zimbabwe.",
};

const departments = [
  {
    id: "01",
    title: "Finance and Administration",
    description: "Manages TNF finances, procurement, and administrative operations.",
  },
  {
    id: "02",
    title: "Programmes and Policy Implementation",
    description: "Leads programme delivery and policy implementation across TNF work areas.",
  },
];

const units = [
  {
    id: "01",
    title: "Communication and Advocacy Unit",
    description: "Handles public communications, media relations, and advocacy.",
  },
  {
    id: "02",
    title: "Human Resources Unit",
    description: "Manages recruitment, staff development, and human resources.",
  },
  {
    id: "03",
    title: "Audit and Risk Management Unit",
    description: "Ensures compliance, audits, and risk management.",
  },
  {
    id: "04",
    title: "Legal Services Unit",
    description: "Provides legal advice and support on TNF operations.",
  },
];

export default function DepartmentsPage() {
  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Departments</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Our departments and units work together to support our mission of transparent and effective social dialogue in Zimbabwe.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <p className="mb-12 text-lg text-slate-600">
          At TNF, our departments work together to support our mission of transparent and effective
          social dialogue in Zimbabwe. Each department plays a vital role, from policy implementation
          and legal services to finance, human resources, and communication.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-tnf-navy">Departments</h2>
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="flex gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-tnf-navy text-white font-bold">
                {dept.id}
              </div>
              <div>
                <h3 className="font-semibold text-tnf-navy">{dept.title}</h3>
                <p className="mt-2 text-slate-600">{dept.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-tnf-navy">Units</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="flex gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-tnf-navy text-white font-bold">
                {unit.id}
              </div>
              <div>
                <h3 className="font-semibold text-tnf-navy">{unit.title}</h3>
                <p className="mt-2 text-slate-600">{unit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/work-areas"
            className="inline-flex items-center rounded-full bg-tnf-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-tnf-navy-light"
          >
            Explore Work Areas
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
