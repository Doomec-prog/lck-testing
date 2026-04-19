'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LckLogo } from './ui/LckLogo';
import { FadeIn } from './ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface ContactFooterProps {
  lang: Language;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  const darkGlassCard = "bg-white/80 dark:bg-[#050505] dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent border border-black/5 dark:border-white/[0.08] backdrop-blur-3xl shadow-2xl dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] ring-1 ring-inset ring-black/5 dark:ring-white/[0.02] relative overflow-hidden";

  return (
    <footer id="contacts" className="relative bg-cinema-950 pt-32 pb-12 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-24 flex flex-col items-center">
          <div className="w-full">
            <FadeIn>
              <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <div className="h-1 w-12 bg-gold-500 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-slate-900 dark:text-white tracking-tight">
                  Вступить в Лигу Кинематографистов
                </h2>
              </div>
              <div className={`${darkGlassCard} p-8 md:p-12 rounded-[2.5rem] group/card`}>
                {/* Subtle top edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 dark:opacity-100 mix-blend-overlay"></div>
                
                <p className="text-slate-600 dark:text-white/80 mb-8 text-lg font-light leading-relaxed max-w-2xl">
                  Присоединяйтесь к закрытой экосистеме профессионалов кино Казахстана. Создайте профиль, находите коллег и участвуйте в развитии индустрии.
                </p>

                {/* Premium Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { emoji: '🎬', text: lang === 'RU' ? 'Профиль кинематографиста' : lang === 'KZ' ? 'Кинематографист профилі' : 'Filmmaker Profile' },
                    { emoji: '🤝', text: lang === 'RU' ? 'Нетворкинг индустрии' : lang === 'KZ' ? 'Индустриялық нетворкинг' : 'Industry Networking' },
                    { emoji: '🏆', text: lang === 'RU' ? 'Закрытые мероприятия' : lang === 'KZ' ? 'Жабық іс-шаралар' : 'Exclusive Events' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/50 dark:bg-black/60 rounded-2xl px-5 py-4 border border-black/5 dark:border-white/5 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <span className="text-2xl drop-shadow-md">{item.emoji}</span>
                      <span className="text-sm text-slate-800 dark:text-white/90 font-medium tracking-wide">{item.text}</span>
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
        </div>
        <FadeIn delay={300}>
          <div className="border-t border-white/10 bg-[#0a0a0a] rounded-none -mx-6 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
              {/* Brand Identity */}
              <div className="flex items-center gap-4">
                <span className="text-white">
                  <LckLogo variant="mark" height={28} />
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