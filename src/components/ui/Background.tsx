'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { moduleThemes } from '@/lib/slideData';

interface BackgroundProps {
  module?: number;
}

export function Background({ module }: BackgroundProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const activeTheme = module ? moduleThemes[module] : null;
  const glowA = activeTheme?.glowA ?? '#00d4aa';
  const glowB = activeTheme?.glowB ?? '#3b82f6';
  const moduleGradient = activeTheme?.gradient ?? 'linear-gradient(145deg, #0a0a0f 0%, #0b1020 55%, #0d1117 100%)';

  useEffect(() => {
    if (!scopeRef.current) return;

    const shapes = scopeRef.current.querySelectorAll('.morph-shape');
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        x: index % 2 === 0 ? 34 : -28,
        y: index % 2 === 0 ? -24 : 26,
        scale: index % 2 === 0 ? 1.14 : 0.92,
        duration: 8 + index * 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      gsap.killTweensOf(shapes);
    };
  }, []);

  return (
    <div ref={scopeRef} className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 transition-all duration-700" style={{ background: moduleGradient }} />
      <div className="absolute inset-0 noise-bg" />

      <div
        className="morph-shape absolute w-[580px] h-[580px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: `radial-gradient(circle, ${glowA} 0%, transparent 70%)`,
          top: '-12%',
          right: '-8%',
        }}
      />
      <div
        className="morph-shape absolute w-[440px] h-[440px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background: `radial-gradient(circle, ${glowB} 0%, transparent 70%)`,
          bottom: '6%',
          left: '-8%',
        }}
      />
      <div
        className="morph-shape absolute w-[300px] h-[300px] rounded-full opacity-[0.06] blur-3xl"
        style={{
          background: `radial-gradient(circle, ${glowA} 0%, transparent 70%)`,
          bottom: '18%',
          right: '22%',
        }}
      />
    </div>
  );
}
