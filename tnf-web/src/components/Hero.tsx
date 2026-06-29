"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HERO_SLIDE_INTERVAL_MS, heroSlides } from "@/lib/hero-slides";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index % heroSlides.length);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero-slider relative overflow-hidden" aria-label="TNF homepage hero">
      <div className="hero-slider__track" aria-hidden>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-slide${index === activeIndex ? " hero-slide--active" : ""}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-slide__image object-cover"
            />
          </div>
        ))}
      </div>

      <div className="hero-slider__overlay" aria-hidden />

      <div className="hero-slider__content relative py-10 sm:py-12 lg:py-14">
        <div className="hero-slider__inner flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="hero-slider__logo shrink-0">
            <Image
              src="/tnf-logo.png"
              alt="TNF Tripartite Negotiating Forum"
              width={320}
              height={160}
              className="h-28 w-auto object-contain sm:h-36 lg:h-40"
              priority
            />
          </div>

          <div className="hero-slider__text min-w-0 w-full flex-1">
            <div className="hero-slider__card text-center lg:text-left">
              <div className="hero-slider__card-grid">
                <span
                  className="hero-slider__title hero-slider__card-measure text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl xl:text-[2.75rem]"
                  aria-hidden="true"
                >
                  {siteConfig.taglineLine1}
                </span>
                <div className="hero-slider__card-content">
                  <p className="hero-slider__eyebrow">{siteConfig.name}</p>
                  <h1 className="hero-slider__title text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
                    <span className="hero-slider__title-line">{siteConfig.taglineLine1}</span>
                    <span className="hero-slider__title-line">{siteConfig.taglineLine2}</span>
                  </h1>
                  <p className="hero-slider__description mt-4 text-base leading-relaxed text-slate-100 sm:text-lg">
                    {siteConfig.description}
                  </p>
                  <div className="hero-slider__actions mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
                    <Link
                      href="/about"
                      className="btn-tnf-primary inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                      About TNF
                    </Link>
                    <Link
                      href="/resources"
                      className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                    >
                      Latest Reports
                    </Link>
                    <Link
                      href="/feedback"
                      className="inline-flex items-center rounded-full border-2 border-white/30 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/50 hover:text-white"
                    >
                      Submit Feedback
                    </Link>
                  </div>

                  <div className="hero-slider__dots mt-5 flex justify-center gap-2 lg:justify-start">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        type="button"
                        className={`hero-slider__dot${index === activeIndex ? " hero-slider__dot--active" : ""}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Show slide ${index + 1}: ${slide.alt}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
