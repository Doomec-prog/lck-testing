# Project Context & State

## Authentication
- **Provider**: Supabase Auth (SSR)
- **Status**: Configured. Route Handlers use `@supabase/ssr`.
- **Callback**: `app/auth/callback/route.ts` handles code exchange with robust error handling.
- **Redirects**: Configured in Supabase Dashboard with wildcard `https://lck-testing-*-doomec-progs-projects.vercel.app/**`.

## AI Integration
- **SDK**: `@google/generative-ai` (Official Node.js SDK)
- **Version**: `^0.21.0` (Supports systemInstruction)
- **Model**: `gemini-1.5-flash`
- **Route**: `app/api/chat/route.ts` (Dynamic Route Handler)

## Recent Fixes
- Replaced `@google/genai` with `@google/generative-ai` to fix module resolution errors on Vercel.
- Forced `dynamic = 'force-dynamic'` on auth and chat routes to prevent static generation 500 errors.
- Added debug logging to Auth Callback.
- Removed unused dependencies (`cheerio`).

## Pending / Next Steps
- Verify Auth flow on Vercel Preview.
- Verify Chatbot response on Vercel Preview.
