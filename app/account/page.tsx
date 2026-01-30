import React from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { getServerLanguage } from '@/lib/getLanguage';

export default async function AccountPage() {
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseEnv) {
    return (
      <div className="relative z-10 pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4">
              Supabase
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Supabase environment variables are not configured.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const lang = getServerLanguage();
  const copy = {
    EN: {
      title: 'Account',
      subtitle: 'You are signed in. The personal cabinet is under construction.',
    },
    KZ: {
      title: 'Кабинет',
      subtitle: 'Сіз жүйеге кірдіңіз. Жеке кабинет жақын арада іске қосылады.',
    },
    RU: {
      title: 'Кабинет',
      subtitle: 'Вы вошли в систему. Личный кабинет в разработке.',
    },
  };
  const { title, subtitle } = copy[lang];

  return (
    <div className="relative z-10 pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-10 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
