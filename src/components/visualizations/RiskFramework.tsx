'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const risks = [
  {
    category: 'Data Privacy & Security',
    icon: '01',
    color: '#00d4aa',
    risks: ['Confidential data in public AI tools', 'Customer data used without consent', 'Cross-border data transfer issues'],
    prevention: 'Clear data classification, approved tool list, DLP controls, regular audits',
  },
  {
    category: 'Accuracy & Reliability',
    icon: '02',
    color: '#22d3ee',
    risks: ['AI hallucinations', 'Model degradation over time', 'Over-reliance without verification'],
    prevention: 'Human-in-the-loop for high-risk decisions, model monitoring, expert review policies',
  },
  {
    category: 'Bias & Fairness',
    icon: '03',
    color: '#6366f1',
    risks: ['Historical biases in training data', 'Discriminatory outcomes', 'Lack of diversity in development'],
    prevention: 'Bias testing before deployment, diverse review panels, regular fairness audits',
  },
  {
    category: 'Regulatory & Compliance',
    icon: '04',
    color: '#818cf8',
    risks: ['AI docs don\'t meet regulatory standards', 'Audit trail gaps', 'IP ownership issues'],
    prevention: 'Documentation requirements, audit trails for AI decisions, regulatory monitoring',
  },
  {
    category: 'Organizational',
    icon: '05',
    color: '#a78bfa',
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
    gsap.fromTo(cards, { opacity: 0, y: 18, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out', delay: 0.3,
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
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
        {risks.map((risk, i) => (
          <div
            key={risk.category}
            className={`risk-card rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
              expandedIndex === i ? 'md:col-span-2' : ''
            }`}
            style={{
              borderColor: expandedIndex === i ? `${risk.color}30` : `${risk.color}10`,
              background: `linear-gradient(180deg, ${risk.color}${expandedIndex === i ? '0a' : '05'} 0%, transparent 60%)`,
            }}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="font-mono text-[10px] text-text-muted tracking-wider">{risk.icon}</span>
              <h4 className="font-mono text-[11px] font-bold tracking-wide" style={{ color: risk.color }}>
                {risk.category}
              </h4>
            </div>
            
            <ul className="space-y-1.5 mb-2">
              {risk.risks.map((r, j) => (
                <li key={j} className="text-xs text-text-secondary flex items-start gap-2 font-light">
                  <span className="w-0.5 h-0.5 rounded-full mt-2 shrink-0 opacity-50" style={{ background: risk.color }} />
                  {r}
                </li>
              ))}
            </ul>

            {expandedIndex === i && (
              <div className="border-t border-white/[0.05] pt-2.5 mt-2.5">
                <p className="text-[11px] font-mono opacity-70" style={{ color: risk.color }}>
                  {risk.prevention}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-text-muted mt-5 font-mono tracking-wide">
        Click any category to expand prevention strategies
      </p>
    </div>
  );
}
