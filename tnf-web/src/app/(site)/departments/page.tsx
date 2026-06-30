import { SubpageLayout } from "@/components/layout/SubpageLayout";

export const metadata = {
  title: "Departments",
  description: "TNF departments supporting social dialogue in Zimbabwe.",
};

const departments = [
  {
    id: "finance-administration-hr",
    title: "Finance, Administration and Human Resources",
    description:
      "Manages TNF finances, procurement, administrative operations, and human resources, including recruitment, staff development, and organisational support for the Secretariat.",
  },
  {
    id: "programmes",
    title: "Programmes",
    description:
      "Leads programme delivery and policy implementation across TNF work areas, coordinating tripartite dialogue activities and supporting national social dialogue outcomes.",
  },
  {
    id: "communications-advocacy",
    title: "Communications and Advocacy",
    description:
      "Handles public communications, media relations, stakeholder outreach, and advocacy to raise awareness of TNF's role in national social dialogue.",
  },
  {
    id: "audit-compliance",
    title: "Audit and Compliance",
    description:
      "Ensures compliance with governance standards, internal audits, risk management, and accountability across TNF operations.",
  },
];

export default function DepartmentsPage() {
  return (
    <SubpageLayout
      title="Departments"
      description="Our departments work together to support transparent and effective social dialogue in Zimbabwe."
    >
      <p className="mb-12 text-center text-lg text-slate-600">
        At TNF, our departments work together to support our mission of transparent and effective social dialogue in
        Zimbabwe. Each department plays a vital role in programme delivery, administration, communications, and
        compliance.
      </p>

      <div className="space-y-8">
        {departments.map((dept, i) => (
          <div
            key={dept.id}
            id={dept.id}
            className="about-card scroll-mt-28 flex gap-6 p-8"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-tnf-navy text-lg font-bold text-white">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-tnf-navy">{dept.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{dept.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
}
