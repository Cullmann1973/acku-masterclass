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

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (heading) {
        timeline.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45 }, 0.08);
      }

      if (quote) {
        timeline.fromTo(
          quote,
          { opacity: 0, y: 20, textShadow: '0 0 0 rgba(255,255,255,0)' },
          { opacity: 0.92, y: 0, duration: 0.46 },
          0.12
        );

        const flickers = [0.03, 0.04, 0.02, 0.05];
        flickers.forEach((duration, index) => {
          const dim = index % 2 === 0;
          timeline.to(
            quote,
            {
              opacity: dim ? 0.3 : 1,
              duration,
              textShadow: dim
                ? '0 0 16px rgba(255,255,255,0.7)'
                : '0 0 28px rgba(255,255,255,0.95)',
            },
            '>'
          );
        });

        timeline.to(
          quote,
          {
            opacity: 1,
            duration: 0.25,
            textShadow: '0 0 14px rgba(255,255,255,0.38)',
          },
          '>'
        );
      }

      if (tails && tails.length) {
        timeline.fromTo(
          tails,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 },
          '>-0.05'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full min-h-full px-5 md:px-8 py-16 md:py-10 relative overflow-hidden flex items-center justify-center">
      {slide.atmosphereImage && (
        <>
          <img
            src={slide.atmosphereImage}
            alt={slide.atmosphereAlt || slide.title || 'Quote atmosphere'}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/82 via-black/58 to-black/86" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-black/44" />
        </>
      )}

      <div className="relative z-10 w-full max-w-5xl text-center">
        {slide.title && (
          <p className="quote-heading font-mono text-[12px] md:text-xs tracking-[0.26em] uppercase text-accent mb-8">
            {slide.title}
          </p>
        )}

        <blockquote className="quote-body font-serif italic text-2xl md:text-4xl lg:text-5xl text-text-primary leading-[1.35] mb-8">
          {slide.quote}
        </blockquote>

        {slide.attribution && (
          <p className="quote-tail text-[15px] md:text-base text-text-secondary">
            {slide.attribution}
          </p>
        )}

        {slide.content && (
          <p className="quote-tail text-[15px] md:text-base text-text-secondary max-w-3xl mx-auto mt-5 leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
