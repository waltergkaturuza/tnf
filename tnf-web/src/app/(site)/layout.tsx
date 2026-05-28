import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Zimbabwe`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
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
      </body>
    </html>
  );
}
