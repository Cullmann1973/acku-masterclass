'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface ClosingSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function ClosingSlide({ slide, isActive }: ClosingSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const stage = containerRef.current!.querySelector('.closing-stage');
      timeline.fromTo(
        stage,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      );

      const line = containerRef.current!.querySelector('.closing-line');
      timeline.fromTo(line, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6 }, 0.25);

      const title = containerRef.current!.querySelector('.closing-title');
      timeline.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35);

      const content = containerRef.current!.querySelector('.closing-content');
      timeline.fromTo(content, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.5);

      const subtitle = containerRef.current!.querySelector('.closing-subtitle');
      timeline.fromTo(subtitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.65);
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 md:px-16 relative overflow-hidden">
      {/* Ambient glow - refined */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #00d4aa 0%, transparent 55%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="closing-stage text-center max-w-3xl relative z-10">
        {/* Refined accent line */}
        <div className="closing-line origin-center h-px w-12 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Title */}
        <h2 className="closing-title font-serif text-display font-bold text-text-primary mb-10 leading-[1.05] tracking-tight">
          {slide.title}
        </h2>

        {/* Content */}
        {slide.content && (
          <p className="closing-content text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto font-light">
            {slide.content}
          </p>
        )}

        {/* Subtitle */}
        {slide.subtitle && (
          <p className="closing-subtitle text-sm text-accent font-mono tracking-wide max-w-md mx-auto opacity-80">
            {slide.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
