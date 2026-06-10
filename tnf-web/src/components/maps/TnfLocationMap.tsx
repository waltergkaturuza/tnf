import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type Props = {
  className?: string;
  /** Compact card for sidebar columns (e.g. Contact page left column). */
  compact?: boolean;
};

export function TnfLocationMap({ className = "", compact = false }: Props) {
  const { mapsUrl, mapsEmbedUrl, social } = siteConfig.contact;

  if (compact) {
    return (
      <div className={className} aria-labelledby="tnf-location-heading">
        <h3 id="tnf-location-heading" className="text-sm font-semibold uppercase tracking-wide text-tnf-green">
          Location
        </h3>
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <iframe
            title="TNF Zimbabwe Secretariat location on Google Maps"
            src={mapsEmbedUrl}
            className="aspect-[4/3] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-tnf-green hover:underline"
          >
            Open in Google Maps →
          </a>
          <Link
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-500 hover:text-tnf-green hover:underline"
          >
            @TNFZimbabwe
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className={className} aria-labelledby="tnf-location-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-tnf-green">TNF Zimbabwe</p>
          <h2 id="tnf-location-heading" className="mt-1 text-xl font-bold text-tnf-navy sm:text-2xl">
            Find the Secretariat
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            {siteConfig.contact.address}. Use the map for directions or open the full location in Google Maps.
          </p>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-tnf-green/40 bg-white px-4 py-2 text-sm font-semibold text-tnf-green transition-colors hover:bg-emerald-50"
        >
          Open in Google Maps
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <iframe
          title="TNF Zimbabwe Secretariat location on Google Maps"
          src={mapsEmbedUrl}
          className="aspect-[16/10] w-full border-0 sm:aspect-[21/9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <address className="not-italic leading-relaxed">
          {siteConfig.contact.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <Link
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-tnf-green hover:underline"
        >
          @TNFZimbabwe
        </Link>
      </div>
    </section>
  );
}
