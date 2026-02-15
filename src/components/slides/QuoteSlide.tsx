'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface QuoteSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function QuoteSlide({ slide, isActive }: QuoteSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const heading = containerRef.current?.querySelector('.quote-heading');
      const quote = containerRef.current?.querySelector('.quote-body');
      const tails = containerRef.current?.querySelectorAll('.quote-tail');

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (heading) {
        timeline.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1);
      }

      if (quote) {
        timeline.fromTo(
          quote,
          { opacity: 0, y: 24 },
          { opacity: 0.95, y: 0, duration: 0.7 },
          0.15
        );

        // Refined neon flicker effect
        const flickers = [0.04, 0.05, 0.03, 0.06];
        flickers.forEach((duration, index) => {
          const dim = index % 2 === 0;
          timeline.to(
            quote,
            {
              opacity: dim ? 0.25 : 1,
              duration,
              textShadow: dim
                ? '0 0 20px rgba(255,255,255,0.5)'
                : '0 0 30px rgba(255,255,255,0.8)',
            },
            '>'
          );
        });

        timeline.to(
          quote,
          {
            opacity: 1,
            duration: 0.3,
            textShadow: '0 0 16px rgba(255,255,255,0.2)',
          },
          '>'
        );
      }

      if (tails && tails.length) {
        timeline.fromTo(
          tails,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          '>-0.1'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full min-h-full px-6 md:px-16 py-16 md:py-10 relative overflow-hidden flex items-center justify-center">
      {slide.atmosphereImage && (
        <>
          <img
            src={slide.atmosphereImage}
            alt={slide.atmosphereAlt || slide.title || 'Quote atmosphere'}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </>
      )}

      <div className={`relative z-10 w-full max-w-4xl text-center ${slide.atmosphereImage ? 'text-shadow-image' : ''}`}>
        {slide.title && (
          <p className="quote-heading font-mono text-label tracking-[0.3em] uppercase text-accent mb-10 opacity-80">
            {slide.title}
          </p>
        )}

        <blockquote className="quote-body font-serif italic text-2xl md:text-4xl lg:text-5xl text-text-primary leading-[1.3] mb-10">
          {slide.quote}
        </blockquote>

        {slide.attribution && (
          <p className="quote-tail text-sm md:text-base text-text-secondary font-light">
            {slide.attribution}
          </p>
        )}

        {slide.content && (
          <p className="quote-tail text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-6 leading-relaxed font-light">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
