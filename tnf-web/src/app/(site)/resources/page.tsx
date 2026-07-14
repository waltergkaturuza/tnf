import Image from "next/image";
import Link from "next/link";
import { ResourcesLibrary } from "@/components/resources/ResourcesLibrary";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getPublishedDownloads } from "@/lib/downloads";
import { getPublishedGalleryItems } from "@/lib/gallery";
import { getPublishedResources } from "@/lib/resources";

export const metadata = {
  title: "Resources",
  description: "Reports, plans, gallery, and downloadable documents from the Tripartite Negotiating Forum.",
};

export const dynamic = "force-dynamic";

const GLASS_CARD = "about-card p-6 lg:p-8";

function DownloadCard({
  id,
  title,
  description,
  type,
  size,
  downloadUrl,
}: {
  id: string;
  title: string;
  description?: string;
  type: string;
  size: string;
  downloadUrl: string;
}) {
  return (
    <a
      key={id}
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="about-card flex overflow-hidden p-0 transition hover:shadow-md"
    >
      <div className="flex h-28 w-24 shrink-0 items-center justify-center bg-slate-100">
        <Image src="/file.svg" alt="" width={48} height={48} className="opacity-60" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-2 font-semibold text-tnf-navy">{title}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{description}</p>
          )}
          <p className="mt-1.5 text-xs font-medium text-tnf-navy/70">
            {type} · {size}
          </p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-tnf-green">
          Download
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default async function ResourcesPage() {
  const [resources, galleryItems, downloads] = await Promise.all([
    getPublishedResources(),
    getPublishedGalleryItems(),
    getPublishedDownloads(),
  ]);

  // Prefer dedicated Downloads collection; also include Resources marked "Other".
  const otherFromResources = resources
    .filter((r) => r.category === "other")
    .map((r) => ({
      id: `resource-${r.id}`,
      title: r.title,
      description: r.description,
      type: r.type,
      size: r.size,
      downloadUrl: r.downloadUrl,
    }));

  const downloadIds = new Set(downloads.map((d) => d.downloadUrl));
  const otherDownloads = [
    ...downloads,
    ...otherFromResources.filter((r) => !downloadIds.has(r.downloadUrl)),
  ];

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
            {otherDownloads.map((item) => (
              <DownloadCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className={`${GLASS_CARD} mx-auto mt-8 max-w-xl text-center`}>
            <p className="text-sm text-slate-600">
              Files will appear here once published in{" "}
              <span className="font-medium text-tnf-navy">Admin → Downloads</span>
              . For specific documents, please{" "}
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
