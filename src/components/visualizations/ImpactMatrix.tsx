'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const quadrants = [
  {
    id: 'quick-wins',
    label: 'Quick Wins',
    sublabel: 'Start Here',
    position: 'top-left',
    color: '#00d4aa',
    bgColor: 'rgba(0, 212, 170, 0.08)',
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
    position: 'top-right',
    color: '#00a4d4',
    bgColor: 'rgba(0, 164, 212, 0.08)',
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
    position: 'bottom-left',
    color: '#b39f87',
    bgColor: 'rgba(179, 159, 135, 0.07)',
    items: [
      'Low-impact experiments',
      'Learning exercises',
    ],
  },
  {
    id: 'avoid',
    label: 'Avoid',
    sublabel: 'Don\'t Start Here',
    position: 'bottom-right',
    color: '#ff4444',
    bgColor: 'rgba(255, 68, 68, 0.05)',
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

    // Animate axes
    const axes = containerRef.current.querySelectorAll('.matrix-axis');
    gsap.fromTo(axes, { scaleX: 0 }, {
      scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 0.2,
    });

    // Animate quadrants
    const quads = containerRef.current.querySelectorAll('.matrix-quad');
    gsap.fromTo(quads, { opacity: 0, scale: 0.8 }, {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)', delay: 0.4,
    });

    // Animate items within quadrants
    const items = containerRef.current.querySelectorAll('.matrix-item');
    gsap.fromTo(items, { opacity: 0, x: -10 }, {
      opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.8,
    });

    return () => {
      gsap.killTweensOf([axes, quads, items]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* Axis labels */}
        <div className="flex justify-between mb-2 px-2">
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">Low Effort</span>
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">High Effort</span>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-2 gap-3 relative">
          {/* Vertical axis label */}
          <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between items-center py-2">
            <span className="text-xs font-mono text-text-tertiary writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
              High Impact
            </span>
            <span className="text-xs font-mono text-text-tertiary" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
              Low Impact
            </span>
          </div>

          {quadrants.map((q) => (
            <div
              key={q.id}
              className="matrix-quad rounded-xl p-4 border border-white/5 min-h-[160px] transition-all hover:border-white/10"
              style={{ background: q.bgColor }}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <h4 className="font-serif text-base font-bold" style={{ color: q.color }}>
                  {q.label}
                </h4>
                <span className="text-xs font-mono text-text-tertiary">{q.sublabel}</span>
              </div>
              <ul className="space-y-1.5">
                {q.items.map((item, i) => (
                  <li key={i} className="matrix-item flex items-start gap-2 text-sm text-text-secondary">
                    <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: q.color }} />
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
