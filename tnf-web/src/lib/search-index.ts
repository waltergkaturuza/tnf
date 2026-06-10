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
  { title: "Departments", href: "/departments", keywords: ["departments", "finance", "hr", "programmes", "communications", "audit"] },
  { title: "Resources", href: "/resources", keywords: ["reports", "plans", "gallery", "downloads", "documents"] },
  { title: "News and Events", href: "/news-events", keywords: ["news", "events", "updates"] },
  { title: "Careers", href: "/careers", keywords: ["careers", "jobs", "vacancies", "achievements"] },
  { title: "Contact", href: "/contact", keywords: ["contact", "inquiry", "phone", "email", "address"] },
  { title: "Feedback Form", href: "/feedback", keywords: ["feedback", "suggestions", "economic", "social", "labour"] },
  { title: "Whistleblower Reporting", href: "/whistleblower", keywords: ["whistleblower", "report", "corruption", "fraud"] },
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
