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
      // Line
      const line = containerRef.current!.querySelector('.closing-line');
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, ease: 'power2.inOut', delay: 0.2,
      });

      // Title
      const title = containerRef.current!.querySelector('.closing-title');
      gsap.fromTo(title, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4,
      });

      // Content
      const content = containerRef.current!.querySelector('.closing-content');
      gsap.fromTo(content, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.7,
      });

      // Subtitle
      const subtitle = containerRef.current!.querySelector('.closing-subtitle');
      gsap.fromTo(subtitle, { opacity: 0 }, {
        opacity: 1, duration: 0.8, delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 relative overflow-hidden">
      {/* Ambient glow for closing */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #00d4aa 0%, transparent 60%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="text-center max-w-3xl relative z-10">
        {/* Decorative line */}
        <div className="closing-line origin-center h-[2px] w-16 mx-auto mb-8 bg-accent" />

        {/* Title */}
        <h2 className="closing-title font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
          {slide.title}
        </h2>

        {/* Content */}
        {slide.content && (
          <p className="closing-content text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            {slide.content}
          </p>
        )}

        {/* Subtitle */}
        {slide.subtitle && (
          <p className="closing-subtitle text-base text-accent font-mono max-w-xl mx-auto">
            {slide.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
