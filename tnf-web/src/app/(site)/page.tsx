import { Hero } from "@/components/Hero";
import { WorkAreaCards } from "@/components/WorkAreaCards";
import { Stakeholders } from "@/components/Stakeholders";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoSection } from "@/components/VideoSection";
import { Infographics } from "@/components/Infographics";
import { LatestNews } from "@/components/LatestNews";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { CTASection } from "@/components/CTASection";

export const revalidate = 3600; // revalidate every hour

export default function Home() {
  return (
    <>
      <Hero />
      <WorkAreaCards />
      <PartnerLogos />
      <Stakeholders />
      <PhotoGallery />
      <VideoSection />
      <Infographics />
      <LatestNews />
      <UpcomingEvents />
      <CTASection />
    </>
  );
}
