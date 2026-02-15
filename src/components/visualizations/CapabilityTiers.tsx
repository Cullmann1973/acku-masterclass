'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const tiers = [
  {
    tier: 'Tier 1',
    name: 'AI Users',
    percentage: '80%',
    description: 'of your workforce, eventually',
    color: '#00d4aa',
    training: '4-8 hours + ongoing support',
    skills: ['Use AI tools built for them', 'Understand basic concepts', 'Evaluate AI outputs critically'],
  },
  {
    tier: 'Tier 2',
    name: 'Power Users',
    percentage: '15%',
    description: 'of your workforce',
    color: '#00a4d4',
    training: '20-40 hours, hands-on workshops',
    skills: ['Customize AI tools for their function', 'Build simple automations', 'Train and support Tier 1'],
  },
  {
    tier: 'Tier 3',
    name: 'AI Builders',
    percentage: '5%',
    description: 'of your workforce',
    color: '#0094e4',
    training: 'Formal programs, certifications',
    skills: ['Develop and maintain AI solutions', 'Integrate AI with existing systems', 'Evaluate vendors and tools'],
  },
];

interface CapabilityTiersProps {
  isActive: boolean;
}

export function CapabilityTiers({ isActive }: CapabilityTiersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const cards = containerRef.current.querySelectorAll('.cap-tier');
    gsap.fromTo(cards, { opacity: 0, y: 25, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.3)', delay: 0.3,
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
      {/* Pyramid visual */}
      <div className="flex flex-col items-center gap-3 mb-6">
        {[...tiers].reverse().map((tier) => (
          <div
            key={tier.tier}
            className="cap-tier glass glass-depth rounded-xl p-4 transition-all hover:border-white/10"
            style={{
              width: tier.tier === 'Tier 3' ? '50%' : tier.tier === 'Tier 2' ? '75%' : '100%',
              borderColor: `${tier.color}15`,
              borderWidth: 1,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div
                  className="font-mono text-3xl font-bold"
                  style={{ color: tier.color }}
                >
                  {tier.percentage}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-text-primary">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-text-tertiary">{tier.description}</p>
                </div>
              </div>

              <div className="md:ml-auto flex flex-col md:flex-row gap-3">
                <ul className="space-y-0.5">
                  {tier.skills.map((skill, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: tier.color }} />
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="md:ml-4 md:pl-4 md:border-l md:border-white/5">
                  <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">Training</span>
                  <p className="text-xs mt-0.5" style={{ color: tier.color }}>{tier.training}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
