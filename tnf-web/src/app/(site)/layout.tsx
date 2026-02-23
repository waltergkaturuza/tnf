import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-tnf-gold focus-visible:px-4 focus-visible:py-2 focus-visible:text-tnf-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tnf-gold"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 scroll-mt-24" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
