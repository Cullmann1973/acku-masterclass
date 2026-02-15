'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const levels = [
  {
    level: 1,
    name: 'Unaware',
    description: 'No formal AI discussion at leadership level',
    detail: '"We have bigger priorities right now"',
    color: '#3f3f46',
    accentColor: '#71717a',
  },
  {
    level: 2,
    name: 'Experimenting',
    description: 'A few enthusiasts, no coordination',
    detail: '60-70% of manufacturing companies',
    color: '#00d4aa',
    accentColor: '#00d4aa',
  },
  {
    level: 3,
    name: 'Implementing',
    description: 'Dedicated budget, multiple use cases in production',
    detail: '15-20% of companies',
    color: '#00c4ba',
    accentColor: '#00c4ba',
  },
  {
    level: 4,
    name: 'Scaling',
    description: 'AI is part of how the business operates',
    detail: 'Less than 5% of companies',
    color: '#00a4d4',
    accentColor: '#00a4d4',
  },
  {
    level: 5,
    name: 'Transforming',
    description: 'AI fundamentally changes how the business competes',
    detail: 'Almost nobody is here yet',
    color: '#6366f1',
    accentColor: '#6366f1',
  },
];

const desktopWidths = ['100%', '84%', '66%', '48%', '32%'];

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
      { opacity: 0, x: -30, scaleX: 0.4 },
      {
        opacity: 1,
        x: 0,
        scaleX: 1,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power3.out',
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
      <div className="flex flex-col-reverse gap-1">
        {levels.map((level, i) => (
          <div
            key={level.level}
            className="maturity-step origin-left w-full md:w-auto"
          >
            {/* Desktop: pyramid card */}
            <div className="hidden md:block" style={{ width: desktopWidths[i] }}>
              <div
                className="relative rounded-md px-4 py-2 border transition-all hover:border-white/[0.12] group"
                style={{
                  borderColor: `${level.accentColor}15`,
                  background: `linear-gradient(135deg, ${level.accentColor}08 0%, transparent 70%)`,
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                  style={{ background: `${level.accentColor}60` }}
                />
                <div className="flex items-baseline gap-2.5 pl-2.5">
                  <span
                    className="font-mono text-xl font-bold tracking-tighter"
                    style={{ color: level.accentColor, opacity: 0.7 }}
                  >
                    {level.level}
                  </span>
                  <span className="font-serif text-base text-text-primary font-semibold">
                    {level.name}
                  </span>
                  <span className="text-xs text-text-secondary font-light ml-1 hidden lg:inline">
                    {level.description}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-snug pl-2.5 lg:hidden">
                  {level.description}
                </p>
                <p className="text-[10px] font-mono text-text-tertiary pl-2.5 tracking-wide">
                  {level.detail}
                </p>
              </div>
            </div>
            {/* Mobile: full-width card */}
            <div className="md:hidden w-full">
              <div
                className="relative rounded-lg px-4 py-4 border transition-all"
                style={{
                  borderColor: `${level.accentColor}15`,
                  background: `linear-gradient(135deg, ${level.accentColor}08 0%, transparent 70%)`,
                }}
              >
                <div
                  className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
                  style={{ background: `${level.accentColor}50` }}
                />
                <div className="flex items-baseline gap-3 mb-1 pl-3">
                  <span
                    className="font-mono text-xl font-bold tracking-tighter"
                    style={{ color: level.accentColor, opacity: 0.7 }}
                  >
                    {level.level}
                  </span>
                  <span className="font-serif text-base text-text-primary font-semibold">
                    {level.name}
                  </span>
                </div>
                <p className="text-[15px] text-text-secondary leading-relaxed pl-3 font-light">
                  {level.description}
                </p>
                <p className="text-sm font-mono text-text-tertiary mt-1 pl-3">
                  {level.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
