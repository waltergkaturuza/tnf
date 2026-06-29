"use client";

type TnfVideoPlayerProps = {
  src: string;
  title: string;
  loop?: boolean;
  autoplay?: boolean;
};

export function TnfVideoPlayer({ src, title, loop = true, autoplay = true }: TnfVideoPlayerProps) {
  return (
    <div className="tnf-video-player h-full w-full bg-black">
      <video
        src={src}
        title={title}
        className="h-full w-full bg-black object-contain"
        controls
        controlsList="nodownload"
        loop={loop}
        autoPlay={autoplay}
        muted={autoplay}
        playsInline
        preload="metadata"
      />
    </div>
  );
}
