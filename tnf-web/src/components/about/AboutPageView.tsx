import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const ANCHOR_TAGS = [
  "TNF Act 2019",
  "Constitution of Zimbabwe",
  "National Development Strategy",
  "Vision 2030",
  "Tripartism",
  "Social Dialogue",
  "ILO Conventions",
];

const OUTCOMES = [
  {
    title: "Structured Social Dialogue",
    description:
      "Government, organised business and organised labour consult and negotiate on socio-economic issues through a legislated national forum.",
  },
  {
    title: "Policy Recommendations",
    description:
      "Evidence-based recommendations submitted to Cabinet on labour market, economic and social policy matters.",
  },
  {
    title: "Agreement Implementation",
    description:
      "Follow-up and monitoring of tripartite agreements to ensure commitments translate into measurable outcomes.",
  },
  {
    title: "Shared National Vision",
    description:
      "Generating and promoting a shared socio-economic vision for inclusive growth and human-centred development by 2030.",
  },
];

const WHO_ENGAGES = [
  {
    title: "Government",
    description:
      "Central and local government representatives shape policy, coordinate implementation, and chair the Main TNF.",
  },
  {
    title: "Organised Business",
    description:
      "Employers' organisations represent the private sector in negotiations on the business environment and economic policy.",
  },
  {
    title: "Organised Labour",
    description:
      "Workers' organisations advance labour rights, decent work, and fair labour practices through tripartite dialogue.",
  },
  {
    title: "Development Partners",
    description:
      "Partners such as the ILO support capacity building, research, and international best practice in social dialogue.",
  },
];

const TRIPARTITE = [
  {
    title: "Government",
    description:
      "Ministries and agencies responsible for labour, finance, industry and social welfare — shaping policy and implementation.",
  },
  {
    title: "Employers",
    description:
      "Organised business and employers' federations representing the private sector in national dialogue.",
  },
  {
    title: "Workers",
    description:
      "Trade unions and workers' organisations — the voice of labour in tripartite negotiations.",
  },
];

const STRUCTURE = [
  {
    title: "Main TNF",
    description:
      "Apex body chaired by the Minister of Public Service, Labour and Social Welfare. Deliberates on Technical Committee reports and recommends to Cabinet.",
  },
  {
    title: "Technical Committee",
    description:
      "Research and preparation of documents across Labour, Economic and Social clusters for Main TNF consideration.",
  },
  {
    title: "Management Committee",
    description:
      "Oversees Secretariat operations and sets the agenda for Main TNF meetings.",
  },
];

const CORE_VALUES = [
  { name: "Transparency", desc: "Open and honest in social dialogue." },
  { name: "Inclusivity", desc: "All three social partners at the table." },
  { name: "Integrity", desc: "Moral and ethical conduct." },
  { name: "Mutual Respect", desc: "Dignity and recognition of each partner." },
  { name: "Accountability", desc: "Answerable for our actions." },
];

const ABOUT_CARD = "about-card p-6 lg:p-8";

