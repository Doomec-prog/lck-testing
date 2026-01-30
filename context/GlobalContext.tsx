'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Language, Theme } from '@/types';

interface GlobalContextType {
  isDark: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  hasSession: boolean;
  setHasSession: (hasSession: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({
  children,
  initialLang = 'RU',
  initialHasSession = false,
}: {
  children?: ReactNode;
  initialLang?: Language;
  initialHasSession?: boolean;
}) => {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>(initialLang);
  const [hasSession, setHasSession] = useState<boolean>(initialHasSession);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Computed property: "isDark" is true if theme is 'dark' OR 'noir'
  const isDark = theme === 'dark' || theme === 'noir';

  useEffect(() => {
    // Reset classes
    document.documentElement.classList.remove('dark', 'noir');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'noir') {
      document.documentElement.classList.add('dark', 'noir'); // Noir inherits dark structure but overrides colors
    } else {
      // Light mode: no class
    }
  }, [theme]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const updateLang = useCallback(
    (nextLang: Language) => {
      setLang(nextLang);
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, [lang]);

  useEffect(() => {
    setHasSession(initialHasSession);
  }, [initialHasSession]);

  return (
    <GlobalContext.Provider value={{ 
      isDark, 
      theme, 
      setTheme, 
      lang, 
      setLang: updateLang,
      hasSession,
      setHasSession,
      isMobileMenuOpen,
      setIsMobileMenuOpen
    }}>
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
