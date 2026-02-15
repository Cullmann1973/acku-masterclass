'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const tiers = [
  {
    level: 1,
    name: 'Low Risk',
    color: '#00d4aa',
    description: 'Internal productivity tools, no customer data, no regulated decisions',
    approval: 'Department Manager',
    review: 'Annual',
    turnaround: '48-hour fast track',
  },
  {
    level: 2,
    name: 'Medium Risk',
    color: '#f59e0b',
    description: 'Tools touching customer data, influencing business decisions, or generating external content',
    approval: 'AI Governance Council',
    review: 'Quarterly',
    turnaround: '1-2 weeks',
  },
  {
    level: 3,
    name: 'High Risk',
    color: '#ef4444',
    description: 'Tools affecting product quality, regulatory compliance, or safety',
    approval: 'AI Governance Council + Legal + Quality',
    review: 'Monthly + event-driven',
    turnaround: '2 weeks maximum',
  },
];

interface RiskTiersProps {
  isActive: boolean;
}

export function RiskTiers({ isActive }: RiskTiersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const cards = containerRef.current.querySelectorAll('.tier-card');
    gsap.fromTo(cards, { opacity: 0, x: -24 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.3,
    });

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="space-y-3">
        {tiers.map((tier) => (
          <div
            key={tier.level}
            className="tier-card rounded-xl p-5 md:p-6 border transition-all hover:border-white/[0.1]"
            style={{
              borderColor: `${tier.color}12`,
              background: `linear-gradient(135deg, ${tier.color}06 0%, transparent 50%)`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Tier indicator */}
              <div className="flex-shrink-0 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg font-bold border"
                  style={{ background: `${tier.color}10`, color: tier.color, borderColor: `${tier.color}20` }}
                >
                  {tier.level}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold" style={{ color: tier.color }}>
                    {tier.name}
                  </h4>
                  <p className="text-xs text-text-tertiary font-light max-w-sm">{tier.description}</p>
                </div>
              </div>

              {/* Details - refined metrics */}
              <div className="flex gap-6 md:ml-auto">
                <div>
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] block mb-1">Approval</span>
                  <p className="text-xs text-text-secondary font-light">{tier.approval}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] block mb-1">Review</span>
                  <p className="text-xs text-text-secondary font-light">{tier.review}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] block mb-1">Turnaround</span>
                  <p className="text-xs font-mono" style={{ color: tier.color, opacity: 0.8 }}>{tier.turnaround}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-text-tertiary mt-5 italic font-light">
        Key principle: Make compliance easy. If approval takes 6 weeks, people go around it.
      </p>
    </div>
  );
}
