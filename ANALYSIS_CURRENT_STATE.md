# TNF Website – Current State Analysis
## Official Site: https://tnfzim.com/

**Analysis Date:** February 20, 2025  
**Purpose:** Baseline assessment before React-based improvements

---

## Executive Summary

The TNF website provides core information about Zimbabwe's Tripartite Negotiating Forum but suffers from **template residue**, **broken functionality**, **outdated content**, and **weak information architecture**. The site appears built on a generic government/city theme that was partially customized—some pages still show placeholder content. Your proposed improvement vision is accurate; this document validates it and adds critical findings from live site inspection.

---

## 1. Purpose & Positioning

### ✔️ Confirmed Strengths
- **Mandate clarity:** Mission, Vision, and Motto are clearly stated on About page
- **Legal grounding:** TNF Act 2019 and constitutional basis are documented
- **Structure visibility:** Main TNF, Technical Committee, Management Committee, and stakeholder breakdown (Government, Labour, Business) are explained
- **Key services listed:** Client Charter, Labour Relations, Business Environment, Policy Consultation, Social Dialogue, Public Engagement
- **Contact points present:** Phone (+263 24 278 3030), email (info@tnfzim.com), physical address
- **Feedback & Whistleblower forms:** Dedicated portals exist

### ❌ Confirmed Weaknesses
- **Generic design:** Template-driven layout with low visual distinctiveness
- **No clear hierarchy:** Departments, Areas of Work, and Services overlap without clear IA
- **Static hero:** "Empowering Zimbabwe Through Dialogue" / "Building Consensus, Shaping the Future" — no concise value proposition or strong CTAs
- **Content gaps:** Resources and Plans & Reports URLs return **404**
- **Redundant pages:** Duplicate "Contact" variations (see Critical Bugs below)

---

## 2. Critical Bugs Found (Live Inspection)

### 🔴 High Priority
| Issue | Location | Details |
|-------|----------|---------|
| **Uncustomized template page** | `/contact` | Shows generic "City Service" content: Mayor Office, City Council, Policing, Health, Business, Transportation, Unemployment, E-Services — with placeholder phones (+00 569 849 652), emails (mayor@office.com, needhelp@city.com). **Not TNF content.** |
| **Broken WhatsApp** | Site-wide | "No WhatsApp Number Found!" appears in footer; WhatsApp CTA is non-functional |
| **404 pages** | `/resources`, `/plans-reports` | Referenced sections return Not Found |
| **Duplicate contact flows** | `/contact` vs `/contact-us` | `/contact-us` has correct TNF info; `/contact` is template garbage. Risk of user confusion and wrong submissions |

### 🟡 Medium Priority
| Issue | Location | Details |
|-------|----------|---------|
| **Feedback form categories** | `/feedback-portal` | "Report Social Issue" form reuses Economic categories (Informalisation, Multicurrency, Business competitiveness, etc.) instead of Social-specific options |
| **Outdated events** | Homepage | Jan 2024, Jun 2024, Jul 2024 events still prominent; no visible 2025 content |
| **URL inconsistency** | Various | `about` vs `about-us`, `contact` vs `contact-us` — inconsistent naming |

### 🟢 Lower Priority
- Template links to "ovatheme" / "city.gov" on broken `/contact` page
- Some repetitive phrasing across sections

---

## 3. User Journey & Accessibility

### Current State
- **Navigation:** Multiple top-level items (About, Departments, Areas of Work, Contact, Feedback, Whistle Blower, Events, News) without clear grouping
- **Resources:** No dedicated Resources section (404). Annual reports and strategic plans are not easily discoverable
- **Audience segmentation:** No differentiation for public, media, partners, or labour groups
- **Search:** No site-wide search
- **Contact:** Correct form and info on `/contact-us`, but wrong content on `/contact`
- **Newsletter:** Present in footer; placement may be missed by users

### After Improvement (Target)
- Streamlined nav: Home | About | Work Areas | Resources | News & Events | Contact
- Sticky nav + search
- Clear audience paths (e.g. "For Media", "For Partners")
- Resources hub with filters (Reports, Annual Reports, Strategic Plans, Policy Papers)
- Prominent CTAs on hero and key pages

---

## 4. Content Quality

| Aspect | Current | Target |
|--------|---------|--------|
| Structure | Long scrolling blocks; some sections dense | Accordions, tabs, cards for scanability |
| Imagery | Limited, inconsistent | High-quality visuals; stakeholder photos; document previews |
| Freshness | Events from 2024; some duplicate/placeholder text | Regularly updated; 2025 content visible |
| Legal docs | TNF Act mentioned; unclear if downloadable | TNF Act PDF, clear download links |
| Team | Listed on About (Hon E. Moyo, Mr Nyakadzumbu, etc.) | Same, with clearer roles and optional bios |

