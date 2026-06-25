# College Balanza – Migration Notes

This project was forked from the Manus-hosted **College-Balanza** template.
The original codebase relied on several Manus-only services that cannot run
outside their platform. This document records exactly what changed, what was
stripped, and what you need to provide to deploy on Vercel (or any Node host).

## High-level changes

| Area | Before (Manus) | After (Open) |
| --- | --- | --- |
| Build plugin | `vite-plugin-manus-runtime` injecting a debug collector | Plain `@vitejs/plugin-react` |
| Auth | Manus OAuth portal (`/api/oauth/callback`, JWT in `app_session_id` cookie) | **No auth.** Anonymous UUID stored in HTTP-only `cb_anon_id` cookie |
| LLM gateway | `https://forge.manus.im/v1/chat/completions` via `FORGE_API_KEY` | OpenAI-compatible: `OPENAI_BASE_URL` + `OPENAI_API_KEY` (default OpenAI; works with Groq, OpenRouter, Together, vLLM, Ollama) |
| File storage | `@aws-sdk/*` proxy through Manus signed URLs | **Removed** (no feature relied on it yet) |
| Notifications / heartbeat / data API / maps / voice / image-gen | Manus SDK helpers | **Removed** |
| User table | `users(id serial, openId, email, name, role, loginMethod, …)` | `users(id uuid primary key, createdAt, lastSeenAt)` – one row per browser session |
| `comparisons` FK | `userId int -> users.id` | `anonymousId uuid -> users.id` |
| Deployment | Manus runtime | **Vercel** (`@vercel/node` serverless function wrapping the Express app) |

## Files removed

```
server/_core/oauth.ts
server/_core/sdk.ts
server/_core/heartbeat.ts
server/_core/notification.ts
server/_core/dataApi.ts
server/_core/voiceTranscription.ts
server/_core/imageGeneration.ts
server/_core/map.ts
server/_core/storageProxy.ts
server/_core/types/manusTypes.ts
server/storage.ts
server/auth.logout.test.ts
client/src/components/Map.tsx
client/src/components/ManusDialog.tsx
```

The `vite-plugin-manus-runtime`, `@aws-sdk/*`, `mysql2`, `jose`,
`@types/google.maps`, `axios`, and the stray `add` packages were removed from
`package.json`.

## Identity model

* On every request `server/_core/middleware/anonymous.ts` reads the
  `cb_anon_id` cookie. If missing/invalid, it mints a fresh `randomUUID()`
  and sets an HTTP-only cookie (`SameSite=Lax`, `Secure` in production,
  2-year max-age).
* `createContext` upserts a row into `users` keyed by that UUID and exposes
  `ctx.anonymousId`.
* All persisted history (e.g. `comparisons`) is keyed by `anonymousId`.
* `client/src/_core/hooks/useAuth.ts` now returns a static `{ user: "Guest",
  isAuthenticated: true }` shim so existing pages keep compiling without UI
  changes.
* **There is no login, signup, OAuth, or auth UI anywhere.**

## LLM

`server/_core/llm.ts` now targets any OpenAI-compatible endpoint:

```
OPENAI_BASE_URL=https://api.openai.com/v1   # or Groq/OpenRouter/Together/Ollama
OPENAI_API_KEY=sk-…
OPENAI_MODEL=gpt-4o-mini                    # default if a call omits `model`
```

The request/response shape (chat completions, tool calls, structured outputs)
is unchanged, so router code did not need modification beyond imports.

## What you must supply

1. `DATABASE_URL` – a Postgres connection string (Neon, Supabase Postgres,
   RDS, etc.). Run `pnpm db:push` once to apply migrations.
2. `OPENAI_API_KEY` (+ optional `OPENAI_BASE_URL` / `OPENAI_MODEL`).
3. Optional: `ANON_COOKIE_NAME` to override the default cookie name.

See `DEPLOYMENT.md` for Vercel-specific instructions.

## Features that could not be migrated automatically

The following capabilities existed in the original template but had no
open-source drop-in within scope. They were removed; reintroduce them only if
needed for the product:

* **Manus file storage proxy** (`storageProxy.ts`, `storage.ts`). Replace
  with S3/R2/Supabase Storage if file uploads are required.
* **Manus notifications** (`notification.ts`) – owner email/push pings.
* **Manus heartbeat** (`heartbeat.ts`) – platform-side liveness pings.
* **Manus data API** (`dataApi.ts`) – arbitrary KV/query passthrough.
* **Manus voice transcription / image generation / maps** helpers – swap in
  Whisper, an image model, and Google/Mapbox respectively if reintroduced.
* **Manus OAuth login UI** (`ManusDialog`, `oauth.ts`). Intentionally removed
  per product requirement (privacy-first, zero auth).

## Database migration note

The existing SQL migrations in `drizzle/` were generated against the old
`users` shape (serial PK, OAuth columns). If you are starting from a fresh
database, run `pnpm db:push` to regenerate. If you have existing data, write
a manual migration to rebuild `users` with a `uuid` primary key and
re-wire `comparisons.anonymousId`.
