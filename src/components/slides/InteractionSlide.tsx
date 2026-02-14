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
      // Badge pulse
      const badge = containerRef.current!.querySelector('.interaction-badge');
      gsap.fromTo(badge, { opacity: 0, scale: 0.5 }, {
        opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.1,
      });

      // Title
      const title = containerRef.current!.querySelector('.interaction-title');
      gsap.fromTo(title, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.3,
      });

      // Prompt
      const prompt = containerRef.current!.querySelector('.interaction-prompt');
      if (prompt) {
        gsap.fromTo(prompt, { opacity: 0, scale: 0.95 }, {
          opacity: 1, scale: 1, duration: 0.5, delay: 0.5,
        });
      }

      // Items
      const items = containerRef.current!.querySelectorAll('.interaction-item');
      gsap.fromTo(items, { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.7,
      });

      // Content
      const content = containerRef.current!.querySelector('.interaction-content');
      if (content) {
        gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center px-8">
      {/* Different background treatment for interaction slides */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        {/* YOUR TURN badge */}
        <div className="interaction-badge inline-flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent font-bold">
            Your Turn
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/35 bg-bg-primary/70 px-2 py-0.5">
            <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
              <circle
                cx="10"
                cy="10"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeDasharray="44"
                strokeDashoffset="12"
                className="text-accent"
              />
            </svg>
            <span className="font-mono text-[10px] text-accent">5:00</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="interaction-title font-serif text-2xl md:text-4xl font-bold text-text-primary mb-6">
          {slide.title}
        </h2>

        {/* Interaction prompt */}
        {slide.interaction && (
          <div className="interaction-prompt glass-strong rounded-xl p-6 mb-8 border border-accent/10">
            <p className="text-base md:text-lg text-text-primary italic leading-relaxed">
              {slide.interaction}
            </p>
          </div>
        )}

        {/* Items */}
        {slide.items && (
          <div className="space-y-2 mb-6">
            {slide.items.map((item, i) => (
              <div
                key={i}
                className="interaction-item flex items-start gap-3 glass rounded-lg px-4 py-3"
              >
                <span className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-xs text-accent font-bold">{i + 1}</span>
                </span>
                <p className="text-sm text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {slide.content && (
          <p className="interaction-content text-sm text-text-secondary text-center italic">
            {slide.content}
          </p>
        )}
      </div>
    </div>
  );
}
