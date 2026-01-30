'use client';

import { useState, useEffect, Fragment, useRef } from 'react';
import { Menu, X, Sun, Moon, LogIn, Monitor, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem, Language, Theme } from '@/types';
import { translations } from '@/lib/translations';
import { useGlobalContext } from '@/context/GlobalContext';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header = ({ theme, setTheme, isDark, lang, setLang }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  
  // Use global state for mobile menu
  const { isMobileMenuOpen, setIsMobileMenuOpen, hasSession } = useGlobalContext();
  
  const themeMenuRef = useRef<HTMLDivElement>(null);
  
  let pathname = '/';
  try { pathname = usePathname() || '/'; } catch (e) { console.warn('Header rendered outside Next.js Context'); }

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = translations[lang]?.nav || translations['RU'].nav;

  const navItems: NavItem[] = [
    { label: t.about, href: '#about' },
    { label: t.news, href: '/news' },
    { label: t.info, href: '#info' },
    { label: t.gallery, href: '#gallery' },
    { label: t.opinion, href: '#opinion' },
    { label: t.residents, href: '/residents' },
    { label: t.contacts, href: '#contacts' },
  ];

  const authLabel = hasSession ? t.cabinet : t.login;
  const authHref = hasSession ? '/account' : '/login';

  const renderLink = (item: NavItem) => {
    const isAnchor = item.href.startsWith('#');
    if (isAnchor) {
       return (
         <Link href={pathname === '/' ? item.href : `/${item.href}`} className="relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
           {item.label}
         </Link>
       );
    }
    return (
       <Link href={item.href} className="relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
         {item.label}
       </Link>
    );
  };

  const themes: { id: Theme; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: 'dark', label: 'Gold (Cinema)', shortLabel: 'Gold', icon: <Moon size={18} /> },
    { id: 'light', label: 'Light (Paper)', shortLabel: 'Light', icon: <Sun size={18} /> },
    { id: 'noir', label: 'Noir (B&W)', shortLabel: 'Noir', icon: <Monitor size={18} /> },
  ];

  const currentThemeIcon = themes.find(t => t.id === theme)?.icon || <Moon size={14} />;

  return (
    <header className={`fixed top-4 left-0 w-full z-50 transition-all duration-500 flex justify-center pointer-events-none`}>
      <div className={`container mx-auto px-4 lg:px-6 flex justify-between items-center transition-all duration-500 pointer-events-auto ${isScrolled ? 'max-w-7xl' : 'max-w-full'}`}>
        
        <div className={`glass-panel px-6 py-3 rounded-full flex items-center space-x-2 z-50 shrink-0 transition-all duration-500 ${isScrolled ? 'bg-opacity-90' : 'bg-opacity-40'}`}>
          <Link href="/" className="text-2xl font-display font-bold tracking-tighter uppercase group flex items-center">
            <span className="text-slate-900 dark:text-white group-hover:text-gold-500 transition-colors drop-shadow-sm">LCK</span>
            <span className="text-gold-500 group-hover:text-white transition-colors drop-shadow-sm">.KZ</span>
          </Link>
        </div>

        <nav className={`hidden xl:flex items-center space-x-0.5 p-2 rounded-full glass-panel transition-all duration-500 ${isScrolled ? 'shadow-2xl translate-y-0' : 'translate-y-2'}`}>
          {navItems.map((item) => (
            <div key={item.href} className="relative px-3 lg:px-4 py-2 rounded-full text-[11px] 2xl:text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition-all uppercase tracking-widest group overflow-hidden whitespace-nowrap shrink-0">
              {renderLink(item)}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
          <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2 shadow-[1px_0_0_white] shrink-0"></div>
          <Link
            href={authHref}
            className="flex items-center space-x-1 text-[10px] 2xl:text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest px-4 py-2 rounded-full hover:bg-amber-500/10 transition-colors whitespace-nowrap shrink-0"
          >
             <LogIn size={12} />
             <span>{authLabel}</span>
          </Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4 shrink-0 pointer-events-auto">
          <div className="flex items-center glass-panel rounded-full p-1.5">
             {(['RU', 'KZ', 'EN'] as const).map((l) => (
               <button 
                  key={l} 
                  type="button" 
                  onClick={() => setLang(l)} 
                  className={`cursor-pointer px-4 py-1.5 text-[10px] font-bold rounded-full transition-all duration-300 
                    ${lang === l 
                      ? 'bg-gold-500 text-white dark:text-black shadow-[0_2px_10px_rgba(212,175,55,0.4)]' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}
                  `}
               >
                 {l}
               </button>
             ))}
          </div>
          
          {/* THEME SELECTOR DROPDOWN (DESKTOP) */}
          <div className="relative" ref={themeMenuRef}>
            <button 
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} 
              type="button" 
              className="cursor-pointer px-4 py-3 rounded-full glass-panel hover:text-gold-500 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              {currentThemeIcon}
              <ChevronDown size={12} className={`transition-transform duration-300 ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-2xl overflow-hidden shadow-2xl animate-fadeIn flex flex-col p-1 z-50">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setIsThemeMenuOpen(false); }}
                    className={`flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors rounded-xl text-left
                      ${theme === t.id ? 'bg-gold-500 text-black' : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}
                    `}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="xl:hidden p-3 text-slate-900 dark:text-white z-50 glass-panel rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-paper-100 dark:bg-black z-40 flex flex-col items-center justify-center space-y-8 animate-fadeIn p-4 overflow-y-auto pointer-events-auto">
            <div className="w-full flex justify-center mb-8">
               <div className="glass-panel px-6 py-2 rounded-full flex items-center space-x-2">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold tracking-tighter uppercase flex items-center">
                  <span className="text-slate-900 dark:text-white">LCK</span>
                  <span className="text-gold-500">.KZ</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6 w-full">
              {navItems.map((item) => (
                <Fragment key={item.label}>
                  <div className="text-2xl font-display font-bold uppercase text-slate-800 dark:text-white hover:text-gold-500 transition-all tracking-widest drop-shadow-sm">
                    {renderLink(item)}
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="w-full max-w-xs h-px bg-slate-300 dark:bg-white/10 my-6"></div>

            <Link href={authHref} className="text-xl font-display font-bold uppercase text-amber-500 hover:text-amber-400 transition-colors flex items-center">
                <LogIn size={20} className="mr-2" /> {authLabel}
            </Link>
            
            {/* MOBILE THEME SWITCHER (GRID LAYOUT) */}
            <div className="w-full max-w-sm px-6 mt-8">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-4">Выберите тему</p>
               <div className="grid grid-cols-3 gap-3">
                 {themes.map(t => (
                   <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300
                      ${theme === t.id 
                        ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/20'}
                    `}
                   >
                     <div className="mb-2">{t.icon}</div>
                     <span className="text-[10px] font-bold uppercase tracking-wider">{t.shortLabel}</span>
                   </button>
                 ))}
               </div>
            </div>

            <div className="flex items-center space-x-4 mt-8">
               {(['RU', 'KZ', 'EN'] as const).map((l) => (
                 <button 
                  key={l} 
                  type="button" 
                  onClick={() => setLang(l)} 
                  className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 
                    ${lang === l 
                      ? 'bg-gold-500 text-white dark:text-black shadow-[0_2px_10px_rgba(212,175,55,0.4)]' 
                      : 'text-slate-500 dark:text-slate-400 border border-transparent hover:border-white/10'}
                  `}
                 >
                   {l}
                 </button>
               ))}
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
