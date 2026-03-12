import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const placeholderGradients = [
  "from-tnf-navy to-blue-700",
  "from-blue-800 to-tnf-navy",
  "from-slate-700 to-tnf-navy",
  "from-tnf-navy to-slate-800",
];

const placeholderIcons = [
  // People / dialogue
  <svg key="1" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4 6v-2a4 4 0 00-4-4H9m4 4v2M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>,
  // Handshake / agreement
  <svg key="2" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>,
  // Document / policy
  <svg key="3" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // Calendar / event
  <svg key="4" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
];

export function PhotoGallery() {
  const images = siteConfig.galleryImages ?? [];

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
              <div className="relative aspect-[4/3] overflow-hidden">
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]}`}>
                    {placeholderIcons[i % placeholderIcons.length]}
                  </div>
                )}
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
          media library. Real photos replace these placeholders automatically.
        </p>
      </div>
    </section>
  );
}
