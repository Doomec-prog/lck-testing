import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const supabase = await createSupabaseServerClient();

    // Use getUser() instead of getSession() — it verifies the JWT server-side
    // getSession() only reads cookies and is unreliable in Server Components
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('[Admin] Auth error or no user:', authError?.message);
        redirect('/login');
    }

    // Check admin status
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('status')
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error('[Admin] Profile fetch error:', profileError.message);
    }

    if (!profile || profile.status !== 'admin') {
        console.error('[Admin] Not admin. Profile:', profile);
        redirect('/account');
    }

    // Fetch all applications
    const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[Admin] Error fetching applications:', error);
    }

    return (
        <div className="min-h-screen bg-cinema-950 pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <AdminDashboard applications={applications || []} />
            </div>
        </div>
    );
}
