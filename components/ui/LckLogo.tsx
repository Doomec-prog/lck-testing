'use client';

import React from 'react';
import Image from 'next/image';
import { useGlobalContext } from '@/context/GlobalContext';

interface LckLogoProps {
  variant?: 'mark' | 'full'; // Kept for API compatibility, though we just use the images provided
  className?: string;
  height?: number;
}

/**
 * LckLogo replaces the SVG with user-provided images.
 * Uses mix-blend-mode to make the JPEG backgrounds transparent.
 */
export const LckLogo: React.FC<LckLogoProps> = ({
  className = '',
  height = 40,
}) => {
  const { isDark } = useGlobalContext();

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ height, width: height * 1.5 }} // approximate aspect ratio
    >
      {/* Dark Theme Logo (White on Black) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <Image 
          src="/logo-1.jpg" 
          alt="LCK Logo Dark" 
          fill
          className="object-contain mix-blend-screen brightness-110" 
          priority
        />
      </div>

      {/* Light Theme Logo (Black on White) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${!isDark ? 'opacity-100' : 'opacity-0'}`}>
        <Image 
          src="/logo-2.jpg" 
          alt="LCK Logo Light" 
          fill
          className="object-contain mix-blend-multiply" 
          priority
        />
      </div>
    </div>
  );
};
