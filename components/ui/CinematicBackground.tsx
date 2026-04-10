'use client';

import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  isDark: boolean;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    
    // 1. Reduced Particle Count
    const particleCount = isDark ? 35 : 20; 
    const color = '212, 175, 55'; // Gold
    const baseSpeed = isDark ? 0.2 : 0.15;

    // 2. Sprite Optimization (Prerender glow once)
    const createParticleSprite = () => {
      const sprite = document.createElement('canvas');
      const radius = 16;
      sprite.width = radius * 2;
      sprite.height = radius * 2;
      const sCtx = sprite.getContext('2d');
      if (sCtx) {
        const gradient = sCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
        gradient.addColorStop(0, `rgba(${color}, 1)`);
        gradient.addColorStop(0.3, `rgba(${color}, 0.8)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        sCtx.fillStyle = gradient;
        sCtx.beginPath();
        sCtx.arc(radius, radius, radius, 0, Math.PI * 2);
        sCtx.fill();
      }
      return sprite;
    };
    
    const spriteNode = createParticleSprite();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // 3. Tab Visibility Optimization
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    class Particle {
      x: number;
      y: number;
      size: number; // Visual scale factor
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        // Decrease base size for a subtle look
        this.size = Math.random() * 1.5 + 0.5; 
        this.speedX = (Math.random() - 0.5) * baseSpeed; 
        this.speedY = (Math.random() - 0.5) * baseSpeed - 0.15; 
        this.opacity = Math.random() * 0.6 + 0.2; 
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeSpeed;
        if (this.opacity > 0.9 || this.opacity < 0.1) this.fadeSpeed = -this.fadeSpeed;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        // Using sprite image which is inherently anti-aliased and glowy (no frame-by-frame shadowBlur)
        const renderSize = this.size * 6; // Mult by 6 to map from visual scale to sprite radius
        ctx.drawImage(spriteNode, this.x - renderSize/2, this.y - renderSize/2, renderSize, renderSize);
        ctx.globalAlpha = 1.0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!isVisible) return; // Stop animation loop completely if not visible
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 transition-colors duration-1000
        ${isDark 
          ? 'bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#050505_80%)]' 
          : 'bg-[#F0F0EE]' 
        }
      `}></div>
      {isDark && (
        <div className="absolute inset-0 opacity-40 bg-[conic-gradient(from_0deg_at_50%_-20%,_transparent_45%,_rgba(212,175,55,0.15)_50%,_transparent_55%)] blur-[100px]"></div>
      )}
      {/* 4. Canvas element will render particles purely */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000
        ${isDark 
          ? 'bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_120%)] opacity-60' 
          : 'bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)] opacity-100'
        }
      `}></div>
    </div>
  );
};