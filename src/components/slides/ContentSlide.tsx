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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: hasMultiple ? 0.14 : 0,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 md:px-16">
      <div className="max-w-3xl w-full text-center">
        {slide.subtitle && (
          <p data-animate className="font-mono text-label tracking-[0.25em] uppercase text-accent mb-8 opacity-80">
            {slide.subtitle}
          </p>
        )}

        <h2 data-animate className="font-serif text-headline font-bold text-text-primary mb-10 leading-tight tracking-tight">
          {slide.title}
        </h2>

        {slide.content && (
          <p data-animate className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-light">
            {slide.content}
          </p>
        )}

        {slide.items && slide.items.length > 0 && (
          <ul className="mt-10 space-y-3 text-left max-w-2xl mx-auto">
            {slide.items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                data-animate
                className="rounded-lg px-5 py-3.5 text-[15px] md:text-sm text-text-secondary border border-white/[0.04] bg-white/[0.02] transition-colors hover:border-white/[0.08]"
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
