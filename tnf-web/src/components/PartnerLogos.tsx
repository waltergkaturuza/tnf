import Image from "next/image";
import { getFallbackPartners, payloadPartnersToItems, type PartnerItem } from "@/lib/partners";
import { getPartners } from "@/lib/payload";

function PartnerCard({ partner }: { partner: PartnerItem }) {
  const card = (
    <div className="partner-card group flex h-full min-h-[9.5rem] flex-col items-center justify-center px-5 py-6 sm:min-h-[11rem] sm:px-6 sm:py-8">
      <div className="relative flex h-20 w-full items-center justify-center sm:h-24 lg:h-28">
        <Image
          src={partner.logo}
          alt={partner.name}
          width={200}
          height={120}
          unoptimized
          className="max-h-full max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
        />
      </div>
      <span className="mt-4 line-clamp-2 text-center text-sm font-semibold leading-snug text-tnf-navy sm:text-base">
        {partner.name}
      </span>
    </div>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-tnf-green focus-visible:ring-offset-2"
      >
        {card}
      </a>
    );
  }

  return <div className="h-full">{card}</div>;
}

export async function PartnerLogos() {
  let partners = getFallbackPartners();

  try {
    const { docs } = await getPartners();
    const fromCms = payloadPartnersToItems(docs ?? []);
    if (fromCms.length > 0) partners = fromCms;
  } catch {
    // Use static fallbacks from site-config / public/partners
  }

  if (partners.length === 0) return null;

  return (
    <section className="partners-section py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-tnf-navy sm:text-3xl">
            Our Partners
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Government, labour, business, and development partners in social dialogue.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
