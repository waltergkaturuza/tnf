"use client";

import { siteConfig } from "@/lib/site-config";

const videos = (siteConfig as { videos?: { id: string; title: string; description: string; embedId?: string; placeholder?: boolean }[] }).videos ?? [];

export function VideoSection() {
  if (videos.length === 0) return null;

  return (
    <section className="bg-tnf-navy py-16 sm:py-20">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Watch TNF
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
            Hear from leadership and explore TNF in short, impactful videos.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="overflow-hidden rounded-xl border border-white/20 bg-white/5">
              <div className="relative aspect-video">
                {video.embedId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-800/50 p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30">
                      <svg className="h-8 w-8 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-center text-sm text-slate-300">
                      Video coming soon
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-white">{video.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
