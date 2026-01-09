import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface CTAProps {
  lang: Language;
}

export const CTA: React.FC<CTAProps> = ({ lang }) => {
  const t = translations[lang].cta;

  return (
    <section id="join" className="py-32 relative overflow-visible flex items-center justify-center text-center group">
      <div className="absolute inset-0 z-0 mask-fade-y transition-transform duration-1000 group-hover:scale-105">
        <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 dark:opacity-30"
            alt="Join"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-950/40 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-slate-900 dark:text-white mb-6 drop-shadow-2xl">
            {t.title.first} <br/> 
            <span className="text-gold-500">{t.title.highlight}</span> {t.title.last}
          </h2>
        </FadeIn>
        
        <FadeIn delay={200}>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            {t.desc}
          </p>
        </FadeIn>
        
        <FadeIn delay={400}>
          <button className="px-12 py-5 bg-gold-500 hover:bg-gold-400 text-cinema-950 font-bold uppercase tracking-widest text-lg rounded shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-1 border border-gold-400">
            {t.btn}
          </button>
        </FadeIn>
      </div>
    </section>
  );
};