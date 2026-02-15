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
      const hasMultiple = elements.length > 1;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          stagger: hasMultiple ? 0.12 : 0,
          ease: 'power2.out',
          delay: 0.18,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-6 md:px-10">
      <div className="max-w-3xl w-full text-center">
        {slide.subtitle && (
          <p data-animate className="font-mono text-sm tracking-[0.25em] uppercase text-accent mb-8 font-medium">
            {slide.subtitle}
          </p>
        )}

        <h2 data-animate className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-10 leading-tight tracking-tight">
          {slide.title}
        </h2>

        {slide.content && (
          <p data-animate className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {slide.content}
          </p>
        )}

        {slide.items && slide.items.length > 0 && (
          <ul className="mt-10 space-y-3 text-left max-w-2xl mx-auto">
            {slide.items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                data-animate
                className="glass rounded-xl px-5 py-4 text-[15px] md:text-base text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
