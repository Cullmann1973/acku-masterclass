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

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (panel) {
        timeline.fromTo(
          panel,
          { opacity: 0.7, x: -44, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.74 },
          0.04
        );
      }

      if (number) {
        timeline.fromTo(
          number,
          { opacity: 0, x: 60, scale: 1.08 },
          { opacity: 0.12, x: 0, scale: 1, duration: 0.75 },
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
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 relative overflow-hidden">
      <div
        className="divider-panel absolute inset-0"
        style={{ background: theme?.gradient ?? 'linear-gradient(145deg, #0a0a0f 0%, #0b1020 55%, #0d1117 100%)' }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div
        className="divider-number absolute font-mono font-bold select-none"
        style={{
          fontSize: 'clamp(200px, 40vw, 500px)',
          color: moduleColor,
          right: '-5%',
          bottom: '-10%',
          lineHeight: 1,
        }}
      >
        {slide.module}
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="divider-subtitle flex items-center gap-3 mb-5">
          <span
            className="font-mono text-sm md:text-base tracking-[0.3em] uppercase font-bold"
            style={{ color: moduleColor }}
          >
            Module {slide.module}
          </span>
          {slide.subtitle && (
            <>
              <span className="text-text-tertiary">|</span>
              <span className="font-mono text-xs md:text-sm text-text-tertiary">{slide.subtitle}</span>
            </>
          )}
        </div>

        <div
          className="divider-bar origin-left h-[3px] w-28 mb-8 rounded-full"
          style={{ background: `linear-gradient(90deg, ${moduleColor}, ${moduleColor}88)` }}
        />

        <h2
          className="divider-title font-serif text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-text-primary leading-[1.1] mb-6"
          style={{ textShadow: `0 4px 24px ${moduleColor}22` }}
        >
          {slide.title}
        </h2>

        {slide.content && (
          <p className="divider-content text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
