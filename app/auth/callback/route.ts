import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';


export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const origin = requestUrl.origin;

    console.log('[Auth Debug] Callback called. Origin:', origin);
    console.log('[Auth Debug] Code present:', !!code);

    if (code) {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("CRITICAL: Supabase keys missing in Auth Callback");
        return NextResponse.redirect(new URL('/?error=server_config_error', requestUrl.origin));
      }

      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
              try {
                cookiesToSet.forEach(({ name, value, options }) => {
                  cookieStore.set(name, value, options);
                });
              } catch (err) {
                // Ignore if called from Server Component (Next.js 14 quirk)
                console.warn("Cookie set ignored:", err);
              }
            },
          },
        }
      );

      try {
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("[Auth Debug] Exchange Error:", error);
          return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error.message)}`, requestUrl.origin));
        }
        console.log('[Auth Debug] Exchange Success. Session:', !!data.session);
      } catch (authError: any) {
        console.error("[Auth Debug] Unexpected Exchange Exception:", authError);
        return NextResponse.redirect(new URL(`/?error=auth_exchange_failed`, requestUrl.origin));
      }
    }

    return NextResponse.redirect(new URL('/account', requestUrl.origin));
  } catch (e: any) {
    console.error("Callback Route Fatal Error:", e);
    // Safe fallback to home instead of 500 JSON logging
    return NextResponse.redirect(new URL(`/?error=internal_server_error`, request.url));
  }
}
