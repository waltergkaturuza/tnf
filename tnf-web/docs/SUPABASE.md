# TNF on Supabase (PostgreSQL)

TNF uses **Payload CMS** with the Postgres adapter. All CMS tables live in the **`tnf`** schema inside your shared Supabase database, so other projects can keep using `public` or their own schemas.

## Security

- Never commit `.env` or paste database passwords in chat.
- If credentials were exposed, **rotate the Supabase database password** and regenerate API keys in the Supabase dashboard.

## 1. Create the `tnf` schema

In Supabase → **SQL Editor**, run:

`tnf-web/scripts/create-tnf-schema.sql`

Or:

```sql
CREATE SCHEMA IF NOT EXISTS tnf;
```

## 2. Environment variables (Vercel / local)

| Variable | Purpose |
|----------|---------|
| `PAYLOAD_SECRET` | Payload auth secret (min 32 chars) |
| `DATABASE_URI` | Postgres connection string |
| `POSTGRES_SCHEMA` | `tnf` (default if omitted) |
| `NEXT_PUBLIC_SERVER_URL` | Single site URL, e.g. `https://tnfzim.com` |
| `DATABASE_SSL_NO_VERIFY` | Optional. `true` = force relaxed SSL. Set on Vercel if admin still fails after deploy. |
| `DATABASE_SSL_STRICT` | Optional. `true` = strict certificate verification (default off on Vercel) |
| `SUPABASE_URL` | Supabase project URL, e.g. `https://xxxx.supabase.co` (for public media URLs) |
| `S3_BUCKET` | Supabase Storage bucket name (e.g. `tnf-media`) |
| `S3_ACCESS_KEY_ID` | Supabase S3 access key |
| `S3_SECRET_ACCESS_KEY` | Supabase S3 secret key |
| `S3_ENDPOINT` | Optional. Auto-derived from `SUPABASE_URL` as `https://<ref>.storage.supabase.co/storage/v1/s3` |
| `S3_REGION` | Supabase S3 region (often `us-east-1`) |
| `S3_CLIENT_UPLOADS` | Optional. `true` = upload from browser (needed on Vercel for files over 4.5 MB) |

**Minimum for Vercel uploads** (if `SUPABASE_URL` is already synced from the Vercel integration):

```env
S3_BUCKET=tnf-media
S3_ACCESS_KEY_ID=<from Supabase → Storage → S3 connection>
S3_SECRET_ACCESS_KEY=<from Supabase → Storage → S3 connection>
```

**Recommended `DATABASE_URI` values:**

| Use case | Variable from Supabase |
|----------|----------------------|
| Migrations (`payload migrate`) | `POSTGRES_URL_NON_POOLING` (port **5432**) |
| Vercel runtime | `POSTGRES_URL` or `POSTGRES_PRISMA_URL` (pooler, port **6543**) |

Set **`DATABASE_URI`** to the appropriate URL for each environment. For local dev, use the non-pooling URL when running migrations, then the pooler URL for `npm run dev` if you prefer.

**Fix `NEXT_PUBLIC_SERVER_URL`:** use one URL only (no comma-separated list).

Remove or stop using **`MONGODB_URI`** after migration.

## 3. Run migrations

From `tnf-web/`, set **`.env`** to Postgres (not MongoDB):

```env
DATABASE_URI=<your POSTGRES_URL_NON_POOLING from Supabase, port 5432>
POSTGRES_SCHEMA=tnf
PAYLOAD_SECRET=your-secret
```

Then:

```bash
npm run payload:migrate
```

This creates Payload tables under the `tnf` schema (e.g. `tnf.users`, `tnf.posts`).

**Feedback form columns** (phone, location, age, gender, etc.) are added by migration `20260603_form_submissions_feedback_fields`. After pulling latest code, run `npm run payload:migrate` again. If migrate cannot run locally, execute `tnf-web/scripts/form-submissions-feedback-fields.sql` in the Supabase SQL Editor instead.

Submissions appear in **Admin → Form Submissions** (`/admin/collections/form-submissions`).

If you see `ECONNREFUSED 127.0.0.1:27017`, your `.env` still has a `mongodb://` URI — replace it with the Supabase Postgres URL.

### Vercel: `self-signed certificate in certificate chain`

On Vercel, use the **pooler** URL (port **6543**) as `DATABASE_URI`. SSL is relaxed automatically on Vercel. **Redeploy after pushing code.** If it still fails, add `DATABASE_SSL_NO_VERIFY=true` on Vercel → Production → redeploy again.

## 4. Create admin user

Visit `/admin` on your site and create the first user, or use Payload’s seed flow if you add one.

## 5. Verify in Supabase

Table Editor → schema dropdown → select **`tnf`**. You should see Payload collections (`users`, `media`, `posts`, etc.).

## Migrating data from MongoDB

There is no automatic migration in this repo. Options:

1. Re-enter content via `/admin` (simplest for a new site).
2. Export MongoDB JSON and write a one-off import script into Payload’s Local API.

## Optional: Supabase Storage for media

**Required on Vercel.** Serverless functions cannot write to a local `media` folder — uploads fail with `ENOENT: mkdir 'media'` without cloud storage.

### 1. Create a public bucket

1. Supabase → **Storage** → **New bucket**
2. Name it e.g. `tnf-media`
3. Enable **Public bucket**

### 2. Enable S3 protocol access

1. Supabase → **Project Settings** → **Storage** → **S3 connection**
2. Enable S3 protocol access and copy **endpoint**, **region**, **access key**, and **secret key**

### 3. Environment variables

Add to Vercel (Production) and local `.env` when testing uploads:

```env
S3_BUCKET=tnf-media
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1
```

`SUPABASE_URL`, `S3_ENDPOINT`, and `NEXT_PUBLIC_SUPABASE_URL` are auto-detected when present. Endpoint format: `https://<project-ref>.storage.supabase.co/storage/v1/s3`.

`clientUploads` is **opt-in** via `S3_CLIENT_UPLOADS=true`. Leave it off so files keep organized folder paths (Payload client uploads cannot use per-file folders). Server uploads support up to ~4.5 MB on Vercel.

### Bucket folder layout

New uploads are stored as:

```text
{folder}/{category}/YYYY-MM-DD_original-name.ext
```

Examples:

- `resources/annual-report/2026-07-13_tnf-annual-report.pdf`
- `feedback/informalisation/2026-07-13_supporting.jpg`
- `whistleblower/fraud/2026-07-13_evidence.pdf`
- `media/general/2026-07-13_hero.jpg`

In **Admin → Media**, set **Folder** (resources, media, feedback, …) and optional **Category** before uploading. Form attachments set folder/category automatically.

Run SQL if needed: `scripts/media-storage-folders.sql`.

### 4. CORS (for admin uploads)

In the bucket settings, allow your site origin(s), e.g. `https://tnfzim.com`, with methods `GET`, `PUT`, `POST`, `DELETE`.

### 5. Redeploy

After setting env vars on Vercel, **redeploy** the site, then retry uploading in **Admin → Media** or when adding a **Resource** document.

Without these variables, local `npm run dev` still uses a `media/` folder on disk.
