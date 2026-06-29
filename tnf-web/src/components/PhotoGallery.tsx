import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function PhotoGallery() {
  const images = siteConfig.galleryImages ?? [];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell-inner">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Events, dialogues, and stakeholder engagement across Zimbabwe.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-8">
          {images.map((img) => (
            <figure
              key={img.src}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <figcaption className="border-t border-slate-100 px-5 py-4 text-base font-semibold text-tnf-navy sm:px-6 sm:py-5 sm:text-lg">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
