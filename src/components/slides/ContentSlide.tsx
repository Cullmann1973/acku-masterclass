'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface ContentSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function ContentSlide({ slide, isActive }: ContentSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll('[data-animate]');
      gsap.fromTo(elements, { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8">
      <div className="max-w-3xl w-full text-center">
        {/* Subtitle / label */}
        {slide.subtitle && (
          <p data-animate className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-6">
            {slide.subtitle}
          </p>
        )}

        {/* Title */}
        <h2 data-animate className="font-serif text-3xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
          {slide.title}
        </h2>

        {/* Content */}
        {slide.content && (
          <p data-animate className="text-base md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
