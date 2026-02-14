'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const phases = [
  {
    name: 'LEARN',
    timeline: 'Weeks 1-4',
    icon: '🔍',
    color: '#00d4aa',
    outputs: 'Current-state assessment everyone agrees on',
    items: [
      'Assess current state honestly',
      'Interview stakeholders: biggest time sinks?',
      'Catalog data assets & infrastructure',
      'Identify internal champions',
      'Benchmark against peers',
    ],
  },
  {
    name: 'PLAN',
    timeline: 'Weeks 5-8',
    icon: '📋',
    color: '#00c4ba',
    outputs: 'Prioritized roadmap your CFO will approve',
    items: [
      'Prioritize use cases (impact vs feasibility)',
      'Build governance framework',
      'Define business success metrics',
      'Create talent development plan',
      'Double your timeline estimate',
    ],
  },
  {
    name: 'BUILD',
    timeline: 'Months 3-6',
    icon: '🔧',
    color: '#00b4ca',
    outputs: 'One deployed use case with measurable impact',
    items: [
      'Start with ONE use case',
      'Deploy to 20-50 person pilot',
      'Change management from day one',
      'Measure adoption weekly',
      'Document everything',
    ],
  },
  {
    name: 'SCALE',
    timeline: 'Months 6-18',
    icon: '📈',
    color: '#00a4d4',
    outputs: 'Self-sustaining AI program',
    items: [
      'Use pilot data to expand',
      'Roll out to more functions & sites',
      'Formalize training programs',
      'Mature governance as you grow',
      'Add use cases based on demand',
    ],
  },
];

interface AckuPipelineProps {
  isActive: boolean;
}

export function AckuPipeline({ isActive }: AckuPipelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    // Animate connector line
    const line = containerRef.current.querySelector('.pipeline-line');
    if (line) {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: 'power2.inOut', delay: 0.2,
      });
    }

    // Animate phase cards
    const cards = containerRef.current.querySelectorAll('.pipeline-phase');
    gsap.fromTo(cards, { opacity: 0, y: 30, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)', delay: 0.4,
    });

    // Animate arrows
    const arrows = containerRef.current.querySelectorAll('.pipeline-arrow');
    gsap.fromTo(arrows, { opacity: 0, x: -10 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.2, ease: 'power2.out', delay: 0.8,
    });

    return () => {
      gsap.killTweensOf([line, cards, arrows]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4">
      {/* Desktop: horizontal pipeline */}
      <div className="hidden md:block">
        {/* Connector line */}
        <div className="relative mb-6">
          <div className="pipeline-line origin-left absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#00d4aa] to-[#00a4d4] opacity-30" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <div key={phase.name} className="relative">
              {/* Arrow between phases */}
              {i < phases.length - 1 && (
                <div className="pipeline-arrow absolute -right-4 top-6 text-text-tertiary text-lg z-10">
                  →
                </div>
              )}
              <div className="pipeline-phase glass rounded-xl p-4 h-full">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{phase.icon}</span>
                  <h3 className="font-mono text-lg font-bold" style={{ color: phase.color }}>
                    {phase.name}
                  </h3>
                </div>
                <p className="text-xs font-mono text-text-tertiary mb-3">{phase.timeline}</p>

                {/* Items */}
                <ul className="space-y-1.5 mb-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-text-secondary flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Output */}
                <div className="border-t border-white/5 pt-2 mt-auto">
                  <p className="text-xs font-mono" style={{ color: phase.color, opacity: 0.8 }}>
                    Output: {phase.outputs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="md:hidden space-y-3">
        {phases.map((phase, i) => (
          <div key={phase.name} className="relative">
            <div className="pipeline-phase glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{phase.icon}</span>
                <h3 className="font-mono text-base font-bold" style={{ color: phase.color }}>
                  {phase.name}
                </h3>
                <span className="text-xs font-mono text-text-tertiary ml-auto">{phase.timeline}</span>
              </div>
              <ul className="space-y-1 mb-2">
                {phase.items.slice(0, 3).map((item, j) => (
                  <li key={j} className="text-xs text-text-secondary flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: phase.color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-mono" style={{ color: phase.color, opacity: 0.7 }}>
                → {phase.outputs}
              </p>
            </div>
            {i < phases.length - 1 && (
              <div className="pipeline-arrow flex justify-center py-1 text-text-tertiary">↓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
