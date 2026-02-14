'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const tiers = [
  {
    level: 1,
    name: 'Low Risk',
    color: '#00d4aa',
    bgColor: 'rgba(0, 212, 170, 0.08)',
    description: 'Internal productivity tools, no customer data, no regulated decisions',
    approval: 'Department Manager',
    review: 'Annual',
    turnaround: '48-hour fast track',
  },
  {
    level: 2,
    name: 'Medium Risk',
    color: '#d4a400',
    bgColor: 'rgba(212, 164, 0, 0.08)',
    description: 'Tools touching customer data, influencing business decisions, or generating external content',
    approval: 'AI Governance Council',
    review: 'Quarterly',
    turnaround: '1-2 weeks',
  },
  {
    level: 3,
    name: 'High Risk',
    color: '#d44a00',
    bgColor: 'rgba(212, 74, 0, 0.08)',
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
    gsap.fromTo(cards, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out', delay: 0.3,
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
      <div className="space-y-4">
        {tiers.map((tier) => (
          <div
            key={tier.level}
            className="tier-card rounded-xl p-5 border transition-all hover:border-opacity-30"
            style={{
              background: tier.bgColor,
              borderColor: `${tier.color}15`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Tier indicator */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg font-bold"
                  style={{ background: `${tier.color}20`, color: tier.color }}
                >
                  {tier.level}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold" style={{ color: tier.color }}>
                    {tier.name}
                  </h4>
                  <p className="text-xs text-text-secondary">{tier.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex gap-4 md:gap-6 md:ml-auto">
                <div>
                  <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">Approval</span>
                  <p className="text-xs text-text-secondary mt-0.5">{tier.approval}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">Review</span>
                  <p className="text-xs text-text-secondary mt-0.5">{tier.review}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">Turnaround</span>
                  <p className="text-xs font-mono mt-0.5" style={{ color: tier.color }}>{tier.turnaround}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-text-tertiary mt-4 italic">
        Key principle: Make compliance easy. If approval takes 6 weeks, people go around it.
      </p>
    </div>
  );
}
