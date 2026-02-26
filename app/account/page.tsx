import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { UserProfile } from '@/types';

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const userProfile = profile as UserProfile | null;

  // Route based on status
  // 1. If no profile or 'applicant' status -> Redirect to Apply Wizard or Status Tracker
  if (!userProfile || userProfile.status === 'applicant') {
    // Check if they have an active application
    const { data: application } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', session.user.id)
      .single();

    if (application) {
      return (
        <div className="min-h-screen bg-cinema-950 pt-32 text-center text-white">
          <h1 className="text-3xl font-display uppercase mb-4">Application Status</h1>
          <p className="text-xl text-amber-500 uppercase tracking-widest">{application.status}</p>
          <p className="mt-4 text-slate-400">Your application is currently under review.</p>
        </div>
      );
    } else {
      // No application yet -> Go to Wizard
      redirect('/apply');
    }
  }

  // 2. If 'member' -> Show Dashboard
  if (userProfile.status === 'member' || userProfile.status === 'admin') {
    return (
      <div className="min-h-screen bg-cinema-950 pt-32 text-center text-white">
        <h1 className="text-4xl font-display uppercase mb-4 text-gold-500">Welcome, Member</h1>
        <p className="text-lg">Dashboard coming soon...</p>
        {/* <MemberDashboard profile={userProfile} /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-950 pt-32 text-center text-white">
      <p>Loading account...</p>
    </div>
  );
}
