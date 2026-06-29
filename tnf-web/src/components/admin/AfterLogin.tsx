import Link from "next/link";

export default function AfterLogin() {
  return (
    <div className="tnf-admin-login-footer">
      <Link href="/" className="tnf-admin-login-back">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to website
      </Link>

      <div className="tnf-admin-login-links">
        <Link href="/contact">Contact Secretariat</Link>
        <Link href="/about/faqs">Help and FAQs</Link>
        <Link href="/news-events">View news and events</Link>
      </div>

      <p className="tnf-admin-login-note">
        Authorized TNF personnel only. If you need access, contact the Secretariat.
      </p>
    </div>
  );
}
