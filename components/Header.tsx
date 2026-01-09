'use client';

import { useState, useEffect, Fragment } from 'react';
import { Menu, X, Sun, Moon, LogIn } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem, Language } from '@/types';
import { translations } from '@/lib/translations';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header = ({ toggleTheme, isDark, lang, setLang }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Safe pathname retrieval
  let pathname = '/';
  try {
    pathname = usePathname() || '/';
  } catch (e) {
    // This allows the component to not crash if accidentally rendered outside Next.js context
    console.warn('Header rendered outside Next.js Router Context');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang]?.nav || translations['RU'].nav;

  // Define paths. If starting with #, it is a scroll link. Else route.
  const navItems: NavItem[] = [
    { label: t.about, href: '#about' },
    { label: t.news, href: '/news' },
    { label: t.info, href: '#info' },
    { label: t.gallery, href: '#gallery' },
    { label: t.opinion, href: '#opinion' },
    { label: t.residents, href: '/residents' },
    { label: t.contacts, href: '#contacts' },
  ];

  const renderLink = (item: NavItem) => {
    const isAnchor = item.href.startsWith('#');
    
    // If it's an anchor, in Next.js we just link to /#id from other pages, or #id from home
    if (isAnchor) {
       return (
         <Link href={pathname === '/' ? item.href : `/${item.href}`} className="relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
           {item.label}
         </Link>
       );
    }

    // Standard route
    return (
       <Link href={item.href} className="relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
         {item.label}
       </Link>
    );
  };

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
          <button className="flex items-center space-x-1 text-[10px] 2xl:text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest px-4 py-2 rounded-full hover:bg-amber-500/10 transition-colors whitespace-nowrap shrink-0">
             <LogIn size={12} />
             <span>Войти</span>
          </button>
        </nav>

        <div className="hidden lg:flex items-center space-x-4 shrink-0 pointer-events-auto">
          <div className="flex items-center glass-panel rounded-full p-1.5">
             {(['RU', 'KZ', 'EN'] as const).map((l) => (
               <button key={l} type="button" onClick={() => setLang(l)} className={`cursor-pointer px-4 py-1.5 text-[10px] font-bold rounded-full transition-all duration-300 ${lang === l ? 'bg-gold-500 text-white shadow-[0_2px_10px_rgba(212,175,55,0.4)]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                 {l}
               </button>
             ))}
          </div>
          <button onClick={toggleTheme} type="button" className="cursor-pointer p-3 rounded-full glass-panel hover:text-gold-500 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 active:scale-95">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button className="xl:hidden p-3 text-slate-900 dark:text-white z-50 glass-panel rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-paper-100/95 dark:bg-cinema-950/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 animate-fadeIn p-4 overflow-y-auto pointer-events-auto">
            {navItems.map((item) => (
              <Fragment key={item.label}>
                <div className="text-2xl font-display font-bold uppercase text-slate-800 dark:text-white hover:text-gold-500 transition-all tracking-widest drop-shadow-sm">
                   {renderLink(item)}
                </div>
              </Fragment>
            ))}
            <button className="text-xl font-display font-bold uppercase text-amber-500 hover:text-amber-400 transition-colors flex items-center mt-4">
                <LogIn size={20} className="mr-2" /> Войти
            </button>
            <div className="flex items-center space-x-6 mt-12">
               <button onClick={toggleTheme} className="p-4 rounded-full glass-panel cursor-pointer shadow-lg active:scale-95 transition-transform">
                 {isDark ? <Sun size={24} /> : <Moon size={24} />}
               </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};