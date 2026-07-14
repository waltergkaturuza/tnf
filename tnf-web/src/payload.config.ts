import "dotenv/config";

// Supabase uses a self-signed cert chain that Node rejects by default.
// This must run before any pg connection is opened.
// On Vercel: set DATABASE_SSL_NO_VERIFY=true in Environment Variables.
// Never set this on truly untrusted databases.
if (
  process.env.DATABASE_SSL_NO_VERIFY === "true" ||
  process.env.VERCEL === "1" ||
  process.env.VERCEL_ENV
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users.js";
import { Media } from "./collections/Media.js";
import { Posts } from "./collections/Posts.js";
import { Events } from "./collections/Events.js";
import { Resources } from "./collections/Resources.js";
import { Partners } from "./collections/Partners.js";
import { GalleryItems } from "./collections/GalleryItems.js";
import { Downloads } from "./collections/Downloads.js";
import { FormSubmissions } from "./collections/FormSubmissions.js";
import { AnalyticsEvents } from "./collections/AnalyticsEvents.js";
import { getMissingS3EnvVars, getS3Bucket, getS3StoragePlugin, isRunningOnVercel, isS3StorageEnabled } from "./lib/s3-storage.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function getPostgresConnectionString(): string {
  const uri =
    process.env.DATABASE_URI ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    "";

  if (!uri) {
    throw new Error(
      "Missing Postgres connection string. Set DATABASE_URI (or POSTGRES_URL_NON_POOLING) in .env — see docs/SUPABASE.md",
    );
  }

  if (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://")) {
    throw new Error(
      "DATABASE_URI points to MongoDB, but this project uses Postgres (Supabase). Replace it with your Supabase POSTGRES_URL_NON_POOLING (port 5432). See docs/SUPABASE.md",
    );
  }

  return uri;
}

function stripSslQueryParams(connectionString: string): string {
  return connectionString
    .replace(/([?&])sslmode=[^&]*&?/gi, "$1")
    .replace(/([?&])sslcert=[^&]*&?/gi, "$1")
    .replace(/([?&])sslkey=[^&]*&?/gi, "$1")
    .replace(/([?&])sslrootcert=[^&]*&?/gi, "$1")
    .replace(/\?&/g, "?")
    .replace(/[?&]$/, "");
}

function isSupabaseHost(connectionString: string): boolean {
  return /supabase\.co|pooler\.supabase\.com/i.test(connectionString);
}

/**
 * Supabase + Node (Windows local, Vercel serverless) fail with
 * SELF_SIGNED_CERT_IN_CHAIN when sslmode=require is treated as verify-full.
 * Strip sslmode from the URI and set rejectUnauthorized: false on the pool.
 */
function shouldRelaxPostgresSsl(connectionString: string): boolean {
  if (process.env.DATABASE_SSL_STRICT === "true") return false;
  if (process.env.DATABASE_SSL_NO_VERIFY === "true") return true;
  if (isRunningOnVercel()) return true;
  if (isSupabaseHost(connectionString)) return true;
  if (/sslmode=require/i.test(connectionString)) return true;
  return false;
}

function getPostgresPoolConfig() {
  let connectionString = getPostgresConnectionString();

  if (shouldRelaxPostgresSsl(connectionString)) {
    connectionString = stripSslQueryParams(connectionString);
    return {
      connectionString,
      ssl: { rejectUnauthorized: false },
    };
  }

  return { connectionString };
}

export default buildConfig({
  onInit: async (payload) => {
    if (isS3StorageEnabled()) {
      payload.logger.info(
        `Supabase Storage enabled for media (bucket: ${getS3Bucket()}).`,
      );
    } else if (isRunningOnVercel()) {
      payload.logger.error(
        `Media uploads require Supabase Storage on Vercel. Missing env vars: ${getMissingS3EnvVars().join(", ")}. See tnf-web/docs/SUPABASE.md`,
      );
    }
  },
  admin: {
    user: Users.slug,
    theme: "dark",
    meta: {
      title: "TNF Content Manager",
      titleSuffix: " | TNF Admin",
        description:
          "Tripartite Negotiating Forum content management for news, events, media, partners, gallery, and resources.",
    },
    components: {
      graphics: {
        Logo: "./components/admin/AdminLogo",
        Icon: "./components/admin/AdminIcon",
      },
      beforeLogin: ["./components/admin/BeforeLogin"],
      afterLogin: ["./components/admin/AfterLogin"],
      afterNavLinks: ["./components/admin/FormSubmissionsNav"],
      views: {
        dashboard: {
          Component: "./components/admin/AnalyticsDashboard",
        },
        formContact: {
          Component: "./components/admin/FormInboxContact",
          path: "/forms/contact",
          meta: { title: "Contact" },
        },
        formFeedback: {
          Component: "./components/admin/FormInboxFeedback",
          path: "/forms/feedback",
          meta: { title: "Feedback" },
        },
        formWhistleblower: {
          Component: "./components/admin/FormInboxWhistleblower",
          path: "/forms/whistleblower",
          meta: { title: "Whistleblower" },
        },
        formNewsletter: {
          Component: "./components/admin/FormInboxNewsletter",
          path: "/forms/newsletter",
          meta: { title: "Newsletter" },
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Events, Resources, Partners, GalleryItems, Downloads, FormSubmissions, AnalyticsEvents],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_IN_PRODUCTION",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: getPostgresPoolConfig(),
    schemaName: process.env.POSTGRES_SCHEMA || "tnf",
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [getS3StoragePlugin()],
});
