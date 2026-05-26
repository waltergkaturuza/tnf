import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Events } from "./collections/Events";
import { Resources } from "./collections/Resources";
import { FormSubmissions } from "./collections/FormSubmissions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | TNF Admin",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Events, Resources, FormSubmissions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_IN_PRODUCTION",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.POSTGRES_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        "",
    },
    schemaName: process.env.POSTGRES_SCHEMA || "tnf",
  }),
  sharp,
  plugins: [],
});
