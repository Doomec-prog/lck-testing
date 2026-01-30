import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '../context/GlobalContext';
import { CustomCursor } from '../components/ui/CustomCursor';
import { NoiseOverlay } from '../components/ui/NoiseOverlay';
import { Wrapper } from '../components/Wrapper';
import { getServerLanguage } from '@/lib/getLanguage';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin', 'cyrillic'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Лига Кинематографистов Казахстана (LCK)',
  description: 'Независимая общественная организация, целью которой является содействие развитию казахстанского кинематографа.',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const initialLang = getServerLanguage();
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  let session = null;

  if (hasSupabaseEnv) {
    try {
      const supabase = createSupabaseServerClient();
      const { data } = await supabase.auth.getSession();
      session = data.session;
    } catch (error) {
      console.error('Supabase auth error in RootLayout:', error);
      // Continue rendering without session
    }
  }

  const htmlLang = initialLang === 'EN' ? 'en' : initialLang === 'KZ' ? 'kk' : 'ru';

  return (
    <html lang={htmlLang} className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="bg-paper-100 text-slate-800 dark:bg-cinema-950 dark:text-slate-200 transition-colors duration-700 overflow-x-hidden">
        <GlobalProvider initialLang={initialLang} initialHasSession={Boolean(session)}>
          {/* UI Overlays */}
          <div className="relative z-[100]">
            <CustomCursor />
            <NoiseOverlay />
          </div>

          {/* Main Layout Wrapper (Client Component) */}
          <Wrapper>
            {children}
          </Wrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
