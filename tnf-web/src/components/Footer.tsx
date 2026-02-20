import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/30 bg-[#273E5D]">
      <div className="container-wide py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-white">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-300 hover:text-white">
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
                <Link href="/feedback" className="text-sm text-slate-300 hover:text-white">
                  Feedback Portal
                </Link>
              </li>
              <li>
                <Link href="/whistleblower" className="text-sm text-slate-300 hover:text-white">
                  Whistleblower
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>{siteConfig.contact.phone}</li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>
            <div className="mt-3 flex gap-3">
              <a
                href={siteConfig.contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="-mx-[10mm] mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 px-[10mm] py-6 sm:flex-row">
          <p className="text-center text-sm text-slate-300">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/admin" className="text-sm text-slate-400 hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
