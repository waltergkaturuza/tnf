import Link from "next/link";
import { ResourcesLibrary } from "@/components/resources/ResourcesLibrary";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getPublishedResources } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Resources",
  description: "Reports, plans, gallery, and downloadable documents from the Tripartite Negotiating Forum.",
};

export const dynamic = "force-dynamic";

const GLASS_CARD = "about-card p-6 lg:p-8";

export default async function ResourcesPage() {
  const resources = await getPublishedResources();
  const otherDownloads = resources.filter((r) => r.category === "other");

  return (
    <SubpageLayout
      title="Resources"
      description="Reports, plans, gallery, and downloadable documents from the Tripartite Negotiating Forum."
    >
      <ResourcesLibrary resources={resources} />

      <section id="gallery" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
        <h2 className="text-center text-2xl font-bold text-tnf-navy">Gallery</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Events, dialogues, and stakeholder engagement across Zimbabwe.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(siteConfig.galleryImages ?? []).map((img, i) => (
            <div
              key={i}
              className="gallery-card flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-slate-100/90 to-emerald-50/40 p-4 text-center"
            >
              <span className="text-sm font-medium text-tnf-navy">{img.caption || img.alt}</span>
              {!img.src && <span className="mt-2 text-xs text-slate-500">Photo coming soon</span>}
            </div>
          ))}
        </div>
      </section>

      <section id="downloads" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
        <h2 className="text-center text-2xl font-bold text-tnf-navy">Other Downloads</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Additional publications, forms, and reference materials.
        </p>
        {otherDownloads.length > 0 ? (
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {otherDownloads.map((resource) => (
              <a
                key={resource.id}
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${GLASS_CARD} block transition hover:shadow-md`}
              >
                <h3 className="font-semibold text-tnf-navy">{resource.title}</h3>
                <p className="mt-1 text-xs font-medium text-tnf-navy/70">
                  {resource.type} · {resource.size}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <div className={`${GLASS_CARD} mx-auto mt-8 max-w-xl text-center`}>
            <p className="text-sm text-slate-600">
              Additional downloads will appear here. For specific documents, please{" "}
              <Link href="/contact" className="font-medium text-tnf-green hover:underline">
                contact the Secretariat
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </SubpageLayout>
  );
}
