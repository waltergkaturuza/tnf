import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "About TNF",
  description: "Learn about the Tripartite Negotiating Forum - mandate, structure, and values.",
};

export default function AboutPage() {
  const coreValues = [
    { name: "Transparency", desc: "We are open and honest in social dialogue." },
    { name: "Inclusivity", desc: "Involvement of all three social partners (Business, Government, Labour)." },
    { name: "Integrity", desc: "Conducting business by following a moral and ethical framework." },
    { name: "Mutual Respect", desc: "Treat each other with dignity and recognise each member's value." },
    { name: "Accountability", desc: "Answerable for our actions." },
  ];

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">About TNF</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            The cornerstone of social dialogue in Zimbabwe since 1998.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <section className="prose prose-slate max-w-none lg:prose-lg">
          <h2>Overview</h2>
          <p>
            Social dialogue in Zimbabwe is under the auspices of the Tripartite Negotiating Forum
            (TNF), a forum that is tripartite in nature consisting of the Government, Organised
            Business and Organised Labour. The TNF was established in 1998 as a voluntary forum with
            a view to deal with broader socio-economic issues that have a bearing on the labour
            market. The TNF has evolved from a non-legislated body into a legislated body with the
            enactment of the TNF Act in 2019.
          </p>

          <div className="not-prose my-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-tnf-navy">Mission</h3>
              <p className="mt-2 text-sm text-slate-600">
                To facilitate and promote consultation, cooperation and negotiation on social and
                economic issues by Government, Organized Business and Organized Labour.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-tnf-navy">Vision</h3>
              <p className="mt-2 text-sm text-slate-600">
                Inclusive, shared growth and human centred development through social dialogue by
                2030.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-tnf-navy">Motto</h3>
              <p className="mt-2 text-sm text-slate-600">Social dialogue for nation building.</p>
            </div>
          </div>

          <h2>Core Values</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {coreValues.map((v) => (
              <li key={v.name} className="rounded-lg border border-slate-200 p-4">
                <strong className="text-tnf-navy">{v.name}</strong>
                <span className="ml-2 text-slate-600">— {v.desc}</span>
              </li>
            ))}
          </ul>

          <h2>Mandate</h2>
          <p>The TNF derives its mandate from the Constitution and the TNF Act [No. 3 of 2019]:</p>
          <ul>
            <li>Consult and negotiate over social and economic issues and submit recommendations to Cabinet</li>
            <li>Negotiate a social contract as and when necessary</li>
            <li>Foster cooperation of the tripartite constituents and contribute to policy formulation</li>
            <li>Follow up and monitor implementation of agreements</li>
            <li>Generate and promote a shared national socio-economic vision</li>
            <li>Consult and negotiate Zimbabwe labour laws in line with the Constitution</li>
          </ul>

          <h2>Legal Basis</h2>
          <p>The TNF is guided by:</p>
          <ul>
            <li>Constitution of Zimbabwe Amendment Number 1 of 2013</li>
            <li>Tripartite Negotiating Forum Act [No. 3 of 2019]</li>
            <li>Labour Act [Chapter 28:01]</li>
            <li>National Development Strategy 1 &amp; National Vision 2030</li>
            <li>International Labour Conventions</li>
          </ul>

          <h2>Structure of the TNF</h2>
          <div className="not-prose my-8 space-y-6">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-tnf-navy">Main TNF</h3>
              <p className="mt-2 text-slate-600">The apex body, chaired by the Minister of Public Service, Labour and Social Welfare. It has 21 members and 2 observers (7 from Organised Labour, 7 from Organised Business, 7 Government members). It deliberates on reports from the Technical Committee and makes recommendations to Cabinet.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-tnf-navy">Technical Committee</h3>
              <p className="mt-2 text-slate-600">Chaired by a Deputy Chief Secretary to the President and Cabinet. Operates in clusters (Labour, Economic, Social). Carries out research and prepares documents for discussion in the Main TNF.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-tnf-navy">Management Committee</h3>
              <p className="mt-2 text-slate-600">Representatives from Government, Organised Business, and Organised Labour. Oversees Secretariat operations and sets the agenda for Main TNF meetings.</p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-tnf-gold/30 bg-tnf-gold/5 p-6">
            <h3 className="font-semibold text-tnf-navy">TNF Act 2019</h3>
            <p className="mt-2 text-sm text-slate-600">
              Download the full Tripartite Negotiating Forum Act for detailed provisions.
            </p>
            <Link
              href="#"
              className="mt-4 inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy"
            >
              Download PDF (Coming soon)
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Link>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link href="/about/history" className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy">
            Our History →
          </Link>
          <Link href="/about/team" className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy">
            Our Team →
          </Link>
          <Link href="/about/faqs" className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy">
            FAQs →
          </Link>
          <Link href="/departments" className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy">
            Departments →
          </Link>
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
