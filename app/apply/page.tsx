import { WizardShell } from '@/components/cabinet/Wizard';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export default async function ApplyPage() {
    const supabase = createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login?next=/apply');
    }

    // TODO: Check if user already has an application or is a member
    // const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    // if (profile?.status === 'member') redirect('/account');

    return (
        <div className="min-h-screen bg-cinema-900 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <WizardShell />
            </div>
        </div>
    );
}
