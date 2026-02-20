# TNF – Tripartite Negotiating Forum Website

A modern, content-driven Next.js site for the Tripartite Negotiating Forum (Zimbabwe), powered by **Payload CMS** for content and form management.

## Tech Stack

- **Next.js 15** (App Router)
- **Payload CMS 3** (headless CMS, admin at `/admin`)
- **TypeScript**
- **Tailwind CSS v4**
- **MongoDB** (via Mongoose adapter)

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and set:

```
PAYLOAD_SECRET=your-secret-min-32-characters-long
DATABASE_URI=mongodb://127.0.0.1:27017/tnf
```

For production, use a secure `PAYLOAD_SECRET` and a proper MongoDB URI.

### 3. Run development server

```bash
npm run dev
```

- **Site:** [http://localhost:3000](http://localhost:3000)
- **Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, create your admin user.

## Payload Collections

| Collection          | Purpose                                  |
|---------------------|------------------------------------------|
| **Users**           | Admin authentication                     |
| **Media**           | Images and files (logo, photos, PDFs)    |
| **Posts**           | News / blog articles                     |
| **Events**          | Events and dialogues                     |
| **Resources**       | Reports, plans, policy papers, PDFs      |
| **Form Submissions**| Contact, feedback, whistleblower forms   |

## Managing Content

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with your admin account
3. Add **Posts** for news, **Events** for upcoming activities, **Resources** for downloadable documents
4. View **Form Submissions** for contact, feedback, and whistleblower entries

## Build & Deploy

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SERVER_URL` in production to your site URL (e.g. `https://tnfzim.com`) for correct API links.

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public TNF pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── feedback/
│   │   ├── news-events/
│   │   ├── resources/
│   │   ├── whistleblower/
│   │   └── work-areas/
│   └── (payload)/       # Payload admin & API
│       ├── admin/       # /admin
│       └── api/         # /api/*
├── collections/         # Payload collection configs
├── components/
└── lib/
    ├── payload.ts       # API fetch helpers
    └── submit-form.ts   # Form submission to Payload
```

## License

Proprietary – TNF Zimbabwe.
