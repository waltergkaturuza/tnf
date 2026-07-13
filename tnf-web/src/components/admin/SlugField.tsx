"use client";

import { useEffect, useRef } from "react";
import { TextField, useField, useFormFields } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { slugify } from "@/lib/slugify";

/**
 * Slug field that auto-fills from Title or Name as you type/paste,
 * until the editor manually changes the slug.
 *
 * Set `admin.custom.sourceField` to `"name"` (default `"title"`).
 */
export const SlugField: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField<string>({ path: props.path });
  const sourceField =
    (props.field?.admin?.custom?.sourceField as string | undefined) || "title";
  const sourceValue = useFormFields(
    ([fields]) => fields[sourceField]?.value as string | undefined,
  );
  const lastAutoSlug = useRef<string>("");

  useEffect(() => {
    if (!sourceValue?.trim()) return;

    const next = slugify(sourceValue);
    if (!next) return;

    // Keep syncing while empty, or while still matching the last auto value.
    if (!value || value === lastAutoSlug.current) {
      lastAutoSlug.current = next;
      if (value !== next) setValue(next);
    }
  }, [sourceValue, value, setValue]);

  return <TextField {...props} />;
};

export default SlugField;
