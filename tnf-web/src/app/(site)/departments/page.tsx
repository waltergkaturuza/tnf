import { DepartmentsSection } from "@/components/departments/DepartmentsSection";

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

const INTRO =
  "At TNF, our departments work together to support our mission of transparent and effective social dialogue in Zimbabwe. Each department plays a vital role in programme delivery, administration, communications, and compliance.";

export default function DepartmentsPage() {
  return (
    <div className="page-about">
      <div className="page-shell-hero py-6 sm:py-8">
        <div className="page-shell-header">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">Departments</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-200 sm:mt-3 sm:text-base">
            Our departments work together to support transparent and effective social dialogue in Zimbabwe.
          </p>
        </div>
      </div>
      <DepartmentsSection intro={INTRO} departments={departments} />
    </div>
  );
}
