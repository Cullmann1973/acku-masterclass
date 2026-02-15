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

  const hasImage = !!slide.atmosphereImage;

  return (
    <div ref={containerRef} className="h-full min-h-full px-5 md:px-10 py-16 md:py-10 relative overflow-hidden flex items-center justify-center">
      {hasImage && (
        <>
          <img
            src={slide.atmosphereImage}
            alt={slide.atmosphereAlt || slide.title || 'Quote atmosphere'}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Heavy triple-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/55" />
          <div className="absolute inset-0 bg-black/10" />
        </>
      )}

      <div className={`relative z-10 w-full max-w-5xl text-center ${hasImage ? 'text-shadow-image' : ''}`}>
        {slide.title && (
          <p className="quote-heading font-mono text-[13px] md:text-sm tracking-[0.3em] uppercase text-accent mb-10 font-medium">
            {slide.title}
          </p>
        )}

        <blockquote className="quote-body font-serif italic text-2xl md:text-4xl lg:text-5xl text-text-primary leading-[1.3] mb-10">
          {slide.quote}
        </blockquote>

        {slide.attribution && (
          <p className="quote-tail text-[15px] md:text-base text-text-secondary">
            {slide.attribution}
          </p>
        )}

        {slide.content && (
          <p className="quote-tail text-[15px] md:text-lg text-text-secondary max-w-3xl mx-auto mt-6 leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
