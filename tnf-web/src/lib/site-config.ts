/**
 * TNF Website Configuration
 * Centralized content and navigation for easy updates
 */

export const siteConfig = {
  name: "Tripartite Negotiating Forum",
  shortName: "TNF",
  tagline: "Facilitating National Social Dialogue for Inclusive Economic Development",
  description:
    "The Tripartite Negotiating Forum (TNF) is the statutory national platform in Zimbabwe that brings together government, organised business, and organised labour to address socio-economic and labour market issues.",
  url: "https://tnfzim.com",
  contact: {
    phone: "+263 24 278 3030",
    email: "info@tnfzim.com",
    address: "East Wing Block 3 Celestial Park, Borrowdale, Harare, Zimbabwe",
    social: {
      twitter: "https://x.com/TNFZimbabwe",
      facebook: "https://www.facebook.com/profile.php?id=61581995522540",
    },
  },
  nav: [
    { href: "/", label: "Home" },
    {
      label: "About",
      href: "/about",
      children: [
        { href: "/about", label: "Overview" },
        { href: "/about/history", label: "History" },
        { href: "/about/team", label: "Our Team" },
        { href: "/about/faqs", label: "FAQs" },
      ],
    },
    { href: "/departments", label: "Departments" },
    {
      label: "Work Areas",
      href: "/work-areas",
      children: [
        { href: "/work-areas", label: "All Work Areas" },
        { href: "/work-areas/client-service-charter", label: "Client Service Charter" },
        { href: "/work-areas/social-dialogue-facilitation", label: "Social Dialogue" },
        { href: "/work-areas/labour-relations", label: "Labour Relations" },
        { href: "/work-areas/policy-consultation", label: "Policy Consultation" },
        { href: "/work-areas/business-environment-enhancement", label: "Business Environment" },
        { href: "/work-areas/public-engagement", label: "Public Engagement" },
      ],
    },
    { href: "/resources", label: "Resources" },
    { href: "/news-events", label: "News & Events" },
    { href: "/careers", label: "Careers" },
    {
      label: "Engage",
      href: "/feedback",
      children: [
        { href: "/feedback", label: "Feedback" },
        { href: "/whistleblower", label: "Whistleblower" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ],
  workAreas: [
    {
      id: "client-service-charter",
      title: "Client Service Charter",
      slug: "client-service-charter",
      description:
        "The TNF, established through the Tripartite Negotiating Forum Act [No. 3 of 2019], serves as Zimbabwe's principal platform for consultation, cooperation, and negotiation on key social and economic issues.",
      keyServices: [],
    },
    {
      id: "social-dialogue",
      title: "Social Dialogue Facilitation",
      slug: "social-dialogue-facilitation",
      description:
        "The TNF specialises in facilitating social dialogue among key stakeholders, including government, business, and labour, to build consensus on critical socio-economic issues.",
      keyServices: ["Stakeholder consultations", "Consensus building", "Dialogue facilitation"],
    },
    {
      id: "labour-relations",
      title: "Labour Relations",
      slug: "labour-relations",
      description:
        "The TNF plays a vital role in enhancing labour relations in Zimbabwe. It provides a forum for addressing labour issues, negotiating labour agreements, and promoting fair labour practices.",
      keyServices: [
        "Labour inspections",
        "Ensuring compliance with national laws and regulations",
        "Implementing agreed-upon policies and programmes",
        "Formulating labour laws and policies",
      ],
    },
    {
      id: "policy-consultation",
      title: "Policy Consultation",
      slug: "policy-consultation",
      description:
        "The TNF offers expert consultation on policy formulation and implementation. By leveraging the collective expertise of its stakeholders, the TNF ensures policies are well-informed and aligned with socio-economic needs.",
      keyServices: [
        "Assessing policy implementation by relevant agencies",
        "Drafting policy recommendations and reports",
        "Stakeholder consultations on policy proposals",
        "Policy research and analysis",
        "Policy formulation",
      ],
    },
    {
      id: "business-environment",
      title: "Business Environment Enhancement",
      slug: "business-environment-enhancement",
      description:
        "The TNF is committed to improving the business environment in Zimbabwe. By engaging with organized business, government, and labour, the TNF helps identify and address challenges faced by businesses.",
      keyServices: [
        "Facilitating dialogue between businesses and policymakers",
        "Proposing reforms to enhance business operations",
        "Assessing the business environment and identifying challenges",
      ],
    },
    {
      id: "public-engagement",
      title: "Public Engagement",
      slug: "public-engagement",
      description:
        "The TNF actively engages with the public to ensure their voices inform social dialogue and policy outcomes.",
      keyServices: ["Outreach programmes", "Public consultations", "Feedback mechanisms"],
    },
  ],
  stakeholders: [
    "Government (central and local)",
    "Organised Labour",
    "Organised Business",
    "National Social Security Authority",
    "Development Partners (e.g. ILO)",
  ],
};
