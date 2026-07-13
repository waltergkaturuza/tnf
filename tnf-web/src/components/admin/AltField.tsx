"use client";

import { useEffect, useRef } from "react";
import { TextField, useField, useFormFields } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { altFromFilename } from "@/lib/slugify";

/**
 * Media Alt field — auto-fills from the uploaded filename until edited manually.
 */
export const AltField: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField<string>({ path: props.path });
  const filename = useFormFields(([fields]) => fields.filename?.value as string | undefined);
  const lastAutoAlt = useRef<string>("");

  useEffect(() => {
    if (!filename?.trim()) return;

    const next = altFromFilename(filename);
    if (!next) return;

    if (!value || value === lastAutoAlt.current) {
      lastAutoAlt.current = next;
      if (value !== next) setValue(next);
    }
  }, [filename, value, setValue]);

  return <TextField {...props} />;
};

export default AltField;