function AboutSection({
  children,
  tone = "warm",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "ivory" | "warm" | "sand";
  className?: string;
}) {
  const toneClass =
    tone === "ivory" ? "about-tone-ivory" : tone === "sand" ? "about-tone-sand" : "about-tone-warm";
  return (
    <section className={`border-b border-slate-200/40 py-14 lg:py-16 ${toneClass} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="tnf-label text-sm font-semibold uppercase tracking-widest">{label}</p>
      <h2 className="mt-2 text-2xl font-bold text-tnf-navy sm:text-3xl">{title}</h2>
      {description && (
        <p className="about-text-justify mt-4 text-sm text-slate-600 sm:text-base">{description}</p>
      )}
    </div>
  );
}

export function AboutPageView() {
  const workAreaLetters = "ABCDEF".split("");

  return (
    <div className="page-about">
      {/* Hero */}
      <section className="page-shell-hero border-b border-emerald-800/30 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">The Forum</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Zimbabwe&apos;s Statutory Tripartite Platform
          </h1>
          <p className="about-text-justify mx-auto mt-4 max-w-3xl text-base leading-relaxed text-emerald-50 sm:mt-6 sm:text-lg">
            The Tripartite Negotiating Forum (TNF) is Zimbabwe&apos;s national platform where
            government, organised business and organised labour address socio-economic and labour
            market issues — from voluntary forum in 1998 to a legislated body under the TNF Act of
            2019.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about/history"
              className="btn-tnf-primary rounded-full px-6 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Our History
            </Link>
            <Link
              href="/about/team"
              className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-tnf-navy transition-all hover:-translate-y-0.5 hover:border-tnf-green hover:shadow-md"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* What is TNF */}
      <AboutSection tone="warm">
        <SectionHeader
          label="About TNF"
          title="What is the Tripartite Negotiating Forum?"
        />
        <div className={`${ABOUT_CARD} mx-auto max-w-4xl`}>
          <p className="about-text-justify text-slate-600 leading-relaxed">
            Social dialogue in Zimbabwe is under the auspices of the Tripartite Negotiating Forum
            (TNF), a forum that is tripartite in nature consisting of the Government, Organised
            Business and Organised Labour. The TNF was established in 1998 as a voluntary forum with
            a view to deal with broader socio-economic issues that have a bearing on the labour
            market. The TNF has evolved from a non-legislated body into a legislated body with the
            enactment of the TNF Act in 2019.
          </p>
          <p className="about-text-justify mt-4 text-slate-600 leading-relaxed">
            Anchored in Zimbabwe&apos;s Constitution, the TNF Act, National Development Strategy,
            Vision 2030 and international labour standards, the Forum produces recommendations,
            social contracts and monitored agreements that support inclusive growth and decent work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {ANCHOR_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-tnf-green/50 hover:bg-emerald-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </AboutSection>

      {/* Outcomes */}
      <AboutSection tone="sand">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((item) => (
            <div key={item.title} className={ABOUT_CARD}>
              <h3 className="text-center text-lg font-bold text-tnf-green">{item.title}</h3>
              <p className="about-text-justify mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Mission / Vision / Motto */}
      <AboutSection tone="ivory">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Mission",
              text: "To facilitate and promote consultation, cooperation and negotiation on social and economic issues by Government, Organized Business and Organized Labour.",
            },
            {
              title: "Vision",
              text: "Inclusive, shared growth and human centred development through social dialogue by 2030.",
            },
            { title: "Motto", text: "Social dialogue for nation building." },
          ].map((item) => (
            <div key={item.title} className={`${ABOUT_CARD} text-center`}>
              <h3 className="font-bold text-tnf-green">{item.title}</h3>
              <p className="about-text-justify mt-3 text-sm text-slate-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Who engages */}
      <AboutSection tone="warm">
        <SectionHeader label="Why Engage" title="Who Participates in the TNF?" />
        <div className="grid gap-6 sm:grid-cols-2">
          {WHO_ENGAGES.map((item) => (
            <div key={item.title} className={ABOUT_CARD}>
              <h3 className="text-center text-xl font-bold text-tnf-navy">{item.title}</h3>
              <p className="about-text-justify mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Work areas */}
      <AboutSection tone="sand">
        <SectionHeader
          label="Focus Areas"
          title={`${siteConfig.workAreas.length} Critical Work Areas`}
          description="The TNF addresses key domains of national social and economic dialogue."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.workAreas.map((area, i) => (
            <Link
              key={area.id}
              href={`/work-areas/${area.slug}`}
              className={`group ${ABOUT_CARD} flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left`}
            >
              <span className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tnf-green text-base font-bold text-white shadow-md transition-transform group-hover:scale-110 sm:mb-0 sm:mr-4">
                {workAreaLetters[i] ?? i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-tnf-navy transition-colors group-hover:text-tnf-green">
                  {area.title}
                </h3>
                <p className="about-text-justify mt-2 line-clamp-3 text-xs text-slate-600 sm:text-sm">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link
            href="/work-areas"
            className="inline-flex items-center gap-1 text-sm font-semibold text-tnf-green transition-colors hover:text-tnf-green"
          >
            Explore all work areas →
          </Link>
        </p>
      </AboutSection>

      {/* Tripartite */}
      <AboutSection tone="ivory">
        <SectionHeader
          label="Our Foundation"
          title="The Tripartite Model"
          description="The TNF is grounded in genuine tripartism — Government, Employers and Workers as equal partners in national dialogue."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TRIPARTITE.map((item) => (
            <div key={item.title} className={`${ABOUT_CARD} text-center`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-tnf-green bg-tnf-green/10 text-2xl font-bold text-tnf-green transition-transform duration-300 group-hover:scale-105">
                {item.title.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-tnf-navy">{item.title}</h3>
              <p className="about-text-justify mt-3 text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Structure */}
      <AboutSection tone="warm">
        <SectionHeader label="Governance" title="Structure of the TNF" />
        <div className="mx-auto max-w-3xl space-y-5">
          {STRUCTURE.map((item) => (
            <div key={item.title} className={ABOUT_CARD}>
              <h3 className="text-center font-bold text-tnf-green">{item.title}</h3>
              <p className="about-text-justify mt-2 text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Mandate + legal */}
      <AboutSection tone="sand">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className={ABOUT_CARD}>
            <SectionHeader label="Mandate" title="What the TNF Does" />
            <ul className="about-text-justify mx-auto max-w-xl space-y-3 text-sm text-slate-600">
              {[
                "Consult and negotiate over social and economic issues and submit recommendations to Cabinet",
                "Negotiate a social contract as and when necessary",
                "Foster cooperation of tripartite constituents and contribute to policy formulation",
                "Follow up and monitor implementation of agreements",
                "Generate and promote a shared national socio-economic vision",
                "Consult and negotiate Zimbabwe labour laws in line with the Constitution",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="shrink-0 text-tnf-green">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={ABOUT_CARD}>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-tnf-green">
              Legal Basis
            </p>
            <h3 className="mt-2 text-center text-xl font-bold text-tnf-navy">Guiding Framework</h3>
            <ul className="about-text-justify mx-auto mt-6 max-w-md space-y-2 text-sm text-slate-600">
              <li>Constitution of Zimbabwe Amendment No. 1 of 2013</li>
              <li>Tripartite Negotiating Forum Act [No. 3 of 2019]</li>
              <li>Labour Act [Chapter 28:01]</li>
              <li>National Development Strategy &amp; National Vision 2030</li>
              <li>International Labour Conventions</li>
            </ul>
            <div className="mx-auto mt-8 max-w-sm rounded-xl border border-tnf-green/30 bg-tnf-green/10 p-4 text-center transition-colors hover:border-tnf-green/50">
              <p className="text-sm font-semibold text-tnf-green">TNF Act 2019</p>
              <p className="mt-1 text-xs text-slate-600">Full Act document — coming soon.</p>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* Core values */}
      <AboutSection tone="ivory">
        <SectionHeader label="Values" title="Core Values" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((v) => (
            <div
              key={v.name}
              className={`${ABOUT_CARD} text-center transition-all hover:-translate-y-1`}
            >
              <p className="font-semibold text-tnf-green">{v.name}</p>
              <p className="about-text-justify mt-2 text-sm text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Secretariat */}
      <AboutSection tone="warm" className="border-b-0 pb-16 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div className={ABOUT_CARD}>
            <SectionHeader label="Organiser" title="TNF Secretariat" />
            <p className="about-text-justify mx-auto max-w-2xl text-slate-600 leading-relaxed">
              The Tripartite Negotiating Forum (TNF) is Zimbabwe&apos;s official tripartite
              institution, comprising Government, Employers&apos; organisations and Workers&apos;
              organisations. The Secretariat, based in Harare, coordinates Forum activities and
              supports structured social dialogue on economic, labour and social policy matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-tnf-primary rounded-full px-6 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Contact the Secretariat
              </Link>
              <Link
                href="https://summit.tnfzim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-tnf-navy transition-all hover:-translate-y-0.5 hover:border-tnf-green hover:shadow-md"
              >
                TNF Global Summit 2026 →
              </Link>
            </div>
          </div>
          <aside className="space-y-5">
            <div className={ABOUT_CARD}>
              <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-tnf-green">
                Head Office
              </h3>
              <p className="about-text-justify mt-3 text-center text-sm text-slate-600">
                {siteConfig.contact.address}
              </p>
              <p className="mt-2 text-center text-sm">
                <a href={`tel:${siteConfig.contact.phone}`} className="text-tnf-navy hover:text-tnf-green">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="mt-1 text-center text-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-tnf-green hover:text-tnf-green"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
            <div className={ABOUT_CARD}>
              <h3 className="text-center text-sm font-semibold text-tnf-navy">Explore More</h3>
              <ul className="mt-4 space-y-2 text-center text-sm">
                {[
                  { href: "/about/history", label: "History" },
                  { href: "/about/team", label: "Our Team" },
                  { href: "/about/faqs", label: "FAQs" },
                  { href: "/departments", label: "Departments" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-600 transition-colors hover:text-tnf-green">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={ABOUT_CARD}>
              <h3 className="text-center text-sm font-semibold text-tnf-navy">Stay Updated</h3>
              <p className="about-text-justify mt-2 text-center text-xs text-slate-600">
                Subscribe for TNF updates and event announcements.
              </p>
              <Link
                href="/contact"
                className="btn-tnf-primary mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </AboutSection>
    </div>
  );
}
