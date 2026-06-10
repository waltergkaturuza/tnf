import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "./NewsletterForm";

function telHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.startsWith("263")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+263${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function FooterIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-tnf-gold" aria-hidden>
      {children}
    </span>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  const addressLines = contact.addressLines;

  return (
    <footer className="border-t border-slate-200/30 bg-[#273E5D]">
      <div className="container-wide py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/tnf-logo.png"
              alt="TNF Tripartite Negotiating Forum"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-2 text-sm text-slate-200">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {siteConfig.footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Engage</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/feedback" className="text-sm text-slate-200 hover:text-white">
                  Feedback Portal
                </Link>
              </li>
              <li>
                <Link href="/whistleblower" className="text-sm text-slate-200 hover:text-white">
                  Whistleblower
                </Link>
              </li>
            </ul>
            <NewsletterForm variant="footer" />
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              <li className="flex gap-3">
                <FooterIcon>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </FooterIcon>
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>

              {contact.team.map((member) => (
                <li key={member.name} className="flex gap-3">
                  <FooterIcon>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </FooterIcon>
                  <a href={telHref(member.phone)} className="hover:text-white">
                    {member.name}, {member.phone}
                  </a>
                </li>
              ))}

              <li className="flex gap-3">
                <FooterIcon>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </FooterIcon>
                <a href={telHref(contact.phone)} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>

              <li className="flex gap-3">
                <FooterIcon>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </FooterIcon>
                <address className="not-italic leading-relaxed">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>

              <li className="flex gap-3">
                <FooterIcon>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </FooterIcon>
                <a href={siteConfig.url} className="hover:text-white">
                  tnfzim.com
                </a>
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              <a
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="-mx-4 mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 px-4 py-6 sm:-mx-6 sm:px-6 sm:flex-row lg:-mx-8 lg:px-8 xl:-mx-[10mm] xl:px-[10mm]">
          <p className="text-center text-sm text-slate-200">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/admin" className="text-sm text-slate-300 hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
