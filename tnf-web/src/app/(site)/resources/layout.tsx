import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plans & Reports",
  description: "Annual reports, strategic plans, performance plans, policy papers, and press releases.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
