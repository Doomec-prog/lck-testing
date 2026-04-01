'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface ContactFooterProps {
  lang: Language;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  const darkGlassCard = "bg-white/50 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]";

  return (
    <footer id="contacts" className="relative bg-cinema-950 pt-32 pb-12 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center space-x-4 mb-10">
                <div className="h-12 w-1 bg-gold-500 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
                <h2 className="text-5xl font-display font-bold uppercase text-slate-900 dark:text-white tracking-tight">
                  Вступить в Лигу Кинематографистов
                </h2>
              </div>
              <div className={`${darkGlassCard} p-8 md:p-12 rounded-[2.5rem]`}>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg font-light leading-relaxed">
                  Присоединяйтесь к закрытой экосистеме профессионалов кино Казахстана. Создайте профиль, находите коллег и участвуйте в развитии индустрии.
                </p>

                {/* Premium Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { emoji: '🎬', text: lang === 'RU' ? 'Профиль кинематографиста' : lang === 'KZ' ? 'Кинематографист профилі' : 'Filmmaker Profile' },
                    { emoji: '🤝', text: lang === 'RU' ? 'Нетворкинг индустрии' : lang === 'KZ' ? 'Индустриялық нетворкинг' : 'Industry Networking' },
                    { emoji: '🏆', text: lang === 'RU' ? 'Закрытые мероприятия' : lang === 'KZ' ? 'Жабық іс-шаралар' : 'Exclusive Events' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-3 group
                             bg-gradient-to-br from-gold-500 to-gold-600 text-black
                             shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]
                             hover:scale-[1.02] active:scale-[0.98]
                             transition-all duration-300
                             w-full md:w-auto px-12 py-5 rounded-xl
                             font-bold uppercase tracking-widest text-base"
                >
                  <span>ПОДАТЬ ЗАЯВКУ</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between">
            <FadeIn delay={200}>
              <div className="mb-16 pl-0 lg:pl-10">
                <h3 className="text-2xl font-display font-bold uppercase text-slate-900 dark:text-white mb-8 tracking-wider flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gold-500 mr-3 animate-pulse"></span>
                  {t.contacts.title}
                </h3>
                <div className="space-y-4">
                  {/* Minimized contact info as per redesign */}
                  <p className="text-lg text-slate-800 dark:text-slate-200"><span className="text-xs text-slate-500 uppercase tracking-widest font-bold mr-2">Адрес:</span>{t.contacts.address}</p>
                  <p className="text-lg text-slate-800 dark:text-slate-200"><span className="text-xs text-slate-500 uppercase tracking-widest font-bold mr-2">Email:</span>leaguecinemakz@gmail.com</p>
                </div>
              </div>
              <div className="pl-0 lg:pl-10 grid grid-cols-2 gap-4 text-sm font-medium text-slate-600 dark:text-slate-500 border-t border-black/10 dark:border-white/5 pt-8">
                <a href="#about" className="hover:text-gold-600 dark:hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.about}</a>
                <a href="#news" className="hover:text-gold-600 dark:hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.news}</a>
                <a href="#projects" className="hover:text-gold-600 dark:hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.projects}</a>
                <a href="#residents" className="hover:text-gold-600 dark:hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.residents}</a>
              </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={300}>
          <div className="border-t border-white/10 bg-[#0a0a0a] rounded-none -mx-6 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
              {/* Brand Identity */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-display font-bold tracking-tighter uppercase">
                  <span className="text-white">LCK</span>
                  <span className="text-gold-500">.KZ</span>
                </span>
                <div className="hidden md:block w-px h-8 bg-white/10" />
                <span className="hidden md:block text-white/40 text-xs font-medium uppercase tracking-widest">
                  Лига Кинематографистов Казахстана
                </span>
              </div>
              {/* Mobile subtitle */}
              <p className="md:hidden text-white/40 text-xs font-medium uppercase tracking-widest text-center">
                Лига Кинематографистов Казахстана
              </p>
              {/* Copyright & Credits */}
              <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest text-center md:text-right space-y-1">
                <p>&copy; 2026 LCK.KZ</p>
                <p>{t.copyright} <span className="text-gold-500/70">Centurion Films</span></p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};