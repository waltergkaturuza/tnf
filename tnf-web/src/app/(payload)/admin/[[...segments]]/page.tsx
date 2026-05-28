/* THIS FILE WAS GENERATED FOR PAYLOAD INTEGRATION */
import type { Metadata } from "next";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

type Args = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

export const dynamic = "force-dynamic";

// Pass params directly — do NOT default undefined segments to [].
// When segments is undefined (/admin root), Payload formats the path as null → /admin.
// When segments is [] it formats as /admin/ which fails the dashboard route match.
const Page = ({ params, searchParams }: Args) =>
  RootPage({
    config,
    importMap,
    params: params as Promise<{ segments: string[] }>,
    searchParams,
  });

export default Page;
