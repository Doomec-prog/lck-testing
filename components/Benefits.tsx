import React from 'react';
import { Users, Briefcase, Award, BookOpen, ArrowRight } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface BenefitsProps {
  lang: Language;
}

export const Benefits: React.FC<BenefitsProps> = ({ lang }) => {
  const t = translations[lang].benefits;
  
  const icons = [
    <Users key="users" className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500" />,
    <Briefcase key="briefcase" className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500" />,
    <Award key="award" className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500" />,
    <BookOpen key="book" className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500" />
  ];

  const features = t.cards.map((card, index) => ({
    ...card,
    icon: icons[index]
  }));

  return (
    <section id="benefits" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-16 border border-white/10 bg-white/10 dark:bg-cinema-950/30 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase text-slate-900 dark:text-white mb-6 leading-tight">
                  {t.title.top} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.title.highlight}</span> <br />
                  {t.title.bottom}
                </h2>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
                  {t.description}
                </p>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 mb-10 border-l-2 border-gold-500/50 pl-6 text-sm sm:text-base">
                  {t.list.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </div>
                <a href="#join" className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-wider rounded-full hover:bg-gold-500 dark:hover:bg-gold-500 hover:text-white dark:hover:text-white transition-all shadow-lg hover:shadow-gold-500/30 text-sm sm:text-base">
                  {t.cta} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {features.map((feat, idx) => (
                <FadeIn key={idx} delay={idx * 100 + 300}>
                  <SpotlightCard className="h-full rounded-2xl sm:rounded-3xl glass-card hover:scale-105 transition-transform duration-500">
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center text-center h-full justify-center">
                      <div className="mb-3 sm:mb-6 bg-gradient-to-br from-gold-500/20 to-gold-500/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gold-500/20">
                        {feat.icon}
                      </div>
                      <h4 className="text-xs sm:text-lg font-bold uppercase text-slate-900 dark:text-white mb-1 sm:mb-2 leading-tight">{feat.title}</h4>
                      <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-tight sm:leading-normal">{feat.desc}</p>
                    </div>
                  </SpotlightCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};