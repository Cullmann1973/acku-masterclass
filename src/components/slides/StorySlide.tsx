'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface StorySlideProps {
  slide: Slide;
  isActive: boolean;
}

function extractSpotlightValue(text: string): string {
  const match = text.match(/(\d+(?:,\d+)?(?:\+)?(?:-\d+)?\s*(?:hours?|minutes?|days?|weeks?|months?|years?|x|%|K|M)?)/i);
  return match?.[0] ?? 'Real';
}

function animateStoryElements(container: HTMLDivElement) {
  const items = container.querySelectorAll('[data-story-animate]');
  gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, delay: 0.12, ease: 'power2.out' }
  );
}

export function StorySlide({ slide, isActive }: StorySlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const layout = slide.layout ?? 'default';
  const spotlight = useMemo(() => extractSpotlightValue(slide.quote ?? ''), [slide.quote]);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      animateStoryElements(containerRef.current!);
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const quoteText = slide.quote ?? '';

  // Heavy triple-layer overlay for text over images
  const imageLayer = slide.atmosphereImage ? (
    <>
      <img
        src={slide.atmosphereImage}
        alt={slide.atmosphereAlt || slide.title || 'Atmosphere'}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/55" />
      <div className="absolute inset-0 bg-black/10" />
    </>
  ) : null;

  // QUOTE-FULL layout
  if (layout === 'quote-full') {
    return (
      <div ref={containerRef} className="h-full min-h-full px-5 md:px-10 py-16 md:py-10 relative overflow-hidden flex items-center justify-center">
        {imageLayer}
        <div className="relative z-10 w-full max-w-5xl text-center">
          {slide.title && (
            <p data-story-animate className="font-mono text-[13px] md:text-sm tracking-[0.3em] uppercase text-accent mb-10 text-shadow-image font-medium">
              {slide.title}
            </p>
          )}
          <blockquote data-story-animate className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-text-primary leading-[1.3] mb-10 text-shadow-image">
            {quoteText}
          </blockquote>
          {slide.attribution && (
            <p data-story-animate className="text-[15px] md:text-base text-text-secondary text-shadow-image">
              {slide.attribution}
            </p>
          )}
          {slide.content && (
            <p data-story-animate className="text-[15px] md:text-lg text-text-secondary max-w-3xl mx-auto mt-6 leading-relaxed text-shadow-image">
              {slide.content}
            </p>
          )}
        </div>
      </div>
    );
  }

  // SPLIT layout
  if (layout === 'split') {
    return (
      <div ref={containerRef} className="h-full min-h-full px-5 md:px-10 py-16 md:py-10 flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="relative z-10">
            {slide.title && (
              <h3 data-story-animate className="font-mono text-[13px] md:text-sm tracking-[0.25em] uppercase text-accent mb-8 font-medium">
                {slide.title}
              </h3>
            )}
            <blockquote data-story-animate className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-primary leading-[1.25] mb-8">
              {quoteText}
            </blockquote>
            {slide.attribution && (
              <p data-story-animate className="text-[15px] md:text-base text-text-secondary mb-4">
                {slide.attribution}
              </p>
            )}
            {slide.content && (
              <p data-story-animate className="text-[15px] md:text-lg text-text-secondary leading-relaxed">
                {slide.content}
              </p>
            )}
          </div>
          <div data-story-animate className="relative overflow-hidden rounded-2xl border border-white/[0.08] min-h-[260px] md:min-h-[400px]">
            {imageLayer}
          </div>
        </div>
      </div>
    );
  }

  // NUMBER-SPOTLIGHT layout
  if (layout === 'number-spotlight') {
    return (
      <div ref={containerRef} className="h-full min-h-full px-5 md:px-10 py-16 md:py-10 relative overflow-hidden flex items-center justify-center">
        {imageLayer}
        <div className="relative z-10 w-full max-w-5xl text-center">
          {slide.title && (
            <p data-story-animate className="font-mono text-[13px] md:text-sm tracking-[0.25em] uppercase text-accent mb-5 text-shadow-image font-medium">
              {slide.title}
            </p>
          )}
          <div data-story-animate className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold text-accent glow-text mb-8 text-shadow-image tracking-tight">
            {spotlight}
          </div>
          <blockquote data-story-animate className="font-serif text-xl md:text-3xl text-text-primary leading-relaxed max-w-4xl mx-auto mb-8 text-shadow-image">
            {quoteText}
          </blockquote>
          {slide.attribution && (
            <p data-story-animate className="text-[15px] md:text-base text-text-secondary mb-4 text-shadow-image">
              {slide.attribution}
            </p>
          )}
          {slide.content && (
            <p data-story-animate className="text-[15px] md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed text-shadow-image">
              {slide.content}
            </p>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT layout - editorial quote with large decorative mark
  return (
    <div ref={containerRef} className="h-full min-h-full flex items-center justify-center px-5 md:px-10 py-16 md:py-10">
      <div className="max-w-4xl relative">
        <div className="absolute -top-10 -left-4 md:-top-14 md:-left-8 opacity-50" aria-hidden="true">
          <span
            className="font-serif text-[130px] md:text-[200px] leading-none select-none"
            style={{ color: 'var(--accent)', filter: 'blur(0.5px)' }}
          >
            &ldquo;
          </span>
        </div>

        {slide.title && (
          <h3 data-story-animate className="font-mono text-[13px] md:text-sm tracking-[0.25em] uppercase text-accent mb-8 relative z-10 font-medium">
            {slide.title}
          </h3>
        )}

        <blockquote data-story-animate className="font-serif text-2xl md:text-3xl lg:text-[2.75rem] text-text-primary leading-[1.3] mb-8 relative z-10">
          {quoteText}
        </blockquote>

        {slide.attribution && (
          <div data-story-animate className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-[1px] bg-accent/50" />
            <p className="text-[15px] md:text-base text-text-secondary font-mono">{slide.attribution}</p>
          </div>
        )}

        {slide.content && (
          <p data-story-animate className="text-[15px] md:text-lg text-text-secondary mt-8 relative z-10 leading-relaxed">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
