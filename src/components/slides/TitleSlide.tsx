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
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const stage = containerRef.current!.querySelector('.title-stage');
      const line = containerRef.current!.querySelector('.title-line');
      const logo = containerRef.current!.querySelector('.title-logo');
      const title = containerRef.current!.querySelector('.title-main');
      const subtitle = containerRef.current!.querySelector('.title-subtitle');
      const content = containerRef.current!.querySelector('.title-content');

      timeline.fromTo(
        stage,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 }
      );

      timeline.fromTo(logo, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.6');
      
      timeline.fromTo(
        line,
        { scaleX: 0, transformOrigin: '50% 50%' },
        { scaleX: 1, duration: 0.7 },
        '-=0.4'
      );

      timeline.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
      timeline.fromTo(subtitle, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
      timeline.fromTo(content, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const isFinalSlide = slide.id === 'final';

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 md:px-16">
      <div className="title-stage text-center max-w-4xl">
        {/* Logo mark */}
        <div className="title-logo mb-10">
          <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase font-medium opacity-80">
            {isFinalSlide ? '' : 'ACKU-AI'}
          </span>
        </div>

        {/* Decorative line - wider and visible */}
        <div className="title-line origin-center h-[2px] w-24 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

        {/* Main title - large editorial serif */}
        <h1 className="title-main font-serif text-display font-bold text-text-primary leading-[1.05] mb-8 tracking-tight">
          {slide.title}
        </h1>

        {/* Subtitle - refined mono label */}
        {slide.subtitle && (
          <p className="title-subtitle font-mono text-label text-accent tracking-[0.2em] uppercase mb-10 opacity-80">
            {slide.subtitle}
          </p>
        )}

        {/* Content - elegant body */}
        {slide.content && (
          <p className="title-content text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed font-light">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
