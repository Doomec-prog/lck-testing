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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const particleCount = isDark ? 100 : 60; 
    // Always Gold
    const color = '212, 175, 55'; 
    const baseSpeed = isDark ? 0.2 : 0.15;

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

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      maxWidth: number;
      maxHeight: number;

      constructor() {
        this.maxWidth = window.innerWidth;
        this.maxHeight = window.innerHeight;
        this.x = Math.random() * this.maxWidth;
        this.y = Math.random() * this.maxHeight;
        this.size = Math.random() * 2 + 1.5; 
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        
        if (isDark) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${color}, 0.5)`;
        } else {
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${color}, 0.3)`;
        }
        ctx.fill();
      }
    }

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
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