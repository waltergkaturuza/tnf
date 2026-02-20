import { siteConfig } from "@/lib/site-config";

export function Stakeholders() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            Our Stakeholders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            TNF brings together the three key social partners and key institutions in Zimbabwe.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {siteConfig.stakeholders.map((stakeholder) => (
            <div
              key={stakeholder}
              className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-medium text-slate-800">{stakeholder}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
