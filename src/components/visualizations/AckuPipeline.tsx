'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const phases = [
  {
    name: 'LEARN',
    timeline: 'Weeks 1-4',
    icon: '01',
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
    icon: '02',
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
    icon: '03',
    color: '#6366f1',
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
    icon: '04',
    color: '#818cf8',
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

    const line = containerRef.current.querySelector('.pipeline-line');
    if (line) {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut', delay: 0.2,
      });
    }

    const cards = containerRef.current.querySelectorAll('.pipeline-phase');
    gsap.fromTo(cards, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.4,
    });

    const arrows = containerRef.current.querySelectorAll('.pipeline-arrow');
    gsap.fromTo(arrows, { opacity: 0, x: -8 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.15, ease: 'power2.out', delay: 0.8,
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
        <div className="relative mb-8">
          <div className="pipeline-line origin-left absolute top-1/2 left-[8%] right-[8%] h-px bg-gradient-to-r from-[#00d4aa]/30 via-[#6366f1]/20 to-[#818cf8]/10" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {phases.map((phase, i) => (
            <div key={phase.name} className="relative">
              {i < phases.length - 1 && (
                <div className="pipeline-arrow absolute -right-3 top-7 text-text-muted text-sm z-10 font-mono">
                  {'\u2192'}
                </div>
              )}
              <div
                className="pipeline-phase rounded-xl p-4 h-full border transition-all hover:border-white/[0.1]"
                style={{
                  borderColor: `${phase.color}12`,
                  background: `linear-gradient(180deg, ${phase.color}06 0%, transparent 60%)`,
                }}
              >
                {/* Phase number + name */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-text-muted tracking-wider">{phase.icon}</span>
                  <h3 className="font-mono text-sm font-bold tracking-wide" style={{ color: phase.color }}>
                    {phase.name}
                  </h3>
                </div>
                <p className="text-[10px] font-mono text-text-muted mb-3 tracking-wide">{phase.timeline}</p>

                {/* Items */}
                <ul className="space-y-1.5 mb-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-text-secondary flex items-start gap-2 font-light">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0 opacity-60" style={{ background: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Output */}
                <div className="border-t border-white/[0.04] pt-2.5 mt-auto">
                  <p className="text-[11px] font-mono opacity-70" style={{ color: phase.color }}>
                    {phase.outputs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="md:hidden space-y-2.5">
        {phases.map((phase, i) => (
          <div key={phase.name} className="relative">
            <div
              className="pipeline-phase rounded-xl p-4 border"
              style={{
                borderColor: `${phase.color}12`,
                background: `linear-gradient(135deg, ${phase.color}06 0%, transparent 60%)`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-text-muted">{phase.icon}</span>
                <h3 className="font-mono text-sm font-bold" style={{ color: phase.color }}>
                  {phase.name}
                </h3>
                <span className="text-[11px] font-mono text-text-muted ml-auto">{phase.timeline}</span>
              </div>
              <ul className="space-y-1 mb-2">
                {phase.items.slice(0, 3).map((item, j) => (
                  <li key={j} className="text-[15px] text-text-secondary flex items-start gap-2 font-light">
                    <span className="w-1 h-1 rounded-full mt-2 shrink-0 opacity-60" style={{ background: phase.color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[12px] font-mono opacity-60" style={{ color: phase.color }}>
                {phase.outputs}
              </p>
            </div>
            {i < phases.length - 1 && (
              <div className="pipeline-arrow flex justify-center py-1 text-text-muted font-mono text-xs">{'\u2193'}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
