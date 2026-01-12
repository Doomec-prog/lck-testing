import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface ProjectsStatsProps {
  lang: Language;
}

export const ProjectsStats: React.FC<ProjectsStatsProps> = ({ lang }) => {
  const t = translations[lang].stats;
  const marqueeText = Array(12).fill(t.marquee).join(' ');

  return (
    <section id="projects" className="py-0 overflow-visible relative z-10">
      {/* 
         Removed opacity (/90 -> /100) to ensure solid background for black text in Noir mode.
         Added 'font-black' to marquee text for maximum legibility.
      */}
      <div className="py-8 bg-gold-500 relative border-y border-white/20 z-20 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        <div className="whitespace-nowrap overflow-hidden flex">
          <div className="animate-marquee flex items-center space-x-16 text-5xl font-display font-black uppercase tracking-wider text-cinema-950">
             <span>{marqueeText}</span>
          </div>
        </div>
      </div>

      <div 
        className="bg-white/50 dark:bg-cinema-950/30 backdrop-blur-lg py-20 relative"
        style={{
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <FadeIn delay={100}>
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-2 drop-shadow-lg">152</span>
                <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">{t.participants}</span>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-2 drop-shadow-lg">10</span>
                <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">{t.projects}</span>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-2 drop-shadow-lg">10+</span>
                <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">{t.experience}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};