# Deploying College Balanza to Vercel

The app is a Vite SPA + Express/tRPC API. Vercel hosts the static client from
`dist/public` and runs the Express app as a single serverless function at
`api/index.ts`.

## One-time setup

1. Push the repo to GitHub and import it into Vercel.
2. In **Project Settings → Environment Variables** set:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL` (optional)
   - `OPENAI_MODEL` (optional)
   - `NODE_ENV=production`
3. Build/Output settings are pre-configured in `vercel.json`:
   - Install: `pnpm install --no-frozen-lockfile`
   - Build:  `pnpm build:client`
   - Output: `dist/public`
   - All `/api/*` traffic is rewritten to the serverless function at
     `api/index.ts`, which exports the Express app.

## Local development

```bash
pnpm install
cp .env.example .env   # fill in DATABASE_URL + OPENAI_API_KEY
pnpm db:push           # create tables
pnpm dev               # http://localhost:3000
```

`pnpm dev` runs the full Express server with Vite middleware — identical to
the original template, just with the Manus runtime stripped.

## Notes / caveats

- Express runs as a **single** Vercel function. This is fine for tRPC because
  every call goes through `/api/trpc`. If you later need long-running work
  (LLM streams >60s, background jobs), split it out to a queue.
- The `cb_anon_id` cookie is set with `Secure` in production. Vercel always
  serves over HTTPS so this is automatic.
- The Drizzle migration files in `drizzle/` were authored against the
  original (Manus-shaped) `users` table. For a clean DB, run `pnpm db:push`
  to regenerate. For an existing DB, see `MIGRATION.md`.
