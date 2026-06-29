import { Hero } from "@/components/Hero";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoSection } from "@/components/VideoSection";
import { Infographics } from "@/components/Infographics";
import { LatestNews } from "@/components/LatestNews";
import { UpcomingEvents } from "@/components/UpcomingEvents";

export const revalidate = 3600; // revalidate every hour

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerLogos />
      <PhotoGallery />
      <VideoSection />
      <Infographics />
      <LatestNews />
      <UpcomingEvents />
    </>
  );
}
