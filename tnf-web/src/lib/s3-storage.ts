import { s3Storage } from "@payloadcms/storage-s3";

export function isRunningOnVercel(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
}

/** Resolve Supabase project URL from Vercel integration or Postgres connection string. */
export function getSupabaseUrl(): string {
  const explicit =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "";
  if (explicit) return explicit.replace(/\/$/, "");

  const db =
    process.env.DATABASE_URI ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    "";

  const userMatch = db.match(/postgres\.([a-z0-9]+)/i);
  if (userMatch) return `https://${userMatch[1]}.supabase.co`;

  const hostMatch = db.match(/db\.([a-z0-9]+)\.supabase\.co/i);
  if (hostMatch) return `https://${hostMatch[1]}.supabase.co`;

  return "";
}

function getSupabaseProjectRef(): string | null {
  const url = getSupabaseUrl();
  const match = url.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
  return match?.[1] ?? null;
}

/** Supabase S3 endpoint — see https://supabase.com/docs/guides/storage/s3/authentication */
export function getS3Endpoint(): string {
  if (process.env.S3_ENDPOINT) return process.env.S3_ENDPOINT;

  const projectRef = getSupabaseProjectRef();
  if (projectRef) return `https://${projectRef}.storage.supabase.co/storage/v1/s3`;

  return "";
}

function getS3Credentials() {
  return {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey:
      process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "",
  };
}

/** Bucket name — defaults to tnf-media when other S3 credentials are present. */
export function getS3Bucket(): string {
  return process.env.S3_BUCKET?.trim() || "tnf-media";
}

export function isS3StorageEnabled(): boolean {
  const { accessKeyId, secretAccessKey } = getS3Credentials();
  return Boolean(getS3Bucket() && accessKeyId && secretAccessKey && getS3Endpoint());
}

export function getMissingS3EnvVars(): string[] {
  const missing: string[] = [];
  if (!getS3Bucket()) missing.push("S3_BUCKET");
  const { accessKeyId, secretAccessKey } = getS3Credentials();
  if (!accessKeyId) missing.push("S3_ACCESS_KEY_ID");
  if (!secretAccessKey) missing.push("S3_SECRET_ACCESS_KEY");
  if (!getS3Endpoint()) missing.push("SUPABASE_URL (or S3_ENDPOINT)");
  return missing;
}

function getPublicMediaUrl(filename: string, prefix?: string): string {
  const base = getSupabaseUrl();
  const bucket = getS3Bucket();
  const key = prefix ? `${prefix}/${filename}` : filename;
  return `${base}/storage/v1/object/public/${bucket}/${key}`;
}

/** Supabase Storage (S3-compatible) for Payload media uploads on Vercel. */
export function getS3StoragePlugin() {
  const endpoint = getS3Endpoint();
  const credentials = getS3Credentials();
  const enabled = isS3StorageEnabled();
  const bucket = getS3Bucket();

  return s3Storage({
    enabled,
    collections: {
      media: {
        disablePayloadAccessControl: true,
        generateFileURL: ({
          filename,
          prefix,
        }: {
          filename: string;
          prefix?: string | null;
        }) => getPublicMediaUrl(filename, prefix ?? undefined),
      },
    },
    bucket,
    clientUploads:
      enabled &&
      (process.env.S3_CLIENT_UPLOADS === "true" ||
        process.env.VERCEL === "1" ||
        Boolean(process.env.VERCEL_ENV)),
    config: {
      credentials,
      region: process.env.S3_REGION || "us-east-1",
      endpoint,
      forcePathStyle: true,
    },
  });
}
