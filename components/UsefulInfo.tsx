import React from 'react';
import { FileText, PieChart, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface UsefulInfoProps {
  lang: Language;
}

export const UsefulInfo: React.FC<UsefulInfoProps> = ({ lang }) => {
  const t = translations[lang].usefulInfo;

  return (
    <section id="info" className="py-32 relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-slate-900 dark:text-white mb-16 text-center">
            {t.title.first} <span className="text-gold-500">{t.title.highlight}</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <FadeIn delay={100}>
            <SpotlightCard className="rounded-[2.5rem] glass-panel cursor-pointer group">
              <div className="p-12 relative h-full">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">
                  <ArrowUpRight size={32} className="text-gold-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors text-gold-500">
                   <FileText size={32} />
                </div>
                <h3 className="text-3xl font-bold uppercase text-slate-900 dark:text-white mb-4">
                  {t.contracts.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  {t.contracts.desc}
                </p>
              </div>
            </SpotlightCard>
          </FadeIn>

          <FadeIn delay={200}>
            <SpotlightCard className="rounded-[2.5rem] glass-panel cursor-pointer group">
              <div className="p-12 relative h-full">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">
                   <ArrowUpRight size={32} className="text-gold-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors text-gold-500">
                  <PieChart size={32} />
                </div>
                <h3 className="text-3xl font-bold uppercase text-slate-900 dark:text-white mb-4">
                  {t.analytics.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  {t.analytics.desc}
                </p>
              </div>
            </SpotlightCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};