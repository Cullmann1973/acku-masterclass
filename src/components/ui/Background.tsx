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
  const glowB = activeTheme?.glowB ?? '#6366f1';
  const moduleGradient = activeTheme?.gradient ?? 'linear-gradient(145deg, #050507 0%, #08081a 55%, #050507 100%)';

  useEffect(() => {
    if (!scopeRef.current) return;

    const shapes = scopeRef.current.querySelectorAll('.morph-shape');
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        x: index % 2 === 0 ? 28 : -22,
        y: index % 2 === 0 ? -18 : 20,
        scale: index % 2 === 0 ? 1.1 : 0.94,
        duration: 10 + index * 2,
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
      {/* Pure black base */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Module gradient wash - very subtle */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: moduleGradient, opacity: 0.8 }}
      />

      {/* Deep vignette - creates focus toward center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg" />

      {/* Primary accent orb - very diffuse, barely visible */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${glowA}0a 0%, ${glowA}04 30%, transparent 65%)`,
          top: '-20%',
          right: '-15%',
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary accent orb */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${glowB}08 0%, ${glowB}03 30%, transparent 65%)`,
          bottom: '0%',
          left: '-15%',
          filter: 'blur(70px)',
        }}
      />

      {/* Third subtle accent - faint depth layer */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${glowA}06 0%, transparent 60%)`,
          bottom: '25%',
          right: '25%',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
