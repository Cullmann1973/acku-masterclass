'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface StatSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function StatSlide({ slide, isActive }: StatSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Title
      const title = containerRef.current!.querySelector('.stat-title');
      gsap.fromTo(title, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1,
      });

      // Stat cards
      const cards = containerRef.current!.querySelectorAll('.stat-card');
      gsap.fromTo(cards, { opacity: 0, y: 30, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.3)', delay: 0.3,
      });

      // Count up the numbers
      const counters = containerRef.current!.querySelectorAll('[data-count]');
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-count') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          delay: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            const display = isDecimal
              ? obj.val.toFixed(obj.val < 10 ? (target.toString().includes('.5') ? 1 : 0) : 0)
              : Math.round(obj.val).toString();
            (el as HTMLElement).textContent = `${prefix}${display}${suffix}`;
          },
        });
      });

      // Notes/source
      const notes = containerRef.current!.querySelector('.stat-notes');
      if (notes) {
        gsap.fromTo(notes, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.5 });
      }

      // Content
      const content = containerRef.current!.querySelector('.stat-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 10 }, {
          opacity: 1, y: 0, duration: 0.5, delay: 1.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const statCount = slide.stats?.length || 0;
  const gridCols = statCount === 1 ? 'grid-cols-1 max-w-lg' : statCount === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' : 'grid-cols-1 md:grid-cols-3 max-w-4xl';

  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-center px-8">
      {/* Title */}
      <h2 className="stat-title font-serif text-2xl md:text-4xl font-bold text-text-primary text-center mb-10">
        {slide.title}
      </h2>

      {/* Stats grid */}
      <div className={`grid ${gridCols} gap-6 mx-auto w-full mb-8`}>
        {slide.stats?.map((stat, i) => (
          <div
            key={i}
            className="stat-card glass rounded-xl p-6 md:p-8 text-center glow-accent"
          >
            {stat.prefix && stat.prefix !== '$' && stat.prefix !== '<$' && (
              <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider block mb-2">
                {stat.prefix}
              </span>
            )}
            <div
              className="font-mono text-4xl md:text-6xl font-bold text-accent mb-3 glow-text"
              data-count={stat.value}
              data-prefix={stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}
              data-suffix={stat.suffix || ''}
            >
              {stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}{stat.value}{stat.suffix || ''}
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      {slide.content && (
        <p className="stat-content text-sm text-text-secondary text-center max-w-2xl italic">
          {slide.content}
        </p>
      )}

      {/* Source notes */}
      {slide.notes && (
        <p className="stat-notes text-xs font-mono text-text-tertiary text-center mt-4">
          {slide.notes}
        </p>
      )}
    </div>
  );
}
