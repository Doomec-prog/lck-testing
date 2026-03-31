# Project Context & State

> Last updated: 2026-03-31 | Branch: `main` | Status: **Production**

## Tech Stack
- **Framework**: Next.js 14 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + `@tailwindcss/typography`
- **Database**: Supabase (Postgres, Auth, Storage, RLS)
- **CMS**: WordPress (Headless) via `back.lck.kz/wp-json/wp/v2`
- **AI**: `@google/generative-ai` v0.21.0 (Gemini 2.5 Flash)
- **Hosting**: Vercel (prod: `lck.kz`)

## Authentication
- **Provider**: Supabase Auth (SSR via `@supabase/ssr`)
- **Method**: Magic Link (OTP) with PKCE flow
- **Callback**: `app/auth/callback/route.ts` — exchanges code for session, redirects to `/account`
- **Middleware**: `middleware.ts` — auto-refreshes session tokens
- **Login**: `app/login/page.tsx` + `components/auth/LoginForm.tsx`

## Smart Routing
- **Dashboard** (`app/account/page.tsx`): Redirects to `/apply` if no application or status is `draft`
- **Wizard** (`app/apply/page.tsx`): Redirects to `/account` if application exists and status ≠ `draft`
- **Auth Callback**: Defaults to `/account` after Magic Link login
- **CTA Buttons**: All "Подать заявку" buttons route to `/login` for smart routing

## Personal Cabinet
### Application Wizard (`app/apply`)
- 4-step form: Personal → Professional → Documents → Review
- Components: `components/cabinet/Wizard/`
- **Step 1**: Full Name*, City*, Phone*, Email* (mandatory)
- **Step 2**: Primary Profession* (mandatory, 35 professions grouped by department via `<optgroup>`)
- **Step 3**: Documents (optional file uploads)
- **Step 4**: Review + legal consent checkbox
- Validation: `isStepValid()` disables Next button until required fields are filled
- Submits to Supabase `profiles` + `applications` tables
- File uploads to `cabinet-documents` Storage bucket
- Redirects to `/account` on successful submission

### Member Dashboard (`app/account`)
- Routes by user status: applicant → status tracker, member → dashboard
- Components: `components/cabinet/Dashboard/`
  - `StatusCard` — 5 status variants (draft/submitted/approved/rejected/changes_requested)
  - `ProfileCard` — displays submitted application data
  - `FeatureCards` — 6 upcoming features

## News (Headless CMS)
- **API**: `lib/wpApi.ts` — fetches from `https://back.lck.kz/wp-json/wp/v2`
- **Caching**: ISR with `{ next: { revalidate: 3600 } }` (1 hour)
- **Grid**: `components/pages/NewsPage.tsx` — 4-column grid with `<Link>` (internal SPA navigation)
- **Single Post**: `app/news/[slug]/page.tsx` — Premium Cinema Club UI
  - Noir Black/Grey background, edge-to-edge hero image with fade gradient
  - `prose prose-invert prose-lg` typography with Gold Primary (#D4AF37) accent links
  - `notFound()` handling for missing posts
- **Slug Routing**: `getPostBySlug()` searches both `posts` and `rt-portfolios`

## Homepage
- **CTA Section** (`components/CTA.tsx`): "Подать заявку" → `<Link href="/login">`
- **Join CTA** (`components/ContactFooter.tsx`): Premium block replacing old contact form
  - Title: "Вступить в Лигу Кинематографистов"
  - 3 feature cards (Profile, Networking, Events)
  - Gold button "ПОДАТЬ ЗАЯВКУ" → `/login`
- **Footer**: Cinematic end-credits style (LCK.KZ logo, © 2026, Centurion Films)

## Loading Skeletons
- `app/loading.tsx` — global page transition skeleton
- `app/news/loading.tsx` — 4×2 news card grid skeleton
- `app/news/[slug]/loading.tsx` — full article layout skeleton (hero + paragraphs)
- `app/account/loading.tsx` — dashboard skeleton
- All use Noir Black/Grey theme with `animate-pulse`

## Language Switcher
- Cookie-based (`NEXT_LOCALE`) for SSR compatibility
- `router.refresh()` wrapped in `useTransition` for cache invalidation
- `isLangSwitching` exposed via `GlobalContext`
- `LanguageWave.tsx` — cinematic gold shimmer overlay during transitions

## Database (Supabase)
- **`profiles`** — extends `auth.users` (full_name, city, avatar_url, status, membership_id)
- **`applications`** — wizard submissions (personal + professional + documents)
- **RLS**: Enabled. Users can only read/write their own data. Admins have full access.
- **Storage**: `cabinet-documents` (private), `avatars` (public)

## Admin Panel
- `app/admin/` — application management, approve/reject, pagination
- Security: RLS-based access control

## Completed Milestones
1. ✅ WP API server-only refactor + caching
2. ✅ Supabase SSR migration (from deprecated auth-helpers)
3. ✅ Fix 500 errors (dynamic routes, SDK conflict)
4. ✅ Application Wizard (4-step registration, 5MB upload limits, legal consent)
5. ✅ Member Dashboard (status, profile, feature cards, loading skeletons)
6. ✅ Admin Panel (application management, approve/reject, security RLS, pagination)
7. ✅ UI/UX Polish (Light theme fixes, header logout, mobile menu toggle)
8. ✅ Smart Routing (login → wizard → dashboard, protected routes)
9. ✅ Language Switcher Refactor (cookie-based, server actions, cache refresh)
10. ✅ Cinematic Language Transition (useTransition + LanguageWave overlay)
11. ✅ Magic Link Auth Audit (confirmed correct PKCE flow)
12. ✅ Wizard Validation (mandatory fields per step, disabled Next button)
13. ✅ Headless CMS News (slug routing, single post page, Premium Cinema UI)
14. ✅ Premium Skeleton Loaders (global, news grid, single post)
15. ✅ Homepage CTA Redesign (contact form → Join CTA, all buttons → /login)
16. ✅ Profession List Expansion (35 items, 8 departments, optgroup)
17. ✅ Footer Redesign (cinematic end-credits, removed email form)
18. ✅ Workspace Cleanup (removed legacy Vite files, consolidated AI context)

## Upcoming Features (Placeholder Cards)
- 🎬 Digital Member Card (QR-code)
- 💳 Membership Dues tracking
- 🤝 Networking / colleague search
- 📅 Event Calendar
- ⚖️ Legal Support templates
- 📦 Resources (logos, letterheads)
