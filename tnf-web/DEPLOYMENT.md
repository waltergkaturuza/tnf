# TNF Website – Vercel Deployment Guide

Deploy the TNF Next.js site to Vercel with Payload CMS and MongoDB.

---

## Prerequisites

- [GitHub](https://github.com) account (repo: `waltergkaturuza/tnf`)
- [Vercel](https://vercel.com) account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or other MongoDB hosting)

---

## 1. MongoDB Setup (Production)

1. Create a [MongoDB Atlas](https://cloud.mongodb.com) account (free tier works).
2. Create a cluster and a database (e.g. `tnf`).
3. **Database Access:** Create a user with read/write permissions.
4. **Network Access:** Add `0.0.0.0/0` to allow Vercel serverless connections.
5. **Connection string:** In Atlas → Connect → Drivers → Copy URI:
   ```
   mongodb+srv://USER:PASSWORD@cluster.xxxxx.mongodb.net/tnf?retryWrites=true&w=majority
   ```
   Replace `USER`, `PASSWORD`, and cluster host with your values.

---

## 2. Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `PAYLOAD_SECRET` | Secret key for Payload (min 32 chars) | `a-random-32-char-string-for-production` |
| `DATABASE_URI` | MongoDB connection string | `mongodb+srv://...` |

### Optional

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Alternative to `DATABASE_URI` |
| `NEXT_PUBLIC_SERVER_URL` | Full site URL (for Payload media, webhooks) – e.g. `https://tnfzim.com` |

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
   - Add `DATABASE_URI`
   - (Optional) Add `NEXT_PUBLIC_SERVER_URL` = `https://your-domain.vercel.app` or `https://tnfzim.com`
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
| Admin 500 / DB errors | Check MongoDB Atlas Network Access allows `0.0.0.0/0`. |
| Images not loading | Add `NEXT_PUBLIC_SERVER_URL` with the correct domain. |
| CORS / API errors | Payload reads `NEXT_PUBLIC_SERVER_URL`; set it to your live URL. |

---

## 7. Continuous Deployment

Once connected to GitHub, Vercel will:

- **Production:** Auto-deploy on push to `main` (or your default branch).
- **Preview:** Create preview URLs for other branches and PRs.

---

## 8. Checklist Before Go-Live

- [ ] MongoDB Atlas cluster created and accessible
- [ ] `PAYLOAD_SECRET` and `DATABASE_URI` set in Vercel
- [ ] First admin user created at `/admin`
- [ ] Custom domain configured (if using tnfzim.com)
- [ ] Forms tested (Contact, Feedback, Whistleblower)
- [ ] SSL certificate active (automatic with Vercel)
