'use client';

import React, { ReactNode } from 'react';
import { CinematicBackground } from './ui/CinematicBackground';
import { useGlobalContext } from '@/context/GlobalContext';
import { Header } from './Header';
import { Chatbot } from './Chatbot';

export const Wrapper = ({ children }: { children?: ReactNode }) => {
  const { isDark, theme, setTheme, lang, setLang } = useGlobalContext();
  
  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-gold-500 selection:text-black overflow-x-hidden text-slate-800 dark:text-slate-200 transition-colors duration-700">
        <CinematicBackground isDark={isDark} />
        
        <Header theme={theme} setTheme={setTheme} isDark={isDark} lang={lang} setLang={setLang} />
        
        {children}

        <div className="relative z-50">
          <Chatbot lang={lang} />
        </div>
    </div>
  );
};