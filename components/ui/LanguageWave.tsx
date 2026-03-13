'use client';

import { useGlobalContext } from '@/context/GlobalContext';

export const LanguageWave = () => {
    const { isLangSwitching } = useGlobalContext();

    return (
        <div
            className={`
        fixed inset-0 z-[100] pointer-events-none
        transition-opacity duration-300 ease-in-out
        ${isLangSwitching ? 'opacity-100' : 'opacity-0'}
      `}
        >
            {/* Cinematic wipe — gold shimmer sweeping left-to-right */}
            <div
                className={`
          absolute inset-0
          bg-gradient-to-r from-transparent via-gold-500/[0.07] to-transparent
          ${isLangSwitching ? 'animate-wipe' : ''}
        `}
            />

            {/* Thin gold scan-line for that film projector feel */}
            <div
                className={`
          absolute top-0 bottom-0 w-[2px]
          bg-gradient-to-b from-transparent via-gold-500/40 to-transparent
          shadow-[0_0_20px_4px_rgba(212,175,55,0.15)]
          ${isLangSwitching ? 'animate-scanline' : 'opacity-0'}
        `}
            />

            {/* Subtle vignette pulse */}
            <div
                className={`
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.15)_100%)]
          transition-opacity duration-500
          ${isLangSwitching ? 'opacity-100' : 'opacity-0'}
        `}
            />
        </div>
    );
};
