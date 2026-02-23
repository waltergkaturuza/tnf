import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return siteConfig.workAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const area = siteConfig.workAreas.find((a) => a.slug === slug);
  if (!area) return { title: "Work Area" };
  return { title: area.title, description: area.description };
}

export default async function WorkAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = siteConfig.workAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work Areas", href: "/work-areas" }, { label: area.title }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{area.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">{area.description}</p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-xl font-bold text-tnf-navy">Overview</h2>
              <p className="mt-4 text-slate-600">{area.description}</p>
            </section>

            {area.keyServices && area.keyServices.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-tnf-navy">Key Services</h2>
                <ul className="mt-4 space-y-2">
                  {area.keyServices.map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tnf-gold" />
                      <span className="text-slate-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {area.slug === "client-service-charter" && (
              <div className="mt-12 rounded-xl border border-tnf-gold/30 bg-tnf-gold/5 p-6">
                <h3 className="font-semibold text-tnf-navy">Client Service Charter</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Download the Client Services Charter (abridged version for display).
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy"
                >
                  Download PDF (Coming soon)
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <aside>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-tnf-navy">Contact</h3>
              <p className="mt-2 text-sm text-slate-600">Opening hours: 8am – 4pm</p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mt-2 block text-tnf-gold hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-1 block text-tnf-gold hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              <Link
                href="/work-areas"
                className="mt-6 block text-sm font-medium text-tnf-gold hover:text-tnf-navy"
              >
                ← All Work Areas
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
