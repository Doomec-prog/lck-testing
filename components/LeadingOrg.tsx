import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface LeadingOrgProps {
  lang: Language;
}

export const LeadingOrg: React.FC<LeadingOrgProps> = ({ lang }) => {
  const t = translations[lang].leadingOrg;

  return (
    <section className="py-32 relative overflow-visible">
      {/* Background Image Layer with Vertical Fade Mask (Dissolve) */}
      <div className="absolute inset-0 z-0 mask-fade-y">
        <img 
          src="https://images.unsplash.com/photo-1517604931442-71053e3e2e3c?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinema Background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-5xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 text-slate-900 dark:text-white drop-shadow-lg">
            {t.title.first} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-orange-500">{t.title.highlight}</span>
          </h2>
          <div className="glass-card p-6 rounded-2xl inline-block backdrop-blur-md border-white/20 shadow-2xl">
            <p className="text-xl text-slate-700 dark:text-slate-200 font-light">
              {t.mainDesc}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.cards.map((card, idx) => (
            <FadeIn key={idx} delay={(idx + 1) * 100}>
              <SpotlightCard className="h-full rounded-3xl glass-panel border-t-4 border-t-gold-500 shadow-lg">
                <div className="p-10">
                  <h3 className="text-2xl font-bold uppercase mb-6 text-gold-600 dark:text-gold-400">{card.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};