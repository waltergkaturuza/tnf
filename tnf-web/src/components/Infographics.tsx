export function Infographics() {
  return (
    <section className="infographics-section py-10 sm:py-14">
      <div className="infographics-section__inner">
        <div className="infographics-section__intro text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            TNF at a Glance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-100 sm:text-lg">
            Mandate and impact in simple visuals.
          </p>
        </div>

        <div className="mt-10 space-y-8 sm:mt-12 lg:space-y-10">
          <div className="infographics-card">
            <h3 className="text-xl font-bold text-tnf-navy sm:text-2xl">Our Mandate</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Consult & negotiate socio-economic issues",
                "Negotiate social contracts",
                "Foster tripartite cooperation",
                "Monitor implementation",
                "Promote shared vision",
                "Consult on labour laws",
              ].map((item, i) => (
                <div key={i} className="infographics-mandate-item flex items-start gap-3">
                  <span className="infographics-mandate-item__badge flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tnf-green/20 text-sm font-bold text-tnf-navy">
                    {i + 1}
                  </span>
                  <span className="infographics-mandate-item__text text-base font-medium leading-snug text-slate-800 sm:text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="infographics-card">
            <h3 className="text-xl font-bold text-tnf-navy sm:text-2xl">Impact</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { value: "1998", label: "Year established" },
                { value: "3", label: "Social partners" },
                { value: "21+", label: "Members in Main TNF" },
                { value: "2019", label: "TNF Act enacted" },
              ].map((stat) => (
                <div key={stat.label} className="infographics-stat flex flex-col items-center rounded-xl border border-tnf-green/30 bg-tnf-green/5 px-6 py-4">
                  <span className="text-2xl font-bold text-tnf-navy sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
