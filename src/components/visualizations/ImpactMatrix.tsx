'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const quadrants = [
  {
    id: 'quick-wins',
    label: 'Quick Wins',
    sublabel: 'Start Here',
    color: '#00d4aa',
    items: [
      'Document summarization',
      'Meeting note automation',
      'Report generation',
      'Email drafting',
      'Quality data trends',
    ],
  },
  {
    id: 'strategic-bets',
    label: 'Strategic Bets',
    sublabel: 'Plan For These',
    color: '#6366f1',
    items: [
      'Predictive quality',
      'Demand forecasting',
      'Regulatory doc generation',
      'Supply chain risk',
      'Digital twins',
    ],
  },
  {
    id: 'time-fillers',
    label: 'Time Fillers',
    sublabel: 'Fine for Learning',
    color: '#71717a',
    items: [
      'Low-impact experiments',
      'Learning exercises',
    ],
  },
  {
    id: 'avoid',
    label: 'Avoid',
    sublabel: 'Don\'t Start Here',
    color: '#ef4444',
    items: [
      'Custom models when off-the-shelf works',
      'AI for AI\'s sake',
      'Replacing human judgment in regulated decisions',
    ],
  },
];

interface ImpactMatrixProps {
  isActive: boolean;
}

export function ImpactMatrix({ isActive }: ImpactMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const quads = containerRef.current.querySelectorAll('.matrix-quad');
    gsap.fromTo(quads, { opacity: 0, scale: 0.92, y: 15 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out', delay: 0.3,
    });

    const items = containerRef.current.querySelectorAll('.matrix-item');
    gsap.fromTo(items, { opacity: 0, x: -8 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.7,
    });

    return () => {
      gsap.killTweensOf([quads, items]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* Axis labels */}
        <div className="hidden md:flex justify-between mb-3 px-1">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">Low Effort</span>
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">High Effort</span>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          {/* Vertical axis label */}
          <div className="hidden md:flex absolute -left-10 top-0 bottom-0 flex-col justify-between items-center py-4">
            <span className="text-[10px] font-mono text-text-muted tracking-[0.15em]" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
              High Impact
            </span>
            <span className="text-[10px] font-mono text-text-muted tracking-[0.15em]" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
              Low Impact
            </span>
          </div>

          {quadrants.map((q) => (
            <div
              key={q.id}
              className="matrix-quad rounded-xl p-5 border min-h-0 md:min-h-[160px] transition-all hover:border-white/[0.1] group"
              style={{
                borderColor: `${q.color}12`,
                background: `linear-gradient(135deg, ${q.color}06 0%, transparent 60%)`,
              }}
            >
              <div className="flex items-baseline gap-2.5 mb-4">
                {/* Color indicator dot */}
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: q.color }} />
                <h4 className="font-serif text-base font-bold text-text-primary">
                  {q.label}
                </h4>
                <span className="text-[10px] font-mono text-text-muted tracking-wide">{q.sublabel}</span>
              </div>
              <ul className="space-y-2 pl-[18px]">
                {q.items.map((item, i) => (
                  <li key={i} className="matrix-item text-[15px] md:text-sm text-text-secondary font-light leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
