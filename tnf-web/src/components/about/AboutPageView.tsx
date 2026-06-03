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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-tnf-gold">{children}</p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{children}</h2>;
}

export function AboutPageView() {
  const workAreaLetters = "ABCDEF".split("");

  return (
    <div className="bg-[#0f1f33] text-white">
      <div className="bg-emerald-600 px-[10mm] py-3 text-center text-sm font-medium text-white sm:text-base">
        Facilitating national social dialogue for inclusive economic development since 1998.
      </div>

      {/* Hero */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-20">
        <SectionLabel>The Forum</SectionLabel>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Zimbabwe&apos;s Statutory Tripartite Platform
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          The Tripartite Negotiating Forum (TNF) is Zimbabwe&apos;s national platform where
          government, organised business and organised labour address socio-economic and labour
          market issues — from voluntary forum in 1998 to a legislated body under the TNF Act of
          2019.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/about/history"
            className="rounded-full bg-tnf-gold px-6 py-2.5 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-gold-light"
          >
            Our History
          </Link>
          <Link
            href="/about/team"
            className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Meet the Team
          </Link>
        </div>
      </section>

      {/* What is TNF */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>About TNF</SectionLabel>
        <SectionTitle>What is the Tripartite Negotiating Forum?</SectionTitle>
        <p className="mt-6 max-w-4xl text-slate-300 leading-relaxed">
          Social dialogue in Zimbabwe is under the auspices of the Tripartite Negotiating Forum
          (TNF), a forum that is tripartite in nature consisting of the Government, Organised
          Business and Organised Labour. The TNF was established in 1998 as a voluntary forum with
          a view to deal with broader socio-economic issues that have a bearing on the labour
          market. The TNF has evolved from a non-legislated body into a legislated body with the
          enactment of the TNF Act in 2019.
        </p>
        <p className="mt-4 max-w-4xl text-slate-300 leading-relaxed">
          Anchored in Zimbabwe&apos;s Constitution, the TNF Act, National Development Strategy,
          Vision 2030 and international labour standards, the Forum produces recommendations,
          social contracts and monitored agreements that support inclusive growth and decent work.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {ANCHOR_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Outcomes grid */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-[#1a2d45] p-6 transition-colors hover:border-tnf-gold/30"
            >
              <h3 className="text-lg font-bold text-tnf-gold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Motto */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold text-tnf-gold">Mission</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              To facilitate and promote consultation, cooperation and negotiation on social and
              economic issues by Government, Organized Business and Organized Labour.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold text-tnf-gold">Vision</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Inclusive, shared growth and human centred development through social dialogue by
              2030.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold text-tnf-gold">Motto</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Social dialogue for nation building.
            </p>
          </div>
        </div>
      </section>

      {/* Who engages */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>Why Engage</SectionLabel>
        <SectionTitle>Who Participates in the TNF?</SectionTitle>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {WHO_ENGAGES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-[#1a2d45] p-6 lg:p-8"
            >
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work areas spotlight */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>Focus Areas</SectionLabel>
        <SectionTitle>{siteConfig.workAreas.length} Critical Work Areas</SectionTitle>
        <p className="mt-4 max-w-2xl text-slate-400">
          The TNF addresses key domains of national social and economic dialogue.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.workAreas.map((area, i) => (
            <Link
              key={area.id}
              href={`/work-areas/${area.slug}`}
              className="group flex gap-4 rounded-xl border border-white/10 bg-[#1a2d45] p-5 transition-colors hover:border-tnf-gold/40 hover:bg-white/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tnf-gold text-sm font-bold text-tnf-navy">
                {workAreaLetters[i] ?? i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-white group-hover:text-tnf-gold">{area.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{area.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/work-areas"
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-tnf-gold hover:text-tnf-gold-light"
        >
          Explore all work areas →
        </Link>
      </section>

      {/* Tripartite model */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>Our Foundation</SectionLabel>
        <SectionTitle>The Tripartite Model</SectionTitle>
        <p className="mt-4 max-w-2xl text-slate-400">
          The TNF is grounded in genuine tripartism — Government, Employers and Workers as equal
          partners in national dialogue.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TRIPARTITE.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center lg:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-tnf-gold text-xl font-bold text-tnf-gold">
                {item.title.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>Governance</SectionLabel>
        <SectionTitle>Structure of the TNF</SectionTitle>
        <div className="mt-10 space-y-4">
          {STRUCTURE.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-[#1a2d45] p-6">
              <h3 className="font-bold text-tnf-gold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mandate + legal */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Mandate</SectionLabel>
            <SectionTitle>What the TNF Does</SectionTitle>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Consult and negotiate over social and economic issues and submit recommendations to
                Cabinet
              </li>
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Negotiate a social contract as and when necessary
              </li>
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Foster cooperation of tripartite constituents and contribute to policy formulation
              </li>
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Follow up and monitor implementation of agreements
              </li>
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Generate and promote a shared national socio-economic vision
              </li>
              <li className="flex gap-2">
                <span className="text-tnf-gold">•</span>
                Consult and negotiate Zimbabwe labour laws in line with the Constitution
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-6 lg:p-8">
            <SectionLabel>Legal Basis</SectionLabel>
            <h3 className="mt-2 text-xl font-bold text-white">Guiding Framework</h3>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>Constitution of Zimbabwe Amendment No. 1 of 2013</li>
              <li>Tripartite Negotiating Forum Act [No. 3 of 2019]</li>
              <li>Labour Act [Chapter 28:01]</li>
              <li>National Development Strategy &amp; National Vision 2030</li>
              <li>International Labour Conventions</li>
            </ul>
            <div className="mt-8 rounded-lg border border-tnf-gold/30 bg-tnf-gold/10 p-4">
              <p className="text-sm font-semibold text-tnf-gold">TNF Act 2019</p>
              <p className="mt-1 text-xs text-slate-400">Full Act document — coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="container-wide border-b border-white/10 py-14 lg:py-16">
        <SectionLabel>Values</SectionLabel>
        <SectionTitle>Core Values</SectionTitle>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((v) => (
            <div key={v.name} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <span className="font-semibold text-tnf-gold">{v.name}</span>
              <span className="text-slate-400"> — {v.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Secretariat / venue */}
      <section className="container-wide py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionLabel>Organiser</SectionLabel>
            <SectionTitle>TNF Secretariat</SectionTitle>
            <p className="mt-6 text-slate-300 leading-relaxed">
              The Tripartite Negotiating Forum (TNF) is Zimbabwe&apos;s official tripartite
              institution, comprising Government, Employers&apos; organisations and Workers&apos;
              organisations. The Secretariat, based in Harare, coordinates Forum activities and
              supports structured social dialogue on economic, labour and social policy matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-tnf-gold px-6 py-2.5 text-sm font-semibold text-tnf-navy hover:bg-tnf-gold-light"
              >
                Contact the Secretariat
              </Link>
              <Link
                href="https://summit.tnfzim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                TNF Global Summit 2026 →
              </Link>
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-tnf-gold">Head Office</h3>
              <p className="mt-3 text-sm text-slate-300">{siteConfig.contact.address}</p>
              <p className="mt-2 text-sm">
                <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:text-tnf-gold">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="mt-1 text-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-tnf-gold hover:text-tnf-gold-light"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold text-white">Explore More</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/about/history" className="text-slate-300 hover:text-tnf-gold">
                    History →
                  </Link>
                </li>
                <li>
                  <Link href="/about/team" className="text-slate-300 hover:text-tnf-gold">
                    Our Team →
                  </Link>
                </li>
                <li>
                  <Link href="/about/faqs" className="text-slate-300 hover:text-tnf-gold">
                    FAQs →
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="text-slate-300 hover:text-tnf-gold">
                    Departments →
                  </Link>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1a2d45] p-5">
              <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
              <p className="mt-2 text-xs text-slate-400">
                Subscribe for TNF updates and event announcements.
              </p>
              <Link
                href="/contact"
                className="mt-4 block w-full rounded-lg bg-tnf-gold py-2.5 text-center text-sm font-semibold text-tnf-navy hover:bg-tnf-gold-light"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
