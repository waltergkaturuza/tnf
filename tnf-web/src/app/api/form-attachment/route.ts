import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getMissingS3EnvVars, isRunningOnVercel, isS3StorageEnabled } from "@/lib/s3-storage";

export const runtime = "nodejs";

const MAX_BYTES = 4.5 * 1024 * 1024; // under Vercel request body limit
const ALLOWED_PREFIXES = ["image/", "application/pdf", "application/msword", "application/vnd."];

function isAllowedType(type: string): boolean {
  if (!type) return false;
  return ALLOWED_PREFIXES.some((prefix) => type.startsWith(prefix));
}

export async function POST(request: Request) {
  try {
    if (isRunningOnVercel() && !isS3StorageEnabled()) {
      return NextResponse.json(
        {
          error: `File storage is not configured. Missing: ${getMissingS3EnvVars().join(", ")}. Add S3_BUCKET=tnf-media on Vercel and redeploy.`,
        },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 4.5 MB." },
        { status: 400 },
      );
    }

    if (!isAllowedType(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF, Word, or an image." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const payload = await getPayload({ config });

    const doc = await payload.create({
      collection: "media",
      data: {
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || file.name,
      },
      file: {
        data: buffer,
        mimetype: file.type || "application/octet-stream",
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    });

    return NextResponse.json({
      id: doc.id,
      url: doc.url,
      filename: doc.filename,
      mimeType: doc.mimeType,
      filesize: doc.filesize,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("[form-attachment]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
