'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const segments = [
  {
    label: 'Champions',
    percentage: '10-15%',
    description: 'Adopt immediately. Find and empower them.',
    color: '#00d4aa',
  },
  {
    label: 'Early Majority',
    percentage: '60-70%',
    description: 'Adopt when they see colleagues succeeding. Need social proof.',
    color: '#22d3ee',
  },
  {
    label: 'Late Majority',
    percentage: '15-20%',
    description: 'Resist until it\'s the default. Don\'t fight them.',
    color: '#6366f1',
  },
  {
    label: 'Holdouts',
    percentage: '~5%',
    description: 'Will never adopt. Don\'t optimize for them.',
    color: '#71717a',
  },
];

interface AdoptionCurveProps {
  isActive: boolean;
}

export function AdoptionCurve({ isActive }: AdoptionCurveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const path = containerRef.current.querySelector('.curve-path') as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      gsap.fromTo(path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: 0.3 }
      );
    }

    const fill = containerRef.current.querySelector('.curve-fill') as SVGPathElement;
    if (fill) {
      gsap.fromTo(fill, { opacity: 0 }, { opacity: 0.12, duration: 1, delay: 1.2 });
    }

    const labels = containerRef.current.querySelectorAll('.curve-label');
    gsap.fromTo(labels, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out', delay: 1.4,
    });

    return () => {
      gsap.killTweensOf([path, fill, labels]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      {/* SVG Bell Curve */}
      <div className="relative w-full h-[220px] mb-8">
        <svg viewBox="0 0 800 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Subtle grid line */}
          <line x1="50" y1="210" x2="750" y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          
          {/* Filled area */}
          <path
            className="curve-fill"
            d="M 80 210 Q 150 210 200 180 Q 280 100 350 50 Q 420 10 450 10 Q 480 10 500 30 Q 560 80 620 160 Q 680 200 720 210 Z"
            fill="url(#curveGradient)"
            opacity="0"
          />

          {/* Curve line */}
          <path
            className="curve-path"
            d="M 80 210 Q 150 210 200 180 Q 280 100 350 50 Q 420 10 450 10 Q 480 10 500 30 Q 560 80 620 160 Q 680 200 720 210"
            fill="none"
            stroke="url(#curveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4aa" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#71717a" />
            </linearGradient>
            <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4aa" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#71717a" />
            </linearGradient>
          </defs>

          {/* Segment dividers */}
          <line x1="200" y1="30" x2="200" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,5" />
          <line x1="500" y1="30" x2="500" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,5" />
          <line x1="650" y1="30" x2="650" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,5" />
        </svg>
      </div>

      {/* Segment labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="curve-label rounded-xl p-4 text-center border transition-all hover:border-white/[0.1]"
            style={{
              borderColor: `${seg.color}12`,
              background: `linear-gradient(180deg, ${seg.color}06 0%, transparent 70%)`,
            }}
          >
            <div className="font-mono text-2xl md:text-3xl font-bold mb-2 tracking-tighter" style={{ color: seg.color }}>
              {seg.percentage}
            </div>
            <div className="font-serif text-sm font-semibold text-text-primary mb-1.5">
              {seg.label}
            </div>
            <p className="text-xs text-text-tertiary leading-relaxed font-light">
              {seg.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
