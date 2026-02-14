'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const risks = [
  {
    category: 'Data Privacy & Security',
    icon: 'R1',
    color: '#00d4aa',
    risks: ['Confidential data in public AI tools', 'Customer data used without consent', 'Cross-border data transfer issues'],
    prevention: 'Clear data classification, approved tool list, DLP controls, regular audits',
  },
  {
    category: 'Accuracy & Reliability',
    icon: 'R2',
    color: '#00c4ba',
    risks: ['AI hallucinations', 'Model degradation over time', 'Over-reliance without verification'],
    prevention: 'Human-in-the-loop for high-risk decisions, model monitoring, expert review policies',
  },
  {
    category: 'Bias & Fairness',
    icon: 'R3',
    color: '#00b4ca',
    risks: ['Historical biases in training data', 'Discriminatory outcomes', 'Lack of diversity in development'],
    prevention: 'Bias testing before deployment, diverse review panels, regular fairness audits',
  },
  {
    category: 'Regulatory & Compliance',
    icon: 'R4',
    color: '#00a4d4',
    risks: ['AI docs don\'t meet regulatory standards', 'Audit trail gaps', 'IP ownership issues'],
    prevention: 'Documentation requirements, audit trails for AI decisions, regulatory monitoring',
  },
  {
    category: 'Organizational',
    icon: 'R5',
    color: '#0094e4',
    risks: ['Key person dependency', 'Vendor lock-in', 'Shadow AI', 'Change fatigue'],
    prevention: 'Distributed ownership, multi-vendor strategy, discovery audits, phased rollout',
  },
];

interface RiskFrameworkProps {
  isActive: boolean;
}

export function RiskFramework({ isActive }: RiskFrameworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const cards = containerRef.current.querySelectorAll('.risk-card');
    gsap.fromTo(cards, { opacity: 0, y: 20, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.3,
    });

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
      setExpandedIndex(null);
    }
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {risks.map((risk, i) => (
          <div
            key={risk.category}
            className={`risk-card glass rounded-xl p-4 cursor-pointer transition-all duration-300 ${
              expandedIndex === i ? 'md:col-span-2 ring-1' : ''
            }`}
            style={{
              borderColor: expandedIndex === i ? risk.color : 'transparent',
            }}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{risk.icon}</span>
              <h4 className="font-mono text-xs font-bold" style={{ color: risk.color }}>
                {risk.category}
              </h4>
            </div>
            
            <ul className="space-y-1 mb-2">
              {risk.risks.map((r, j) => (
                <li key={j} className="text-xs text-text-secondary flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: risk.color }} />
                  {r}
                </li>
              ))}
            </ul>

            {expandedIndex === i && (
              <div className="border-t border-white/5 pt-2 mt-2">
                <p className="text-xs font-mono" style={{ color: risk.color, opacity: 0.8 }}>
                  Prevention: {risk.prevention}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-text-tertiary mt-4 font-mono">
        Click any category to expand prevention strategies
      </p>
    </div>
  );
}
