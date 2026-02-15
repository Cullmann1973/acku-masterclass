'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface ListSlideProps {
  slide: Slide;
  isActive: boolean;
}

const iconSymbols = ['\u25c9', '\u25c6', '\u25a3', '\u2726', '\u2b22', '\u25ce'];

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
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.08, ease: 'power2.out' }
  );

  if (layout === 'split' || layout === 'comparison') {
    const left = container.querySelectorAll('[data-list-side="left"]');
    const right = container.querySelectorAll('[data-list-side="right"]');

    gsap.fromTo(
      left,
      { opacity: 0, x: -40, y: 10 },
      { opacity: 1, x: 0, y: 0, duration: 0.48, stagger: 0.12, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      right,
      { opacity: 0, x: 40, y: 10 },
      { opacity: 1, x: 0, y: 0, duration: 0.48, stagger: 0.12, delay: 0.24, ease: 'power2.out' }
    );
  } else {
    const items = container.querySelectorAll('[data-list-stagger]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.46, stagger: 0.12, delay: 0.22, ease: 'power2.out' }
    );
  }

  const content = container.querySelectorAll('[data-list-content]');
  if (content.length) {
    gsap.fromTo(
      content,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.52, ease: 'power2.out' }
    );
  }
}

function ItemText({ item }: { item: string }) {
  const parsed = parseItem(item);
  if (!parsed.label) {
    return <p className="text-[15px] md:text-base text-text-secondary leading-relaxed">{parsed.text}</p>;
  }

  return (
    <p className="text-[15px] md:text-base leading-relaxed">
      <span className="font-mono text-accent font-semibold">{parsed.label}:</span>
      <span className="text-text-secondary ml-1.5">{parsed.text}</span>
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
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] min-h-[240px] md:min-h-[360px]">
      <img
        src={slide.atmosphereImage}
        alt={slide.atmosphereAlt || slide.title || 'Atmosphere'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Triple-layer overlay for bulletproof readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/88 via-black/65 to-black/88" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/60" />
      <div className="absolute inset-0 bg-black/15" />
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="h-full min-h-full flex items-center justify-center px-5 md:px-10 py-16 md:py-10">
      <div className="w-full max-w-5xl">
        {/* Title - strong weight contrast */}
        <h2
          data-list-heading
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-[1.12] max-w-4xl tracking-tight"
        >
          {slide.title}
        </h2>

        {slide.subtitle && (
          <p
            data-list-heading
            className="text-[15px] md:text-lg text-text-secondary mb-10 max-w-3xl leading-relaxed"
          >
            {slide.subtitle}
          </p>
        )}

        {/* SPLIT LAYOUT */}
        {layout === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="left"
                  className="glass rounded-xl px-5 md:px-6 py-4 border-gradient"
                >
                  <ItemText item={item} />
                </div>
              ))}
            </div>
            <div data-list-stagger data-list-side="right">{imagePanel}</div>
          </div>
        )}

        {/* COMPARISON LAYOUT */}
        {layout === 'comparison' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="glass-strong rounded-2xl p-5 md:p-6 space-y-3">
              {leftColumn.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="left"
                  className="border border-white/[0.06] rounded-xl px-5 py-3.5 hover:border-white/[0.10] transition-colors"
                >
                  <ItemText item={item} />
                </div>
              ))}
            </div>
            <div className="glass-strong rounded-2xl p-5 md:p-6 space-y-3">
              {rightColumn.map((item, i) => (
                <div
                  key={i}
                  data-list-stagger
                  data-list-side="right"
                  className="border border-white/[0.06] rounded-xl px-5 py-3.5 hover:border-white/[0.10] transition-colors"
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

        {/* ICON GRID LAYOUT */}
        {layout === 'icon-grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
            {items.map((item, i) => (
              <div
                key={i}
                data-list-stagger
                className="glass rounded-2xl border-gradient p-5 md:p-6 min-h-[155px]"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <span className="text-accent text-lg leading-none">{iconSymbols[i % iconSymbols.length]}</span>
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

        {/* DEFAULT LAYOUT */}
        {layout === 'default' && (
          <div className="space-y-3 mb-8 max-w-4xl">
            {items.map((item, i) => (
              <div
                key={i}
                data-list-stagger
                className="glass rounded-xl px-6 py-4 transition-colors hover:border-white/[0.12]"
              >
                <ItemText item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Footer content */}
        {slide.content && (
          <p
            data-list-content
            className="text-[15px] md:text-base text-text-tertiary italic border-l-2 border-accent/30 pl-5 max-w-4xl leading-relaxed"
          >
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
