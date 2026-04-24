# CLAUDE.md

Guidance for Claude Code when working in this repository.

## 1. Project Overview

**LCK.KZ** — the official website of the **Лига Кинематографистов Казахстана** (League of Cinematographers of Kazakhstan), an independent non‑profit that supports the Kazakhstani film industry.

The site is a tri‑lingual (RU / KZ / EN) public marketing site combined with a member/applicant **Personal Cabinet**:

- **Public audience**: general visitors, prospective members, press. Reads WordPress‑powered news and static marketing sections.
- **Applicants**: fill out a 4‑step Wizard to request membership.
- **Members**: view dashboard, profile, and placeholder cards for upcoming features.
- **Admins**: review, approve, or reject applications through a dedicated admin panel.

Production deploys to Vercel (`lck.kz`). Headless CMS backend is at `back.lck.kz`.

## 2. Tech Stack (exact versions from `package.json`)

### Runtime

| Package | Version |
|---|---|
| `next` | `^16.2.1` (App Router, Server Components) |
| `react` | `^19.2.4` |
| `react-dom` | `^19.2.4` |
| `typescript` | `^5.2.2` |

### Auth & Data

| Package | Version |
|---|---|
| `@supabase/ssr` | `^0.5.2` |
| `@supabase/supabase-js` | `^2.49.1` |

### Content & AI

| Package | Version |
|---|---|
| `@google/generative-ai` | `^0.21.0` (Gemini 2.5 Flash) |
| `marked` | `^18.0.2` (Markdown → HTML for WP posts) |
| `sanitize-html` | `^2.17.3` (XSS sanitization of WP HTML) |

### UI

| Package | Version |
|---|---|
| `tailwindcss` | `^3.4.1` |
| `@tailwindcss/typography` | `^0.5.19` |
| `lucide-react` | `^1.7.0` |
| `@marsidev/react-turnstile` | `^1.5.0` (Cloudflare Turnstile anti‑spam) |

### Tooling

- `eslint` `^8.57.0`, `eslint-config-next` `14.1.0`
- `postcss` `^8.4.35`, `autoprefixer` `^10.4.18`
- Node.js **18.17+** required (per `LOCAL_SETUP.md`)

## 3. Architecture

### Top‑level structure

