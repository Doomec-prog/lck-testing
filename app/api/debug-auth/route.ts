import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * DEBUG ENDPOINT — hit /api/debug-auth in browser to see auth state
 * DELETE THIS ROUTE BEFORE GOING TO PRODUCTION
 */
export async function GET() {
    try {
        const supabase = createSupabaseServerClient();

        // 1. Check getUser (JWT verification)
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({
                step: '1_AUTH',
                status: '❌ NOT LOGGED IN',
                error: userError?.message || 'No user found',
                fix: 'You need to log in first. Go to /login and complete magic link flow.',
            });
        }

        // 2. Check profile exists
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError) {
            return NextResponse.json({
                step: '2_PROFILE',
                status: '❌ NO PROFILE',
                user_id: user.id,
                user_email: user.email,
                error: profileError.message,
                fix: 'Profile row is missing. The Wizard should create one, or insert manually in Supabase.',
            });
        }

        // 3. Check admin status
        const isAdmin = profile.status === 'admin';

        // 4. Check applications (as this user would see them)
        const { data: applications, error: appError } = await supabase
            .from('applications')
            .select('id, full_name, status, created_at')
            .limit(10);

        return NextResponse.json({
            step: 'ALL_CHECKS_PASSED',
            status: '✅ AUTHENTICATED',
            user: {
                id: user.id,
                email: user.email,
            },
            profile: {
                status: profile.status,
                full_name: profile.full_name,
                membership_id: profile.membership_id,
                is_admin: isAdmin,
            },
            applications: {
                count: applications?.length || 0,
                items: applications || [],
                error: appError?.message || null,
            },
            access: {
                can_view_account: true,
                can_view_admin: isAdmin,
                redirect_if_admin_page: isAdmin ? '/admin ✅' : '/account (not admin)',
            },
        });
    } catch (err: any) {
        return NextResponse.json({
            step: '0_SERVER_ERROR',
            status: '❌ SERVER CRASH',
            error: err.message,
        }, { status: 500 });
    }
}
