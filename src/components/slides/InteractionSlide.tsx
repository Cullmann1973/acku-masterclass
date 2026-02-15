'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';

interface InteractionSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function InteractionSlide({ slide, isActive }: InteractionSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      const stage = containerRef.current!.querySelector('.interaction-stage');

      timeline.fromTo(
        stage,
        { opacity: 0, y: 18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.62 },
        0.06
      );

      const badge = containerRef.current!.querySelector('.interaction-badge');
      timeline.fromTo(badge, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, 0.14);

      const title = containerRef.current!.querySelector('.interaction-title');
      timeline.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.22);

      const prompt = containerRef.current!.querySelector('.interaction-prompt');
      if (prompt) {
        timeline.fromTo(prompt, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.44 }, 0.32);
      }

      const items = containerRef.current!.querySelectorAll('.interaction-item');
      timeline.fromTo(
        items,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.09 },
        0.4
      );

      const content = containerRef.current!.querySelector('.interaction-content');
      if (content) {
        timeline.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.56);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-6 md:px-10">
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="interaction-stage max-w-3xl w-full relative z-10">
        {/* YOUR TURN badge */}
        <div className="interaction-badge inline-flex items-center gap-3 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-glow" />
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-accent font-bold">
            Your Turn
          </span>
        </div>

        {/* Title */}
        <h2 className="interaction-title font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
          {slide.title}
        </h2>

        {/* Interaction prompt */}
        {slide.interaction && (
          <div className="interaction-prompt glass-premium rounded-2xl p-6 md:p-8 mb-10 border-gradient">
            <p className="text-lg md:text-xl text-text-primary italic leading-relaxed">
              {slide.interaction}
            </p>
          </div>
        )}

        {/* Items */}
        {slide.items && (
          <div className="space-y-3 mb-8">
            {slide.items.map((item, i) => (
              <div
                key={i}
                className="interaction-item flex items-start gap-4 glass rounded-xl px-5 py-4"
              >
                <span className="w-6 h-6 rounded-lg bg-accent/12 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-xs text-accent font-bold">{i + 1}</span>
                </span>
                <p className="text-[15px] md:text-base text-text-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {slide.content && (
          <p className="interaction-content text-[15px] md:text-base text-text-secondary text-center italic">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
