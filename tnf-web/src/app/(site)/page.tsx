import { Hero } from "@/components/Hero";
import { WorkAreaCards } from "@/components/WorkAreaCards";
import { Stakeholders } from "@/components/Stakeholders";
import { LatestNews } from "@/components/LatestNews";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkAreaCards />
      <Stakeholders />
      <LatestNews />
      <UpcomingEvents />
      <CTASection />
    </>
  );
}
