"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const faqs = [
  {
    q: "What is the Tripartite Negotiating Forum (TNF)?",
    a: "The TNF is a formal platform established by the Tripartite Negotiating Forum Act of 2019, designed to facilitate dialogue and negotiations between the government, organized business, and organized labor on socio-economic issues in Zimbabwe.",
  },
  {
    q: "What are the core functions of the TNF?",
    a: "The core functions of the TNF include facilitating negotiations on national socio-economic policies, mediating disputes between stakeholders, providing policy recommendations to the government, enhancing labor relations, and improving the business environment.",
  },
  {
    q: "How does the TNF ensure inclusivity in its dialogues?",
    a: "The TNF is committed to inclusivity by ensuring that all stakeholders, including marginalized and underrepresented groups, have their voices heard and their perspectives considered in the decision-making process.",
  },
  {
    q: "What should I do if I have a complaint or feedback regarding TNF services?",
    a: "You can provide feedback or lodge a complaint by speaking with a TNF representative in person or over the phone, emailing the customer service department, using the online Feedback Portal, or dropping a note in the suggestion boxes available at TNF offices.",
  },
  {
    q: "How quickly will the TNF respond to my inquiry or complaint?",
    a: "The TNF is committed to responding to all inquiries and complaints within 48 hours. In the case of complaints, a response will be provided within 10 business days.",
  },
  {
    q: "What rights do clients have when interacting with the TNF?",
    a: "Clients have the right to receive courteous, respectful, and professional service; access to accurate and timely information; privacy and confidentiality of their interactions; and the ability to provide feedback and have their concerns addressed promptly.",
  },
  {
    q: "What are the obligations of TNF clients?",
    a: "Clients are expected to provide accurate and complete information, treat TNF staff with respect and courtesy, abide by TNF procedures and guidelines, and provide constructive feedback to help improve services.",
  },
  {
    q: "How often is the Client Service Charter reviewed?",
    a: "The Client Service Charter is reviewed every three years or as needed to ensure it remains relevant and effective in meeting the needs of stakeholders.",
  },
  {
    q: "Can the public participate in TNF's activities and decision-making processes?",
    a: "Yes, the TNF actively engages with the public through outreach programs, consultations, and by gathering feedback to ensure that public interests are considered in socio-economic discussions.",
  },
  {
    q: "Where can I find more information about the TNF's services and activities?",
    a: "More information about the TNF's services, activities, and updates can be found on this website, which provides resources, publications, and contact details for further inquiries.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <div className="bg-tnf-navy py-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "FAQs" }]} variant="light" />
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">FAQs</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Frequently asked questions about the TNF.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        <p className="mb-12 text-slate-600">
          If you cannot find the answer below, please use the{" "}
          <Link href="/contact" className="text-tnf-gold hover:underline">
            contact form
          </Link>{" "}
          or email us at{" "}
          <a href="mailto:info@tnfzim.com" className="text-tnf-gold hover:underline">
            info@tnfzim.com
          </a>
          .
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-tnf-navy">{faq.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-tnf-gold transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-slate-100 px-6 py-4 text-slate-600">
                  {faq.a}
                </div>
              )}
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
