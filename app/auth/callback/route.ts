import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Auth Exchange Error:", error);
        return NextResponse.redirect(new URL(`/?error=${error.message}`, requestUrl.origin));
      }
    }

    return NextResponse.redirect(new URL('/account', requestUrl.origin));
  } catch (e: any) {
    console.error("Callback Route Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
