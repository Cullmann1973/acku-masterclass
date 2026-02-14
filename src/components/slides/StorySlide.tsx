'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface StorySlideProps {
  slide: Slide;
  isActive: boolean;
}

export function StorySlide({ slide, isActive }: StorySlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Quote mark
      const mark = containerRef.current!.querySelector('.quote-mark');
      gsap.fromTo(mark, { opacity: 0, scale: 0.5 }, {
        opacity: 0.1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.1,
      });

      // Title
      const title = containerRef.current!.querySelector('.story-title');
      gsap.fromTo(title, { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.2,
      });

      // Quote text
      const quote = containerRef.current!.querySelector('.quote-text');
      gsap.fromTo(quote, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4,
      });

      // Attribution
      const attr = containerRef.current!.querySelector('.quote-attr');
      if (attr) {
        gsap.fromTo(attr, { opacity: 0, x: -10 }, {
          opacity: 1, x: 0, duration: 0.5, delay: 0.8,
        });
      }

      // Content
      const content = containerRef.current!.querySelector('.story-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0 }, {
          opacity: 1, duration: 0.5, delay: 1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8">
      <div className="max-w-3xl relative">
        {/* Large quote mark */}
        <div className="quote-mark absolute -top-8 -left-4 md:-top-12 md:-left-8">
          <span className="font-serif text-[120px] md:text-[180px] text-accent leading-none select-none">
            &ldquo;
          </span>
        </div>

        {/* Title */}
        {slide.title && (
          <h3 className="story-title font-mono text-xs tracking-[0.2em] uppercase text-accent mb-6 relative z-10">
            {slide.title}
          </h3>
        )}

        {/* Quote */}
        <blockquote className="quote-text font-serif text-xl md:text-2xl lg:text-3xl text-text-primary leading-relaxed mb-6 relative z-10">
          {slide.quote}
        </blockquote>

        {/* Attribution */}
        {slide.attribution && (
          <div className="quote-attr flex items-center gap-3 relative z-10">
            <div className="w-8 h-[1px] bg-accent" />
            <p className="text-sm text-accent font-mono">
              {slide.attribution}
            </p>
          </div>
        )}

        {/* Extra content */}
        {slide.content && (
          <p className="story-content text-base text-text-secondary mt-6 relative z-10">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
