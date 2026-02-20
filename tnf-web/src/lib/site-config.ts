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
    { href: "/about", label: "About" },
    { href: "/work-areas", label: "Work Areas" },
    { href: "/resources", label: "Resources" },
    { href: "/news-events", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ],
  workAreas: [
    {
      id: "social-dialogue",
      title: "Social Dialogue Facilitation",
      slug: "social-dialogue-facilitation",
      description:
        "The TNF specialises in facilitating social dialogue among key stakeholders, including government, business, and labour, to build consensus on critical socio-economic issues.",
    },
    {
      id: "labour-relations",
      title: "Labour Relations",
      slug: "labour-relations",
      description:
        "The TNF plays a vital role in enhancing labour relations in Zimbabwe through consultation, collective bargaining support, and policy dialogue.",
    },
    {
      id: "policy-consultation",
      title: "Policy Consultation",
      slug: "policy-consultation",
      description:
        "Expert consultation on policy formulation and implementation. The TNF contributes to evidence-based policies that balance the interests of all social partners.",
    },
    {
      id: "business-environment",
      title: "Business Environment Enhancement",
      slug: "business-environment-enhancement",
      description:
        "Committed to improving the business environment in Zimbabwe through dialogue on regulations, investment, and competitiveness.",
    },
    {
      id: "public-engagement",
      title: "Public Engagement",
      slug: "public-engagement",
      description:
        "Active engagement with the public to ensure their voices inform social dialogue and policy outcomes.",
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
