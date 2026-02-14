'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const levels = [
  {
    level: 1,
    name: 'Unaware',
    description: 'No formal AI discussion at leadership level',
    detail: '"We have bigger priorities right now"',
    color: '#3a3a4e',
    width: '100%',
  },
  {
    level: 2,
    name: 'Experimenting',
    description: 'A few enthusiasts, no coordination',
    detail: '60-70% of manufacturing companies',
    color: '#00d4aa33',
    width: '85%',
  },
  {
    level: 3,
    name: 'Implementing',
    description: 'Dedicated budget, multiple use cases in production',
    detail: '15-20% of companies',
    color: '#00d4aa66',
    width: '68%',
  },
  {
    level: 4,
    name: 'Scaling',
    description: 'AI is part of how the business operates',
    detail: 'Less than 5% of companies',
    color: '#00d4aa99',
    width: '50%',
  },
  {
    level: 5,
    name: 'Transforming',
    description: 'AI fundamentally changes how the business competes',
    detail: 'Almost nobody is here yet',
    color: '#00d4aa',
    width: '35%',
  },
];

interface MaturityModelProps {
  isActive: boolean;
}

export function MaturityModel({ isActive }: MaturityModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const steps = containerRef.current.querySelectorAll('.maturity-step');
    gsap.fromTo(
      steps,
      { opacity: 0, x: -40, scaleX: 0.3 },
      {
        opacity: 1,
        x: 0,
        scaleX: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    return () => {
      gsap.killTweensOf(steps);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col-reverse gap-3">
        {levels.map((level) => (
          <div
            key={level.level}
            className="maturity-step origin-left"
            style={{ width: level.width }}
          >
            <div
              className="relative rounded-lg px-5 py-4 border border-white/5 transition-all hover:border-white/15"
              style={{ background: level.color }}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-2xl font-bold text-accent opacity-60">
                  {level.level}
                </span>
                <span className="font-serif text-lg text-text-primary font-semibold">
                  {level.name}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {level.description}
              </p>
              <p className="text-xs font-mono text-text-tertiary mt-1">
                {level.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
