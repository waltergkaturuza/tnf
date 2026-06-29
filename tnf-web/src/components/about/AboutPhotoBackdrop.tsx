"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ABOUT_SLIDE_INTERVAL_MS, aboutSlides } from "@/lib/about-slides";

export function AboutPhotoBackdrop() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % aboutSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, ABOUT_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="about-photo-slider" aria-hidden>
      <div className="about-photo-slider__track">
        {aboutSlides.map((slide, index) => (
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
