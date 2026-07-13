import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import { getMissingS3EnvVars, isRunningOnVercel, isS3StorageEnabled } from "@/lib/s3-storage";
import {
  buildStoragePrefix,
  datedStorageFilename,
  mapFormTypeToFolder,
  slugifyStorageSegment,
  type StorageFolder,
} from "@/lib/storage-paths";

export const runtime = "nodejs";

const MAX_BYTES = 4.5 * 1024 * 1024; // under Vercel request body limit
const ALLOWED_PREFIXES = ["image/", "application/pdf", "application/msword", "application/vnd."];

const FOLDER_VALUES = new Set<StorageFolder>([
  "media",
  "resources",
  "feedback",
  "whistleblower",
  "contact",
  "partners",
  "news",
  "events",
]);

function isAllowedType(type: string): boolean {
  if (!type) return false;
  return ALLOWED_PREFIXES.some((prefix) => type.startsWith(prefix));
}

function resolveFolder(raw: string, formType: string): StorageFolder {
  if (FOLDER_VALUES.has(raw as StorageFolder)) return raw as StorageFolder;
  return mapFormTypeToFolder(formType);
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
    const formType = String(formData.get("formType") || "");
    const categoryRaw = String(formData.get("category") || "").trim();
    const folder = resolveFolder(String(formData.get("folder") || "").trim(), formType);
    const storageCategory = categoryRaw || "general";

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

    const datedName = datedStorageFilename(file.name);
    const prefix = buildStoragePrefix(folder, storageCategory);
    const buffer = Buffer.from(await file.arrayBuffer());
    const payload = await getPayload({ config });

    const mediaData: Partial<Media> & Pick<Media, "alt" | "folder"> = {
      alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || file.name,
      folder,
      storageCategory: slugifyStorageSegment(storageCategory),
      prefix,
    };

    const doc = await payload.create({
      collection: "media",
      data: mediaData,
      file: {
        data: buffer,
        mimetype: file.type || "application/octet-stream",
        name: datedName,
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
      prefix: doc.prefix ?? prefix,
      folder,
      storageCategory: slugifyStorageSegment(storageCategory),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("[form-attachment]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
