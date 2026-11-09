import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Vacancy as VacancyDoc } from "@/payload-types";

export type VacancyItem = {
  id: string;
  slug: string;
  title: string;
  reportingTo?: string;
  intro?: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  applicationProcedure?: string;
  deliveryAddress: string[];
  applicationEmail?: string;
  notice?: string;
  advertUrl?: string;
  closingDateISO: string;
  closingDateDisplay: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function toLines(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•\u2022\uF0B7]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
}

function textOrUndefined(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function getAdvertUrl(media: VacancyDoc["advertFile"]): string | undefined {
  if (!media || typeof media !== "object") return undefined;
  return textOrUndefined((media as Media).url);
}

export function payloadVacanciesToItems(docs: VacancyDoc[]): VacancyItem[] {
  return docs.map((doc) => ({
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    reportingTo: textOrUndefined(doc.reportingTo),
    intro: textOrUndefined(doc.intro),
    responsibilities: toLines(doc.responsibilities),
    qualifications: toLines(doc.qualifications),
    skills: toLines(doc.skills),
    applicationProcedure: textOrUndefined(doc.applicationProcedure),
    deliveryAddress: toLines(doc.deliveryAddress),
    applicationEmail: textOrUndefined(doc.applicationEmail),
    notice: textOrUndefined(doc.notice),
    advertUrl: getAdvertUrl(doc.advertFile),
    closingDateISO: doc.closingDate,
    closingDateDisplay: new Date(doc.closingDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Harare",
    }),
  }));
}

/** Published vacancies stay listed until the end of their closing day. */
export async function getOpenVacancies(limit = 24): Promise<VacancyItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "vacancies",
      where: {
        and: [
          { status: { equals: "published" } },
          { closingDate: { greater_than_equal: new Date(Date.now() - DAY_MS).toISOString() } },
        ],
      },
      sort: "closingDate",
      limit,
      depth: 1,
      overrideAccess: true,
    });
    return payloadVacanciesToItems(result.docs);
  } catch {
    return [];
  }
}
