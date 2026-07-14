import Image from "next/image";
import { getPublishedGalleryItems, type GalleryPhoto } from "@/lib/gallery";

function GalleryFigure({ item }: { item: GalleryPhoto }) {
  const external = item.src.startsWith("http://") || item.src.startsWith("https://");
  const figure = (
    <figure className="gallery-card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          unoptimized={external || item.src.startsWith("/api/")}
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <figcaption className="gallery-card__caption border-t border-white/40 px-5 py-3 text-base font-semibold text-tnf-navy sm:px-7 sm:py-4 sm:text-lg">
        {item.caption}
      </figcaption>
    </figure>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-tnf-green focus-visible:ring-offset-2"
      >
        {figure}
      </a>
    );
  }

  return figure;
}

export async function PhotoGallery() {
  const images = await getPublishedGalleryItems();
  if (images.length === 0) return null;

  return (
    <section className="gallery-section py-10 sm:py-14">
      <div className="gallery-section__inner">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF in Action
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Events, dialogues, and stakeholder engagement across Zimbabwe.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {images.map((img) => (
            <GalleryFigure key={img.id} item={img} />
          ))}
        </div>
      </div>
    </section>
  );
}
