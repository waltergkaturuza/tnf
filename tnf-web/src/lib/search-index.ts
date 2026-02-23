/**
 * Search index for site-wide search
 * Pages and their searchable keywords
 */

export type SearchItem = {
  title: string;
  href: string;
  description?: string;
  keywords: string[];
};

export const searchIndex: SearchItem[] = [
  { title: "Home", href: "/", keywords: ["home", "tnf", "zimbabwe", "tripartite"] },
  { title: "About TNF", href: "/about", keywords: ["about", "overview", "mission", "vision", "mandate", "structure"] },
  { title: "History", href: "/about/history", keywords: ["history", "1998", "evolution", "legislation", "tnf act"] },
  { title: "Our Team", href: "/about/team", keywords: ["team", "secretariat", "staff", "leadership"] },
  { title: "FAQs", href: "/about/faqs", keywords: ["faq", "questions", "help", "complaint", "feedback"] },
  { title: "Departments", href: "/departments", keywords: ["departments", "finance", "hr", "legal", "communication"] },
  { title: "Work Areas", href: "/work-areas", keywords: ["work", "services", "areas"] },
  { title: "Client Service Charter", href: "/work-areas/client-service-charter", keywords: ["charter", "service", "client"] },
  { title: "Social Dialogue Facilitation", href: "/work-areas/social-dialogue-facilitation", keywords: ["social", "dialogue", "consensus"] },
  { title: "Labour Relations", href: "/work-areas/labour-relations", keywords: ["labour", "labour", "workers", "unions"] },
  { title: "Policy Consultation", href: "/work-areas/policy-consultation", keywords: ["policy", "consultation", "research"] },
  { title: "Business Environment Enhancement", href: "/work-areas/business-environment-enhancement", keywords: ["business", "environment", "investment"] },
  { title: "Public Engagement", href: "/work-areas/public-engagement", keywords: ["public", "engagement", "outreach"] },
  { title: "Plans & Reports", href: "/resources", keywords: ["reports", "plans", "annual", "strategic", "documents", "download"] },
  { title: "News & Events", href: "/news-events", keywords: ["news", "events", "updates"] },
  { title: "Careers", href: "/careers", keywords: ["careers", "jobs", "vacancies", "internship"] },
  { title: "Contact", href: "/contact", keywords: ["contact", "phone", "email", "address"] },
  { title: "Feedback Portal", href: "/feedback", keywords: ["feedback", "report", "economic", "social", "labour"] },
  { title: "Whistleblower", href: "/whistleblower", keywords: ["whistleblower", "report", "corruption", "fraud"] },
];

export function search(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return searchIndex.filter((item) => {
    const searchable = [
      item.title,
      item.description ?? "",
      ...item.keywords,
    ].join(" ").toLowerCase();
    return words.every((word) => searchable.includes(word));
  });
}
