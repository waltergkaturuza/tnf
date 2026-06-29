"use client";

import { siteConfig } from "@/lib/site-config";
import { TnfVideoPlayer } from "@/components/TnfVideoPlayer";

type SiteVideo = {
  id: string;
  title: string;
  description: string;
  embedId?: string;
  src?: string;
  placeholder?: boolean;
  loop?: boolean;
  autoplay?: boolean;
};

const videos = ((siteConfig as { videos?: SiteVideo[] }).videos ?? []) as SiteVideo[];

export function VideoSection() {
  if (videos.length === 0) return null;

  return (
    <section className="video-section bg-tnf-navy py-10 sm:py-12">
      <div className="video-section__inner">
        <div className="text-center">
          <h2 className="mx-auto max-w-4xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Hear from leadership and explore TNF in short, impactful videos.
          </h2>
        </div>
        <div className="video-section__grid mt-8 grid gap-6 sm:mt-9 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {videos.map((video) => (
            <div key={video.id} className="video-section__card overflow-hidden rounded-xl border border-white/20 bg-white/5">
              <div className="video-section__media relative">
                {video.src ? (
                  <TnfVideoPlayer
                    src={video.src}
                    title={video.title}
                    loop={video.loop ?? true}
                    autoplay={video.autoplay ?? true}
                  />
                ) : video.embedId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-800/50 p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30">
                      <svg className="h-8 w-8 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-center text-sm text-slate-300">Video coming soon</p>
                  </div>
                )}
              </div>
              <div className="video-section__caption p-4 sm:p-5">
                <h3 className="font-semibold text-white">{video.title}</h3>
                {video.description ? (
                  <p className="mt-2 text-sm text-slate-300">{video.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
