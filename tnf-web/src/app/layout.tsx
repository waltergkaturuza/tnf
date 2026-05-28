/**
 * Root layout must exist for Next.js, but must NOT render <html>/<body>.
 * Each route group provides its own document root:
 * - (site) → public site
 * - (payload) → Payload RootLayout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
