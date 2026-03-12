# Project Context & State

> Last updated: 2026-03-12 | Branch: `main` | Status: **Production**

## Authentication
- **Provider**: Supabase Auth (SSR via `@supabase/ssr`)
- **Callback**: `app/auth/callback/route.ts` — robust error handling, no 500s
- **Middleware**: `middleware.ts` — auto-refreshes session tokens
- **Login**: `app/login/page.tsx` + `components/auth/LoginForm.tsx`

## AI Integration
- **SDK**: `@google/generative-ai` v0.21.0
- **Model**: `gemini-2.5-flash`
- **Route**: `app/api/chat/route.ts` (force-dynamic)

## Personal Cabinet ✅ (Production)
### Application Wizard (`app/apply`)
- 4-step form: Personal → Professional → Documents → Review
- Components: `components/cabinet/Wizard/`
- Submits to Supabase `profiles` + `applications` tables
- File uploads to `cabinet-documents` Storage bucket

### Member Dashboard (`app/account`)
- Routes by user status: applicant → status tracker, member → dashboard
- Components: `components/cabinet/Dashboard/`
  - `StatusCard` — 5 status variants (draft/submitted/approved/rejected/changes_requested)
  - `ProfileCard` — displays submitted application data
  - `FeatureCards` — 6 upcoming features (Digital Card, Dues, Networking, Events, Legal, Resources)

## Database (Supabase)
- **`profiles`** — extends `auth.users` (full_name, city, avatar_url, status, membership_id)
- **`applications`** — wizard submissions (personal + professional + documents)
- **RLS**: Enabled. Users can only read/write their own data. Admins have full access.
- **Storage RLS**: `cabinet-documents` — users upload to `user_id/` folder, admins can view all.
- **Storage Buckets**: `cabinet-documents` (private), `avatars` (public)
- **Schema**: `supabase_schema.sql` (reference only, already executed)

## Completed Milestones
1. ✅ WP API server-only refactor + caching
2. ✅ Supabase SSR migration (from deprecated auth-helpers)
3. ✅ Fix 500 errors (dynamic routes, SDK conflict)
4. ✅ Application Wizard (4-step registration)
5. ✅ Member Dashboard (status, profile, feature cards)
6. ✅ Admin Panel (application management, approve/reject, security RLS)

## Upcoming Features (Placeholder Cards)
- 🎬 Digital Member Card (QR-code)
- 💳 Membership Dues tracking
- 🤝 Networking / colleague search
- 📅 Event Calendar
- ⚖️ Legal Support templates
- 📦 Resources (logos, letterheads)

## TODO
- [ ] Удалить `/api/debug-auth` перед продакшеном (debug endpoint)
