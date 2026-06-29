/**
 * TNF Website Configuration
 * Centralized content and navigation for easy updates
 */

export const siteConfig = {
  name: "Tripartite Negotiating Forum",
  shortName: "TNF",
  tagline: "Facilitating National Social Dialogue for Socio-Economic Development",
  description:
    "The Tripartite Negotiating Forum (TNF) is the statutory national platform in Zimbabwe that brings together government, organised business, and organised labour to address socio-economic and labour market issues.",
  url: "https://tnfzim.com",
  contact: {
    phone: "+263 242 783 030",
    whatsapp: "0789399889",
    email: "info@tnfzim.com",
    address: "East Wing Block 3 Celestial Park, Borrowdale, Harare, Zimbabwe",
    addressLines: [
      "East Wing Block 3 Celestial Park",
      "Borrowdale, Harare",
      "Zimbabwe",
    ],
    mapsUrl: "https://www.google.com/maps/place/Celestial+Park./@-17.7858713,31.0572926,17z",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15196.495759824613!2d31.057292587158212!3d-17.78587129999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5527eef03dd%3A0x74379bac5352ea72!2sCelestial%20Park.!5e0!3m2!1sen!2szw!4v1781085701099!5m2!1sen!2szw",
    team: [
      { name: "Racheal", phone: "077 956 0229" },
      { name: "Lloyd", phone: "077 340 2440" },
      { name: "Emanuel", phone: "071 987 9890" },
    ],
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
        { href: "/about#overview", label: "TNF Overview" },
        { href: "/about#mandate", label: "Mandate" },
        { href: "/about/team", label: "Our Team" },
      ],
    },
    {
      label: "Departments",
      href: "/departments",
      children: [
        { href: "/departments#finance-administration-hr", label: "Finance, Administration and Human Resources" },
        { href: "/departments#programmes", label: "Programmes" },
        { href: "/departments#communications-advocacy", label: "Communications and Advocacy" },
        { href: "/departments#audit-compliance", label: "Audit and Compliance" },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      children: [
        { href: "/resources#reports-plans", label: "Reports and Plans" },
        { href: "/resources#gallery", label: "Gallery" },
        { href: "/resources#downloads", label: "Other Downloads" },
      ],
    },
    {
      label: "News and Events",
      href: "/news-events",
      children: [
        { href: "/news-events#news", label: "Current News" },
        { href: "/news-events#events", label: "Upcoming Events" },
      ],
    },
    {
      label: "Careers",
      href: "/careers",
      children: [
        { href: "/careers#vacancies", label: "Vacancies" },
        { href: "/careers#achievements", label: "Employees' Achievements" },
      ],
    },
    {
      label: "Engage",
      href: "/feedback",
      children: [
        { href: "/feedback", label: "Feedback Form" },
        { href: "/contact", label: "Inquiry Form" },
        { href: "/feedback#suggestions", label: "Suggestions" },
        { href: "/whistleblower", label: "Whistleblower Reporting" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ],
  footerQuickLinks: [
    { href: "/about", label: "About" },
    { href: "/about/faqs", label: "FAQs" },
    { href: "/departments", label: "Departments" },
    { href: "/resources", label: "Resources" },
    { href: "/news-events", label: "News and Events" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  stakeholders: [
    "Government (central and local)",
    "Organised Labour",
    "Organised Business",
    "National Social Security Authority",
    "Development Partners (e.g. ILO)",
  ],
  partners: [
    {
      name: "Government of Zimbabwe",
      logo: "/partners/Governement of_Zimbabwe.svg_1-300x262-1920w.png",
      href: "#",
    },
    {
      name: "Organised Labour",
      logo: "/partners/zimbabwes-labor-.png",
      href: "#",
    },
    { name: "ILO", logo: "/partners/ilo.svg", href: "https://www.ilo.org" },
    { name: "NSSA", logo: "/partners/NSSA.png", href: "#" },
  ],
  galleryImages: [
    {
      src: "/TNF in Action/Social dialogue in action.jpg",
      alt: "Social dialogue in action",
      caption: "Social dialogue in action",
    },
    {
      src: "/TNF in Action/Tripartite consultation.jpg",
      alt: "Tripartite consultation",
      caption: "Tripartite consultation",
    },
    {
      src: "/TNF in Action/Policy consultation workshop.jpg",
      alt: "Policy consultation workshop",
      caption: "Policy consultation workshop",
    },
    {
      src: "/TNF in Action/TNF annual retreat.jpg",
      alt: "TNF annual retreat",
      caption: "TNF annual retreat",
    },
  ],
  videos: [
    { id: "chair-message", title: "Message from the Chair", description: "Hon. Edgar Moyo on TNF priorities", embedId: "", placeholder: true },
    { id: "tnf-2min", title: "TNF in 2 Minutes", description: "Quick overview of the Tripartite Negotiating Forum", embedId: "", placeholder: true },
  ],
};
