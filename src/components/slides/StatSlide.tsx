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

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 });
      timeline.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 },
        '-=0.3'
      );
      timeline.fromTo(
        numbers,
        { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.55, stagger: 0.12 },
        '-=0.35'
      );
      timeline.fromTo(
        text,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        '-=0.3'
      );

      // Count up animation
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
          duration: 1.8,
          delay: 0.5 + idx * 0.12,
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
        gsap.fromTo(notes, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, delay: 1.2, ease: 'power2.out' });
      }

      const content = containerRef.current!.querySelector('.stat-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, delay: 1, ease: 'power2.out' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const statCount = slide.stats?.length || 0;
  const gridCols = statCount === 1 ? 'grid-cols-1 max-w-md' : statCount === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' : 'grid-cols-1 md:grid-cols-3 max-w-5xl';

  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-center px-8 md:px-12">
      {/* Title */}
      <h2 className="stat-title font-serif text-title font-bold text-text-primary text-center mb-12 tracking-tight max-w-3xl">
        {slide.title}
      </h2>

      {/* Stats grid */}
      <div className={`grid ${gridCols} gap-5 mx-auto w-full mb-10`}>
        {slide.stats?.map((stat, i) => (
          <div
            key={i}
            className="stat-card rounded-2xl p-8 md:p-10 text-center border border-white/[0.07] relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            }}
          >
            {/* Glowing top edge - signature accent line */}
            <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            {/* Subtle radial glow behind the number */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent/[0.04] blur-3xl pointer-events-none" />

            {stat.prefix && stat.prefix !== '$' && stat.prefix !== '<$' && (
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-[0.2em] block mb-3" data-stat-text>
                {stat.prefix}
              </span>
            )}
            <div
              className="font-mono text-5xl md:text-6xl font-bold text-accent mb-4 glow-text tracking-tighter"
              data-count={stat.value}
              data-prefix={stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}
              data-suffix={stat.suffix || ''}
              data-stat-number
            >
              {stat.prefix === '$' || stat.prefix === '<$' ? stat.prefix : ''}{stat.value}{stat.suffix || ''}
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light" data-stat-text>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      {slide.content && (
        <p className="stat-content text-sm text-text-tertiary text-center max-w-2xl italic font-light">
          {slide.content}
        </p>
      )}

      {/* Source notes */}
      {slide.notes && (
        <p className="stat-notes text-[10px] font-mono text-text-muted text-center mt-4 tracking-wide">
          {slide.notes}
        </p>
      )}
    </div>
  );
}
