import React from 'react';
import { ChevronDown, Clapperboard } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video with AGGRESSIVE Bottom Dissolve */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2069"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-lights-in-a-television-studio-33399-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-cinema-950/40 dark:bg-cinema-950/50 z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center flex flex-col items-center">
        <FadeIn delay={100}>
          <div className="inline-flex items-center space-x-2 border border-gold-500/50 rounded-full px-4 py-1 mb-6 bg-gold-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.3)]">
             <Clapperboard size={16} className="text-gold-500" />
             <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">{t.badge}</span>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="w-full max-w-full">
          {/* 
             Balanced Mobile Typography:
             text-4xl (36px) - Fits "Кинематографистов" on most screens (360px+)
             sm:text-6xl - Significantly larger on tablets
             md:text-8xl - Huge on desktop
          */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase text-white mb-6 leading-[0.9] drop-shadow-2xl tracking-tighter break-words w-full max-w-[95vw] mx-auto">
            {t.title.top} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">{t.title.highlight}</span> <br/>
            {t.title.bottom}
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          {/* Added strong drop-shadow to text to ensure readability on white backgrounds (clapperboard scene) */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-10 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide px-2">
            {t.description}
          </p>
        </FadeIn>

        <FadeIn delay={600} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
          <a href="#join" className="group relative w-full sm:w-auto px-8 py-4 bg-gold-500 text-black font-bold uppercase tracking-wider rounded transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-gold-500/60 overflow-hidden text-center">
            <span className="relative z-10">{t.joinBtn}</span>
            <div className="absolute inset-0 bg-white/30 transform -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
          <a href="#contacts" className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white text-white font-bold uppercase tracking-wider rounded transition-all hover:bg-white/10 backdrop-blur-sm shadow-lg text-center">
            {t.applyBtn}
          </a>
        </FadeIn>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-white/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};