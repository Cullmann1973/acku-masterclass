'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface ListSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function ListSlide({ slide, isActive }: ListSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Title
      const title = containerRef.current!.querySelector('.list-title');
      gsap.fromTo(title, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.1,
      });

      // Subtitle
      const subtitle = containerRef.current!.querySelector('.list-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
      }

      // List items with stagger
      const items = containerRef.current!.querySelectorAll('.list-item');
      gsap.fromTo(items, { opacity: 0, x: -25 }, {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out', delay: 0.4,
      });

      // Border flash
      gsap.fromTo(items,
        { borderColor: 'rgba(0, 212, 170, 0.3)' },
        { borderColor: 'rgba(255, 255, 255, 0.04)', duration: 1.2, stagger: 0.12, delay: 0.5 }
      );

      // Content
      const content = containerRef.current!.querySelector('.list-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 10 }, {
          opacity: 1, y: 0, duration: 0.5, delay: 1,
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
      <div className="max-w-3xl w-full">
        {/* Title */}
        <h2 className="list-title font-serif text-2xl md:text-4xl font-bold text-text-primary mb-3">
          {slide.title}
        </h2>

        {/* Subtitle */}
        {slide.subtitle && (
          <p className="list-subtitle text-sm md:text-base text-text-secondary mb-8">
            {slide.subtitle}
          </p>
        )}

        {/* List items */}
        <div className="space-y-3 mb-8">
          {slide.items?.map((item, i) => {
            const parts = item.split(':');
            const hasLabel = parts.length > 1 && parts[0].length < 40;

            return (
              <div
                key={i}
                className="list-item glass rounded-lg px-5 py-3 border border-white/[0.04] transition-colors hover:border-white/10"
              >
                {hasLabel ? (
                  <div>
                    <span className="font-mono text-sm text-accent font-semibold">
                      {parts[0]}:
                    </span>
                    <span className="text-sm text-text-secondary ml-1">
                      {parts.slice(1).join(':')}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">{item}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom content */}
        {slide.content && (
          <p className="list-content text-sm text-text-tertiary italic border-l-2 border-accent/30 pl-4">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
