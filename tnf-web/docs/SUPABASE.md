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

Media files are still stored on the server filesystem by default. For production, consider `@payloadcms/storage-s3` pointed at Supabase Storage (S3-compatible).
