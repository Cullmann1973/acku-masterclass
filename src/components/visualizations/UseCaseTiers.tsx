'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const tiers = [
  {
    tier: 'Tier 1',
    label: 'Start Here',
    sublabel: 'High Impact, High Feasibility',
    color: '#00d4aa',
    items: [
      'Document summarization & drafting (SOPs, batch records)',
      'Quality complaint trend analysis',
      'Meeting & communication automation',
      'Inventory optimization recommendations',
    ],
  },
  {
    tier: 'Tier 2',
    label: 'Plan For Next',
    sublabel: 'High Impact, Moderate Feasibility',
    color: '#00a4d4',
    items: [
      'Predictive quality analytics',
      'Supplier risk assessment',
      'Demand planning augmentation',
      'Automated deviation investigation support',
    ],
  },
  {
    tier: 'Tier 3',
    label: 'Future State',
    sublabel: 'High Impact, Lower Feasibility',
    color: '#b39f87',
    items: [
      'Real-time process optimization',
      'Computer vision for inspection',
      'Digital twins',
      'Autonomous scheduling',
    ],
  },
];

interface UseCaseTiersProps {
  isActive: boolean;
}

export function UseCaseTiers({ isActive }: UseCaseTiersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const cards = containerRef.current.querySelectorAll('.usecase-tier');
    gsap.fromTo(cards, { opacity: 0, y: 25 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out', delay: 0.3,
    });

    const items = containerRef.current.querySelectorAll('.usecase-item');
    gsap.fromTo(items, { opacity: 0, x: -15 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out', delay: 0.6,
    });

    return () => {
      gsap.killTweensOf([cards, items]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.tier}
            className="usecase-tier glass glass-depth rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-xs font-bold" style={{ color: tier.color }}>
                {tier.tier}
              </span>
              <span className="font-serif text-base font-bold text-text-primary">
                {tier.label}
              </span>
            </div>
            <p className="text-xs text-text-tertiary mb-4">{tier.sublabel}</p>

            <ul className="space-y-2">
              {tier.items.map((item, i) => (
                <li key={i} className="usecase-item flex items-start gap-2 text-sm text-text-secondary">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: tier.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-6 glass glass-depth rounded-lg px-4 py-3 inline-block mx-auto">
        <p className="text-xs font-mono text-text-secondary">
          Score: <span className="text-accent">Impact (1-5)</span> x <span className="text-accent">Feasibility (1-5)</span> = Priority
        </p>
        <p className="text-xs text-text-tertiary mt-1">
          Above 15 = shortlist. Above 20 = start here.
        </p>
      </div>
    </div>
  );
}
