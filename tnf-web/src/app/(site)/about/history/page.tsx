import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "History",
  description: "The evolution of the Tripartite Negotiating Forum in Zimbabwe since 1998.",
};

export default function HistoryPage() {
  const milestones = [
    {
      period: "Early Beginnings",
      era: "1990s",
      content:
        "The 1990s marked the beginning of the Tripartite Negotiating Forum (TNF) as Zimbabwe faced increasing socio-economic challenges. Recognizing the need for a platform where the Government, Organized Business, and Organized Labour could engage in dialogue, the TNF was established as a voluntary forum in 1998. This period was characterized by the initial efforts to bring together the key stakeholders to address the country's pressing economic issues through collective negotiation.",
    },
    {
      period: "Growth and Institutionalization",
      era: "2000s",
      content:
        "The 2000s saw the TNF evolve from a voluntary forum into a more structured and recognized institution. As Zimbabwe's economic challenges deepened, the TNF expanded its role, becoming instrumental in negotiating wage agreements, addressing hyperinflation, and formulating policies to stabilize the economy. Key milestones during this decade included the signing of formal agreements and the TNF's involvement in economic recovery efforts following periods of instability.",
    },
    {
      period: "Legislation and Strategic Impact",
      era: "2010s",
      content:
        "The 2010s were a transformative decade for the TNF, marked by its formal recognition through legislation. In 2019, the TNF Act was enacted, solidifying the forum's role as a key player in national socio-economic dialogue. This period also saw the TNF contribute significantly to the National Employment Policy and other critical frameworks aimed at improving Zimbabwe's economic and labor conditions.",
    },
    {
      period: "Resilience and Modernization",
      era: "2020s",
      content:
        "In the 2020s, the TNF continues to be a vital platform for dialogue amid new challenges, including the global COVID-19 pandemic. The forum has been integral in discussions surrounding the pandemic's impact on the economy, labor market, and public health. In 2023, an independent secretariat was established to coordinate the work of the TNF, and a two-year Strategic Plan was adopted in 2024. The TNF's ongoing commitment to fostering social dialogue, promoting inclusive growth, and adapting to the changing socio-economic landscape demonstrates its resilience and modernization.",
    },
  ];

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "History" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">History</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            The evolution of the Tripartite Negotiating Forum in Zimbabwe.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <section className="prose prose-slate max-w-none lg:prose-lg">
          <h2>The Evolution of the Tripartite Negotiating Forum in Zimbabwe</h2>
          <p>
            The Tripartite Negotiating Forum (TNF) was established to address the socio-economic
            challenges facing Zimbabwe through a structured dialogue among the key stakeholders: the
            Government, Organized Business, and Organized Labour. Over the years, TNF has played a
            pivotal role in shaping the nation&apos;s policies and fostering a collaborative
            environment that seeks to balance the interests of all parties involved.
          </p>
        </section>

        <div className="mt-12 space-y-8">
          {milestones.map((item, i) => (
            <div
              key={item.era}
              className="flex gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-tnf-navy text-white">
                <span className="text-sm font-bold">{i + 1}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-tnf-gold">{item.era}</span>
                <h3 className="mt-1 text-xl font-bold text-tnf-navy">{item.period}</h3>
                <p className="mt-4 text-slate-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy"
          >
            ← Back to About
          </Link>
        </div>
      </div>
    </div>
  );
}
