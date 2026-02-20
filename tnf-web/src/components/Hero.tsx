import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-tnf-navy via-tnf-navy-light to-tnf-navy">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="container-wide relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Facilitating National Social Dialogue for Inclusive Economic Development
          </h1>
          <p className="mt-6 text-lg text-slate-200 sm:text-xl">
            The Tripartite Negotiating Forum brings together Government, Organised Business, and
            Organised Labour to build consensus and shape Zimbabwe&apos;s socio-economic future.
          </p>
          <div
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-tnf-gold px-6 py-3 text-sm font-semibold text-tnf-navy shadow-lg transition-all hover:bg-tnf-gold-light hover:shadow-xl"
            >
              About TNF
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Latest Reports
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center rounded-full border-2 border-white/30 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/50 hover:text-white"
            >
              Submit Feedback
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
