import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { StatusCard, ProfileCard, FeatureCards } from '@/components/cabinet/Dashboard';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch application
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // If no application exists, OR if the application status is 'draft', redirect('/apply')
  if (!application || application.status === 'draft') {
    redirect('/apply');
  }

  // Determine display name
  const displayName = application?.full_name || profile?.full_name || user.email?.split('@')[0] || 'Пользователь';
  const appStatus = application?.status || 'draft';
  const isMember = profile?.status === 'member' || profile?.status === 'admin';

  return (
    <div className="min-h-screen bg-cinema-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display uppercase text-white">
              {isMember ? (
                <>Добро пожаловать, <span className="text-gold-500">{displayName.split(' ')[0]}</span></>
              ) : (
                'Личный кабинет'
              )}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {user.email}
            </p>
          </div>

          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20
                          flex items-center justify-center text-gold-400 text-xl font-bold
                          flex-shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Status Card (for applicants) */}
        {!isMember && application && (
          <StatusCard
            status={appStatus}
            submittedAt={application.created_at}
          />
        )}

        {/* Member Welcome Banner (for members) */}
        {isMember && (
          <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-r from-gold-500/10 via-gold-500/5 to-transparent p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎬</div>
              <div>
                <h2 className="text-white font-semibold">Член Лиги Кинематографистов</h2>
                <p className="text-gold-400 text-sm">
                  {profile?.membership_id ? `ID: ${profile.membership_id}` : 'Добро пожаловать в клуб!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Profile — Left (3 cols) */}
          <div className="lg:col-span-3">
            <ProfileCard
              fullName={application?.full_name || profile?.full_name}
              city={application?.city || profile?.city}
              email={application?.email || user.email || undefined}
              phone={application?.phone}
              profession={application?.profession}
              education={application?.education}
            />
          </div>

          {/* Quick Info — Right (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Docs Status */}
            {application?.documents_urls && (
              <div className="glass-panel rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Документы</h3>
                <div className="space-y-2">
                  {Object.keys(application.documents_urls as Record<string, string>).map((key: string) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-300 capitalize">{key.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                  {Object.keys(application.documents_urls as Record<string, string>).length === 0 && (
                    <p className="text-slate-600 text-sm">Не загружены</p>
                  )}
                </div>
              </div>
            )}

            {/* Filmography Links */}
            {application?.filmography_links && (application.filmography_links as string[]).filter((l: string) => l).length > 0 && (
              <div className="glass-panel rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Фильмография</h3>
                <div className="space-y-2">
                  {(application.filmography_links as string[]).filter((l: string) => l).map((link: string, i: number) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gold-400 text-sm hover:text-gold-300 truncate
                                 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <FeatureCards />

      </div>
    </div>
  );
}
