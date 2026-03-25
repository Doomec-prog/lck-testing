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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_auto)]">
          {/* Member Welcome Hero & Status (Spans 2 columns) */}
          <div className="md:col-span-2 space-y-6 flex flex-col">
            {isMember ? (
              <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-cinema-900 to-[#0A0A0A] p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex-grow flex flex-col justify-center">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.2em] text-gold-400 font-bold mb-2">Аккредитованный</h2>
                    <h1 className="text-3xl lg:text-5xl text-white font-display uppercase tracking-wider mb-2">
                       Член Лиги <br/><span className="text-gold-500">Кинематографистов</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-md text-sm leading-relaxed">
                      Добро пожаловать в закрытый портал LCK. Здесь вам доступны эксклюзивные ресурсы, закрытые мероприятия и инструменты для развития вашей карьеры в индустрии.
                    </p>
                  </div>

                  {/* Digital ID Badge Preview */}
                  <div className="flex-shrink-0 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[140px]">
                    <div className="w-16 h-16 bg-white p-1 rounded-xl mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                       {/* Mocked QR Code */}
                       <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHg9IjMiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iNSIgeD0iMTYiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iNSIgeD0iMyIgeT0iMTYiIHJ4PSIxIi8+PHBhdGggZD0iTTIxIDE2aC0zYTIgMiAwIDAgMC0yIDJ2M20wLTEwaDJtLTE1IDJoMm01IDJoMm0tMiA0aDJtMyAwaDJtLTIgMmgyIi8+PC9zdmc+')] bg-cover bg-center text-black" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">Ваш ID</span>
                    <span className="text-white font-mono text-sm">{profile?.membership_id || 'LCK-0000'}</span>
                  </div>
                </div>
              </div>
            ) : (
              application && <StatusCard status={appStatus} submittedAt={application.created_at} />
            )}
            
            {/* Quick Info / Docs / Links Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Docs Status */}
              <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">📄</span>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-400">Документы</h3>
                  </div>
                  {application?.documents_urls ? (
                    <div className="space-y-3">
                      {Object.keys(application.documents_urls as Record<string, string>).slice(0, 3).map((key: string) => (
                        <div key={key} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          <span className="text-slate-300 capitalize truncate">{key.replace(/_/g, ' ')}</span>
                        </div>
                      ))}
                      {Object.keys(application.documents_urls as Record<string, string>).length > 3 && (
                        <p className="text-xs text-gold-400 mt-2">+ еще {Object.keys(application.documents_urls as Record<string, string>).length - 3} док.</p>
                      )}
                      {Object.keys(application.documents_urls as Record<string, string>).length === 0 && (
                        <p className="text-slate-500 text-sm">Не загружены</p>
                      )}
                    </div>
                  ) : (
                     <p className="text-slate-500 text-sm">Не загружены</p>
                  )}
                </div>
              </div>

              {/* Filmography Links */}
              <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">🔗</span>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-400">Фильмография</h3>
                  </div>
                  {application?.filmography_links && (application.filmography_links as string[]).filter((l: string) => l).length > 0 ? (
                    <div className="space-y-3">
                      {(application.filmography_links as string[]).filter((l: string) => l).slice(0, 3).map((link: string, i: number) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors duration-300 group/link"
                        >
                           <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-400 transition-colors" />
                           <span className="truncate">{link.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                     <p className="text-slate-500 text-sm">Материалы не указаны</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details (Spans 1 column, full height) */}
          <div className="md:col-span-1 h-full flex">
            <div className="w-full">
               <ProfileCard
                 fullName={application?.full_name || profile?.full_name}
                 city={application?.city || profile?.city}
                 email={application?.email || user.email || undefined}
                 phone={application?.phone}
                 profession={application?.profession}
                 education={application?.education}
               />
            </div>
          </div>
        </div>

        {/* Feature Cards Full Width */}
        <div className="pt-8 w-full border-t border-white/5">
           <FeatureCards />
        </div>

      </div>
    </div>
  );
}
