import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-tnf-navy py-16 sm:py-20">
      <div className="container-wide text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
          Have questions, feedback, or want to engage with TNF? We&apos;re here to help.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-tnf-gold px-6 py-3 text-sm font-semibold text-tnf-navy transition-colors hover:bg-tnf-gold-light"
          >
            Contact Us
          </Link>
          <Link
            href="/feedback"
            className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Feedback Portal
          </Link>
        </div>
      </div>
    </section>
  );
}
