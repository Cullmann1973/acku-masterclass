'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';
import { modules } from '@/lib/slideData';

interface ModuleDividerSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function ModuleDividerSlide({ slide, isActive }: ModuleDividerSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const mod = modules.find(m => m.number === slide.module);
  const moduleColor = mod?.color || '#00d4aa';

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Big number animation
      const num = containerRef.current!.querySelector('.module-number');
      gsap.fromTo(num, { opacity: 0, scale: 3, y: -40 }, {
        opacity: 0.08, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1,
      });

      // Title
      const title = containerRef.current!.querySelector('.module-title');
      gsap.fromTo(title, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.3,
      });

      // Subtitle
      const subtitle = containerRef.current!.querySelector('.module-subtitle');
      gsap.fromTo(subtitle, { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.6,
      });

      // Content
      const content = containerRef.current!.querySelector('.module-content');
      gsap.fromTo(content, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.8,
      });

      // Accent bar
      const bar = containerRef.current!.querySelector('.module-bar');
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 relative overflow-hidden">
      {/* Large background number */}
      <div
        className="module-number absolute font-mono font-bold select-none"
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

      <div className="relative z-10 max-w-3xl">
        {/* Module label */}
        <div className="module-subtitle flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: moduleColor }}>
            Module {slide.module}
          </span>
          {slide.subtitle && (
            <>
              <span className="text-text-tertiary">|</span>
              <span className="font-mono text-xs text-text-tertiary">{slide.subtitle}</span>
            </>
          )}
        </div>

        {/* Accent bar */}
        <div
          className="module-bar origin-left h-[3px] w-20 mb-6 rounded-full"
          style={{ background: moduleColor }}
        />

        {/* Title */}
        <h2 className="module-title font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
          {slide.title}
        </h2>

        {/* Content */}
        {slide.content && (
          <p className="module-content text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
