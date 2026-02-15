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
  const moduleGradient = activeTheme?.gradient ?? 'linear-gradient(145deg, #08080d 0%, #0b1020 55%, #08080d 100%)';

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
      {/* Deep black base */}
      <div className="absolute inset-0 bg-[#08080d]" />

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

      {/* Primary accent orb - visible enough to create atmosphere */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, ${glowA}10 0%, ${glowA}06 30%, transparent 65%)`,
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
          background: `radial-gradient(circle, ${glowB}0c 0%, ${glowB}05 30%, transparent 65%)`,
          bottom: '4%',
          left: '-10%',
          filter: 'blur(50px)',
        }}
      />

      {/* Third accent */}
      <div
        className="morph-shape absolute rounded-full"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${glowA}08 0%, transparent 60%)`,
          bottom: '20%',
          right: '20%',
          filter: 'blur(40px)',
        }}
      />

      {/* Warm highlight near center */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(255, 220, 180, 0.012) 0%, transparent 70%)',
          top: '30%',
          left: '20%',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
