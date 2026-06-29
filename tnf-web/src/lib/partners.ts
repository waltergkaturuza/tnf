import { siteConfig } from "@/lib/site-config";

export type PartnerItem = {
  id: string;
  name: string;
  logo: string;
  href?: string;
  /** Light/white logos need a dark backing plate on glass cards */
  lightLogo?: boolean;
};

export function partnerNeedsDarkPlate(partner: { name: string; lightLogo?: boolean }): boolean {
  if (partner.lightLogo) return true;
  return /^ilo$/i.test(partner.name.trim());
}

function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as { url?: string };
  return m.url ?? null;
}

export function getFallbackPartners(): PartnerItem[] {
  return (siteConfig.partners ?? []).map((partner, index) => ({
    id: `fallback-${index}`,
    name: partner.name,
    logo: partner.logo,
    href: partner.href && partner.href !== "#" ? partner.href : undefined,
    lightLogo: "lightLogo" in partner ? partner.lightLogo : undefined,
  }));
}

export function payloadPartnersToItems(
  docs: Array<{
    id?: string | number;
    name: string;
    logo?: unknown;
    websiteUrl?: string | null;
    lightLogo?: boolean | null;
  }>,
): PartnerItem[] {
  const items: PartnerItem[] = [];

  for (const partner of docs) {
    const logo = getMediaUrl(partner.logo);
    if (!logo) continue;

    items.push({
      id: String(partner.id ?? partner.name),
      name: partner.name,
      logo,
      href: partner.websiteUrl?.trim() || undefined,
      lightLogo: partner.lightLogo ?? undefined,
    });
  }

  return items;
}
