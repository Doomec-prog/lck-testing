import React from 'react';
import { Instagram, MessageCircle, MapPin, Mail, Send } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface ContactFooterProps {
  lang: Language;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  const inputClasses = "w-full bg-[#151515] text-slate-200 placeholder-slate-500 rounded-xl px-6 py-5 outline-none transition-all border border-white/5 focus:border-gold-500/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.05)] focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]";
  const darkGlassCard = "bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]";
  const goldBtnClasses = "bg-gradient-to-br from-gold-500 to-gold-600 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300";

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
                 <h2 className="text-5xl font-display font-bold uppercase text-white tracking-tight">{t.title}</h2>
              </div>
              <div className={`${darkGlassCard} p-8 md:p-12 rounded-[2.5rem]`}>
                <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">{t.desc}</p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80 mb-3 ml-2 group-focus-within:text-gold-500 transition-colors">{t.form.name}</label>
                      <input type="text" className={inputClasses} placeholder="Иван Иванов" />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80 mb-3 ml-2 group-focus-within:text-gold-500 transition-colors">{t.form.email}</label>
                      <input type="email" className={inputClasses} placeholder="example@mail.com" />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80 mb-3 ml-2 group-focus-within:text-gold-500 transition-colors">{t.form.message}</label>
                    <textarea rows={5} className={`${inputClasses} resize-none`} placeholder="Ваше сообщение..."></textarea>
                  </div>
                  <div className="pt-4">
                    <button className={`${goldBtnClasses} w-full md:w-auto px-12 py-5 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 group`}>
                      <span>{t.form.submit}</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between">
            <FadeIn delay={200}>
               <div className="mb-16 pl-0 lg:pl-10">
                  <h3 className="text-2xl font-display font-bold uppercase text-white mb-8 tracking-wider flex items-center">
                    <span className="w-2 h-2 rounded-full bg-gold-500 mr-3 animate-pulse"></span>
                    {t.contacts.title}
                  </h3>
                  <div className="space-y-8">
                    <a href="#" className="flex items-start space-x-6 group">
                      <div className="p-4 rounded-2xl bg-[#151515] shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)] border border-white/5 group-hover:border-gold-500/30 transition-all">
                        <MapPin size={24} className="text-slate-400 group-hover:text-gold-500 transition-colors" />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Адрес</p>
                        <span className="text-lg text-slate-200 group-hover:text-white transition-colors leading-tight block">{t.contacts.address}</span>
                      </div>
                    </a>
                    <a href="mailto:leaguecinemakz@gmail.com" className="flex items-start space-x-6 group">
                      <div className="p-4 rounded-2xl bg-[#151515] shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)] border border-white/5 group-hover:border-gold-500/30 transition-all">
                        <Mail size={24} className="text-slate-400 group-hover:text-gold-500 transition-colors" />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Email</p>
                        <span className="text-lg text-slate-200 group-hover:text-white transition-colors leading-tight block">leaguecinemakz@gmail.com</span>
                      </div>
                    </a>
                  </div>
                  <div className="flex space-x-4 mt-12">
                     {[Instagram, MessageCircle].map((Icon, i) => (
                       <a key={i} href="#" className="w-14 h-14 rounded-full bg-[#151515] flex items-center justify-center text-slate-400 hover:text-gold-500 transition-all shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] active:scale-95">
                         <Icon size={24} />
                       </a>
                     ))}
                  </div>
               </div>
               <div className="pl-0 lg:pl-10 grid grid-cols-2 gap-4 text-sm font-medium text-slate-500 border-t border-white/5 pt-8">
                  <a href="#about" className="hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.about}</a>
                  <a href="#news" className="hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.news}</a>
                  <a href="#projects" className="hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.projects}</a>
                  <a href="#residents" className="hover:text-gold-500 transition-colors uppercase tracking-wider">{navT.residents}</a>
               </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={300}>
           <div className={`${darkGlassCard} rounded-[2rem] p-4 flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex-1 w-full md:w-auto px-4">
                 <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">{t.join.title}</h4>
                 <p className="text-slate-500 text-xs">{t.join.desc}</p>
              </div>
              <div className="flex w-full md:w-auto bg-[#151515] rounded-xl p-1 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]">
                  <input type="email" placeholder="Email..." className="bg-transparent border-none outline-none text-white px-4 py-2 w-full md:w-64 placeholder-slate-600" />
                  <button className="bg-white/10 hover:bg-gold-500 text-white hover:text-black rounded-lg px-6 py-2 font-bold uppercase text-xs transition-all tracking-wider">OK</button>
              </div>
              <div className="text-slate-600 text-[10px] font-mono uppercase tracking-widest px-4 md:border-l border-white/10 md:text-right">
                 <p>&copy; 2025 LCK.KZ</p>
                 <p>{t.copyright} <span className="text-gold-500">Centurion Films</span></p>
              </div>
           </div>
        </FadeIn>
      </div>
    </footer>
  );
};