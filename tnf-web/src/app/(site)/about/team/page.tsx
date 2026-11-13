import Image from "next/image";
import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

export const metadata = {
  title: "Our Team",
  description: "Meet the TNF Secretariat and leadership team.",
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  { name: "Honourable Edgar Moyo", role: "Minister of Public Service, Labour and Social Welfare, TNF Chairman", image: "/team/2026/edgar-moyo.jpg" },
  { name: "Mr Albert Nyakadzumbu", role: "TNF Executive Director", image: "/team/2026/albert-nyakadzumbu-2.jpg" },
  { name: "Mr Emmanuel Mazhawidza", role: "Economic and Labour Cluster Coordinator", image: "/team/2026/emmanuel-mazhawidza.jpg" },
  { name: "Mr Jimmy Dzinavatonga", role: "Economic Cluster Officer", image: "/team/2026/jimmy-dzinavatonga.jpg" },
  { name: "Mr Lloyd Rwodzi", role: "Audit and Compliance Officer", image: "/team/2026/lloyd-rwodzi.jpg" },
  { name: "Mr Nigel Kaseke", role: "Driver/Messenger", image: "/team/2026/nigel-kaseke.jpg" },
  { name: "Mr Noel Saweto", role: "Social Cluster Officer", image: "/team/2026/noel-saweto.jpg" },
  { name: "Mr Peace Mavaza", role: "Finance, Admin and HR Manager", image: "/team/2026/peace-mavaza.jpg" },
  { name: "Mr Silence Mugebe", role: "Social Cluster Coordinator", image: "/team/2026/silence-mugebe.jpg" },
  { name: "Ms Hazel Chihwandamira", role: "Accountant", image: "/team/2026/hazel-chihwandamira.jpg" },
  { name: "Ms Judith Mate", role: "Human Resources Officer", image: "/team/2026/judith-mate.jpg" },
  { name: "Ms Melody Muchini", role: "Senior Administrative Assistant", image: "/team/melody-Muchini.png" },
  { name: "Miss Rachael Mukonda", role: "Communications and Advocacy Officer", image: "/team/Rachael-Mukonda.jpg" },
  { name: "Ms Misela Mpofu", role: "Labour Cluster Officer", image: "/team/MISELA-MPOFU.jpg" },
  { name: "Ms Leslie Mavhenyengwa", role: "Administrative Assistant", image: "/team/2026/leslie-mavhenyengwa.jpg" },
  { name: "Ms Pauline Chikanda", role: "Office Orderly", image: "/team/2026/pauline-chikanda.jpg" },
  { name: "Ms Rebecca Machawu", role: "Administration Officer", image: "/team/2026/rebecca-machawu.jpg" },
];

export default function TeamPage() {
  return (
    <SubpageLayout
      title="Our Team"
      description="The TNF Secretariat and leadership driving social dialogue in Zimbabwe."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-square w-full bg-slate-100">
              <Image
                src={member.image}
                alt={member.name}
                fill
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 text-center sm:text-left">
              <h3 className="font-semibold text-tnf-navy">{member.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/about" className="inline-flex items-center text-sm font-medium text-tnf-green hover:text-tnf-green">
          ← Back to About
        </Link>
      </div>
    </SubpageLayout>
  );
}
