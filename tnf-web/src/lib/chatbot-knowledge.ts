import { siteConfig } from "@/lib/site-config";
import { whatsappHref } from "@/lib/whatsapp";

export type ChatLink = { label: string; href: string };

export type ChatbotReply = {
  content: string;
  links?: ChatLink[];
};

export const CHATBOT_QUICK_PROMPTS: { label: string; message: string }[] = [
  { label: "Contact us", message: "How can I contact the TNF Secretariat?" },
  { label: "Submit feedback", message: "I want to submit feedback" },
  { label: "Whistleblower", message: "How do I report a concern confidentially?" },
  { label: "About TNF", message: "What is the Tripartite Negotiating Forum?" },
  { label: "News & events", message: "Where can I find news and events?" },
  { label: "Careers", message: "Are there any job vacancies?" },
];

export function getChatbotWelcome(): ChatbotReply {
  return {
    content: `Hello! I'm the ${siteConfig.shortName} virtual assistant. I can help with contact details, feedback, whistleblowing, careers, and navigating the website. How can I assist you today?`,
    links: [
      { label: "Contact page", href: "/contact" },
      { label: "FAQs", href: "/about/faqs" },
    ],
  };
}

export function getChatbotReply(input: string): ChatbotReply {
  const q = input.trim().toLowerCase();
  const { contact } = siteConfig;

  if (!q) {
    return { content: "Please type a question or choose one of the quick topics below." };
  }

  if (/(hello|hi|hey|good (morning|afternoon|evening)|greetings)/.test(q)) {
    return getChatbotWelcome();
  }

  if (/(contact|phone|email|address|secretariat|reach|call|inquiry|enquir|whatsapp|whats app|location|direction|map|where|find|office)/.test(q)) {
    return {
      content: `You can reach the TNF Secretariat at ${contact.email}, ${contact.phone}, or WhatsApp ${contact.whatsapp}. The office is at ${contact.address}. For a formal enquiry, use the contact form.`,
      links: [
        { label: "Contact form", href: "/contact" },
        { label: "Google Maps", href: contact.mapsUrl },
        { label: "Our team", href: "/about/team" },
        { label: "WhatsApp", href: whatsappHref(contact.whatsapp) },
      ],
    };
  }

  if (/(feedback|suggest|opinion|report (an )?issue|economic|social|labour)/.test(q)) {
    return {
      content:
        "Share structured feedback on economic, social, or labour issues through our Feedback Portal. Your input helps inform national social dialogue.",
      links: [
        { label: "Feedback form", href: "/feedback" },
        { label: "Suggestions", href: "/feedback#suggestions" },
      ],
    };
  }

  if (/(whistle|confidential|corruption|fraud|misconduct|integrity)/.test(q)) {
    return {
      content:
        "Report concerns confidentially through our whistleblower channel. You may submit anonymously. This channel is not for emergencies.",
      links: [{ label: "Whistleblower form", href: "/whistleblower" }],
    };
  }

  if (/(what is tnf|about|tripartite|mandate|vision|mission|forum)/.test(q)) {
    return {
      content: `${siteConfig.description} Learn more about our mandate, vision, and team on the About page.`,
      links: [
        { label: "TNF overview", href: "/about#overview" },
        { label: "Mandate", href: "/about#mandate" },
        { label: "Our team", href: "/about/team" },
      ],
    };
  }

  if (/(news|event|update|summit|announcement)/.test(q)) {
    if (/summit/.test(q)) {
      return {
        content:
          "The TNF Global Summit has a dedicated website for registration and programme information.",
        links: [
          { label: "Summit website", href: "https://summit.tnfzim.com" },
          { label: "News & events", href: "/news-events" },
        ],
      };
    }
    return {
      content: "Find current news and upcoming events on our News and Events page.",
      links: [
        { label: "Current news", href: "/news-events#news" },
        { label: "Upcoming events", href: "/news-events#events" },
      ],
    };
  }

  if (/(career|job|vacanc|employ|work at tnf|internship)/.test(q)) {
    return {
      content:
        "View current vacancies and employee achievements on our Careers page. If no roles are listed, you can express interest via the contact form.",
      links: [
        { label: "Vacancies", href: "/careers#vacancies" },
        { label: "Contact us", href: "/contact" },
      ],
    };
  }

  if (/(department|finance|programme|communication|audit|hr|human resource)/.test(q)) {
    return {
      content: "Learn about TNF departments including Finance & HR, Programmes, Communications, and Audit & Compliance.",
      links: [{ label: "Departments", href: "/departments" }],
    };
  }

  if (/(resource|report|plan|download|document|gallery|publication)/.test(q)) {
    return {
      content: "Access reports, plans, gallery images, and other downloads in the Resources section.",
      links: [
        { label: "Reports & plans", href: "/resources#reports-plans" },
        { label: "Gallery", href: "/resources#gallery" },
      ],
    };
  }

  if (/(faq|question|help)/.test(q)) {
    return {
      content: "Browse frequently asked questions for quick answers about TNF services and engagement.",
      links: [{ label: "FAQs", href: "/about/faqs" }],
    };
  }

  if (/(hour|open|when|time)/.test(q)) {
    return {
      content:
        "For office hours and availability, please contact the Secretariat directly. We aim to respond to enquiries as soon as possible.",
      links: [{ label: "Contact", href: "/contact" }],
    };
  }

  if (/(thank|thanks|bye|goodbye)/.test(q)) {
    return {
      content: "You're welcome. If you need further assistance, feel free to ask or visit our contact page.",
      links: [{ label: "Contact", href: "/contact" }],
    };
  }

  return {
    content:
      "I'm not sure I have a specific answer for that. A member of the Secretariat can help — try the contact form, feedback portal, or FAQs.",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Feedback", href: "/feedback" },
      { label: "FAQs", href: "/about/faqs" },
    ],
  };
}
