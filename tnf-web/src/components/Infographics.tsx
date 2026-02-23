export function Infographics() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF at a Glance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Structure, mandate, and impact in simple visuals.
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-16">
          {/* TNF Structure */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-tnf-navy">Structure</h3>
            <div className="mt-6 flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-8">
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-48 items-center justify-center rounded-xl border-2 border-tnf-navy bg-tnf-navy/5 px-4 py-3 text-center">
                  <span className="text-sm font-bold text-tnf-navy">Main TNF</span>
                  <span className="mt-1 text-xs text-slate-600">21 members · Minister chairs</span>
                </div>
                <div className="my-2 h-6 w-0.5 bg-slate-300 lg:hidden" />
                <svg className="hidden h-8 w-8 text-slate-300 lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="flex flex-col items-center lg:flex-row lg:gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-40 items-center justify-center rounded-xl border border-tnf-gold/50 bg-tnf-gold/5 px-3 py-2 text-center">
                    <span className="text-xs font-bold text-tnf-navy">Technical Committee</span>
                    <span className="mt-0.5 text-[10px] text-slate-600">Clusters · Research</span>
                  </div>
                  <div className="my-2 h-4 w-0.5 bg-slate-300" />
                  <svg className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-center shadow-sm">
                    <span className="text-xs font-bold text-tnf-navy">Management Committee</span>
                    <span className="mt-0.5 text-[10px] text-slate-600">Secretariat · Agenda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tnf-gold/20 text-xs font-bold text-tnf-navy">
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
                { value: "6", label: "Work areas" },
                { value: "21+", label: "Members in Main TNF" },
                { value: "2019", label: "TNF Act enacted" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center rounded-xl border border-tnf-gold/30 bg-tnf-gold/5 px-6 py-4">
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
