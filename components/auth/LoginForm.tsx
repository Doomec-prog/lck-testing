'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { Language } from '@/types';

const copy: Record<Language, { title: string; subtitle: string; email: string; submit: string; success: string; error: string }> = {
  RU: {
    title: 'Вход в кабинет',
    subtitle: 'Введите email, чтобы получить ссылку для входа.',
    email: 'Ваш email',
    submit: 'Отправить ссылку',
    success: 'Проверьте почту — мы отправили ссылку для входа.',
    error: 'Не удалось отправить ссылку. Попробуйте позже.',
  },
  KZ: {
    title: 'Кабинетке кіру',
    subtitle: 'Кіру сілтемесін алу үшін email енгізіңіз.',
    email: 'Email',
    submit: 'Сілтемені жіберу',
    success: 'Поштаңызды тексеріңіз — кіру сілтемесі жіберілді.',
    error: 'Сілтеме жіберілмеді. Кейінірек қайталап көріңіз.',
  },
  EN: {
    title: 'Sign in',
    subtitle: 'Enter your email to receive a sign-in link.',
    email: 'Email address',
    submit: 'Send link',
    success: 'Check your email — we sent a sign-in link.',
    error: 'Unable to send the link. Please try again later.',
  },
};

interface LoginFormProps {
  lang: Language;
}

export const LoginForm = ({ lang }: LoginFormProps) => {
  const router = useRouter();
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const supabase = hasSupabaseEnv ? createSupabaseBrowserClient() : null;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const t = copy[lang];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    if (!supabase) {
      setStatus('error');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
    router.refresh();
  };

  return (
    <div className="max-w-xl mx-auto glass-panel rounded-3xl p-10">
      <h1 className="text-3xl md:text-4xl font-display font-bold uppercase text-slate-900 dark:text-white mb-3">
        {t.title}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-slate-500">{t.email}</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-gold-500"
            placeholder="email@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !hasSupabaseEnv}
          className="w-full rounded-xl bg-gold-500 text-black font-bold uppercase tracking-widest py-3 transition hover:bg-gold-400 disabled:opacity-70"
        >
          {t.submit}
        </button>
      </form>

      {!hasSupabaseEnv && (
        <p className="mt-6 text-sm text-amber-500">
          Supabase environment variables are not configured.
        </p>
      )}
      {status === 'success' && (
        <p className="mt-6 text-sm text-emerald-500">{t.success}</p>
      )}
      {status === 'error' && (
        <p className="mt-6 text-sm text-red-500">{t.error}</p>
      )}
    </div>
  );
};
