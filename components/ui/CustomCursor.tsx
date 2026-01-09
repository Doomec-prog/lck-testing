'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'pointer'>('default');
  
  // Smooth tracking using refs for animation loop
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  
  // Target positions for smooth lerp animation
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Detect element type to change cursor style
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setCursorType('pointer');
      } else if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN') {
        setIsHovering(true);
        setCursorType('text');
      } else {
        setIsHovering(false);
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Animation Loop for smooth "Lag" effect on outer ring
    const animate = () => {
      // Linear interpolation (LERP) for smooth delay
      // 0.15 = speed (lower is slower/heavier)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15;

      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main Dot (Immediate Follow) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      >
        {/* Center Crosshair/Dot */}
        <div className={`relative flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2`}>
           <div className={`bg-gold-500 rounded-full transition-all duration-300 ${isHovering ? 'w-1 h-1 opacity-0' : 'w-1.5 h-1.5'}`}></div>
           
           {/* Crosshair Lines (Visible when NOT hovering) */}
           <div className={`absolute w-4 h-[1px] bg-white transition-all duration-300 ${isHovering ? 'scale-0 opacity-0' : 'scale-100 opacity-50'}`}></div>
           <div className={`absolute h-4 w-[1px] bg-white transition-all duration-300 ${isHovering ? 'scale-0 opacity-0' : 'scale-100 opacity-50'}`}></div>
        </div>
      </div>
      
      {/* Outer Ring / Frame (Smooth Lag) */}
      <div 
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      >
        <div className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out flex items-center justify-center`}>
           
           {/* Default State: Circle */}
           <div className={`absolute border border-gold-500 rounded-full transition-all duration-500 
             ${isHovering ? 'w-12 h-12 opacity-0 scale-150' : 'w-8 h-8 opacity-30 scale-100'}
             ${isClicking ? 'scale-75' : ''}
           `}></div>

           {/* Hover State: Focus Brackets [ ] */}
           <div className={`absolute w-14 h-14 transition-all duration-300 ${isHovering ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}`}>
              {/* Top Left */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-500"></div>
              {/* Top Right */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-500"></div>
              {/* Bottom Left */}
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-500"></div>
              {/* Bottom Right */}
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-500"></div>
              
              {/* REC Text (Optional cool detail) */}
              {cursorType === 'pointer' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gold-500 tracking-widest whitespace-nowrap">
                   REC ●
                </div>
              )}
           </div>

        </div>
      </div>
    </>
  );
};