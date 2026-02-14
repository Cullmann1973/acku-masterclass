'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const milestones = [
  {
    period: 'Month 0-3',
    phase: 'LEARN',
    title: 'Foundation',
    metric: '40+ interviews',
    items: ['Assessed current state', 'Identified top pain points', 'Built core team', 'Established governance'],
    color: '#00d4aa',
  },
  {
    period: 'Month 3-6',
    phase: 'BUILD',
    title: 'First Use Case',
    metric: '65% adoption in week 1',
    items: ['Piloted with 25 quality engineers', '30-minute training sessions', '4 hours saved per user per week'],
    color: '#00c4ba',
  },
  {
    period: 'Month 6-9',
    phase: 'EXPAND',
    title: 'Multi-Function',
    metric: '5 new functions',
    items: ['Supply chain, regulatory, R&D, marketing, engineering', 'Peer champions in each', 'Monthly AI Office Hours'],
    color: '#00b4ca',
  },
  {
    period: 'Month 9-12',
    phase: 'SCALE',
    title: 'All Sites',
    metric: '500 active users',
    items: ['All NA manufacturing sites', 'Formal training program', 'AI governance council', 'Published AI use policy'],
    color: '#00a4d4',
  },
  {
    period: 'Month 12-18',
    phase: 'SUSTAIN',
    title: 'Organic Growth',
    metric: '1,000+ engaged users',
    items: ['Organic word-of-mouth growth', 'Internal community of practice', 'Systematic business impact measurement'],
    color: '#0094e4',
  },
];

interface TimelineProps {
  isActive: boolean;
}

export function Timeline({ isActive }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    // Animate the line
    const line = containerRef.current.querySelector('.timeline-line');
    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, duration: 1.2, ease: 'power2.inOut', delay: 0.2,
      });
    }

    // Animate nodes
    const nodes = containerRef.current.querySelectorAll('.timeline-node');
    gsap.fromTo(nodes, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)', delay: 0.4,
    });

    // Animate cards
    const cards = containerRef.current.querySelectorAll('.timeline-card');
    gsap.fromTo(cards, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.6,
    });

    return () => {
      gsap.killTweensOf([line, nodes, cards]);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        {/* Vertical line */}
        <div className="timeline-line origin-top absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4aa] via-[#00a4d4] to-[#0094e4] opacity-30" />

        <div className="space-y-4">
          {milestones.map((ms) => (
            <div key={ms.period} className="relative flex gap-4 md:gap-6">
              {/* Node */}
              <div className="timeline-node relative z-10 flex-shrink-0 w-12 md:w-16 flex items-start justify-center pt-4">
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{ borderColor: ms.color, background: `${ms.color}33` }}
                />
              </div>

              {/* Card */}
              <div className="timeline-card flex-1 glass rounded-lg p-4 mb-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs font-bold" style={{ color: ms.color }}>
                    {ms.phase}
                  </span>
                  <span className="text-xs text-text-tertiary font-mono">{ms.period}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-text-primary mb-1">
                  {ms.title}
                </h4>
                <div className="font-mono text-sm mb-2" style={{ color: ms.color }}>
                  {ms.metric}
                </div>
                <ul className="space-y-0.5">
                  {ms.items.map((item, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
