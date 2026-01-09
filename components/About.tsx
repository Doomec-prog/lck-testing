import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row mb-16 items-start md:items-end justify-between border-b border-slate-200/30 dark:border-white/10 pb-8">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase text-slate-900 dark:text-white drop-shadow-sm">
              {t.title.first} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.title.highlight}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={200} className="mt-6 md:mt-0 max-w-md">
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {t.description}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.cards.map((card, idx) => (
            <FadeIn key={idx} delay={idx * 200 + 100}>
              <SpotlightCard className="h-full rounded-3xl glass-card group border-t-4 border-t-transparent hover:border-t-gold-500 transition-all duration-500">
                <div className="p-8 h-full">
                  <h3 className="text-3xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors">
                    {card.title}
                  </h3>
                  {card.quote && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 italic font-serif border-l-2 border-gold-500 pl-3">
                      {card.quote}
                    </p>
                  )}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {/* Render HTML for LCK highlight if needed, or just text */}
                    {card.title.includes('LCK') ? (
                      <>
                        {card.text.split('LCK (League of Cinematographers of Kazakhstan)').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <strong className="text-gold-500">LCK (League of Cinematographers of Kazakhstan)</strong>}
                          </React.Fragment>
                        ))}
                      </>
                    ) : card.text}
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