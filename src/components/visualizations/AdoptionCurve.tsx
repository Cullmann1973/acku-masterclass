'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const segments = [
  {
    label: 'Champions',
    percentage: '10-15%',
    description: 'Adopt immediately. Find and empower them.',
    color: '#00d4aa',
    height: '40%',
    width: '15%',
  },
  {
    label: 'Early Majority',
    percentage: '60-70%',
    description: 'Adopt when they see colleagues succeeding. Need social proof.',
    color: '#00c4ba',
    height: '90%',
    width: '35%',
  },
  {
    label: 'Late Majority',
    percentage: '15-20%',
    description: 'Resist until it\'s the default. Don\'t fight them - build momentum.',
    color: '#00a4d4',
    height: '55%',
    width: '25%',
  },
  {
    label: 'Holdouts',
    percentage: '~5%',
    description: 'Will never adopt. Don\'t optimize for them.',
    color: '#787888',
    height: '20%',
    width: '10%',
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

    // Animate the SVG curve drawing
    const path = containerRef.current.querySelector('.curve-path') as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      gsap.fromTo(path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.3 }
      );
    }

    // Animate the fill
    const fill = containerRef.current.querySelector('.curve-fill') as SVGPathElement;
    if (fill) {
      gsap.fromTo(fill, { opacity: 0 }, { opacity: 0.15, duration: 0.8, delay: 1 });
    }

    // Animate labels
    const labels = containerRef.current.querySelectorAll('.curve-label');
    gsap.fromTo(labels, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 1.2,
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
      <div className="relative w-full h-[220px] mb-6">
        <svg viewBox="0 0 800 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1="50" y1="210" x2="750" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
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
            stroke="#00d4aa"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4aa" />
              <stop offset="50%" stopColor="#00c4ba" />
              <stop offset="75%" stopColor="#00a4d4" />
              <stop offset="100%" stopColor="#787888" />
            </linearGradient>
          </defs>

          {/* Segment dividers */}
          <line x1="200" y1="30" x2="200" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="500" y1="30" x2="500" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="650" y1="30" x2="650" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
        </svg>
      </div>

      {/* Segment labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="curve-label glass rounded-lg p-3 text-center"
          >
            <div className="font-mono text-2xl font-bold mb-1" style={{ color: seg.color }}>
              {seg.percentage}
            </div>
            <div className="font-serif text-sm font-semibold text-text-primary mb-1">
              {seg.label}
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {seg.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
