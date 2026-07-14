import Image from "next/image";
import Link from "next/link";
import { ResourcesLibrary } from "@/components/resources/ResourcesLibrary";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getPublishedGalleryItems } from "@/lib/gallery";
import { getPublishedResources } from "@/lib/resources";

export const metadata = {
  title: "Resources",
  description: "Reports, plans, gallery, and downloadable documents from the Tripartite Negotiating Forum.",
};

export const dynamic = "force-dynamic";

const GLASS_CARD = "about-card p-6 lg:p-8";

export default async function ResourcesPage() {
  const [resources, galleryItems] = await Promise.all([
    getPublishedResources(),
    getPublishedGalleryItems(),
  ]);
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
        {galleryItems.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((img) => {
              const external =
                img.src.startsWith("http://") || img.src.startsWith("https://");
              const card = (
                <div className="gallery-card group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={external || img.src.startsWith("/api/")}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="border-t border-white/40 bg-white/50 px-3 py-3 text-center backdrop-blur-sm">
                    <span className="text-sm font-medium text-tnf-navy">{img.caption}</span>
                  </div>
                </div>
              );

              if (img.href) {
                return (
                  <a
                    key={img.id}
                    href={img.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-tnf-green"
                  >
                    {card}
                  </a>
                );
              }

              return <div key={img.id}>{card}</div>;
            })}
          </div>
        ) : (
          <div className={`${GLASS_CARD} mx-auto mt-8 max-w-xl text-center`}>
            <p className="text-sm text-slate-600">
              Gallery photos will appear here once published in Admin → Gallery.
            </p>
          </div>
        )}
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
