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
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      const stage = containerRef.current!.querySelector('.closing-stage');
      timeline.fromTo(
        stage,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.66 },
        0.08
      );

      const line = containerRef.current!.querySelector('.closing-line');
      timeline.fromTo(line, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.54 }, 0.2);

      const title = containerRef.current!.querySelector('.closing-title');
      timeline.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.54 }, 0.3);

      const content = containerRef.current!.querySelector('.closing-content');
      timeline.fromTo(content, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48 }, 0.4);

      const subtitle = containerRef.current!.querySelector('.closing-subtitle');
      timeline.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.42 }, 0.5);
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: '900px',
            height: '900px',
            background: 'radial-gradient(circle, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 40%, transparent 65%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="closing-stage text-center max-w-3xl relative z-10">
        {/* Decorative line */}
        <div className="closing-line origin-center h-[2px] w-20 mx-auto mb-10 bg-accent" style={{ boxShadow: '0 0 20px rgba(0,212,170,0.4)' }} />

        {/* Title */}
        <h2 className="closing-title font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-10 leading-tight tracking-tight">
          {slide.title}
        </h2>

        {/* Content */}
        {slide.content && (
          <p className="closing-content text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            {slide.content}
          </p>
        )}

        {/* Subtitle */}
        {slide.subtitle && (
          <p className="closing-subtitle text-base md:text-lg text-accent font-mono max-w-xl mx-auto tracking-wider">
            {slide.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
