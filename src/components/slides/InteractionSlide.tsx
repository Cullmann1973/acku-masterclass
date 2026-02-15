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
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const stage = containerRef.current!.querySelector('.interaction-stage');

      timeline.fromTo(
        stage,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.08
      );

      const badge = containerRef.current!.querySelector('.interaction-badge');
      timeline.fromTo(badge, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.15);

      const title = containerRef.current!.querySelector('.interaction-title');
      timeline.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.25);

      const prompt = containerRef.current!.querySelector('.interaction-prompt');
      if (prompt) {
        timeline.fromTo(prompt, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.35);
      }

      const items = containerRef.current!.querySelectorAll('.interaction-item');
      timeline.fromTo(
        items,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        0.45
      );

      const content = containerRef.current!.querySelector('.interaction-content');
      if (content) {
        timeline.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8 md:px-16">
      {/* Subtle accent atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="interaction-stage max-w-3xl w-full relative z-10">
        {/* YOUR TURN badge - refined */}
        <div className="interaction-badge inline-flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
          <span className="font-mono text-label tracking-[0.35em] uppercase text-accent font-semibold">
            Your Turn
          </span>
        </div>

        {/* Title */}
        <h2 className="interaction-title font-serif text-title font-bold text-text-primary mb-8 tracking-tight">
          {slide.title}
        </h2>

        {/* Interaction prompt - premium card */}
        {slide.interaction && (
          <div className="interaction-prompt rounded-xl p-6 md:p-8 mb-8 border border-accent/10 bg-accent/[0.03] relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <p className="text-base md:text-lg text-text-primary italic leading-relaxed font-light">
              {slide.interaction}
            </p>
          </div>
        )}

        {/* Items */}
        {slide.items && (
          <div className="space-y-2.5 mb-8">
            {slide.items.map((item, i) => (
              <div
                key={i}
                className="interaction-item flex items-start gap-4 rounded-lg px-5 py-3.5 border border-white/[0.04] bg-white/[0.015] transition-colors hover:border-white/[0.08]"
              >
                <span className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-[10px] text-accent font-bold">{i + 1}</span>
                </span>
                <p className="text-[15px] md:text-sm text-text-secondary font-light">{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {slide.content && (
          <p className="interaction-content text-sm text-text-tertiary text-center italic font-light">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
