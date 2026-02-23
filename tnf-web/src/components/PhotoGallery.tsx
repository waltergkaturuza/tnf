import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function PhotoGallery() {
  const images = siteConfig.galleryImages ?? [];

  if (images.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-tnf-navy sm:text-4xl">
            TNF in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Events, dialogues, and stakeholder engagement across Zimbabwe.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="px-4 py-3 text-sm font-medium text-slate-700">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Add your own event photos via the{" "}
          <Link href="/admin" className="text-tnf-gold hover:underline">
            admin
          </Link>{" "}
          media library.
        </p>
      </div>
    </section>
  );
}
