# TNF Website – Vercel Deployment Guide

Deploy the TNF Next.js site to Vercel with Payload CMS and **Supabase (PostgreSQL)**.

CMS data lives in the **`tnf`** schema in your shared Supabase database. See [docs/SUPABASE.md](docs/SUPABASE.md) for full setup.

---

## Prerequisites

- [GitHub](https://github.com) account (repo: `waltergkaturuza/tnf`)
- [Vercel](https://vercel.com) account
- [Supabase](https://supabase.com) project with Postgres enabled

---

## 1. Supabase setup

1. Run `tnf-web/scripts/create-tnf-schema.sql` in Supabase **SQL Editor** (creates schema `tnf`).
2. Link the project in Vercel (or copy connection strings from Supabase → Settings → Database).
3. Set **`DATABASE_URI`** to your Postgres URL (pooler URL for Vercel runtime).
4. Set **`POSTGRES_SCHEMA`** = `tnf` (optional; defaults to `tnf`).
5. Run migrations locally or in CI: `npm run payload:migrate` (use **non-pooling** URL, port 5432).

---

## 2. Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `PAYLOAD_SECRET` | Secret key for Payload (min 32 chars) | `a-random-32-char-string-for-production` |
| `DATABASE_URI` | Supabase Postgres connection string | `postgres://...` |

### Optional

| Variable | Description |
|----------|-------------|
| `POSTGRES_SCHEMA` | Postgres schema name (default: `tnf`) |
| `POSTGRES_URL` / `POSTGRES_URL_NON_POOLING` | Vercel Supabase integration aliases |
| `NEXT_PUBLIC_SERVER_URL` | Single site URL – e.g. `https://tnfzim.com` (no commas) |

### Generate PAYLOAD_SECRET

```bash
# PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Or use any random 32+ character string (e.g. from a password generator).

---

## 3. Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import the GitHub repo: `waltergkaturuza/tnf`.
3. **Root Directory:** Set to `tnf-web` (the Next.js app lives in this subfolder).
4. **Framework Preset:** Next.js (auto-detected).
5. **Environment Variables:**
   - Add `PAYLOAD_SECRET`
   - Add `DATABASE_URI` (Supabase `POSTGRES_URL` pooler string)
   - Add `POSTGRES_SCHEMA` = `tnf`
   - Add `NEXT_PUBLIC_SERVER_URL` = one URL only (e.g. `https://tnfzim.com`)
6. Click **Deploy**.

### Option B: Vercel CLI

```bash
cd C:\Users\Administrator\Documents\TNF\tnf-web
npx vercel
```

Follow the prompts. When asked for env vars, add `PAYLOAD_SECRET` and `DATABASE_URI` via the dashboard or:

```bash
vercel env add PAYLOAD_SECRET
vercel env add DATABASE_URI
```

---

## 4. Post-Deployment

### Create First Admin User

1. Visit `https://your-deployment.vercel.app/admin`.
2. On first visit, Payload will prompt you to create the first user (email + password).
3. Save the credentials securely.

### Custom Domain (tnfzim.com)

1. In Vercel project → **Settings** → **Domains**.
2. Add `tnfzim.com` and `www.tnfzim.com`.
3. Update DNS at your registrar:
   - **A record:** `76.76.21.21` (or the IP Vercel provides)
   - **CNAME (www):** `cname.vercel-dns.com` (or the value Vercel shows)
4. After DNS propagates, Vercel will issue an SSL certificate.
5. Set `NEXT_PUBLIC_SERVER_URL` to `https://tnfzim.com` and redeploy if needed.

---

## 5. Build Settings (Reference)

| Setting | Value |
|---------|-------|
| Root Directory | `tnf-web` |
| Build Command | `npm run build` (default) |
| Output Directory | `.next` (default) |
| Install Command | `npm install` (default) |
| Node.js Version | 18.x or 20.x (Vercel default) |

---

## 6. Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails – `DATABASE_URI` | Ensure env var is set for Production (and Preview if desired). |
| Admin 500 / DB errors | Run `create-tnf-schema.sql`; check `POSTGRES_SCHEMA=tnf`; verify pooler URL. |
| Migrations fail | Use `POSTGRES_URL_NON_POOLING` (port 5432) as `DATABASE_URI` when running `npm run payload:migrate`. |
| `self-signed certificate in certificate chain` on Vercel | Use Supabase **pooler** URL as `DATABASE_URI`; redeploy after latest code (auto SSL for Supabase). Or set `DATABASE_SSL_NO_VERIFY=true`. |
| Images not loading | Add `NEXT_PUBLIC_SERVER_URL` with the correct domain. |
| CORS / API errors | Payload reads `NEXT_PUBLIC_SERVER_URL`; set it to your live URL. |

---

## 7. Continuous Deployment

Once connected to GitHub, Vercel will:

- **Production:** Auto-deploy on push to `main` (or your default branch).
- **Preview:** Create preview URLs for other branches and PRs.

---

## 8. Checklist Before Go-Live

- [ ] Supabase `tnf` schema created (`scripts/create-tnf-schema.sql`)
- [ ] Payload migrations run (`npm run payload:migrate`)
- [ ] `PAYLOAD_SECRET` and `DATABASE_URI` set in Vercel
- [ ] First admin user created at `/admin`
- [ ] Custom domain configured (if using tnfzim.com)
- [ ] Forms tested (Contact, Feedback, Whistleblower)
- [ ] SSL certificate active (automatic with Vercel)
