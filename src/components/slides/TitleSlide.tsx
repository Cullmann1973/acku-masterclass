'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface TitleSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function TitleSlide({ slide, isActive }: TitleSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      const stage = containerRef.current!.querySelector('.title-stage');
      const line = containerRef.current!.querySelector('.title-line');
      const logo = containerRef.current!.querySelector('.title-logo');
      const title = containerRef.current!.querySelector('.title-main');
      const subtitle = containerRef.current!.querySelector('.title-subtitle');
      const content = containerRef.current!.querySelector('.title-content');

      timeline.fromTo(
        stage,
        { opacity: 0, scale: 0.88, y: 20, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, y: 0, duration: 0.75 }
      );

      timeline.fromTo(
        line,
        { scaleX: 0, transformOrigin: '50% 50%' },
        { scaleX: 1, duration: 0.55 },
        '-=0.5'
      );

      timeline.fromTo(logo, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32 }, '-=0.45');
      timeline.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.52 }, '-=0.35');
      timeline.fromTo(subtitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
      timeline.fromTo(content, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42 }, '-=0.22');
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const isFinalSlide = slide.id === 'final';

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8">
      <div className="title-stage text-center max-w-4xl">
        {/* Logo */}
        <div className="title-logo mb-8">
          <span className="font-mono text-accent text-lg md:text-xl tracking-[0.3em] uppercase">
            {isFinalSlide ? '' : 'ACKU-AI'}
          </span>
        </div>

        {/* Decorative line */}
        <div className="title-line origin-center h-[1px] w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Main title */}
        <h1 className="title-main font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
          {slide.title}
        </h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <p className="title-subtitle font-mono text-sm md:text-base text-accent tracking-wider uppercase mb-8">
            {slide.subtitle}
          </p>
        )}

        {/* Content */}
        {slide.content && (
          <p className="title-content text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
