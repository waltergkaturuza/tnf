"use client";

import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { ABOUT_SLIDE_INTERVAL_MS, aboutSlides } from "@/lib/about-slides";

export function AboutPhotoBackdrop() {
  return <PhotoBackdrop slides={aboutSlides} intervalMs={ABOUT_SLIDE_INTERVAL_MS} />;
}
