"use client";

import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { DEPARTMENTS_SLIDE_INTERVAL_MS, departmentSlides } from "@/lib/departments-slides";

type Department = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  intro: string;
  departments: Department[];
};

export function DepartmentsSection({ intro, departments }: Props) {
  return (
    <section className="about-tone-photo relative overflow-hidden border-b border-white/10 py-14 lg:py-16">
      <PhotoBackdrop slides={departmentSlides} intervalMs={DEPARTMENTS_SLIDE_INTERVAL_MS} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="about-section__intro mx-auto max-w-3xl text-center">
          <p className="about-text-justify text-sm sm:text-base">{intro}</p>
        </div>

        <div className="space-y-8">
          {departments.map((dept, i) => (
            <div key={dept.id} id={dept.id} className="about-card scroll-mt-28 flex gap-6 p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-tnf-navy text-lg font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-tnf-navy">{dept.title}</h2>
                <p className="about-text-justify mt-3 text-slate-600 leading-relaxed">{dept.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
