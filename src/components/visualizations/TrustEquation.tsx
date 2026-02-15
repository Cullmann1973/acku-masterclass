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
    color: '#22d3ee',
  },
  {
    name: 'Competence',
    description: 'Tools are good enough. If wrong 20% of the time, trust evaporates.',
    example: 'Get baseline quality right before you scale.',
    color: '#6366f1',
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

    const parts = containerRef.current.querySelectorAll('.trust-part');
    gsap.fromTo(parts, { opacity: 0, scale: 0.85, y: 16 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.3,
    });

    const ops = containerRef.current.querySelectorAll('.trust-op');
    gsap.fromTo(ops, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.3, stagger: 0.15, ease: 'back.out(2)', delay: 0.5,
    });

    const details = containerRef.current.querySelectorAll('.trust-detail');
    gsap.fromTo(details, { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out', delay: 1.2,
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
      <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4 mb-8 md:mb-12">
        <div className="trust-part rounded-xl px-6 py-3.5 border border-accent/20 bg-accent/[0.06]">
          <span className="font-serif text-xl md:text-2xl font-bold text-text-primary">Trust</span>
        </div>
        <span className="trust-op font-mono text-2xl text-accent/70">=</span>
        <div className="trust-part rounded-xl px-4 py-2.5 border border-white/[0.06] bg-white/[0.02]">
          <span className="font-mono text-sm text-[#00d4aa]">Transparency</span>
        </div>
        <span className="trust-op font-mono text-lg text-text-muted">+</span>
        <div className="trust-part rounded-xl px-4 py-2.5 border border-white/[0.06] bg-white/[0.02]">
          <span className="font-mono text-sm text-[#22d3ee]">Consistency</span>
        </div>
        <span className="trust-op font-mono text-lg text-text-muted">+</span>
        <div className="trust-part rounded-xl px-4 py-2.5 border border-white/[0.06] bg-white/[0.02]">
          <span className="font-mono text-sm text-[#6366f1]">Competence</span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mb-5 md:mb-8">
        <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Denominator */}
      <div className="text-center mb-6 md:mb-10">
        <div className="trust-part inline-block rounded-xl px-6 py-2.5 border border-red-500/15 bg-red-500/[0.04]">
          <span className="font-mono text-sm text-red-400/90">Self-Interest</span>
          <span className="text-[10px] text-text-muted ml-2 tracking-wide">(the denominator)</span>
        </div>
        <p className="trust-detail text-xs text-text-tertiary mt-3 max-w-md mx-auto font-light">
          If people believe AI exists to cut headcount, trust is zero regardless of everything else.
        </p>
      </div>

      {/* Component details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {components.map((comp) => (
          <div
            key={comp.name}
            className="trust-detail rounded-xl p-5 border transition-all hover:border-white/[0.1]"
            style={{
              borderColor: `${comp.color}12`,
              background: `linear-gradient(180deg, ${comp.color}06 0%, transparent 60%)`,
            }}
          >
            <h4 className="font-mono text-[13px] font-bold mb-2.5 tracking-wide" style={{ color: comp.color }}>
              {comp.name}
            </h4>
            <p className="text-[15px] md:text-xs text-text-secondary mb-3 leading-relaxed font-light">
              {comp.description}
            </p>
            <p className="text-sm md:text-[11px] text-text-tertiary italic font-light">
              {comp.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
