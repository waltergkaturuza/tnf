export function Infographics() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="page-shell-inner">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF at a Glance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Mandate and impact in simple visuals.
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-16">
          {/* Mandate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-tnf-navy">Our Mandate</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Consult & negotiate socio-economic issues",
                "Negotiate social contracts",
                "Foster tripartite cooperation",
                "Monitor implementation",
                "Promote shared vision",
                "Consult on labour laws",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tnf-green/20 text-xs font-bold text-tnf-navy">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-tnf-navy">Impact</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { value: "1998", label: "Year established" },
                { value: "3", label: "Social partners" },
                { value: "21+", label: "Members in Main TNF" },
                { value: "2019", label: "TNF Act enacted" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center rounded-xl border border-tnf-green/30 bg-tnf-green/5 px-6 py-4">
                  <span className="text-2xl font-bold text-tnf-navy sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 text-xs font-medium text-slate-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
