'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface ListSlideProps {
  slide: Slide;
  isActive: boolean;
}

function splitInHalf<T>(values: T[]): [T[], T[]] {
  const midpoint = Math.ceil(values.length / 2);
  return [values.slice(0, midpoint), values.slice(midpoint)];
}

function parseItem(item: string) {
  const parts = item.split(':');
  const hasLabel = parts.length > 1 && parts[0].length < 40;
  return {
    label: hasLabel ? parts[0] : null,
    text: hasLabel ? parts.slice(1).join(':') : item,
  };
}

function runListAnimation(container: HTMLDivElement, layout: Slide['layout']) {
  const titleAndMeta = container.querySelectorAll('[data-list-heading]');
  gsap.fromTo(
    titleAndMeta,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.1, ease: 'power3.out' }
  );

  if (layout === 'split' || layout === 'comparison') {
    const left = container.querySelectorAll('[data-list-side="left"]');
    const right = container.querySelectorAll('[data-list-side="right"]');

    gsap.fromTo(
      left,
      { opacity: 0, x: -30, y: 10 },
      { opacity: 1, x: 0, y: 0, duration: 0.5, stagger: 0.1, delay: 0.25, ease: 'power3.out' }
    );

    gsap.fromTo(
      right,
      { opacity: 0, x: 30, y: 10 },
      { opacity: 1, x: 0, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
    );
  } else {
    const items = container.querySelectorAll('[data-list-stagger]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.25, ease: 'power3.out' }
    );
  }

  const content = container.querySelectorAll('[data-list-content]');
  if (content.length) {
    gsap.fromTo(
      content,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, delay: 0.6, ease: 'power3.out' }
    );
  }
}

function ItemText({ item }: { item: string }) {
  const parsed = parseItem(item);
  if (!parsed.label) {
    return <p className="text-[15px] md:text-sm text-text-secondary leading-relaxed font-light">{parsed.text}</p>;
  }

  return (
    <p className="text-[15px] md:text-sm leading-relaxed">
      <span className="font-mono text-accent font-medium text-[13px]">{parsed.label}:</span>
      <span className="text-text-secondary ml-1.5 font-light">{parsed.text}</span>
    </p>
  );
}

export function ListSlide({ slide, isActive }: ListSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const layout = slide.layout ?? 'default';

  const items = useMemo(() => slide.items ?? [], [slide.items]);
  const [leftColumn, rightColumn] = useMemo(() => splitInHalf(items), [items]);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      runListAnimation(containerRef.current!, layout);
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, layout]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const imagePanel = slide.atmosphereImage ? (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.06] min-h-[240px] md:min-h-[360px]">
      <img
        src={slide.atmosphereImage}
        alt={slide.atmosphereAlt || slide.title || 'Atmosphere'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="h-full min-h-full flex items-center justify-center px-5 md:px-10 py-16 md:py-10">
      <div className="w-full max-w-6xl">
        <h2 data-list-heading className="font-serif text-title font-bold text-text-primary mb-3 leading-tight max-w-4xl tracking-tight">
          {slide.title}
        </h2>

        {slide.subtitle && (
          <p data-list-heading className="text-sm md:text-base text-text-secondary mb-8 max-w-3xl leading-relaxed font-light">
            {slide.subtitle}
          </p>
        )}

        {layout === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
            <div className="space-y-2.5">
              {items.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="left"
                  className="rounded-lg px-5 py-3.5 border border-white/[0.04] bg-white/[0.015] transition-colors hover:border-white/[0.08]"
                >
                  <ItemText item={item} />
                </div>
              ))}
            </div>
            <div data-list-stagger data-list-side="right">{imagePanel}</div>
          </div>
        )}

        {layout === 'comparison' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="rounded-xl p-4 md:p-5 space-y-2.5 border border-white/[0.05] bg-white/[0.015]">
              {leftColumn.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="left"
                  className="border border-white/[0.04] rounded-lg px-4 py-3 transition-colors hover:border-white/[0.08]"
                >
                  <ItemText item={item} />
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 md:p-5 space-y-2.5 border border-white/[0.05] bg-white/[0.015]">
              {rightColumn.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="right"
                  className="border border-white/[0.04] rounded-lg px-4 py-3 transition-colors hover:border-white/[0.08]"
                >
                  <ItemText item={item} />
                </div>
              ))}
              {rightColumn.length === 0 && (
                <div data-list-stagger data-list-side="right">
                  {imagePanel}
                </div>
              )}
            </div>
          </div>
        )}

        {layout === 'icon-grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {items.map((item, i) => (
              <div
                key={i}
                data-list-stagger
                className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-5 md:p-6 min-h-[140px] transition-colors hover:border-white/[0.08] group"
              >
                {/* Refined icon badge */}
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <span className="font-mono text-accent text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <ItemText item={item} />
              </div>
            ))}
            {imagePanel && (
              <div data-list-stagger className="md:col-span-2 lg:col-span-1">
                {imagePanel}
              </div>
            )}
          </div>
        )}

        {layout === 'default' && (
          <div className="space-y-2.5 mb-8 max-w-4xl">
            {items.map((item, i) => (
              <div
                key={i}
                data-list-stagger
                className="rounded-lg px-5 py-3.5 border border-white/[0.04] bg-white/[0.015] transition-colors hover:border-white/[0.08]"
              >
                <ItemText item={item} />
              </div>
            ))}
          </div>
        )}

        {slide.content && (
          <p data-list-content className="text-sm text-text-tertiary italic border-l border-accent/25 pl-4 max-w-4xl leading-relaxed font-light">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
