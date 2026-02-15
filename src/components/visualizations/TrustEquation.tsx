'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const components = [
  {
    name: 'Transparency',
    description: 'People understand what AI is doing and why. The reasoning, not the mathematics.',
    example: '"This tool recommended reducing safety stock by 15% because demand variability decreased over 6 months."',
    color: '#00d4aa',
  },
  {
    name: 'Consistency',
    description: 'Tools work the same way every time. Same question, same quality answer.',
    example: 'This is a product quality issue, not an AI issue.',
    color: '#00c4ba',
  },
  {
    name: 'Competence',
    description: 'Tools are good enough. If wrong 20% of the time, trust evaporates.',
    example: 'Get baseline quality right before you scale.',
    color: '#00a4d4',
  },
];

interface TrustEquationProps {
  isActive: boolean;
}

export function TrustEquation({ isActive }: TrustEquationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    // Animate formula parts
    const parts = containerRef.current.querySelectorAll('.trust-part');
    gsap.fromTo(parts, { opacity: 0, scale: 0.8, y: 20 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)', delay: 0.3,
    });

    // Animate operators
    const ops = containerRef.current.querySelectorAll('.trust-op');
    gsap.fromTo(ops, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)', delay: 0.5,
    });

    // Animate details
    const details = containerRef.current.querySelectorAll('.trust-detail');
    gsap.fromTo(details, { opacity: 0, y: 15 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out', delay: 1.2,
    });

    return () => {
      gsap.killTweensOf([parts, ops, details]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      {/* Formula */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
        <div className="trust-part glass glass-depth rounded-xl px-5 py-3 glow-accent">
          <span className="font-serif text-xl md:text-2xl font-bold text-text-primary">Trust</span>
        </div>
        <span className="trust-op font-mono text-2xl text-accent">=</span>
        <div className="trust-part glass glass-depth rounded-xl px-4 py-2">
          <span className="font-mono text-sm md:text-base text-[#00d4aa]">Transparency</span>
        </div>
        <span className="trust-op font-mono text-xl text-text-tertiary">+</span>
        <div className="trust-part glass glass-depth rounded-xl px-4 py-2">
          <span className="font-mono text-sm md:text-base text-[#00c4ba]">Consistency</span>
        </div>
        <span className="trust-op font-mono text-xl text-text-tertiary">+</span>
        <div className="trust-part glass glass-depth rounded-xl px-4 py-2">
          <span className="font-mono text-sm md:text-base text-[#00a4d4]">Competence</span>
        </div>
      </div>

      {/* Divider line */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="text-center mb-8">
        <div className="trust-part inline-block glass glass-depth rounded-xl px-5 py-2 border border-red-500/20">
          <span className="font-mono text-sm text-red-400">Self-Interest</span>
          <span className="text-xs text-text-tertiary ml-2">(the denominator)</span>
        </div>
        <p className="trust-detail text-xs text-text-secondary mt-2 max-w-md mx-auto">
          If people believe AI exists to cut headcount, trust is zero regardless of everything else.
        </p>
      </div>

      {/* Component details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {components.map((comp) => (
          <div key={comp.name} className="trust-detail glass glass-depth rounded-lg p-4">
            <h4 className="font-mono text-sm font-bold mb-2" style={{ color: comp.color }}>
              {comp.name}
            </h4>
            <p className="text-xs text-text-secondary mb-2 leading-relaxed">
              {comp.description}
            </p>
            <p className="text-xs text-text-tertiary italic">
              {comp.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