---

## 5. Technical & UX

- **Performance:** Reported moderate load times; large images likely
- **Mobile:** Not fully optimized
- **Accessibility:** Contrast, alt text, font scaling not audited; likely gaps
- **SEO:** Limited meta/structured data inferred from content
- **Footer:** No sitemap or quick-link block for key pages

---

## 6. Before vs After – Consolidated Vision

| Feature | Before | After (Improved) |
|---------|--------|------------------|
| Homepage | Static, generic | Dynamic hero, mission statement, clear CTAs |
| Navigation | Cluttered, flat | Logical hierarchy, sticky, search |
| Content flow | Long blocks | Scannable sections, cards, accordions |
| Engagement | Basic forms, newsletter | Interactive forms, multi-channel contact |
| Resources | 404 / buried | Dedicated hub, filters, search |
| Design | Template-heavy | Modern, branded, government-grade |
| Contact | Duplicate, one broken | Single, correct, with WhatsApp |
| Events/News | Outdated, list-only | Calendar view, categories, featured |

---

## 7. Recommended Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js + TypeScript + TailwindCSS | SEO, SSR, performance, government-grade UX |
| Animations | Framer Motion | Subtle, professional motion |
| Backend/CMS | Headless CMS (Strapi / Payload / Sanity) or Django REST | Non-dev content updates, documents, events |
| Hosting | Vercel (frontend), Render/Railway (backend) | Production-ready, scalable |
| Security | Cloudflare | DDoS, caching, SSL |

---

## 8. Critical Architecture Question

> Do you want TNF website to be:
> **A)** Simple dynamic informational website  
> **B)** Semi-portal (with member login area)  
> **C)** Full stakeholder portal (Government, Business, Labour dashboards)

### Recommendation: **Start with A, design for B**

| Option | Scope | Effort | Fit for TNF |
|--------|-------|--------|-------------|
| **A** | Informational only; no auth | Lowest | ✅ Strong fit. Matches current mandate and user needs. |
| **B** | Member area for Secretariat, partners, or committee members | Medium | ✅ Good for phase 2: document sharing, event registration, restricted reports |
| **C** | Full portals per constituency | High | ⚠️ Overkill initially; consider only if TNF explicitly needs private dashboards |

**Suggested path:**
1. **Phase 1 (A):** Replace current site with modern, content-driven React/Next.js build — fix all critical bugs, implement Resources, improve IA and design.
2. **Phase 2 (B):** Add member login (e.g. Secretariat, committee reps) for:
   - Draft document access
   - Event registration/RSVP
   - Newsletter preference management
   - Secure feedback/whistleblower submissions
3. **Phase 3 (C):** Only if TNF stakeholders request separate Government/Business/Labour portals with role-based dashboards.

---

## 9. New Site Structure (Reference)

```
Homepage (dynamic)
├── Hero: Mission + CTAs (About, Latest Report, Feedback)
├── Latest News
├── Upcoming Events
├── Featured Reports
├── Quick Links
└── Stakeholder Highlights

About TNF
├── Mandate & History
├── TNF Act (PDF)
├── Structure & Organogram
├── Secretariat & Team
└── Core Values

Work Areas (card-based)
├── Social Dialogue
├── Labour Market Reform
├── Policy Consultation
├── Collective Bargaining
├── Economic Stabilization
└── [Each: description, docs, related events]

Resources (dynamic, filterable)
├── Annual Reports
├── Strategic Plans
├── Policy Papers
├── Press Releases
└── Search + Year filter

News & Events
├── Blog-style news
├── Event calendar
├── Registration links
└── Archive

Contact & Engagement
├── Smart contact form
├── Newsletter
├── Feedback portal
├── Whistleblower
├── Media inquiries
└── WhatsApp (when number configured)
```

---

## 10. Immediate Fixes (Pre-Rebuild)

If maintaining current site before React launch:
1. **Redirect `/contact` → `/contact-us`** (or replace `/contact` with correct content)
2. **Remove or fix** WhatsApp widget until number is configured
3. **Add redirects** for `/resources` and `/plans-reports` to nearest relevant pages or "Coming soon"
4. **Correct Feedback Portal** Social Issue categories
5. **Update events** with 2025 content or add "Archive" labelling

---

*End of Analysis*
