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
  const moduleGradient = activeTheme?.gradient ?? 'linear-gradient(145deg, #08080d 0%, #0b1020 55%, #0d1117 100%)';

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
      {/* Deep black base */}
      <div className="absolute inset-0 bg-[#08080d]" />

      {/* Module gradient wash */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: moduleGradient }}
      />

      {/* Warm vignette for editorial depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg" />

      {/* Primary accent orb - large, diffuse */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, ${glowA}12 0%, ${glowA}06 35%, transparent 70%)`,
          top: '-15%',
          right: '-10%',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary accent orb */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '520px',
          height: '520px',
          background: `radial-gradient(circle, ${glowB}10 0%, ${glowB}05 35%, transparent 70%)`,
          bottom: '4%',
          left: '-10%',
          filter: 'blur(50px)',
        }}
      />

      {/* Third subtle accent - creates depth layering */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${glowA}0a 0%, transparent 65%)`,
          bottom: '20%',
          right: '20%',
          filter: 'blur(40px)',
        }}
      />

      {/* Warm highlight near center - subtle golden warmth */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(255, 220, 180, 0.015) 0%, transparent 70%)',
          top: '30%',
          left: '20%',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
