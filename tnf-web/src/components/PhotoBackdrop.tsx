"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type PhotoSlide = {
  src: string;
  alt: string;
};

type PhotoBackdropProps = {
  slides: readonly PhotoSlide[];
  intervalMs?: number;
};

export function PhotoBackdrop({ slides, intervalMs = 6000 }: PhotoBackdropProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(nextSlide, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, nextSlide, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="about-photo-slider" aria-hidden>
      <div className="about-photo-slider__track">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`about-photo-slide${index === activeIndex ? " about-photo-slide--active" : ""}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="about-photo-slide__image object-cover"
            />
          </div>
        ))}
      </div>
      <div className="about-photo-slider__overlay" />
    </div>
  );
}
