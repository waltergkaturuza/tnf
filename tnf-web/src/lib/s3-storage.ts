import { s3Storage } from "@payloadcms/storage-s3";

export function isS3StorageEnabled(): boolean {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY &&
      process.env.S3_ENDPOINT,
  );
}

function getPublicMediaUrl(filename: string, prefix?: string): string {
  const base = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(
    /\/$/,
    "",
  );
  const bucket = process.env.S3_BUCKET ?? "";
  const key = prefix ? `${prefix}/${filename}` : filename;
  return `${base}/storage/v1/object/public/${bucket}/${key}`;
}

/** Supabase Storage (S3-compatible) for Payload media uploads on Vercel. */
export function getS3StoragePlugin() {
  return s3Storage({
    enabled: isS3StorageEnabled(),
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
    bucket: process.env.S3_BUCKET ?? "",
    clientUploads:
      isS3StorageEnabled() &&
      (process.env.S3_CLIENT_UPLOADS === "true" ||
        process.env.VERCEL === "1" ||
        Boolean(process.env.VERCEL_ENV)),
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
      },
      region: process.env.S3_REGION || "us-east-1",
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    },
  });
}
