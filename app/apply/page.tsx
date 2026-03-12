import { WizardShell } from '@/components/cabinet/Wizard';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export default async function ApplyPage() {
    const supabase = createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login?next=/apply');
    }

    const { data: application } = await supabase
        .from('applications')
        .select('status')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (application && application.status !== 'draft') {
        redirect('/account');
    }

    return (
        <div className="min-h-screen bg-cinema-900 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <WizardShell />
            </div>
        </div>
    );
}
