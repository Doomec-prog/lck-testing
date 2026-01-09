import React from 'react';

interface CinematicMistProps {
  className?: string;
}

export const CinematicMist: React.FC<CinematicMistProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-40 md:h-64 overflow-hidden pointer-events-none -my-20 md:-my-32 z-0 ${className}`}>
      {/* Soft radial glow to bridge sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12)_0%,_transparent_70%)] blur-[50px] opacity-60 dark:opacity-40"></div>
      {/* Horizontal smoke line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent blur-sm"></div>
    </div>
  );
};