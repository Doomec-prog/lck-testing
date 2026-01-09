import React from 'react';
import { 
  Target, 
  Compass, 
  Footprints, 
  Activity, 
  GraduationCap, 
  Handshake, 
  Shield, 
  Coins, 
  Settings,
  LucideIcon
} from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface ActivitiesProps {
  lang: Language;
}

export const Activities: React.FC<ActivitiesProps> = ({ lang }) => {
  const t = translations[lang].activities;

  const icons: LucideIcon[] = [
    Target,        // Основные Задачи
    Compass,       // Стратегия
    Footprints,    // Важные Шаги
    Activity,      // Наши Функции
    GraduationCap, // Образование
    Handshake,     // Содействие
    Shield,        // Защита
    Coins,         // Финансирование
    Settings       // Система
  ];

  return (
    <section id="activities" className="py-32 relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="mb-20 text-center">
            <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">{t.badge}</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase text-slate-900 dark:text-white drop-shadow-sm">
              {t.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((act, idx) => {
            const Icon = icons[idx] || Activity;

            return (
              <FadeIn key={idx} delay={idx * 50}>
                <SpotlightCard className="group rounded-3xl glass-card border border-white/10 hover:border-gold-500/50 h-full overflow-hidden relative transition-all duration-300 hover:-translate-y-1">
                  {/* Large Background Number */}
                  <div className="absolute -right-4 -bottom-10 text-[8rem] font-display font-bold text-slate-900/5 dark:text-white/5 pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:text-gold-500/10">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>

                  <div className="p-8 h-full flex flex-col relative z-10">
                    <div className="flex items-start justify-between mb-6">
                       <div className="p-3 rounded-2xl backdrop-blur-md border border-white/10 transition-colors duration-300 bg-white/5 text-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                         <Icon size={28} strokeWidth={1.5} />
                       </div>
                       
                       {/* Decorative dot */}
                       <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-gold-500 transition-colors"></div>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors">
                      {act.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      {act.description}
                    </p>
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};