```
lck-testing/
├── app/                      # Next.js App Router (Server Components by default)
│   ├── layout.tsx            # Root layout — fonts, GlobalProvider, Supabase session bootstrap
│   ├── page.tsx              # Homepage (Hero, About, Benefits, News, CTA, etc.)
│   ├── loading.tsx           # Global skeleton
│   ├── globals.css           # Tailwind + custom CSS vars
│   ├── account/              # Member dashboard (auth-gated)
│   ├── admin/                # Admin panel (admin-only)
│   ├── apply/                # 4-step application Wizard (auth-gated)
│   ├── auth/callback/        # Magic Link PKCE callback → /account
│   ├── login/                # Magic Link login form
│   ├── news/                 # News index + [slug] single post
│   ├── residents/            # Members/residents public page
│   └── api/
│       ├── chat/route.ts     # Gemini chatbot endpoint
│       └── news/route.ts     # Paginated news JSON (for infinite-grid client)
├── components/               # All React components
│   ├── Hero, About, ...      # Homepage section components
│   ├── Header, Wrapper       # Layout shell (client components)
│   ├── Chatbot.tsx           # Floating AI chatbot
│   ├── admin/                # ApplicationsTable, StatsBar, ApplicationDetail
│   ├── auth/LoginForm.tsx
│   ├── cabinet/
│   │   ├── Wizard/           # WizardShell + Step1..4
│   │   └── Dashboard/        # StatusCard, ProfileCard, FeatureCards
│   ├── news/NewsInfiniteGrid.tsx
│   ├── pages/                # NewsPage, MembersPage (page-level compositions)
│   └── ui/                   # Primitives: CinematicBackground, LanguageWave, LckLogo, ...
├── lib/
│   ├── supabase.ts           # createSupabaseBrowserClient()
│   ├── supabaseServer.ts     # createSupabaseServerClient() — server-only
│   ├── wpApi.ts              # server-only WordPress REST client + HTML sanitizer
│   ├── getLanguage.ts        # Reads `lang` cookie / Accept-Language on the server
│   └── translations.ts       # i18n dictionary (RU/KZ/EN)
├── constants/translations.ts # Additional translation constants
├── context/GlobalContext.tsx # Theme, language, session, mobile-menu state (client)
├── types/index.ts            # Shared TS types (also mirrored in ./types.ts)
├── types.ts                  # Root-level types (NewsItem, WPPost, UserProfile, ...)
├── middleware.ts             # Refreshes Supabase session on every non-static request
├── next.config.mjs           # Image remotePatterns (lck.kz, back.lck.kz, unsplash, ...)
├── tailwind.config.js        # Gold/Cinema palette, Inter + Oswald fonts, custom keyframes
├── tsconfig.json             # Strict TS, `@/*` path alias → project root
├── supabase_schema.sql       # Tables + initial RLS
├── admin_rls_migration.sql   # Admin-side RLS
├── security_rls_fix.sql      # Restricts user self-update of `status`/`membership_id`
└── storage_rls_policies.sql  # Bucket RLS for cabinet-documents
```

### Routing & auth flow

1. **Middleware** (`middleware.ts`) runs on every non‑asset request and calls `supabase.auth.getUser()` to refresh the session cookie. If Supabase env vars are missing it no‑ops (keeps the site rendering in dev).
2. **Login** (`/login`) → Magic Link via `supabase.auth.signInWithOtp`, protected by Cloudflare Turnstile. Redirect target is `${origin}/auth/callback`.
3. **Callback** (`/auth/callback`) exchanges the `code` for a session (PKCE) and redirects to `/account`.
4. **Smart routing** (both server components):
   - `/account` — if no application exists OR application status is `draft` → `redirect('/apply')`; otherwise render dashboard.
   - `/apply` — if application exists with status ≠ `draft` → `redirect('/account')`.
   - `/admin` — uses `auth.getUser()` (not `getSession()`) for JWT verification, then checks `profiles.status === 'admin'`.
5. **Language** is read server‑side by `getServerLanguage()` from the `lang` cookie, falling back to `Accept-Language` then `RU`. Switching writes the cookie client‑side then calls `router.refresh()` inside a `useTransition` so server components re‑render.

### Key files to know

| File | Purpose |
|---|---|
| `app/layout.tsx` | Mounts `GlobalProvider`, loads Inter + Oswald, reads initial session. |
| `components/Wrapper.tsx` | Client shell (`<Header/>`, `<CinematicBackground/>`, `<Chatbot/>`). |
| `lib/wpApi.ts` | Singleton `wpApi` service. All WP calls go through it. Fetches use `next: { revalidate: 3600 }` for 1h ISR. Sanitizes HTML with `sanitize-html` and falls back to `marked` when content lacks HTML tags. |
| `components/cabinet/Wizard/WizardShell.tsx` | Holds `WizardData` state; `isStepValid()` gates the Next button; `handleSubmit` upserts `profiles` then inserts `applications` (status `submitted`). |
| `app/admin/AdminDashboard.tsx` | Client component that mutates application status and generates membership IDs (`LCK-{year}-{0000}`) on approval. |

## 4. Database (Supabase)

### Tables (`supabase_schema.sql`)

**`public.profiles`** (extends `auth.users`)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | FK → `auth.users.id`, cascade delete |
| `full_name` | `text` | `char_length ≥ 3` |
| `city` | `text` | |
| `avatar_url` | `text` | |
| `status` | `text` | CHECK in (`applicant`, `member`, `admin`), default `applicant` |
| `membership_id` | `text` | Assigned by admin on approval (e.g. `LCK-2026-0042`) |
| `updated_at` | `timestamptz` | |

**`public.applications`** (wizard submissions)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `profiles.id`, cascade delete |
| `full_name`, `city`, `email`, `phone` | `text` | Step 1 |
| `education`, `profession` | `text` | Step 2 |
| `filmography_links` | `jsonb` | `[]` default; string array |
| `documents_urls` | `jsonb` | `{}` default; `{ id_card, diploma, portfolio }` → storage URLs |
| `status` | `text` | CHECK in (`draft`, `submitted`, `approved`, `rejected`, `changes_requested`), default `draft` |
| `created_at`, `updated_at` | `timestamptz` | |

### Storage buckets

- **`cabinet-documents`** (private) — user documents, files keyed by `{user_id}/{doc_key}.{ext}`, **max 5 MB, JPG/PNG/PDF only** (enforced client‑side in `StepDocuments.tsx`).
- **`avatars`** (public).

### RLS (Row‑Level Security)

RLS is **enabled** on both tables. Policies live across three SQL files that must be run in order:

1. **`supabase_schema.sql`** — base tables + user policies:
   - `profiles`: public select; user can update/insert own row.
   - `applications`: user can select/insert/update own rows (`auth.uid() = user_id`).
2. **`admin_rls_migration.sql`** — admin override:
   - Admins (`profiles.status = 'admin'`) can select/update ALL applications and ALL profiles.
3. **`security_rls_fix.sql`** — **drops** the permissive user update policy and recreates it with a `WITH CHECK` that pins `status` and `membership_id` to their current values. Users can no longer self‑promote to admin or assign themselves a membership ID.
4. **`storage_rls_policies.sql`** — `cabinet-documents` bucket: authenticated users can INSERT/SELECT/DELETE only objects where the first folder segment matches their `auth.uid()`. Admins can SELECT all.

### Auth flow

- **Provider**: Supabase Auth via `@supabase/ssr`.
- **Method**: Magic Link OTP with PKCE.
- **Cookie refresh**: `middleware.ts` calls `supabase.auth.getUser()` on every matched request.
- **Anti‑spam**: Cloudflare Turnstile on login; site key from `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, falls back to `1x00000000000000000000AA` (Cloudflare's dummy always‑success key) in dev.
- **Server vs client**: use `getUser()` (verifies JWT) in server components that gate access. `getSession()` is OK in the root layout for the initial `hasSession` flag, where a stale cookie is tolerable.

## 5. Current feature status

Per `AI_CONTEXT.md` (last updated 2026‑03‑31) and git log through branch `feature/claude-obsidian-setup` / recent `main`.

### ✅ Works (production‑ready)

- Homepage sections (Hero, About, Benefits, LeadingOrg, Activities, UsefulInfo, ProjectsStats, News, CTA, ContactFooter).
- Magic Link auth with Turnstile, PKCE callback, middleware session refresh.
- Application Wizard (4 steps, required‑field validation, 5 MB upload cap, consent checkbox).
- Member Dashboard (StatusCard, ProfileCard, FeatureCards).
- Admin Panel (list, approve/reject, membership‑ID generation).
- Headless News (ISR 1h, infinite grid, single post with Premium Cinema UI, `notFound()` fallback).
- i18n (RU/KZ/EN) via cookie + `useTransition` + `LanguageWave` overlay.
- Loading skeletons (global, news grid, single post, account).
- Light / Dark / Noir themes via `GlobalContext`.

### 🚧 WIP / placeholder

The Dashboard's `FeatureCards` are explicit placeholders for:

- 🎬 Digital Member Card (QR‑code)
- 💳 Membership Dues tracking
- 🤝 Networking / colleague search
- 📅 Event Calendar
- ⚖️ Legal Support templates
- 📦 Resources (logos, letterheads)

### 🐛 Known issues / technical debt

- **Two `types` sources** — both `types.ts` (root) and `types/index.ts` exist with overlapping definitions. The root file additionally defines `UserProfile`, `ApplicationDraft`, `UserStatus`, `ApplicationStatus`. Consolidate to avoid drift.
- **Stray debug / data files in repo root**: `content.txt`, `content_imgs.txt`, `embedded_debug.txt`, `featured.txt`, `post_ids.txt`, `test.json`, `tmp_news.json` (~3.5 MB). Not in `.gitignore`; candidates for cleanup.
- **`eslint-config-next` is `14.1.0`** while `next` is `16.2.1`. Lint may miss Next 16–specific rules until bumped.
- **Chatbot fallback swallows Gemini errors with a hard‑coded Russian message** (`app/api/chat/route.ts`). Works, but opaque for debugging — consider logging + a generic localized string.
- **WP content pipeline** — recent commits (`192f079`, `d09c59e`, `e4138fd`) show active churn around WP HTML rendering, sanitization, and an ESM crash caused by `isomorphic-dompurify`. The current working state uses `sanitize-html` + `marked`; avoid re‑introducing `isomorphic-dompurify`.
- **`getPostBySlug`** only searches `posts` (the legacy `rt-portfolios` fallback was removed in commit `6482c3f`). The docstring in `AI_CONTEXT.md` mentioning both is stale.
- **`NEXT_LOCALE` vs `lang` cookie** — `AI_CONTEXT.md` says the language cookie is `NEXT_LOCALE`, but `GlobalContext.tsx` and `getLanguage.ts` both read/write the cookie named `lang`. The code is authoritative; the doc is stale.
- **`.env` files are gitignored** but there is no `.env.example` — new contributors have to discover required vars from code. See §6.

## 6. Environment variables

All env vars are read directly via `process.env`. No `.env.example` exists in the repo.

### Required for full functionality

| Var | Used in | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | middleware, `lib/supabase.ts`, `lib/supabaseServer.ts`, `app/auth/callback/route.ts` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same as above | Supabase anon key |
| `API_KEY` | `app/api/chat/route.ts` | Google Gemini API key |

### Optional

| Var | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `1x00000000000000000000AA` (Cloudflare always‑pass dummy) | Cloudflare Turnstile site key on login |

The layout and middleware both short‑circuit gracefully if Supabase env vars are missing — the public site still renders, only auth features break. That's intentional so marketing pages can run without Supabase in dev.

## 7. Dev commands

From `package.json`:

```bash
npm install         # install dependencies
npm run dev         # next dev, serves http://localhost:3000
npm run build       # next build (production)
npm run start       # next start (after build)
npm run lint        # next lint (ESLint)
```

There are **no test scripts** — no unit, integration, or e2e tests exist in the repo. If you add tests, introduce the runner and wire it into `package.json` / CI.

Platform notes (this working copy is on **Windows 11 + Git Bash**):

- The shell runs bash syntax, not PowerShell. Use forward slashes and `/dev/null` when writing scripts.
- `.next/` is present locally and gitignored; don't commit it.

## 8. Code conventions & patterns

### General

- **TypeScript strict** (`strict: true`, `noEmit: true`). Project alias `@/*` → repo root.
- **JSX**: `react-jsx` (no need to import React in every file, though most existing files still do for consistency).
- **Server by default**: App Router components are server components unless they declare `'use client'`. Client boundaries are drawn narrowly (Wizard, admin dashboard, forms, chatbot).
- **`export const dynamic = 'force-dynamic'`** is applied on auth‑gated pages (`/account`, `/admin`, `/auth/callback`, `/news/[slug]`) to opt out of caching when reading cookies.

### Supabase usage

- **Server code** → `createSupabaseServerClient()` from `@/lib/supabaseServer` (marked `server-only`).
- **Client code** → `createSupabaseBrowserClient()` from `@/lib/supabase`.
- Never import from `@supabase/auth-helpers-*` — the project migrated to `@supabase/ssr`.
- Prefer `supabase.auth.getUser()` for authorization checks (verifies JWT server‑side). `getSession()` is only appropriate for "is anyone logged in?" UX hints.

### Data fetching

- WordPress content: go through `wpApi` (server‑only singleton). Use ISR (`next: { revalidate: 3600 }`) — already built in.
- Always pipe WP HTML through `sanitizeHtml()` in `lib/wpApi.ts` before `dangerouslySetInnerHTML`. Never render raw WP HTML.
- Image domains are whitelisted in `next.config.mjs`: add new hosts there if `next/image` complains.

### Styling

- **Tailwind** + `@tailwindcss/typography`. Custom palette on CSS variables:
  - `gold-400/500/600` → `--color-gold-*`
  - `cinema-900/950` → `--color-cinema-*`
  - `paper-100` → `#F0F0EE`
- **Fonts**: `font-sans` = Inter, `font-display` = Oswald (loaded via `next/font/google` in root layout).
- **Themes**: `class` dark mode. `GlobalContext` toggles `html.dark` and `html.noir`. `noir` extends `dark`.
- **Animations**: `marquee`, `blob`, `grain`, `breathing`, `wipe`, `scanline` are defined in `tailwind.config.js`.
- **Glass panels**: reusable `.glass-panel` utility (defined in `app/globals.css`).
- Cinematic touches: `CinematicBackground`, `CinematicMist`, `NoiseOverlay`, `LanguageWave`, `SpotlightCard`.

### i18n

- Supported languages: `RU | KZ | EN` (the `Language` type).
- Server: `getServerLanguage()` in `lib/getLanguage.ts` reads the `lang` cookie (then `Accept-Language`, then falls back to `RU`).
- Client: `useGlobalContext().lang` + `setLang(next)` — writes the cookie synchronously then calls `router.refresh()` inside a `useTransition`. `isLangSwitching` drives the `LanguageWave` overlay.
- Dictionary: `lib/translations.ts` (+ `constants/translations.ts`). Pass `lang` as a prop to server‑rendered sections; let client components pull from context.

### UI / UX patterns

- CTA buttons (`CTA.tsx`, `ContactFooter.tsx`, Hero) route to **`/login`** — login is the funnel entry point; smart redirects take the user from there to wizard or dashboard.
- File uploads enforce size/type in the client (`StepDocuments.tsx`); RLS on the storage bucket is the defense‑in‑depth.
- Admin approval generates a membership ID `LCK-{YYYY}-{####}` and flips the user's `profiles.status` to `member` in the same mutation.

### Commit style

Browse `git log --oneline` — prefix with conventional tags: `feat(ui)`, `fix(api)`, `style(ui)`, `perf`, `chore(ui)`, etc. Merged PRs use `Merge pull request #N from …`.

## 9. Things not to do

- Don't re‑introduce `isomorphic-dompurify` — it caused an ESM crash on Vercel (commit `e4138fd`). Use `sanitize-html` (already wired in `lib/wpApi.ts`).
- Don't render raw WP HTML without passing it through `sanitizeHtml()` first.
- Don't use `getSession()` for authorization decisions in server components — use `getUser()`.
- Don't import from `@supabase/auth-helpers-nextjs` (legacy) — this repo is on `@supabase/ssr`.
- Don't commit the stray debug files at the repo root (`tmp_news.json`, `embedded_debug.txt`, etc.). If you need them, add them to `.gitignore` first.
- Don't change `profiles.status` or `profiles.membership_id` from a user‑facing surface — the security RLS policy blocks it and the admin path is the only allowed path.
- Don't add new image hosts without updating `next.config.mjs` → `images.remotePatterns`.

## 10. Further reading

- `AI_CONTEXT.md` — human‑maintained state narrative (may lag behind main; cross‑check against code).
- `LOCAL_SETUP.md` — Russian‑language local setup walk‑through.
- `docs/BUG_BASH_GUIDE_RU.md`, `docs/BETA_TESTING_TEMPLATE.md` — QA process docs.
- SQL files at the repo root are the source of truth for schema and RLS.
