import type { FieldHook, TextField } from "payload";
import { altFromFilename, slugify } from "./slugify.js";

function makeSlugFromSourceHook(sourceField: string): FieldHook {
  return ({ value, data }) => {
    if (typeof value === "string" && value.trim()) return slugify(value);
    const source = data?.[sourceField];
    if (typeof source === "string" && source.trim()) return slugify(source);
    return value;
  };
}

type SoftSlugOptions = Partial<TextField> & {
  /** Form field to derive the slug from (default: title). */
  sourceField?: string;
};

/** Shared slug field: live UI sync from title/name + server-side fallback. */
export function slugFromTitleField(overrides: SoftSlugOptions = {}): TextField {
  const { admin, hooks, name = "slug", sourceField = "title", ...rest } = overrides;
  const label = sourceField === "name" ? "name" : "title";

  return {
    name,
    type: "text",
    required: true,
    unique: true,
    index: true,
    hasMany: false,
    ...rest,
    hooks: {
      ...hooks,
      beforeValidate: [makeSlugFromSourceHook(sourceField), ...(hooks?.beforeValidate ?? [])],
    },
    admin: {
      position: "sidebar",
      description: `Auto-filled from ${label}; edit anytime to customize.`,
      ...admin,
      custom: {
        sourceField,
        ...admin?.custom,
      },
      components: {
        Field: "./components/admin/SlugField",
        ...admin?.components,
      },
    },
  } as TextField;
}

const altFromFilenameHook: FieldHook = ({ value, data, req }) => {
  if (typeof value === "string" && value.trim()) return value.trim();

  const filename =
    (typeof data?.filename === "string" && data.filename) || req.file?.name || "";

  if (filename) return altFromFilename(filename);
  return value;
};

/** Media alt field: auto from filename when left blank. */
export function altFromFilenameField(overrides: Partial<TextField> = {}): TextField {
  const { admin, hooks, name = "alt", ...rest } = overrides;
  return {
    name,
    type: "text",
    required: true,
    hasMany: false,
    ...rest,
    hooks: {
      ...hooks,
      beforeValidate: [altFromFilenameHook, ...(hooks?.beforeValidate ?? [])],
    },
    admin: {
      description: "Auto-filled from the file name; edit anytime to customize.",
      ...admin,
      components: {
        Field: "./components/admin/AltField",
        ...admin?.components,
      },
    },
  } as TextField;
}
