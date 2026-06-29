import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function PhotoGallery() {
  const images = siteConfig.galleryImages ?? [];

  return (
    <section className="gallery-section py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Events, dialogues, and stakeholder engagement across Zimbabwe.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {images.map((img) => (
            <figure key={img.src} className="gallery-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <figcaption className="gallery-card__caption border-t border-white/40 px-5 py-4 text-base font-semibold text-tnf-navy sm:px-7 sm:py-5 sm:text-lg">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
