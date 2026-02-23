import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function PartnerLogos() {
  const partners = (siteConfig as { partners?: { name: string; logo: string; href: string }[] }).partners ?? [];

  if (partners.length === 0) return null;

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-tnf-navy sm:text-3xl">
            Our Partners
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Government, labour, business, and development partners in social dialogue.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner) => {
            const content = (
              <div className="flex h-16 w-24 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 transition-shadow hover:shadow-md sm:h-20 sm:w-28">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={48}
                  className="h-10 w-auto object-contain sm:h-12"
                />
                <span className="mt-1 hidden truncate text-center text-xs text-slate-600 sm:block">
                  {partner.name}
                </span>
              </div>
            );
            return partner.href && partner.href !== "#" ? (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus:ring-2 focus:ring-tnf-gold focus:ring-offset-2"
              >
                {content}
              </a>
            ) : (
              <div key={partner.name}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
