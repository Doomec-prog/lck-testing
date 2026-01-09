'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types';

interface GlobalContextType {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children?: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('RU');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <GlobalContext.Provider value={{ isDark, toggleTheme, lang, setLang }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};