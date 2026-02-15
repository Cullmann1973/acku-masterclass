'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';
import { moduleThemes, modules } from '@/lib/slideData';

interface DividerSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function DividerSlide({ slide, isActive }: DividerSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const mod = modules.find((m) => m.number === slide.module);
  const moduleColor = mod?.color || '#00d4aa';
  const theme = slide.module ? moduleThemes[slide.module] : null;

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const panel = containerRef.current?.querySelector('.divider-panel');
      const badge = containerRef.current?.querySelector('.divider-subtitle');
      const bar = containerRef.current?.querySelector('.divider-bar');
      const title = containerRef.current?.querySelector('.divider-title');
      const content = containerRef.current?.querySelector('.divider-content');
      const number = containerRef.current?.querySelector('.divider-number');
      const glow = containerRef.current?.querySelector('.divider-glow');

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (panel) {
        timeline.fromTo(
          panel,
          { opacity: 0.7, x: -44, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.74 },
          0.04
        );
      }

      if (glow) {
        timeline.fromTo(
          glow,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power1.out' },
          0
        );
      }

      if (number) {
        timeline.fromTo(
          number,
          { opacity: 0, x: 60, scale: 1.08 },
          { opacity: 0.08, x: 0, scale: 1, duration: 0.75 },
          0.18
        );
      }

      if (badge) {
        timeline.fromTo(badge, { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.45 }, 0.26);
      }

      if (bar) {
        timeline.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.52 }, 0.32);
      }

      if (title) {
        timeline.fromTo(title, { opacity: 0, x: -34 }, { opacity: 1, x: 0, duration: 0.62 }, 0.34);
      }

      if (content) {
        timeline.fromTo(content, { opacity: 0, x: -22, y: 10 }, { opacity: 1, x: 0, y: 0, duration: 0.52 }, 0.48);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Module gradient background */}
      <div
        className="divider-panel absolute inset-0"
        style={{ background: theme?.gradient ?? 'linear-gradient(145deg, #08080d 0%, #0b1020 55%, #0d1117 100%)' }}
      />

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Colored ambient glow - positioned for drama */}
      <div
        className="divider-glow absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${moduleColor}14 0%, ${moduleColor}06 40%, transparent 70%)`,
          top: '10%',
          left: '-5%',
          filter: 'blur(60px)',
        }}
      />

      {/* Giant watermark number */}
      <div
        className="divider-number absolute font-mono font-black select-none"
        style={{
          fontSize: 'clamp(220px, 42vw, 550px)',
          color: moduleColor,
          right: '-5%',
          bottom: '-12%',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
        }}
      >
        {slide.module}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Module badge */}
        <div className="divider-subtitle flex items-center gap-4 mb-6">
          <span
            className="font-mono text-sm md:text-base tracking-[0.35em] uppercase font-bold"
            style={{ color: moduleColor, textShadow: `0 0 24px ${moduleColor}50` }}
          >
            Module {slide.module}
          </span>
          {slide.subtitle && (
            <>
              <span
                className="w-6 h-[1px]"
                style={{ background: `${moduleColor}50` }}
              />
              <span className="font-mono text-xs md:text-sm text-text-tertiary tracking-wider">{slide.subtitle}</span>
            </>
          )}
        </div>

        {/* Accent bar - gradient fade */}
        <div
          className="divider-bar origin-left h-[3px] w-32 mb-10 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${moduleColor}, ${moduleColor}40)`,
            boxShadow: `0 0 20px ${moduleColor}30`,
          }}
        />

        {/* Title - editorial scale */}
        <h2
          className="divider-title font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-text-primary leading-[1.05] mb-8 tracking-tight"
          style={{
            textShadow: `0 4px 32px ${moduleColor}18, 0 2px 8px rgba(0,0,0,0.5)`,
          }}
        >
          {slide.title}
        </h2>

        {/* Description */}
        {slide.content && (
          <p className="divider-content text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
