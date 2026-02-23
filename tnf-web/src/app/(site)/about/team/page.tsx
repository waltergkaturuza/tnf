import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Our Team",
  description: "Meet the TNF Secretariat and leadership team.",
};

const teamMembers = [
  { name: "Honourable Edgar Moyo", role: "Minister of Public Service, Labour and Social Welfare — TNF Chairman", image: "/team/Minister-Edgar-Moyo.png" },
  { name: "Mr Albert Nyakadzumbu", role: "TNF Executive Director", image: "/team/Albert-Nyakadzumbu-TNF-Executive-Director.jpg" },
  { name: "Mr Emmanuel Mazhawidza", role: "Economic and Labour Cluster Coordinator", image: "/team/Mazhawidza.jpg" },
  { name: "Ms Beaula Ruparanganda", role: "Cluster Coordinator (Social)", image: "/team/Beaula-Ruparanganda.jpg" },
  { name: "Ms Tsitsi Mutongi", role: "Social Cluster Coordinator", image: "/team/Tsitsi-Mutongi.jpg" },
  { name: "Miss Judith Mate", role: "Human Resources Officer", image: "/team/Judy-Mate.jpg" },
  { name: "Mr Noel Saweto", role: "TNF Secretariat", image: "/team/Noel-Saweto.jpg" },
  { name: "Ms Misela Mpofu", role: "Labour Cluster Officer", image: "/team/MISELA-MPOFU.jpg" },
  { name: "Ms Melody Muchini", role: "Senior Administrative Assistant", image: "/team/melody-Muchini.png" },
  { name: "Mr Lloyd T.I Rwodzi", role: "Audit and Compliance Officer", image: "/team/LLOYD-RWODZI.jpg" },
  { name: "Miss Rachael Mukonda", role: "Communications and Advocacy Officer", image: "/team/Rachael-Mukonda.jpg" },
  { name: "Ms Pauline Chikanda", role: "Office Orderly", image: "/team/Pauline-Chikanda.jpg" },
  { name: "Mr Nigel Kaseke", role: "Driver/Messenger", image: "/team/Nigel-Kaseke.jpg" },
];

export default function TeamPage() {
  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our Team" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Our Team</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            The TNF Secretariat and leadership driving social dialogue in Zimbabwe.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-tnf-navy">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-tnf-gold hover:text-tnf-navy"
          >
            ← Back to About
          </Link>
        </div>
      </div>
    </div>
  );
}
