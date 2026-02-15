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
      const title = containerRef.current!.querySelector('.stat-title');
      const cards = containerRef.current!.querySelectorAll('.stat-card');
      const numbers = containerRef.current!.querySelectorAll('[data-stat-number]');
      const text = containerRef.current!.querySelectorAll('[data-stat-text]');

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      timeline.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      timeline.fromTo(
        cards,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.46, stagger: 0.12 },
        '-=0.25'
      );
      timeline.fromTo(
        numbers,
        { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.48, stagger: 0.12 },
        '-=0.3'
      );
      timeline.fromTo(
        text,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.1 },
        '-=0.32'
      );

      // Count up the numbers
      const counters = containerRef.current!.querySelectorAll('[data-count]');
      counters.forEach((el, idx) => {
        const target = parseFloat(el.getAttribute('data-count') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        (el as HTMLElement).textContent = `${prefix}0${suffix}`;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          delay: 0.45 + idx * 0.12,
          ease: 'power2.out',
          onUpdate: () => {
            const display = isDecimal
              ? obj.val.toFixed(obj.val < 10 ? (target.toString().includes('.5') ? 1 : 0) : 0)
              : Math.round(obj.val).toString();
            (el as HTMLElement).textContent = `${prefix}${display}${suffix}`;
          },
        });
      });

      const notes = containerRef.current!.querySelector('.stat-notes');
      if (notes) {
        gsap.fromTo(notes, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, delay: 1.1, ease: 'power2.out' });
      }

      const content = containerRef.current!.querySelector('.stat-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.42, delay: 0.95, ease: 'power2.out' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const statCount = slide.stats?.length || 0;
  const gridCols = statCount === 1
    ? 'grid-cols-1 max-w-lg'
    : statCount === 2
      ? 'grid-cols-1 md:grid-cols-2 max-w-3xl'
      : 'grid-cols-1 md:grid-cols-3 max-w-5xl';

  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-center px-6 md:px-10">
      {/* Title */}
      <h2 className="stat-title font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-12 tracking-tight leading-tight max-w-4xl">
        {slide.title}
      </h2>

      {/* Stats grid */}
      <div className={`grid ${gridCols} gap-5 md:gap-6 mx-auto w-full mb-10`}>
        {slide.stats?.map((stat, i) => (
          <div
            key={i}
            className="stat-card glass-premium rounded-2xl p-6 md:p-8 text-center border-gradient"
          >
            {stat.prefix && stat.prefix !== '$' && stat.prefix !== '<$' && (
              <span className="text-xs font-mono text-text-tertiary uppercase tracking-[0.2em] block mb-3" data-stat-text>
                {stat.prefix}
              </span>
            )}
            <div
              className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold text-accent mb-4 glow-text tracking-tight"
              data-count={stat.value}
              data-prefix={stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}
              data-suffix={stat.suffix || ''}
              data-stat-number
            >
              {stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}{stat.value}{stat.suffix || ''}
            </div>
            <p className="text-[15px] md:text-base text-text-secondary leading-relaxed" data-stat-text>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      {slide.content && (
        <p className="stat-content text-[15px] md:text-base text-text-secondary text-center max-w-2xl italic">
          {slide.content}
        </p>
      )}

      {/* Source notes */}
      {slide.notes && (
        <p className="stat-notes text-xs font-mono text-text-tertiary text-center mt-5">
          {slide.notes}
        </p>
      )}
    </div>
  );
}
