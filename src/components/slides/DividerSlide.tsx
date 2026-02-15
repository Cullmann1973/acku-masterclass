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

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (panel) {
        timeline.fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          0
        );
      }

      if (number) {
        timeline.fromTo(
          number,
          { opacity: 0, x: 40, scale: 1.05 },
          { opacity: 0.06, x: 0, scale: 1, duration: 1.2 },
          0.1
        );
      }

      if (badge) {
        timeline.fromTo(badge, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
      }

      if (bar) {
        timeline.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.4);
      }

      if (title) {
        timeline.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
      }

      if (content) {
        timeline.fromTo(content, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 md:px-16 relative overflow-hidden">
      {/* Full background gradient */}
      <div
        className="divider-panel absolute inset-0"
        style={{ background: theme?.gradient ?? 'linear-gradient(145deg, #050507 0%, #0a0a1a 55%, #050507 100%)' }}
      />
      
      {/* Subtle darkening overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Giant module number - ultra-faint watermark */}
      <div
        className="divider-number absolute font-mono font-bold select-none opacity-[0.06]"
        style={{
          fontSize: 'clamp(250px, 45vw, 600px)',
          color: moduleColor,
          right: '-8%',
          bottom: '-15%',
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
        }}
      >
        {slide.module}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Module badge */}
        <div className="divider-subtitle flex items-center gap-4 mb-6">
          <span
            className="font-mono text-label tracking-[0.35em] uppercase font-semibold"
            style={{ color: moduleColor }}
          >
            Module {slide.module}
          </span>
          {slide.subtitle && (
            <>
              <span className="w-6 h-px" style={{ background: `${moduleColor}40` }} />
              <span className="font-mono text-[11px] text-text-tertiary tracking-wide">{slide.subtitle}</span>
            </>
          )}
        </div>

        {/* Accent bar */}
        <div
          className="divider-bar origin-left h-[2px] w-20 mb-10 rounded-full"
          style={{ background: `linear-gradient(90deg, ${moduleColor}, transparent)` }}
        />

        {/* Title - massive editorial */}
        <h2
          className="divider-title font-serif text-headline md:text-display font-bold text-text-primary leading-[1.05] mb-8 tracking-tight"
        >
          {slide.title}
        </h2>

        {/* Description */}
        {slide.content && (
          <p className="divider-content text-base md:text-lg text-text-secondary max-w-lg leading-relaxed font-light">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
