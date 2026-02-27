import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const supabase = createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('status')
        .eq('id', session.user.id)
        .single();

    if (!profile || profile.status !== 'admin') {
        redirect('/account');
    }

    // Fetch all applications
    const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching applications:', error);
    }

    return (
        <div className="min-h-screen bg-cinema-950 pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <AdminDashboard applications={applications || []} />
            </div>
        </div>
    );
}
